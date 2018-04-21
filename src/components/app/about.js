import {Image, Segment, Grid, Card, Header, Icon, Menu} from 'semantic-ui-react'
import React from 'react'

class About extends React.Component {

  state = {
    active: false,
    content: ''
  }

  toggleDetails = () => {
    fetch('https://nephewapps.com/wp-json/wp/v2/posts/264')
    .then(res => res.json())
    .then(post => this.setState({
      active: !this.state.active,
      content: post.content.rendered
    }))

  }

  render() {
    const content = {
      __html: this.state.content
    }
    return (
      <React.Fragment>
          <Segment basic inverted onClick={() => this.toggleDetails()} as={'div'} className={'about-component'} >
            <Header as={'p'} style={{fontFamily: "'Inconsolata', monospace"}}><em>Color Key</em></Header>
            {this.state.active ? <Segment basic inverted dangerouslySetInnerHTML={content}></Segment> : null }
          </Segment>

      </React.Fragment>
      )
  }
}

export default About

// <Icon name='chevron right' style={{float: 'right', transition: 'ease-in .1s', color: 'white'}}
//   rotated={this.state.active ? 'clockwise' : null}/>
