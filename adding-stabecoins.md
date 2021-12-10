# How to add a stablecoin to the website

## Front end work

1. get its green exchange svg icon from https://celo.org/experience/brand/exchange-icons#overview
2. place SVG in /public/assets/tokens folder named like SYMBOL.svg

## Backend Work

@celo/contract kit needs to support the new stable asset

1. install latest contract kit

2. add the tokens on chain symbol and the ISO symbol for the currency it tracks to src/stables.config.ts

Once token is live on mainnet it should show up, until then it should be hidden.
