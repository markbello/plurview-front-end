import logoImage from '../../assets/logo-6.svg'
import {Image, Segment} from 'semantic-ui-react'
import React from 'react'

const Logo = (props) => {
  return (<Segment basic padded><Image src={logoImage} size='medium' centered verticalAlign='middle' centered /></Segment>)
}

export default Logo
