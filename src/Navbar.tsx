/** @jsx jsx */
import { jsx, css, } from '@emotion/core'

import colors from 'src/colors'


export default function NavBar() {
  return <nav css={navStyle}>
      <a css={linkStyle} href="/">Celo Reserve <span/></a>
      <div css={navLinksStyle}>
       
      </div>
  </nav>
}

const navLinksStyle=  css({
  alignItems: 'center',
  alignContent: 'center',
  display: 'flex',
  label: 'links',
})

const navStyle = css({
  maxWidth: 1280,
  width: '100vw',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'cemter',
  alignSelf: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 10,
  paddingBottom: 10
})

const linkStyle = {
  marginLeft: 10,
  marginRight: 10,
  padding: 10,
  fontSize: 24,
  fontWeight: 500,
  color: colors.dark,
  cursor: 'pointer',
  textDecoration: 'none',
  span: {
    transitionProperty: 'transform',
    transitionDuration: "300ms",
    display: 'inline-block',
    width: '100%',
    height: 1,
    backgroundColor: colors.dark,
    transform: 'scale(0)'
  },
  '&:hover': {
    span: {
      transform: 'scale(1)'
    }
  }
}