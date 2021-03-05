import getHoldings from "./holdings"

describe("getHoldings", () => {
  it("shows all crypto in the reserve", async () => {
    const holdings = await getHoldings()
    expect(holdings).toEqual(
      {
        "celo": {
          "custody": {
            "hasError": false,
            "token": "CELO",
            "units": 50000000,
            "updated": 1587686400000,
            "value": 198095000,
          },
          "frozen": {
            "hasError": false,
            "token": "CELO",
            "units": 50000000,
            "updated": 1587686400000,
            "value": 198095000,
          },
          "unfrozen": {
            "hasError": false,
            "token": "CELO",
            "units": 50000000,
            "updated": 1587686400000,
            "value": 198095000,
          },
        },
        "otherAssets": [
          {
            "hasError": false,
            "token": "BTC",
            "units": 1407.98450548,
            "updated": 1587686400000,
            "value": 79128729.207976,
          },
          {
            "hasError": false,
            "token": "ETH",
            "units": 23247.01826569,
            "updated": 1587686400000,
            "value": 34870527.398535,
          },
          {
            "hasError": false,
            "token": "DAI",
            "units": 2095536.31747404,
            "updated": 1587686400000,
            "value": 2095536.31747404,
          },
        ],
      }
    )
  })
})