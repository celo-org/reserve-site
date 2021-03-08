import mockBigNumber from "bignumber.js"
export * from  "@celo/contractkit"
const mockWEI = 1_000_000_000_000_000_000

export const newKit = jest.fn(() => {
  return {
    contracts: {
      getExchange: async () => ({
        quoteGoldSell: jest.fn(async () => new mockBigNumber(3.892* mockWEI ))
      }),
      getReserve: async () => ({
        getReserveCeloBalance: jest.fn(async () => new mockBigNumber(104686806 * mockWEI)),
        getUnfrozenBalance:  jest.fn(async () => new mockBigNumber(50000000 * mockWEI)),
      }),
      getGoldToken: async () => ({
        balanceOf: jest.fn(async () => new mockBigNumber(20208036 * mockWEI))
      }),
      getStableToken: async () => ({
        totalSupply: jest.fn(async () => new mockBigNumber(40208036.10770464 * mockWEI))
      })
    }
  }
})