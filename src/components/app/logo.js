import logoImage from '../../assets/ticket-logo.svg'
import {Image} from 'semantic-ui-react'
import React from 'react'

const Logo = (props) => {
  return (<Image src={logoImage} size='medium' centered verticalAlign='middle' />)
}

export default Logo
