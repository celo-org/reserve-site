import {
  getCeloPrice,
  getInCustodyBalance,
  getcUSDSupply,
  getUnFrozenBalance,
  getFrozenBalance,
  getTargetAllocations,
} from "./Celo"

import { newKit } from "@celo/contractkit"

describe("celo", () => {
  it("uses contractKit", () => {
    expect(newKit).toHaveBeenCalledWith("https://forno.celo.org")
  })
})

describe("getTargetAllocation", () => {
  it("returns array of symbols with weights", async () => {
    const allocations = await getTargetAllocations()
    expect(allocations).toEqual([
      { token: "CELO", percent: 50 },
      { token: "BTC", percent: 29.5 },
      { token: "ETH", percent: 15 },
      { token: "DAI", percent: 5 },
      { token: "cMCO2", percent: 0.5 },
    ])
  })
})

describe("getCeloPrice", () => {
  it("returns account balance of address", async () => {
    const balance = await getCeloPrice()
    expect(balance).toEqual({
      hasError: false,
      source: "forno.celo.org",
      time: 1587686400000,
      value: 3.892,
    })
  })
})

describe("getcUSDSupply", () => {
  it("returns account balance of address", async () => {
    const balance = await getcUSDSupply()
    expect(balance).toEqual({
      hasError: false,
      source: "forno.celo.org",
      time: 1587686400000,
      value: 41557073.455407046,
    })
  })
})

describe("getInCustodyBalance", () => {
  it("returns account balance of address", async () => {
    const balance = await getInCustodyBalance()
    expect(balance).toEqual({
      hasError: false,
      source: "forno.celo.org",
      time: 1587686400000,
      value: 2944998.2492173747,
    })
  })
})

describe("getUnFrozenBalance", () => {
  it("returns account balance of address", async () => {
    const balance = await getUnFrozenBalance()
    expect(balance).toEqual({
      hasError: false,
      source: "forno.celo.org",
      time: 1587686400000,
      value: 75330631.07819435,
    })
  })
})

describe("getFrozenBalance", () => {
  it("returns account balance of address", async () => {
    const balance = await getFrozenBalance()
    expect(balance).toEqual({
      hasError: false,
      source: "forno.celo.org",
      time: 1587686400000,
      value: 41313868.61313868,
    })
  })
})
