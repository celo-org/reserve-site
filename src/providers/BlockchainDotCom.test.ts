import { getBTCBalance, getBTCPrice } from "./BlockchainDotCom"

describe("getBTCBalance", () => {
  it("returns account balance of address", async () => {
    const balance = await getBTCBalance("38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL")
    expect(balance).toEqual({
      hasError: false,
      source: "blockchain.com",
      time: 1587686400000,
      value: 1407.98450548,
    })
  })
})
describe("getBTCPrice", () => {
  it("returns account balance of address", async () => {
    const balance = await getBTCPrice()
    expect(balance).toEqual({
      hasError: false,
      source: "blockchain.com",
      time: 1587686400000,
      value: 56200,
    })
  })
})
