import { response, rest } from 'msw'

export const handlers = [
  rest.get('https://api.coinbase.com/v2/prices/BTC-USD/spot', (req, res, ctx) => {
    return res(
      ctx.json({"data":{"base":"BTC","currency":"USD","amount":"50000.00"}})
    )
  }),
  rest.get('https://api.coinbase.com/v2/prices/ETH-USD/spot', (req, res, ctx) => {
    return res(
      ctx.json({"data":{"base":"ETH","currency":"USD","amount":"1500.00"}})
    )
  }),
  rest.get('https://api.etherscan.io/api', (req, res, ctx) => {
    const action = req.url.searchParams.get("action")
    const module = req.url.searchParams.get("module")

    if (module === "stats"  && action  === "ethprice") {
      return res(
        ctx.json({"status":"1","message":"OK-Missing/Invalid API Key, rate limit of 1/5sec applied","result":{"ethbtc":"0.03574","ethbtc_timestamp":"1613763976","ethusd":"1400.00","ethusd_timestamp":"1613763975"}})
      )
    } else if (module === "account" && action  === "balance") {
      return res(
        ctx.json({"status":"1","message":"OK-Missing/Invalid API Key, rate limit of 1/5sec applied","result":"40891626854930000000000"})
      )
    } else {
      res.networkError("Query not mocked, add a mock to handlers.ts")
    }
  }),

  rest.get("https://blockchain.info/balance?active=38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL", (req, res, ctx) => {
    return res(
      ctx.json({"38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL":{"final_balance":140798450548,"n_tx":34,"total_received":140798450548}})
    )
  }),
  rest.get("https://api.blockchain.com/v3/exchange/tickers/BTC-USD", (req, res, ctx) => {
    return res(
      ctx.json({"symbol":"BTC-USD","price_24h":51943.8,"volume_24h":386.26026182,"last_trade_price":56200.0})
    )
  }),
  rest.get("https://blockstream.info/api/address/:address", (req, res, ctx) => {
    return res(
      ctx.json({
        "address":"38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL",
        "chain_stats":{
          "funded_txo_count":34,
          "funded_txo_sum":140798450548,
          "spent_txo_count":0,
          "spent_txo_sum":1,
          "tx_count":34
        },
        "mempool_stats":{
          "funded_txo_count":0,
          "funded_txo_sum":0,
          "spent_txo_count":0,
          "spent_txo_sum":0,
          "tx_count":
          0
        }
      })
    )
  })
]
