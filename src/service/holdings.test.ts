import getHoldings, { getGroupedNonCeloAddresses } from "./holdings"

describe("getHoldings", () => {
  let info
  beforeEach(() => {
    info = global.console.info
    global.console.info = jest.fn()
  })

  afterEach(() => {
    global.console.info = info
  })
  it("shows all crypto in the reserve", async () => {
    const holdings = await getHoldings()
    expect(holdings.celo).toEqual({
      custody: {
        hasError: false,
        token: "CELO",
        units: 2944998.2492173747,
        updated: 1587686400000,
        value: 11667788.563574316,
      },
      frozen: {
        hasError: false,
        token: "CELO",
        units: 41313868.61313868,
        updated: 1587686400000,
        value: 163681416.05839413,
      },
      unfrozen: {
        hasError: false,
        token: "CELO",
        units: 75330631.07819435,
        updated: 1587686400000,
        value: 298452427.2686982,
      },
    })
    expect(holdings.otherAssets[0]).toHaveProperty("hasError", false)
    expect(holdings.otherAssets[0]).toHaveProperty("token", "BTC")
    expect(holdings.otherAssets[0]).toHaveProperty("units")
    expect(holdings.otherAssets[0]).toHaveProperty("updated")
    expect(holdings.otherAssets[0]).toHaveProperty("value")

    expect(holdings.otherAssets[1]).toHaveProperty("hasError", false)
    expect(holdings.otherAssets[1]).toHaveProperty("token", "ETH")
    expect(holdings.otherAssets[1]).toHaveProperty("units")
    expect(holdings.otherAssets[1]).toHaveProperty("updated")
    expect(holdings.otherAssets[1]).toHaveProperty("value")

    expect(holdings.otherAssets[2]).toHaveProperty("hasError", false)
    expect(holdings.otherAssets[2]).toHaveProperty("token", "DAI")
    expect(holdings.otherAssets[2]).toHaveProperty("units")
    expect(holdings.otherAssets[2]).toHaveProperty("updated")
    expect(holdings.otherAssets[2]).toHaveProperty("value")

    expect(holdings.otherAssets[3]).toHaveProperty("hasError", false)
    expect(holdings.otherAssets[3]).toHaveProperty("token", "USDC")
    expect(holdings.otherAssets[3]).toHaveProperty("units")
    expect(holdings.otherAssets[3]).toHaveProperty("updated")
    expect(holdings.otherAssets[3]).toHaveProperty("value")

    expect(holdings.otherAssets[4]).toHaveProperty("hasError", false)
    expect(holdings.otherAssets[4]).toHaveProperty("token", "cMCO2")
    expect(holdings.otherAssets[4]).toHaveProperty("units")
    expect(holdings.otherAssets[4]).toHaveProperty("updated")
    expect(holdings.otherAssets[4]).toHaveProperty("value")
  })
})
