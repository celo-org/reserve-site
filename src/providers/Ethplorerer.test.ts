import {getETHBalance, getDaiBalance} from "./Ethplorerer"
describe("getEthBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getETHBalance("0x00000000000000000")
    expect(balance).toEqual({
      "hasError": false,
      "source": "ethplorer",
      "time": 1587686400000,
      "value": 23247.01826569,
    })
  })
})

describe("getDAIBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getDaiBalance("0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186")
    expect(balance).toEqual({hasError: false, source: "ethplorer", "time": 1587686400000, "value": 2095536.31747404})
  })
})

