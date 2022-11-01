import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ContextProvider } from '@/src/context/state'


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
  )
}

export default MyApp
