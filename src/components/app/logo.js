import logoImage from '../../assets/ticket-logo.svg'
import {Image, Segment, Grid} from 'semantic-ui-react'
import React from 'react'

const Logo = () => {
  return (
    <Grid.Row centered >
      <Segment basic padded>
        <Image className={'logo-image'} src={logoImage} size='medium' centered verticalAlign='middle' />
      </Segment>
    </Grid.Row>
    )
}

export default Logo
