import { FC, useEffect, useState, useMemo } from 'react'
import ReactGA from 'react-ga'
import { IRoad, IRoadStatus, ISource } from '../types'
import { Card, Feed, Popup, Item, Button, Placeholder } from 'semantic-ui-react'

interface Props {
  road: IRoad
}

const Road: FC<Props> = (props) => {
  const [road, setRoad] = useState<IRoadStatus>()
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [loading, setLoading] = useState(true)
  const { roadName } = props.road

  useMemo(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        setShouldUpdate(true)
      } else {
        setShouldUpdate(false)
      }
    })
  }, [])

  useEffect(() => {
    ReactGA.pageview('/' + props.road.urlFriendly)

    setLoading(true)
    fetch(props.road.url)
      .then((r) => r.json())
      .then((r) => {
        return {
          ...r,
          ...props.road,
        }
      })
      .then(setRoad)
      .then(() => setLoading(false))
  }, [props.road, shouldUpdate])

  if (loading) {
    return (
      <Card fluid>
        <Card.Content>
          <Item.Header as="h2">{roadName}</Item.Header>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
    )
  }
  const { status, messages, statusMessage } = road!

  const image = `/status/${status}.png`
  const messageFeed = messages.map((message, index) => {
    const df = new Intl.DateTimeFormat(
      ['nb-no', 'da', 'sv', 'en-us', 'en-gb'],
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    )

    const times = `${df.format(new Date(message.validFrom))} - ${df.format(
      new Date(message.validTo)
    )}`
    return (
      <Feed.Event key={'message-' + index}>
        <Popup
          trigger={
            message.source === ISource.StatensVegvesen ? (
              <Feed.Label image="/vv_logo.png" />
            ) : (
              <Feed.Label icon="user outline" />
            )
          }
          content={message.source}
          inverted
        />
        <Feed.Content>
          <Feed.Date content={times} />
          <Feed.Summary>{message.message}</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    )
  })

  const share = async () => {
    const shareNavigator = window.navigator
    const host = new URL(window.location.href)
    const url = `${host.protocol}//${host.host}/${props.road.urlFriendly}`

    if (shareNavigator.clipboard) {
      await window.navigator.clipboard.writeText(url)
    }
    // TS type has this as a required field, but could be
    // undefined on older browsers. Disabling linter
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!shareNavigator.share) {
      await window.navigator.share({
        title: 'Stengt tunnel',
        text: statusMessage + '\nSe mer på ',
        url,
      })
    }
  }

  return (
    <Card fluid role="road">
      <Card.Content>
        <Item.Group>
          <Popup
            on={['click']}
            trigger={
              <Button
                onClick={share}
                style={{ position: 'absolute', right: '10px' }}
                icon="external share"
                circular
                basic
              ></Button>
            }
            content="Kopiert linken"
            inverted
          />
          <Item floated="left" style={{ margin: 0 }}>
            <Item.Image style={{ width: 'auto' }} size="tiny" src={image} />
            <Item.Content verticalAlign="middle">
              <Item.Header role="status" as="h2">
                {statusMessage}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Card.Content>
      <Card.Content extra>
        <Feed>{messageFeed}</Feed>
      </Card.Content>
    </Card>
  )
}

export default Road
