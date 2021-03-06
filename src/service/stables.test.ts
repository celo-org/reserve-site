import getStables, {getTotalStableValueInUSD} from "./stables"

describe(`totalStableValueInUSD()`, () => {
  it("returns value in USD of all the stable tokens backed by the reserve", async () => {
    const result = await getTotalStableValueInUSD()
    expect(result).toEqual(89362360.25)
  })
})

describe(`getStables()`, () => {
  it("returns array which includes cUSD", async () => {
    const result = await getStables()
    expect(result).toContainEqual({"hasError": false, "token": "cUSD", "units": 40208036.10770464, "updated": 1587686400000, "value": 40208036.10770464})
  })
  it("returns array which includes cEUR", async () => {
    const result = await getStables()
    expect(result).toContainEqual({"hasError": false, "token": "cEUR", "units":  40208036.10770464, "updated": 1587686400000, "value": 49154324.141668916})
  })
})

