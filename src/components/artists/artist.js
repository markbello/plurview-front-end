import React from 'react'
import { Segment, Icon, Header } from 'semantic-ui-react'
import ArtistDetails from './artistDetails'

class Artist extends React.Component {
  state = {
    loading: false,
    hsl: '',
    active: false
  }

  componentDidMount = () => {
    this.setState({
      hsl: this.props.artist.hsl
    })
  }

  toggleDetails = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const {active, hsl} = this.state
    const {artist} = this.props

    return (
      <Segment basic inverted onClick={() => this.toggleDetails()} as={'div'} className={'show-component'}>
        <Header as={'p'}>{artist.name} <Icon name='chevron right' rotated={active ? 'clockwise' : null}/></Header>
        { active ? <ArtistDetails artist={artist} /> : null}
        { hsl ? <div className={'primary-gradient'} style={{background: `linear-gradient(to right, ${hsl}) `}}/> : null }
      </Segment>
    );
  }
}

export default Artist
