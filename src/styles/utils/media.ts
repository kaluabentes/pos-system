import { css, CSSObject, FlattenSimpleInterpolation } from 'styled-components'

const SMALL = 767
const MEDIUM = 768
const LARGE = 1024

const media = {
  sm: (styles: CSSObject): FlattenSimpleInterpolation => css`
    @media screen and (max-width: ${SMALL}px) {
      ${css(styles)}
    }
  `,
  md: (styles: CSSObject): FlattenSimpleInterpolation => css`
    @media screen and (max-width: ${MEDIUM}px) {
      ${css(styles)}
    }
  `,
  lg: (styles: CSSObject): FlattenSimpleInterpolation => css`
    @media screen and (min-width: ${LARGE}px) {
      ${css(styles)}
    }
  `
}

export default media
