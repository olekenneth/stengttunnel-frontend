import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import ReactGA from 'react-ga'
import Header from '../components/Header'
import { IRoad, IFavorite } from '../types'
import Roads from '../components/Roads'

const Home: NextPage = () => {
  const [roads, setRoads] = useState<IRoad[]>([])
  const [favorites, setFavorites] = useState<IFavorite[]>([])

  useEffect(() => {
    let isMounted = true

    ReactGA.initialize('UA-8420880-19', {
      testMode: process.env.NODE_ENV === 'test',
      debug: process.env.NODE_ENV === 'development',
    })
    ReactGA.pageview('/')

    fetch('https://api.stengttunnel.no/roads.json')
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) {
          setRoads(data)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    Promise.resolve(localStorage.getItem('favorites') || '[]')
      .then((r) => JSON.parse(r))
      .then(setFavorites)
      .catch(() => setFavorites([]))
  }, [roads])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  return (
    <>
      <Head>
        <title>Stengt tunnel</title>
      </Head>
      <Segment inverted>
        <Menu
          inverted
          secondary
          style={{ margin: '0 auto', maxWidth: '640px' }}
        >
          <Menu.Item>
            <img alt="Stengt tunnel logo" src="/images/stengttunnel-logo.png" />
          </Menu.Item>
          <Menu.Item header>Stengt tunnel</Menu.Item>
        </Menu>
      </Segment>
      <div style={{ margin: '15px auto', maxWidth: '640px' }}>
        <Header
          roads={roads}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <Roads favorites={favorites} roads={roads} />
      </div>
    </>
  )
}
export default Home
