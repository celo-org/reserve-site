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
  rest.get("https://api.coinbase.com/v2/prices/CGLD-USD/spot",(req, res, ctx) => {
    return res(
      ctx.json({"data":{"base":"CGLD","currency":"USD","amount":"3.9619"}})
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
  }),
  rest.get("https://api.exchangeratesapi.io/latest", (req, res, ctx) => {
  return res(
    ctx.json({
      "base": "EUR",
      "date": "2021-02-25",
      "rates":  {
        "AUD": 1.5317,
        "BGN": 1.9558,
        "BRL": 6.6663,
        "CAD": 1.5257,
        "CHF": 1.1076,
        "CNY": 7.8898,
        "CZK": 26.11,
        "DKK": 7.4363,
        "GBP": 0.86408,
        "HKD": 9.4793,
        "HRK": 7.5895,
        "HUF": 360.18,
        "IDR": 17352.1,
        "ILS": 4.0086,
        "INR": 88.794,
        "ISK": 153.3,
        "JPY": 129.73,
        "KRW": 1359.14,
        "MXN": 25.3424,
        "MYR": 4.9383,
        "NOK": 10.2275,
        "NZD": 1.6409,
        "PHP": 59.492,
        "PLN": 4.5122,
        "RON": 4.8748,
        "RUB": 90.3519,
        "SEK": 10.0668,
        "SGD": 1.612,
        "THB": 36.858,
        "TRY": 8.8344,
        "USD": 1.2225,
        "ZAR": 18.1101,
      }
    }))
  }),
  rest.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", (req, res, ctx) => {
    return res(
      ctx.xml(
        `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <gesmes:Envelope xmlns:gesmes=\"http://www.gesmes.org/xml/2002-08-01\" xmlns=\"http://www.ecb.int/vocabulary/2002-08-01/eurofxref\">
    	<gesmes:subject>Reference rates</gesmes:subject>
    	<gesmes:Sender>
    		<gesmes:name>European Central Bank</gesmes:name>
    	</gesmes:Sender>
    	<Cube>
    		<Cube time='2021-02-25'>
    			<Cube currency='USD' rate='1.2225'/>
    			<Cube currency='JPY' rate='129.73'/>
    			<Cube currency='BGN' rate='1.9558'/>
    			<Cube currency='CZK' rate='26.110'/>
    			<Cube currency='DKK' rate='7.4363'/>
    			<Cube currency='GBP' rate='0.86408'/>
    			<Cube currency='HUF' rate='360.18'/>
    			<Cube currency='PLN' rate='4.5122'/>
    			<Cube currency='RON' rate='4.8748'/>
    			<Cube currency='SEK' rate='10.0668'/>
    			<Cube currency='CHF' rate='1.1076'/>
    			<Cube currency='ISK' rate='153.30'/>
    			<Cube currency='NOK' rate='10.2275'/>
    			<Cube currency='HRK' rate='7.5895'/>
    			<Cube currency='RUB' rate='90.3519'/>
    			<Cube currency='TRY' rate='8.8344'/>
    			<Cube currency='AUD' rate='1.5317'/>
    			<Cube currency='BRL' rate='6.6663'/>
    			<Cube currency='CAD' rate='1.5257'/>
    			<Cube currency='CNY' rate='7.8898'/>
    			<Cube currency='HKD' rate='9.4793'/>
    			<Cube currency='IDR' rate='17352.10'/>
    			<Cube currency='ILS' rate='4.0086'/>
    			<Cube currency='INR' rate='88.7940'/>
    			<Cube currency='KRW' rate='1359.14'/>
    			<Cube currency='MXN' rate='25.3424'/>
    			<Cube currency='MYR' rate='4.9383'/>
    			<Cube currency='NZD' rate='1.6409'/>
    			<Cube currency='PHP' rate='59.492'/>
    			<Cube currency='SGD' rate='1.6120'/>
    			<Cube currency='THB' rate='36.858'/>
    			<Cube currency='ZAR' rate='18.1101'/>
    		</Cube>
    	</Cube>
    </gesmes:Envelope>`
      )
    )
  })
]
