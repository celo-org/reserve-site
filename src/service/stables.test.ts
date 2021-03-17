import getStables, {getTotalStableValueInUSD} from "./stables"

describe(`totalStableValueInUSD()`, () => {
  it("returns value in USD of all the stable tokens backed by the reserve", async () => {
    const result = await getTotalStableValueInUSD()
    expect(result).toEqual(92360595.75)
  })
})

describe(`getStables()`, () => {
  it("returns array which includes cUSD", async () => {
    const result = await getStables()
    expect(result).toContainEqual({"hasError": false, "token": "cUSD", "units":  41557073.455407046, "updated": 1587686400000, "value":  41557073.455407046})
  })
  it("returns array which includes cEUR", async () => {
    const result = await getStables()
    expect(result).toContainEqual({"hasError": false, "token": "cEUR", "units":   41557073.455407046, "updated": 1587686400000, "value": 50803522.29923511})
  })
})

