import { rest } from 'msw'

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
    } else if (module === "account" && action === "tokenbalance") {
      return res(
        ctx.json({"status":"1","message":"OK-Missing/Invalid API Key, rate limit of 1/5sec applied","result":"2095536317474040000000000"})
      )
    }
    else {
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
  }),
  rest.get("https://api.ethplorer.io/getAddressInfo/:address/", (req, res, ctx) => {
    return res(
      ctx.json(
        {"address":req.params.address,"ETH":{"balance":23247.018265690003,"price":{"rate":1612.7196048087776,"diff":7.18,"diff7d":-11.3,"ts":1614197282,"marketCapUsd":185149586276.65247,"availableSupply":114805813.5615,"volume24h":31489053285.742695,"diff30d":18.79831622796712,"volDiff1":-37.55454681633618,"volDiff7":1.5720643391604767,"volDiff30":9.414151933489975}},"countTxs":0,"tokens":[{"tokenInfo":{"address":"0x35e125bb2527aeb74ef83f61008506362bf3fb24","decimals":"5","name":"Defla Yield Farm","owner":"0x34cb50f289c5ae2d5950c7d7bd09d4db2444b2b6","symbol":"DYF","totalSupply":"21000000000000","lastUpdated":1603925320,"issuancesCount":0,"holdersCount":49,"ethTransfersCount":0,"price":false},"balance":10000000000,"totalIn":0,"totalOut":0},{"tokenInfo":{"address":"0x6b175474e89094c44da98b954eedeac495271d0f","name":"Dai","decimals":"18","symbol":"DAI","totalSupply":"2265340224461973585512191864","owner":"0x","lastUpdated":1614197339,"issuancesCount":0,"holdersCount":313001,"description":"Decentralized multi-collateral stablecoin soft-pegged to the US Dollar by MakerDao.","image":"/images/mcd-dai.png","website":"https://makerdao.com/","twitter":"MakerDAO","reddit":"MakerDAO","coingecko":"dai","ethTransfersCount":0,"price":{"rate":1.00128688571454,"diff":0.04,"diff7d":0.03,"ts":1614197288,"marketCapUsd":2318706623.0815187,"availableSupply":2315726547.668543,"volume24h":667774487.076702,"diff30d":-0.009075119580259638,"volDiff1":-45.54940130975274,"volDiff7":114.08982030342182,"volDiff30":-4.5879155179605675,"currency":"USD"},"publicTags":["DeFi","Stablecoins"]},"balance":2.09553631747404e+24,"totalIn":0,"totalOut":0}]}
      )
    )
  })
]
