import { getCMC02Price } from "./UbeSwapGraph"

describe("getCMC02Price", () => {
  it("returns rate of cMC02 token on Ubeswap", async () => {
    const price = await getCMC02Price()
    expect(price).toEqual({
      source: "ubeswap",
      time: 1587686400000,
      value: 12.262838068638402,
      hasError: false,
    })
  })
})
