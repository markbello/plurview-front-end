import logoImage from '../../assets/ticket-logo.svg'
import {Image, Segment, Grid} from 'semantic-ui-react'
import React from 'react'

const Logo = () => {
  return (
    <Grid.Row centered style={{width: '100vw'}} colums={1}>
      <Grid.Column>
        <Segment basic padded>
          <Image className={'logo-image'} src={logoImage} size='medium' centered verticalAlign='middle' style={{display: 'flex'}}/>
        </Segment>
      </Grid.Column>
    </Grid.Row>
    )
}

export default Logo
