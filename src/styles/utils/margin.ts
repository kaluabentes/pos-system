import { css } from 'styled-components'

interface MarginProps {
  margin?: string
}

const margin = css<MarginProps>`
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
`

export default margin
