/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'

import theme from './styles/theme'

export type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
