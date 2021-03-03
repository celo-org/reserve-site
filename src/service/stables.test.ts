import {getTotalStableValueInUSD} from "./stables"

describe(`totalStableValueInUSD()`, () => {
  it("returns value in USD of all the stable tokens backed by the reserve", async () => {
    const result = await getTotalStableValueInUSD()
    expect(result).toEqual(40208036.11)
  })
})