import React from 'react'

import { Container } from './styles'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
  block?: boolean
}

function Button({
  children,
  onClick,
  primary,
  block
}: ButtonProps): JSX.Element {
  return (
    <Container primary={primary} block={block} onClick={onClick}>
      {children}
    </Container>
  )
}

export default Button
