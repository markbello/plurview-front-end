import logoImage from '../../assets/ticket-logo.svg'
import {Image, Segment, Grid} from 'semantic-ui-react'
import React from 'react'

const Logo = (props) => {
  return (
    <Grid.Row centered>
      <Segment basic padded>
        <Image src={logoImage} size='medium' centered verticalAlign='middle' centered />
      </Segment>
    </Grid.Row>
    )
}

export default Logo
