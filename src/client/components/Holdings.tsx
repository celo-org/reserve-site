/** @jsx jsx */
import * as React from 'react'
import { jsx, css, } from '@emotion/core'
import Button from './Button'

export default function  Holdings() {
  return <div css={rootStyle}>
    <Heading title="CELO Native Asset" gridArea="celo" iconSrc="/CELO.png" />
    <Amount label="Total" units={"120,000,00"} gridArea="total" />
    <Amount label="CELO on-chain" units={"40,000,00"} gridArea="onChain" />
    <Amount label="Celo in Custody" units={"80,000,00"} gridArea="custody" />
    <Heading title="Additional Crypto Assets" gridArea="crypto" />
    <Amount label="BTC" units={"100"} gridArea="btc" />
    <Amount label="ETH" units={"9,000"} gridArea="eth" />
    <Amount label="DAI" units={"5,000"} gridArea="dai" />
    <Heading title="cUSD Asset" gridArea="cUSD"  iconSrc="/CUSD.png" />
    <Amount label="cUSD outstanding" units={"5,000,000"} gridArea="outstanding" />
    <Amount label="Reserve Ratio*" units={"20"} gridArea="ratio" />
    <div css={infoStyle}>
      <div css={finePrintStyle}>
        <small >*ratio between the size of the reserve and the total value of all outstanding cUSD (and other future stabilized tokens supported by the reserve)</small>
      </div>
      <Button href="https://docs.celo.org/command-line-interface/reserve">Query Reserve Holdings</Button>
    </div>
  </div>
}

const BREAK_POINT = "@media (max-width: 777px)"

const amountStyle = css({
  [BREAK_POINT]: {
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'flex-end'
  }
})

function Amount({label, units, gridArea}) {
  return <div css={css(amountStyle,{gridArea})}>
  <p>{label}</p>
  <span css={numberStyle}>{units}</span>  
</div>
}

interface HeadingProps {
  title: string
  gridArea: string
  iconSrc?: string
}


function Heading({title, gridArea, iconSrc}: HeadingProps) {
 return <div css={css(headingStyle,{gridArea})}>
    <h4 css={headingTextStyle}>
    {iconSrc &&<img src={iconSrc} css={iconStyle} /> }
    {title}
    </h4>
  </div>
}

const iconStyle = css({height: 29, width: 29, marginRight: 8})


const rootStyle = css({
  transform: 'translateY(-60px)',
  display: 'grid',
  gridColumnGap: 20,
  gridTemplateAreas: `"celo celo celo"
                     "total onChain custody"
                     "crypto crypto crypto"
                     "btc eth dai"
                     "cUSD cUSD cUSD"
                     "outstanding ratio ."
                     "info info ."
                     `,
  [BREAK_POINT]: {
    gridTemplateAreas: `"celo"
                        "onChain" 
                        "custody"
                        "total"
                        "crypto"
                        "btc"
                        "eth" 
                        "dai"
                        "cUSD"
                        "outstanding" 
                        "ratio"
                        "info"`,
  }    
})

const headingStyle = css({
  marginTop: 60,
  marginBottom: 8,
  borderBottom: 1,
  borderBottomColor: 'rgba(46, 51, 56, 0.3)',
  borderBottomStyle: 'solid'
})

const headingTextStyle = css({
  display: "inline-flex",
  alignItems: "center"
})

const numberStyle = css({
  fontSize: 36,
  [BREAK_POINT]: {
    fontSize: 28,
    marginBottom: 8,
  }
})

const finePrintStyle = css({
  paddingBottom: 24
})

const infoStyle = css({
  gridArea: 'info',
  marginTop: 36
})