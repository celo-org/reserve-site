import { Tokens } from "./service/Data"

export interface ReserveCrypto {
  token: Tokens
  label: string
  addresses: string[]
}

const ADDRESSES: ReserveCrypto[] = [
  {
    label: "BTC",
    token: "BTC",
    addresses: ["38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL", "3AKvfpb3Yqc3hLkziyudM2ByEqYDUFGy1D"],
  },
  {
    label: "ETH",
    token: "ETH",
    addresses: [
      "0xe1955eA2D14e60414eBF5D649699356D8baE98eE",
      "0x8331C987D9Af7b649055fa9ea7731d2edbD58E6B",
    ],
  },
  {
    label: "DAI",
    token: "DAI",
    addresses: ["0x16B34Ce9A6a6F7FC2DD25Ba59bf7308E7B38E186"],
  },
]

export default ADDRESSES

export function generateLink(token: Tokens, address: string) {
  switch (token) {
    case "CELO":
      return `https://explorer.celo.org/address/${address}/coin_balances`
    case "BTC":
      return `https://blockchain.info/address/${address}`
    case "ETH":
      return `https://etherscan.io/address/${address}`
    case "DAI":
      return `https://etherscan.io/address/${address}`
  }
}
