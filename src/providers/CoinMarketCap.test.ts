import getCoinMarketCapPrice from "./CoinMarketCap"

describe("getCoinMarketCapPrice", () => {
  it("gets CMC quote for asset with that symbol", async () => {
    const price = await getCoinMarketCapPrice("MCO2")
    expect(price).toEqual({
      source: "coinmarketcap",
      time: 1633383307000,
      value: 12.78684525683156,
      hasError: false,
    })
  })
})
