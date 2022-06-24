import { rest } from "msw"

export const handlers = [
  rest.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest", (req, res, ctx) => {
    const symbol = req.url.searchParams.get("symbol")

    if (symbol === "BTC") {
      return res(
        ctx.json({
          status: {
            timestamp: "2021-10-06T22:16:47.540Z",
            error_code: 0,
            error_message: null,
            elapsed: 18,
            credit_count: 1,
            notice: null,
          },
          data: {
            BTC: {
              id: 1,
              name: "Bitcoin",
              symbol: "BTC",
              slug: "bitcoin",
              num_market_pairs: 8523,
              date_added: "2013-04-28T00:00:00.000Z",
              tags: [Array],
              max_supply: 21000000,
              circulating_supply: 18836712,
              total_supply: 18836712,
              is_active: 1,
              platform: null,
              cmc_rank: 1,
              is_fiat: 0,
              last_updated: "2021-10-06T22:16:02.000Z",
              quote: {
                USD: {
                  price: 56200.0,
                  volume_24h: 141886.9455234,
                  percent_change_1h: 1.06488522,
                  percent_change_24h: 1.56037461,
                  percent_change_7d: -1.79004442,
                  percent_change_30d: 78.16734785,
                  percent_change_60d: 100.226614,
                  percent_change_90d: 122.45884997,
                  market_cap: 0,
                  market_cap_dominance: 0,
                  fully_diluted_market_cap: 24682051.01,
                  last_updated: "2021-10-04T21:35:07.000Z",
                },
              },
            },
          },
        })
      )
    }

    return res(
      ctx.json({
        status: {
          timestamp: "2021-10-04T21:36:33.278Z",
          error_code: 0,
          error_message: null,
          elapsed: 8,
          credit_count: 1,
          notice: null,
        },
        data: {
          [symbol]: {
            id: 8826,
            name: "Moss Carbon Credit",
            symbol: symbol,
            slug: "moss-carbon-credit",
            num_market_pairs: 8,
            date_added: "2021-03-16T00:00:00.000Z",
            tags: [],
            max_supply: 1930269,
            circulating_supply: 0,
            total_supply: 0,
            platform: {
              id: 1027,
              name: "Ethereum",
              symbol: "ETH",
              slug: "ethereum",
              token_address: "0xfc98e825a2264d890f9a1e68ed50e1526abccacd",
            },
            is_active: 1,
            cmc_rank: 3614,
            is_fiat: 0,
            last_updated: "2021-10-04T21:35:07.000Z",
            quote: {
              USD: {
                price: 12.78684525683156,
                volume_24h: 141886.9455234,
                percent_change_1h: 1.06488522,
                percent_change_24h: 1.56037461,
                percent_change_7d: -1.79004442,
                percent_change_30d: 78.16734785,
                percent_change_60d: 100.226614,
                percent_change_90d: 122.45884997,
                market_cap: 0,
                market_cap_dominance: 0,
                fully_diluted_market_cap: 24682051.01,
                last_updated: "2021-10-04T21:35:07.000Z",
              },
            },
          },
        },
      })
    )
  }),
  rest.post("https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap", (req, res, ctx) => {
    return res(
      ctx.json({
        data: { token: { id: req.id, symbol: "CMCO2", derivedCUSD: 12.262838068638402 } },
      })
    )
  }),
  rest.get("https://api.coinbase.com/v2/prices/BTC-USD/spot", (req, res, ctx) => {
    return res(ctx.json({ data: { base: "BTC", currency: "USD", amount: "50000.00" } }))
  }),
  rest.get("https://api.coinbase.com/v2/prices/ETH-USD/spot", (req, res, ctx) => {
    return res(ctx.json({ data: { base: "ETH", currency: "USD", amount: "1500.00" } }))
  }),
  rest.get("https://api.coinbase.com/v2/prices/CGLD-USD/spot", (req, res, ctx) => {
    return res(ctx.json({ data: { base: "CGLD", currency: "USD", amount: "3.9619" } }))
  }),
  rest.get("https://api.etherscan.io/api", (req, res, ctx) => {
    const action = req.url.searchParams.get("action")
    const module = req.url.searchParams.get("module")

    if (module === "stats" && action === "ethprice") {
      return res(
        ctx.json({
          status: "1",
          message: "OK-Missing/Invalid API Key, rate limit of 1/5sec applied",
          result: {
            ethbtc: "0.03574",
            ethbtc_timestamp: "1613763976",
            ethusd: "1400.00",
            ethusd_timestamp: "1613763975",
          },
        })
      )
    } else if (module === "account" && action === "balance") {
      return res(
        ctx.json({
          status: "1",
          message: "OK-Missing/Invalid API Key, rate limit of 1/5sec applied",
          result: "40891626854930000000000",
        })
      )
    } else if (module === "account" && action === "tokenbalance") {
      return res(
        ctx.json({
          status: "1",
          message: "OK-Missing/Invalid API Key, rate limit of 1/5sec applied",
          result: "2095536317474040000000000",
        })
      )
    } else {
      res.networkError("Query not mocked, add a mock to handlers.ts")
    }
  }),

  rest.get("https://blockchain.info/balance", (req, res, ctx) => {
    return res(
      ctx.json({
        "38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL": {
          final_balance: 140798450548,
          n_tx: 34,
          total_received: 140798450548,
        },
      })
    )
  }),
  rest.get("https://api.blockchain.com/v3/exchange/tickers/BTC-USD", (req, res, ctx) => {
    return res(
      ctx.json({
        symbol: "BTC-USD",
        price_24h: 51943.8,
        volume_24h: 386.26026182,
        last_trade_price: 56200.0,
      })
    )
  }),
  rest.get("https://blockstream.info/api/address/:address", (req, res, ctx) => {
    return res(
      ctx.json({
        address: "38EPdP4SPshc5CiUCzKcLP9v7Vqo5u1HBL",
        chain_stats: {
          funded_txo_count: 34,
          funded_txo_sum: 140798450548,
          spent_txo_count: 0,
          spent_txo_sum: 1,
          tx_count: 34,
        },
        mempool_stats: {
          funded_txo_count: 0,
          funded_txo_sum: 0,
          spent_txo_count: 0,
          spent_txo_sum: 0,
          tx_count: 0,
        },
      })
    )
  }),
  rest.get("https://api.ethplorer.io/getAddressInfo/:address/", (req, res, ctx) => {
    return res(
      ctx.json({
        address: req.params.address,
        ETH: {
          balance: 23247.018265690003,
          price: {
            rate: 1612.7196048087776,
            diff: 7.18,
            diff7d: -11.3,
            ts: 1614197282,
            marketCapUsd: 185149586276.65247,
            availableSupply: 114805813.5615,
            volume24h: 31489053285.742695,
            diff30d: 18.79831622796712,
            volDiff1: -37.55454681633618,
            volDiff7: 1.5720643391604767,
            volDiff30: 9.414151933489975,
          },
        },
        countTxs: 0,
        tokens: [
          {
            tokenInfo: {
              address: "0x35e125bb2527aeb74ef83f61008506362bf3fb24",
              decimals: "5",
              name: "Defla Yield Farm",
              owner: "0x34cb50f289c5ae2d5950c7d7bd09d4db2444b2b6",
              symbol: "DYF",
              totalSupply: "21000000000000",
              lastUpdated: 1603925320,
              issuancesCount: 0,
              holdersCount: 49,
              ethTransfersCount: 0,
              price: false,
            },
            balance: 10000000000,
            totalIn: 0,
            totalOut: 0,
          },
          {
            tokenInfo: {
              address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              name: "USD Coin",
              decimals: "6",
              symbol: "USDC",
              totalSupply: "46865621933809550",
              owner: "0xfcb19e6a322b27c06842a71e8c725399f049ae3a",
              lastUpdated: 1656104909,
              issuancesCount: 212105,
              holdersCount: 1467597,
              image: "/images/usdc.png",
              website: "https://www.circle.com/en/usdc",
              ethTransfersCount: 0,
              price: {
                rate: 1.0000415875422946,
                diff: -0.02,
                diff7d: -0.06,
                ts: 1656104580,
                marketCapUsd: 55923776648.97886,
                availableSupply: 55921451013.26967,
                volume24h: 5049871329.968494,
                volDiff1: 9.52809981264808,
                volDiff7: -31.636488564304827,
                volDiff30: -13.628312371671498,
                diff30d: -0.013294376020908771,
                bid: 1.001,
                currency: "USD",
              },
              publicTags: ["Stablecoins"],
            },
            balance: 145179868044219,
            totalIn: 0,
            totalOut: 0,
            rawBalance: "145179868044219",
          },
          {
            tokenInfo: {
              address: "0x6b175474e89094c44da98b954eedeac495271d0f",
              name: "Dai",
              decimals: "18",
              symbol: "DAI",
              totalSupply: "2265340224461973585512191864",
              owner: "0x",
              lastUpdated: 1614197339,
              issuancesCount: 0,
              holdersCount: 313001,
              description:
                "Decentralized multi-collateral stablecoin soft-pegged to the US Dollar by MakerDao.",
              image: "/images/mcd-dai.png",
              website: "https://makerdao.com/",
              twitter: "MakerDAO",
              reddit: "MakerDAO",
              coingecko: "dai",
              ethTransfersCount: 0,
              price: {
                rate: 1.00128688571454,
                diff: 0.04,
                diff7d: 0.03,
                ts: 1614197288,
                marketCapUsd: 2318706623.0815187,
                availableSupply: 2315726547.668543,
                volume24h: 667774487.076702,
                diff30d: -0.009075119580259638,
                volDiff1: -45.54940130975274,
                volDiff7: 114.08982030342182,
                volDiff30: -4.5879155179605675,
                currency: "USD",
              },
              publicTags: ["DeFi", "Stablecoins"],
            },
            balance: 2.09553631747404e24,
            totalIn: 0,
            totalOut: 0,
          },
        ],
      })
    )
  }),
  rest.get("http://api.exchangeratesapi.io/v1/latest", (req, res, ctx) => {
    return res(
      ctx.json({
        base: "EUR",
        date: "2021-02-25",
        rates: {
          AED: 4.156694,
          AFN: 110.848139,
          ALL: 120.920057,
          AMD: 560.527178,
          ANG: 2.038737,
          AOA: 643.107856,
          ARS: 114.844879,
          AUD: 1.577909,
          AWG: 2.037017,
          AZN: 1.928342,
          BAM: 1.963623,
          BBD: 2.284094,
          BDT: 97.014211,
          BGN: 1.958453,
          BHD: 0.426566,
          BIF: 2262.220688,
          BMD: 1.131676,
          BND: 1.545171,
          BOB: 7.811262,
          BRL: 6.35199,
          BSD: 1.131255,
          BTC: 0.000023624705,
          BTN: 85.726464,
          BWP: 13.316318,
          BYN: 2.866074,
          BYR: 22180.853171,
          BZD: 2.280249,
          CAD: 1.439984,
          CDF: 2263.922639,
          CHF: 1.041813,
          CLF: 0.034622,
          CLP: 955.338847,
          CNY: 7.208669,
          COP: 4410.900305,
          CRC: 722.243968,
          CUC: 1.131676,
          CUP: 29.989419,
          CVE: 110.762852,
          CZK: 25.343934,
          DJF: 201.121937,
          DKK: 7.435509,
          DOP: 64.223068,
          DZD: 157.309825,
          EGP: 17.775767,
          ERN: 16.975494,
          ETB: 54.739621,
          EUR: 1,
          FJD: 2.405722,
          FKP: 0.84359,
          GBP: 0.852808,
          GEL: 3.512568,
          GGP: 0.84359,
          GHS: 6.931562,
          GIP: 0.84359,
          GMD: 59.356857,
          GNF: 10581.172706,
          GTQ: 8.744704,
          GYD: 236.675089,
          HKD: 8.825552,
          HNL: 27.466221,
          HRK: 7.524067,
          HTG: 114.034559,
          HUF: 365.800185,
          IDR: 16245.211595,
          ILS: 3.509996,
          IMP: 0.84359,
          INR: 85.772624,
          IQD: 1652.247226,
          IRR: 47841.611,
          ISK: 147.604961,
          JEP: 0.84359,
          JMD: 174.82988,
          JOD: 0.802403,
          JPY: 128.315149,
          KES: 127.82326,
          KGS: 95.947585,
          KHR: 4608.185811,
          KMF: 492.760146,
          KPW: 1018.50896,
          KRW: 1336.509967,
          KWD: 0.342808,
          KYD: 0.942704,
          KZT: 493.231803,
          LAK: 12476.730304,
          LBP: 1706.712921,
          LKR: 229.071989,
          LRD: 160.475954,
          LSL: 18.0733,
          LTL: 3.341546,
          LVL: 0.68454,
          LYD: 5.200096,
          MAD: 10.482155,
          MDL: 20.063022,
          MGA: 4498.413217,
          MKD: 61.859951,
          MMK: 2013.570711,
          MNT: 3234.577927,
          MOP: 9.088005,
          MRO: 404.008202,
          MUR: 49.387689,
          MVR: 17.484825,
          MWK: 927.97486,
          MXN: 23.635101,
          MYR: 4.76719,
          MZN: 72.235318,
          NAD: 18.073296,
          NGN: 463.953711,
          NIO: 39.863337,
          NOK: 10.160047,
          NPR: 137.160884,
          NZD: 1.664352,
          OMR: 0.435648,
          PAB: 1.131255,
          PEN: 4.592386,
          PGK: 4.000519,
          PHP: 56.969869,
          PKR: 201.608536,
          PLN: 4.618771,
          PYG: 7736.897082,
          QAR: 4.120476,
          RON: 4.950069,
          RSD: 117.566303,
          RUB: 83.127165,
          RWF: 1134.505373,
          SAR: 4.245279,
          SBD: 9.167119,
          SCR: 14.465252,
          SDG: 496.244168,
          SEK: 10.242546,
          SGD: 1.54527,
          SHP: 1.558775,
          SLL: 12710.987261,
          SOS: 663.162626,
          SRD: 24.396718,
          STD: 23423.412126,
          SVC: 9.899199,
          SYP: 1422.272019,
          SZL: 18.073287,
          THB: 38.036055,
          TJS: 12.771874,
          TMT: 3.972183,
          TND: 3.250217,
          TOP: 2.585319,
          TRY: 15.707783,
          TTD: 7.687973,
          TWD: 31.292021,
          TZS: 2606.250627,
          UAH: 30.54984,
          UGX: 4025.073951,
          USD: 1.131676,
          UYU: 49.988397,
          UZS: 12247.000022,
          VEF: 241986569649.65894,
          VND: 26062.502476,
          VUV: 125.97775,
          WST: 2.901211,
          XAF: 658.54432,
          XAG: 0.051036,
          XAU: 0.000635,
          XCD: 3.058412,
          XDR: 0.80928,
          XOF: 656.9421,
          XPF: 119.788336,
          YER: 283.202376,
          ZAR: 18.02733,
          ZMK: 10186.447717,
          ZMW: 18.185069,
          ZWL: 364.399269,
        },
      })
    )
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
  }),
]
