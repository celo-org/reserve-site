/** @jsx jsx */

import * as React from 'react'
import NavBar from 'src/Navbar'
import Footer from 'src/Footer'
import { css , jsx} from '@emotion/core'
import { flexCol } from 'src/styles'
import Head from 'src/Head'
import intro from 'src/content/home/intro.md'
import about from 'src/content/home/about.md'
import initialTarget from 'src/content/home/initial-target.md'
import attestations from 'src/content/home/attestations.md'
import matter from 'front-matter'
import Section from 'src/Section'
import ReserveAddresses from 'src/ReserveAddresses'
import Holdings from 'src/Holdings'
import TargetGraph from 'src/TargetGraph'

const INTRO = matter<{title: string}>(intro)
const INITIAL_TARGET = matter<{title: string}>(initialTarget)
const ABOUT = matter<{title: string}>(about)
const ATTESTATIONS = matter<{title: string}>(attestations)

export default function Home() {
  return (
    <>
    <Head />
    <div css={rootStyle}>
      <div css={containerStyle}> 
        <NavBar/>
        <main css={mainStyle}>
          <Section title={INTRO.attributes.title} content={INTRO.body}   />
          <Section title={"Current Reserve Holdings"}> 
            <Holdings />
          </Section>
          <Section title={"Reserve Addresses"}> 
            <ReserveAddresses />
          </Section>
          <Section title={INITIAL_TARGET.attributes.title} content={INITIAL_TARGET.body}>
            <TargetGraph />
          </Section>
          
          <Section title={ABOUT.attributes.title} content={ABOUT.body}   />
          <Section title={ATTESTATIONS.attributes.title} content={ATTESTATIONS.body}   />
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
  flex: 1,
  alignItems: 'center',
  justifyContent:" space-between"
})

const mainStyle = css({
  width: '100%',
  maxWidth: 960
})

const containerStyle = css(flexCol, {flex: 1, width: '100%', alignItems: 'center'})

