import React from 'react'

import Paper from '../../atoms/Paper'
import { Container, Brand, Welcome } from './styles'

interface AuthProps {
  children: React.ReactNode
}

function Auth({ children }: AuthProps) {
  return (
    <Container>
      <Paper padding="40px">
        <Brand>POS Sys</Brand>
        <Welcome>Welcome to POS Sys</Welcome>
        {children}
      </Paper>
    </Container>
  )
}

export default Auth
