import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IRoad } from 'types'
import { GetStaticPropsContext } from 'next'

interface Props {
  slug: string
}

const Slug: FC<Props> = ({ slug }) => {
  const router = useRouter()

  useEffect(() => {
    Promise.resolve(localStorage.getItem('favorites') || '[]')
      .then((r) => JSON.parse(r))
      .then((storedFavorites) => {
        if (storedFavorites.indexOf(slug) <= -1) {
          storedFavorites.push(slug)
          localStorage.setItem('favorites', JSON.stringify(storedFavorites))
        }

        router.push('/')
      })
  }, [router, slug])

  {
    /* Add a loading indicator / spinner? */
  }
  return <></>
}

export default Slug

export async function getStaticPaths() {
  const apiData = await fetch('https://api.stengttunnel.no/roads.json')
  const roadsJSON: IRoad[] = await apiData.json()
  const paths = roadsJSON.map((road) => ({
    params: { slug: road.urlFriendly },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context
  return {
    props: { slug: params!.slug },
  }
}
