import logoImage from '../../assets/ticket-logo.svg'
import {Image, Segment, Grid} from 'semantic-ui-react'
import React from 'react'

const Logo = () => {
  return (
    <Grid.Row centered style={{marginTop: '25px'}}>
      <Segment basic padded>
        <Image src={logoImage} size='medium' centered verticalAlign='middle' />
      </Segment>
    </Grid.Row>
    )
}

export default Logo
