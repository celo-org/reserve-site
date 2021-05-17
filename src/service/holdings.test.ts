import getHoldings from "./holdings"

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
          units: 1407.98450548,
          updated: 1587686400000,
          value: 79128729.207976,
        },
        {
          hasError: false,
          token: "ETH",
          units: 23247.01826569,
          updated: 1587686400000,
          value: 34870527.398535,
        },
        {
          hasError: false,
          token: "DAI",
          units: 2095536.31747404,
          updated: 1587686400000,
          value: 2095536.31747404,
        },
      ],
    })
  })
})
