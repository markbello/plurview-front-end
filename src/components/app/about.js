import {Segment, Header, Icon} from 'semantic-ui-react'
import React from 'react'
import {fetchColorGuide} from '../../apiAdapter'

class About extends React.Component {

  state = {
    active: false,
    content: ''
  }

  componentDidMount = () => {
    fetchColorGuide()
    .then(res => res.json())
    .then(post => this.setState({
      content: post.content.rendered
    }))
  }

  toggleDetails = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const content = { __html: this.state.content }
    const {active} = this.state
    const aboutGradient = {background: `linear-gradient(
                                        to right,
                                        rgb(227, 69, 79) 0%,
                                        rgb(235, 122, 186) 22.8738%,
                                        rgb(235, 235, 122) 42.2159%,
                                        rgb(122, 235, 130) 100%) `}

    return (
      <React.Fragment>
          <Segment basic inverted onClick={() => this.toggleDetails()} as={'div'} className={'about-component rave-component'} >
            <Header as={'h3'}>Color Guide <Icon name='chevron right' rotated={active ? 'clockwise' : null}/></Header>
            <div className={'primary-gradient'} style={aboutGradient}/>
          </Segment>
          {active ? <Segment basic inverted dangerouslySetInnerHTML={content} id={'about-segment'} ></Segment> : null }

      </React.Fragment>
      )
  }
}

export default About
