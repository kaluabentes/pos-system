import styled, { css } from 'styled-components'

import margin from 'styles/utils/margin'

export const Container = styled.button<{ primary?: boolean; block?: boolean }>`
  ${margin}
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: 500;
  font-size: 0.875rem;
  padding: 10px 20px;
  color: black;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;

  ${props =>
    props.primary &&
    css`
      background: ${props => props.theme.colors.primary};
      color: white;
      border: none;
    `}

  ${props =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
`
