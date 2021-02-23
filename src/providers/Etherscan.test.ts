import {getEthPrice, getETHBalance} from "./Etherscan"
import {getBTCBalance, getBTCPrice} from "./BlockchainDotCom"

describe("getEthPrice", () => {
  it("returns current price of Eth" , async() => {
    const price = await getEthPrice()
    expect(price).toEqual({
      "hasError": false,
      "source": "etherscan",
      "time": 1613763975,
      "value": "1400.00",
      })
  })
})


describe("getEthBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getETHBalance("0x00000000000000000")
    expect(balance).toEqual({
      "hasError": false,
      "source": "etherscan",
      "time": 1587686400000,
      "value": "40891626854930000000000",
    })
  })
})

describe("getBTCBalance", () => {
  it("returns account balance of address" , async() => {
    const balance = await getBTCBalance("38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL")
    expect(balance).toEqual(
      {
        "hasError": false,
        "source": "blockchain.com",
        "time": 1587686400000,
        "value": 140798450548,
      }
    )
  })
})

describe("getBTCPrice", () => {
  it("returns account balance of address" , async() => {
    const balance = await getBTCPrice()
    expect(balance).toEqual({hasError: false, source: "blockchain.com", "time": 1587686400000, "value": 56200})
  })
})
