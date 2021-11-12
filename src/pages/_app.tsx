import type { AppProps } from 'next/app'
import Script from 'next/script'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8133897183984535"
      strategy="afterInteractive"
    />
  </>
)

export default App
