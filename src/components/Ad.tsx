import { useEffect } from 'react'

const Ad = () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: 'ca-pub-8133897183984535',
      // enable_page_level_ads: true
    })
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-8133897183984535"
      data-ad-slot="5404963764"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest={process.env.NODE_ENV === 'development' ? 'on' : 'off'}
    />
  )
}

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

export default Ad
