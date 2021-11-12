import { FC, useState } from 'react'
import { IRoad } from '../types'
import { Modal, Button } from 'semantic-ui-react'

interface Props {
  road: IRoad
}

const Status: FC<Props> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const { roadName } = props.road

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Er status feil?</Button>}
    >
      <Modal.Header>Er {roadName} åpen eller stengt?</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Basert på din lokasjon ser vi at du er nærmere enn 20km fra
            tunnelen. Så du vet kanskje hva som er riktig?
          </p>
          <p>Er {roadName} egentlig åpen?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Stengt
        </Button>
        <Button positive onClick={() => setOpen(false)}>
          Åpen
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Status
