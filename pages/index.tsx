/** @jsx jsx */

import * as React from 'react'
import NavBar from 'src/Navbar'
import Footer from 'src/Footer'
import { css , jsx} from '@emotion/core'
import { flexCol } from 'src/styles'
import Head from 'src/Head'
import Button from 'src/Button'
import text from 'content/home/intro.md'
import matter from 'front-matter'
import Markdown from 'src/Markdown'


export default function Home() {
  return (
    <>
    <Head />
    <div css={rootStyle}>
      <div css={flexCol}> 
      <NavBar/>
      <main css={mainStyle}>
        <Button href="/">Test</Button>
        <h1>one</h1>
        {/* <h2>second</h2>
        <h3>three</h3>
        <h4>head 4</h4>
        <p>Paragraphs of content</p> */}
        <Markdown source={matter(text).body} />
      </main>
      </div>
     <Footer/>
    </div>
    </>
  )
}

const rootStyle = css({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent:" space-between"
})

const mainStyle = css({
  paddingLeft: 16,
  paddingRight: 16
})