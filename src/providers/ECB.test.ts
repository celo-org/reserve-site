import { euroToUSD } from "./ECB"

describe("euroToUSD", () => {
  it("returns conversion rate of EURO to USD" , async() => {
    const price = await euroToUSD()
    expect(price).toEqual({source: "ecb.europa.eu", time:1614211200000, value: 1.2225, hasError: false })
  })
})