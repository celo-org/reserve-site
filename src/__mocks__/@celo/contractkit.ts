import mockBigNumber from "bignumber.js"
export * from "@celo/contractkit"
const mockWEI = 1_000_000_000_000_000_000

class Contract {
  methods = {
    balanceOf: () => () => (500000 * mockWEI).toString(),
  }
}

export const newKit = jest.fn(() => {
  return {
    web3: {
      eth: {
        Contract,
      },
    },
    contracts: {
      getExchange: async () => ({
        quoteGoldSell: jest.fn(async () => new mockBigNumber(3.892 * mockWEI)),
      }),
      getReserve: async () => ({
        getReserveCeloBalance: jest.fn(
          async () => new mockBigNumber("1.19589497940550414165549272e+26")
        ),
        getUnfrozenBalance: jest.fn(
          async () => new mockBigNumber("7.533063107819435353416241e+25")
        ),
      }),
      getGoldToken: async () => ({
        balanceOf: jest.fn(async () => new mockBigNumber("1.16644499691333039665549272e+26")),
      }),
      getStableToken: async () => ({
        totalSupply: jest.fn(async () => new mockBigNumber("4.1557073455407045025690923e+25")),
      }),
    },
  }
})
