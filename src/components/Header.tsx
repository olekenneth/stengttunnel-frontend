import { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'
import { Card, Dropdown, DropdownProps } from 'semantic-ui-react'
import { IFavorite, IRoad } from '../types'

interface IDropdownOption {
  key: string
  value: string
  text: string
}

type HeaderProps = {
  roads: IRoad[]
  favorites: IFavorite[]
  setFavorites: (f: IFavorite[]) => void
}

const Header = (props: HeaderProps) => {
  const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([])

  useEffect(() => {
    setDropdownOptions(
      props.roads.map((r: IRoad) => ({
        key: r.urlFriendly,
        value: r.urlFriendly,
        text: r.roadName,
        content: <>{r.roadName}</>,
      }))
    )
  }, [props.roads])

  const addFavorite = (
    _event: SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ) => {
    props.setFavorites(data.value as IFavorite[])

    setTimeout(() => {
      if ('activeElement' in document) {
        ;(document.activeElement as HTMLElement).blur()
      }
    }, 100)
  }

  return (
    <>
      <Card fluid>
        <Dropdown
          placeholder="Velg tunnel(er)"
          onChange={addFavorite}
          fluid
          search
          selection
          multiple
          closeOnChange
          value={props.favorites}
          disabled={!dropdownOptions.length}
          loading={!dropdownOptions.length}
          options={dropdownOptions}
        />
      </Card>
    </>
  )
}

export default Header
