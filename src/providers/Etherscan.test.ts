import ADDRESSES from "src/addresses.config"
import { getEthPrice, getETHBalance, getERC20onEthereumMainnetBalance } from "./Etherscan"

describe("getEthPrice", () => {
  it("returns current price of Eth", async () => {
    const price = await getEthPrice()
    expect(price).toEqual({
      hasError: false,
      source: "etherscan",
      time: 1613763975,
      value: 1400,
    })
  })
})

describe("getEthBalance", () => {
  it("returns account balance of address", async () => {
    const balance = await getETHBalance("0x00000000000000000")
    expect(balance).toEqual({
      hasError: false,
      source: "etherscan",
      time: 1587686400000,
      value: 40891.62685493,
    })
  })
})

describe("getERC20onEthereumMainnetBalance", () => {
  it("returns account balance of address", async () => {
    const { tokenAddress } = ADDRESSES.find((token) => token.token === "DAI")
    const balance = await getERC20onEthereumMainnetBalance(
      tokenAddress,
      "0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186"
    )
    expect(balance).toEqual({
      hasError: false,
      source: "etherscan",
      time: 1587686400000,
      value: 2095536.31747404,
    })
  })
})
