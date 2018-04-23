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
          <Segment basic inverted onClick={() => this.toggleDetails()} as={'div'} className={'about-component rave-component'} >
            <Header as={'h3'} style={{fontFamily: "'Inconsolata', monospace"}}>Color Guide <Icon name='chevron right' style={{float: 'right', transition: 'ease-in .1s', color: 'white'}} rotated={this.state.active ? 'clockwise' : null}/></Header>
            <div style={{height: '4px', width: '100%', background: `linear-gradient(to right, rgb(227, 69, 79) 0%, rgb(235, 122, 186) 22.8738%, rgb(235, 235, 122) 42.2159%, rgb(122, 235, 130) 100%) `}}/>
          </Segment>
          {this.state.active ? <Segment basic inverted dangerouslySetInnerHTML={content} style={{marginLeft: '5%', marginRight: '5%'}}></Segment> : null }

      </React.Fragment>
      )
  }
}

export default About

// <Icon name='chevron right' style={{float: 'right', transition: 'ease-in .1s', color: 'white'}}
//   rotated={this.state.active ? 'clockwise' : null}/>
