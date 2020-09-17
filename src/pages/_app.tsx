import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'

import GlobalStyle from 'styles/global'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{process.env.APP_NAME}</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
