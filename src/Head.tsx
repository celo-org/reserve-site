
import { css, Global } from '@emotion/core'
import NextHead from 'next/head'
import colors from 'src/colors'

const garamond = 'EB Garamond, eb-garamond, Garamond, serif';

const globalStyles = css`
  * {
    box-sizing: border-box; 
    font-family: '${garamond}';
  }
  
  h1, h2, h3, h4, p, a {
    color: ${colors.dark}
    font-family: '${garamond}';
    font-display: 'swap';
  }

  h1 {
    line-height: 36px;
    font-size: 28px;
  }

  h2 {
    font-weight: normal;
    font-size: 28px;
    line-height: 24px;
  }

  h3 {
    font-weight: normal;
    font-size: 24px;
    line-height: 30px;
  }

  h4 {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
  }

  p {
    font-family: '${garamond}';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: '${garamond}';
    font-display: 'swap';
    display: flex;
    width: 100vw;
  }
`

export default function Head() {
  return <>
    <Global styles={globalStyles}/>
    <NextHead>
        <title>CeloReserve.org</title>
        <link rel="icon" href="/favicon.ico" />
        <link
            href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500,500i,700&display=swap"
            rel="stylesheet"
          />
    </NextHead>    
  </>
}