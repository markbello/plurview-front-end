import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Card, Icon } from 'semantic-ui-react'
import ArtistDetails from './artistDetails'

class Artist extends React.Component {
  state = {
    loading: false,
    trapCount: '',
    dubstepCount: '',
    houseCount: '',
    bigRoomCount: '',
    bassMusicCount: '',
    tranceCount: '',
    hsl: '',
    active: false
  }

  componentDidMount = () => {
    this.setState({
      trapCount: this.props.artist.trap_music,
      dubstepCount: this.props.artist.dubstep,
      houseCount: this.props.artist.house,
      bigRoomCount: this.props.artist.big_room,
      bassMusicCount: this.props.artist.bass_music,
      tranceCount: this.props.artist.trance,
      hsl: this.props.artist.hsl
    })
  }

  toggleDetails = () => {
    this.setState({
      active: !this.state.active
    })
  }

  registerVibes = (vibe, artistId ) => {
    console.log(vibe, artistId)
    console.dir(this.props)
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${artistId}`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: "PATCH",
      mode: 'cors',
      body: JSON.stringify({
        vibe: vibe,
        artistId: artistId
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        trapCount: json.trap_music,
        dubstepCount: json.dubstep,
        houseCount: json.house,
        bigRoomCount: json.big_room,
        bassMusicCount: json.bass_music,
        tranceCount: json.trance,
        hsl: json.hsl
      })
    })
  }

  inferGradient = () => {
    console.log(this.props.artist.id)
    console.dir(this.props)
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${this.props.artist.id}/infer_gradient`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        loading: false,
        trapCount: json.trap_music,
        dubstepCount: json.dubstep,
        houseCount: json.house,
        bigRoomCount: json.big_room,
        bassMusicCount: json.bass_music,
        tranceCount: json.trance,
        hsl: json.hsl
      })
    })
  }

  // handleUpdateRelatedArtists = (artist) => {
  //   this.props.updateRelatedArtists(artist)
  //   .then(() => this.inferGradient())
  // }

  render() {

    return (

      <Card link onClick={() => this.toggleDetails()} as={'div'}>
        <Card.Content>
          <Card.Header as={'h3'}>{this.props.artist.name} <Icon name='chevron right' style={{float: 'right', transition: 'ease-in .1s'}} rotated={this.state.active ? 'clockwise' : null}/></Card.Header>
        </Card.Content>
        { this.props.artist.hsl ? <div  style={{height: '20px', width: '100%', background: `linear-gradient(to right, ${this.state.hsl}) `}}/> : null }
        { this.state.active ? <ArtistDetails artist={this.props.artist} /> : null}
      </Card>



    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeGenre: state.activeGenre
  }
}

export default connect(mapStateToProps, { updateRelatedArtists })(Artist)
