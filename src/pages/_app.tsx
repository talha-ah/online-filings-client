import React from "react"
import Head from "next/head"
import { AppProps } from "next/app"

import { SnackbarProvider } from "notistack"
import { CacheProvider, EmotionCache } from "@emotion/react"

import { AppProvider } from "@contexts/index"
import { AuthWrapper } from "@hooks/auth"

import emotionCache from "@utils/emotionCache"
import ThemeCustomization from "@styles/themes/index"

const createEmotionCache = emotionCache()

interface LocalAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function App(props: LocalAppProps) {
  const { Component, emotionCache = createEmotionCache, pageProps } = props

  return (
    <>
      <Head>
        <title>Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AppProvider>
        <CacheProvider value={emotionCache}>
          <ThemeCustomization>
            <SnackbarProvider maxSnack={3}>
              <AuthWrapper>
                <Component {...pageProps} />
              </AuthWrapper>
            </SnackbarProvider>
          </ThemeCustomization>
        </CacheProvider>
      </AppProvider>
    </>
  )
}
