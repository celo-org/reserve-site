import {getCeloPrice,getInCustodyBalance, getcUSDSupply, getUnFrozenBalance, getFrozenBalance} from "./Celo"

import {newKit} from "@celo/contractkit"

describe("celo",() => {
  it("uses contractKit", () => {
    expect(newKit).toHaveBeenCalledWith("https://forno.celo.org")
  })
})

describe("getCeloPrice", () => {
  it("returns account balance of address" , async() => {
    const balance = await getCeloPrice()
    expect(balance).toEqual({
      "hasError": false,
      "source": "forno.celo.org",
      "time": 1587686400000,
      "value": 3.892,
    })
  })
})

describe("getcUSDSupply", () => {
  it("returns account balance of address" , async() => {
    const balance = await getcUSDSupply()
    expect(balance).toEqual({
      "hasError": false,
      "source": "forno.celo.org",
      "time": 1587686400000,
      "value": 40208036.10770464,
    })
  })
})

describe("getInCustodyBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getInCustodyBalance()
    expect(balance).toEqual({
      "hasError": false,
      "source": "forno.celo.org",
      "time": 1587686400000,
      "value": 84478770,
    })
  })
})

describe("getUnFrozenBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getUnFrozenBalance()
    expect(balance).toEqual({
      "hasError": false,
      "source": "forno.celo.org",
      "time": 1587686400000,
      "value": 50000000,
    })
  })
})

describe("getFrozenBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getFrozenBalance()
    expect(balance).toEqual({
      "hasError": false,
      "source": "forno.celo.org",
      "time": 1587686400000,
      "value": 54686806,
    })
  })
})