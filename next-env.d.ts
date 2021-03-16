/// <reference types="next" />
/// <reference types="next/types/global" />

import { CSSProp } from '@emotion/react'

declare module 'react' {
  interface Attributes {
    css?: CSSProp
  }
}
