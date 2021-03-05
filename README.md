
# Celo Reserve Website

Code for [celoreserve.org](https://celoreserve.org)

*For more information about the Reserve it self please refer to:*

* [celoreserve.org](https://celoreserve.org)
* [Celo Docs](https://docs.celo.org/developer-guide/sdk-code-reference/summary-2/classes/_wrappers_reserve_.reservewrapper)
* [Stability WhitePaper](https://celo.org/papers/stability)

## Data Integrity
The following is where the numbers displayed on celoreserve.org comes from. These are not used by the reserve itself.

### Update Frequency

  | Type | Frequency | notes |
  | --- | --- | --- |
  | On Chain Assets | 20 Seconds |  |
  | --- | --- | --- |
  | BTC, ETH, DAI | Hourly | Pratically only change daily |
  | --- | --- | --- |
  | euro conversion rate | Hourly | source rates updated once a day |
  | --- | --- | --- |
  | token prices | ? | |

### Reserve Holdings

For Celo on chain balances, an instance of `@celo/contractKit` is connected to a node at `forno.celo.org`. See [src/providers/Celo.ts](src/providers/Celo.ts) for how this works.

For ETH and BTC balances we use 2 data providers each: blockchain.com and [blockstreams's esplora](https://github.com/Blockstream/esplora/blob/master/API.md) for BTC and ethscan and Infura for Ethereum.

*Holdings change rarely and as such these are only updated every few hours*

#### For Asset Prices

For CELO the on change exchange price (which itself is an aggregation of the price on several exchanges) is used again via `@celo/contractKit`

For other crypto assets two data providers are used. These are simply averaged if both return correctly. If one provider fails to respond then the other is used and if both fail a cache of the last successful fetch is used until new data is fetched.
For BTC thse are [blockchain.com's getAccountByTypeAndCurrency](https://api.blockchain.com/v3/#/payments/getAccountByTypeAndCurrency) and [Coinbase's Data Api spot price](https://developers.coinbase.com/api/v2#exchange-rates).
For ETH these are [Etherscan.io ETHER Last Price](https://etherscan.io/apis#stats) and [Coinbase's Data Api spot price](https://developers.coinbase.com/api/v2#exchange-rates).


*Prices are updated for every X*

### Stable Assets Outstanding

All stable token amounts are the total amount in circulation. This can be verified with

```typescript
import { newKit } from '@celo/contractkit'
const kit = newKit('forno.celo.org')
const stableToken = await kit.contracts.getStableToken()

stableToken.totalSupply()

#### Currency Conversions
For stable coins other than cUSD exchangeratesapi.io is used to convert value to USD to compare and sum values
```


### Historic Rebalancings
Reserve rebalancings figures are updated manually at the moment. However they can be verified by using a block explorer to check the historic balances of the reserve addresses.

### Updating Content
To update Content edit the Markdown files in [src/content](src/content)
Changes to these require a redeployment and to wait for the page cache to expire (5min)

## Development

next.js with [emotion](http://emotion.sh/) for styles.

`yarn dev`

## Deployment

see [release.md](release.md)