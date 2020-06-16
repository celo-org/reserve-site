
import { css, Global } from '@emotion/core'
import NextHead from 'next/head'
import colors from 'src/colors'

const garamond = 'EB Garamond, eb-garamond, Garamond, serif';

const globalStyles = css`x
  * {
    box-sizing: border-box; 
    font-family: '${garamond}';
  }
  
  h1, h2, h3, h4, p, a {
    margin-top: 0;
    color: ${colors.dark}
    font-family: '${garamond}';
    font-display: 'swap';
  }

  h1 {
    line-height: 36px;
    font-size: 32px;
  }

  h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
  }

  h3 {
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
  }

  h4 {
    font-weight: normal;
    font-size: 28px;
    line-height: 36px;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
  }

  small {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
  }

  #__next {
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: '${garamond}';
    font-display: 'swap';
    display: flex;
    justify-content: 'center';
  }

  img {
    object-fit: contain;
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