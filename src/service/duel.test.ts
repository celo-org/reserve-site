import { Providers } from "src/providers/ProviderSource"
import duel from "./duel"

async function Alfie() {
  return { value: 100, time: 1614121843624, source: Providers.etherscan, hasError: false }
}

async function Bormier() {
  return { value: 100, time: 1614121843634, source: Providers.blockstream, hasError: false }
}

async function Cerci() {
  return { value: 102, time: 1614121843684, source: Providers.coinbase, hasError: false }
}

async function Erros() {
  return { hasError: true, time: 0, source: Providers.ecb, value: 0 }
}

describe(`duel()`, () => {
  describe("when both parties agree", () => {
    it("returns value and indicts the agreement", async () => {
      const result = await duel(Alfie(), Bormier())
      expect(result).toEqual({
        sources: ["etherscan", "blockstream"],
        time: 1614121843634,
        value: 100,
      })
    })
  })
  describe("when both parties return but results differ", () => {
    let info
    beforeEach(() => {
      info = global.console.info
      global.console.info = jest.fn()
    })

    afterEach(() => {
      global.console.info = info
    })
    it("most recent wins", async () => {
      const result = await duel(Alfie(), Cerci())
      expect(global.console.info).toHaveBeenCalledWith(
        "Sources: etherscan (100) differs from coinbase (102) 1.9608%"
      )
      expect(result).toEqual({
        sources: ["coinbase"],
        time: 1614121843684,
        value: 102,
      })
    })
  })
  describe("with errors", () => {
    let warn
    beforeEach(() => {
      warn = global.console.warn
      global.console.warn = jest.fn()
    })

    afterEach(() => {
      global.console.warn = warn
    })

    describe("when one party doesnt respond or has error", () => {
      it("use the other one and indicates so", async () => {
        const result = await duel(Bormier(), Erros())
        expect(result).toEqual({
          sources: ["blockstream"],
          time: 1614121843634,
          value: 100,
        })
        expect(global.console.warn).toHaveBeenCalledWith("Error with: ecb.europa.eu")
      })
    })
    describe("when neither party responds", () => {
      it("returns invalid", async () => {
        const result = await duel(Erros(), Erros())
        expect(global.console.warn).toHaveBeenCalledWith(
          "Error ecb.europa.eu & ecb.europa.eu could not get new data"
        )
        expect(result).toEqual({ value: null, time: 0, sources: [] })
      })
    })
  })
})
