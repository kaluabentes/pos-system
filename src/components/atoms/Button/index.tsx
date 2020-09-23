import React from 'react'

import { Container } from './styles'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

function Button({ children, onClick }: ButtonProps): JSX.Element {
  return <Container onClick={onClick}>{children}</Container>
}

export default Button
