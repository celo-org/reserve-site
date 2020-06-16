/** @jsx jsx */

import * as React from 'react'
import { css, jsx } from '@emotion/core'


interface Props {
  children: React.ReactNode,
  ratio: number
}

export default class AspectRatio extends React.Component<Props> {
  render() {
    const { children, ratio  } = this.props
    const percentage = 100 / ratio

    return (
      <div css={css(ratioStyle, { paddingBottom: `${percentage}%` })}>
        <div css={contentStyle}>
          {children}
        </div>
      </div>
    )
  }
}


const ratioStyle = css({
  // height: 0,
  // overflow: "hidden",
  // position: "relative",
  width: '100%',
  background: "pink"
})

const contentStyle = css({
    bottom: 0,
    height: '100%',
    left: 0,
    // position: 'absolute',
    top: 0,
    width: '100%',
})
