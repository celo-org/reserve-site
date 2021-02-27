import {getBTCInUSD, getETHInUSD, getCELOPrice} from "./Coinbase"

describe("getBTCInUSD", () => {
  it("returns current price of BTC" , async() => {
    const price = await getBTCInUSD()
    expect(price).toEqual({source: "coinbase", time:1587686400000, value: "50000.00", hasError: false })
  })
})

describe("getETHInUSD", () => {
  it("returns current price of ETH" , async() => {
    const price = await getETHInUSD()
    expect(price).toEqual({source: "coinbase", time:1587686400000, value: "1500.00", hasError: false })
  })
})

describe("getCELOPrice", () => {
  it("returns current price of CELO" , async() => {
    const price = await getCELOPrice()
    expect(price).toEqual({source: "coinbase", time:1587686400000, value: "3.9619", hasError: false })
  })
})