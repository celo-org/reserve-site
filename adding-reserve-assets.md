# How to add or modify reserve owned crypto assets

_Step 0_ Once Governance Proposal has passed

src/services/holdings.ts is responsible for gathering up token units and token price data

assets are categorized as either Celo or Other Assets

```
const otherAssets: TokenModel[] = [
    toToken("BTC", btcHeld, rates.btc),
    toToken("ETH", ethHeld, rates.eth),
    toToken("DAI", daiHeld),
    toToken("cMCO2", cmco2Held, rates.cmco2),
  ]
```

You will need to add the crypto to this `otherAssets` Array in the `getHoldingsOther` function. which means you will need

1. symbol
2. amount held
3. rate in USD (unless like DAI it is pegged to USD)

To get amount held follow example of ETH or BTC. Depending on the asset reusing existing sources for fetching from etherscan etc might be possible. For tokens on Celo follow the work done for getting cMCO2 balance and price.

Then place the tokens icon in `/public/assets/tokens/{TOKEN}.svg`
