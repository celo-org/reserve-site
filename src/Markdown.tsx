import MarkdownJSX from 'markdown-to-jsx'
import * as React from 'react'
import Button from './Button'

export interface Attributes {
  title: string
  description?: string
}


const OPTIONS = {
  overrides: {
    a: Button 
  }
}

export default function Markdown({ source }) {
  return <MarkdownJSX children={source} options={OPTIONS} />
}
