import { Providers } from "src/providers/ProviderSource"
import duel from "./duel"

async function Alfie () {
  return {value: 100, time: 1614121843624, source: Providers.etherscan, hasError: false }
}

async function Bormier() {
  return {value: 100, time: 1614121843634, source: Providers.blockstream, hasError: false }
}

async function Cerci() {
  return {value: 102, time: 1614121843684, source: Providers.coinbase, hasError: false }
}

async function Erros() {
  return {hasError: true, time: 0, source: Providers.coinbase, value: 0 }
}

describe(`consensus()`, () => {
  describe("when both parties agree", () => {
    it("returns value and indicts the agreement", async () => {
      const result = await duel(Alfie(), Bormier())
      expect(result).toEqual({
        "sources":  [
          "etherscan",
          "blockstream",
        ],
        "time": 1614121843634,
        "value": 100
      })
    })
  })
  describe("when both parties return but results differ", () => {
    it("most recent wins", async () => {
      const result = await duel(Alfie(), Cerci())
      expect(result).toEqual(
        {
          "sources": ["coinbase"],
          "time": 1614121843684,
          "value": 102,
        }
      )
    })
  })
  describe("when one party doesnt respond or has error", () => {
    it("use the other one and indicates so", async () => {
      const result = await duel(Bormier(), Erros())
      expect(result).toEqual({
        "sources": [
          "blockstream",
        ],
        "time": 1614121843634,
        "value": 100,

      })
    })
  })
  describe("when neither party responds", () => {
    it("returns invalid", async () => {
      const result = await duel(Erros(), Erros())
      expect(result).toEqual({value: null, time: 0,  "sources": []})
    })
  })
})