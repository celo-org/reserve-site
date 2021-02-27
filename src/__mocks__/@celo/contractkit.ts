import mockBigNumber from "bignumber.js"
const mockWEI = 1_000_000_000_000_000_000

export const newKit = jest.fn(() => {
  return {
    contracts: {
      getExchange: async () => ({
        getGoldExchangeRate: jest.fn(async () => new mockBigNumber(3.892* mockWEI ))
      }),
      getReserve: async () => ({
        getReserveGoldBalance: jest.fn(async () => new mockBigNumber(70208036 * mockWEI))
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