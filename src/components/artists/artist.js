import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
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
      <Segment basic inverted onClick={() => this.toggleDetails()} as={'div'} className={'rave-component'}>
        <Header as={'p'}>{artist.name} <Icon name='chevron right' rotated={active ? 'clockwise' : null}/></Header>
        { active ? <ArtistDetails artist={artist} /> : null}
        { hsl ? <div className={'primary-gradient'} style={{background: `linear-gradient(to right, ${hsl}) `}}/> : null }
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeGenre: state.activeGenre
  }
}

export default connect(mapStateToProps, { updateRelatedArtists })(Artist)

// registerVibes = (vibe, artistId ) => {
//   console.log(vibe, artistId)
//   console.dir(this.props)
//   fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${artistId}`, {
//     headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     },
//     method: "PATCH",
//     mode: 'cors',
//     body: JSON.stringify({
//       vibe: vibe,
//       artistId: artistId
//     })
//   })
//   .then(res => res.json())
//   .then(json => {
//     console.log(json)
//     this.setState({
//       trapCount: json.trap_music,
//       dubstepCount: json.dubstep,
//       houseCount: json.house,
//       bigRoomCount: json.big_room,
//       bassMusicCount: json.bass_music,
//       tranceCount: json.trance,
//       hsl: json.hsl
//     })
//   })
// }

// inferGradient = () => {
//   console.log(this.props.artist.id)
//   console.dir(this.props)
//   fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${this.props.artist.id}/infer_gradient`)
//   .then(res => res.json())
//   .then(json => {
//     this.setState({
//       loading: false,
//       hsl: json.hsl
//     })
//   })
// }

// handleUpdateRelatedArtists = (artist) => {
//   this.props.updateRelatedArtists(artist)
//   .then(() => this.inferGradient())
// }
