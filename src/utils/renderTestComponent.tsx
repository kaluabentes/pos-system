import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'

function renderTestComponent(component) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

export default renderTestComponent
