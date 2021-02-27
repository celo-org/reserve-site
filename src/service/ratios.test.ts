import getRatios, {btcValue, ethValue, daiValue, nonCeloAssetValue, totalOutstandingLiabilitiesInUSD} from "./ratios"

describe(`getRatios()`, () => {
    it("returns ratio of total asset value to total outstanding stable tokens in circulations", async () => {
      const result = await getRatios()
      expect(result).toEqual({
        total: 17.3,
        unfrozen: 12.2
      })
    })
})

describe(`totalOutstandingLiabilitiesInUSD()`, () => {
  it("returns value in USD of all the stable tokens backed by the reserve", async () => {
    const result = await totalOutstandingLiabilitiesInUSD()
    expect(result).toEqual(40208036.10770464)
  })
})

describe(`btcValue()`, () => {
  it("returns value of BTC in USD in reserve", async () => {
    const result = await btcValue()
    expect(result).toEqual(79128729.207976)
  })
})

describe(`ethValue()`, () => {
  it("returns value of ETH in USD in reserve", async () => {
    const result = await ethValue()
    expect(result).toEqual(34870527.398535)
  })
})

describe(`daiValue()`, () => {
  it("returns value of DAI in USD in reserve", async () => {
    const result = await daiValue()
    expect(result).toEqual(2095536.31747404)
  })
})

describe(`nonCeloAssetValue()`, () => {
  it("sum of all non celo assets backing the reserve", async () => {
    const result = await nonCeloAssetValue()
    expect(result).toEqual(116094792.92398503)
  })
})