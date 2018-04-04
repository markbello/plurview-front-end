import logoImage from '../../assets/ticket-logo.svg'
import {Image, Segment} from 'semantic-ui-react'
import React from 'react'

const Logo = (props) => {
  return (<Segment basic padded><Image src={logoImage} size='large' centered verticalAlign='middle' centered /></Segment>)
}

export default Logo
