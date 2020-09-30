import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const Brand = styled.h1`
  margin: 0 0 40px 0;
`

export const Welcome = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 40px 0;
`
