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
    const addressData = await getGroupedNonCeloAddresses()
    expect(holdings).toEqual({
      celo: {
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
      },
      otherAssets: [
        {
          hasError: false,
          token: "BTC",
          units: 1407.98450548 * addressData.BTC.length,
          updated: 1587686400000,
          value: 79128729.207976 * addressData.BTC.length,
        },
        {
          hasError: false,
          token: "ETH",
          units: 23247.01826569 * addressData.ETH.length,
          updated: 1587686400000,
          value: 34870527.398535 * addressData.ETH.length,
        },
        {
          hasError: false,
          token: "DAI",
          units: 2095536.31747404,
          updated: 1587686400000,
          value: 2095536.31747404 * addressData.DAI.length,
        },
        {
          hasError: false,
          token: "cMCO2",
          units: 500000,
          updated: 1587686400000,
          value: 6393422.62841578,
        },
      ],
    })
  })
})
