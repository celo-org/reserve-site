import getBlockstreamBalance from "./Blockstream"

describe("getBTCBalance on Blocksteam", () => {
  it("returns account balance of address", async () => {
    const balance = await getBlockstreamBalance("38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL")
    expect(balance).toEqual({
      hasError: false,
      source: "blockstream",
      time: 1587686400000,
      value: 1407.98450547,
    })
  })
})
