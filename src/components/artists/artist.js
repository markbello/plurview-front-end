import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Card, Button, Loader, Menu } from 'semantic-ui-react'

class Artist extends React.Component {
  state = {
    loading: false,
    trapCount: '',
    dubstepCount: '',
    houseCount: '',
    bigRoomCount: '',
    bassMusicCount: '',
    tranceCount: '',
    hsl: ''
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

  registerVibes = (vibe, artistId ) => {
    console.log(vibe, artistId)
    console.dir(this.props)
    fetch(`http://localhost:3001/api/v1/artists/${artistId}`, {
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
    fetch(`http://localhost:3001/api/v1/artists/${this.props.artist.id}/infer_gradient`)
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

  handleUpdateRelatedArtists = (artist) => {
    this.props.updateRelatedArtists(artist)
    .then(() => this.inferGradient())
  }

  render() {

    return (
      <Card id={`artist-${this.props.artist.id}`}>
        <Card.Content>
          <Card.Header>{this.props.artist.name} ({this.props.artist.id})</Card.Header>
          
          { this.state.loading ? <Loader active /> : <Button onClick={() => this.setState({loading: true}, () => this.handleUpdateRelatedArtists(this.props.artist))}>Update Related Artists</Button>}
          { this.state.loading ? <Loader active /> : <Button onClick={() => this.setState({loading: true}, () => this.inferGradient())}>Infer Gradient</Button>}
          { this.state.hsl ? <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, ${this.state.hsl}) `}}/> : null }
            <Menu basic borderless>
              <Menu.Item>
                <Button color='red' circular value='House' onClick={() => this.registerVibes("house", this.props.artist.id)}>{this.state.houseCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='pink' circular value='Big Room' onClick={() => this.registerVibes("big_room", this.props.artist.id)}>{this.state.bigRoomCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='yellow' circular value='Trap' onClick={() => this.registerVibes("trap_music", this.props.artist.id)}>{this.state.trapCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='green' circular value='Dubstep' onClick={() => this.registerVibes("dubstep", this.props.artist.id)}>{this.state.dubstepCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='blue' circular value='Trance' onClick={() => this.registerVibes("trance", this.props.artist.id)}>{this.state.tranceCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='violet' circular value='Bass Music' onClick={() => this.registerVibes("bass_music", this.props.artist.id)}>{this.state.bassMusicCount}</Button>
              </Menu.Item>
          </Menu>

        </Card.Content>

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

// <li>{this.props.artist.related_artists.map((artist) => <a key={`${artist}`} href={`#artist-${artist.id}`}>{artist.name}, </a>)}</li>
// <li>{this.props.artist.genres.map((genre) => genre.name)}</li>

// <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, hsl(348, ${this.props.artist.major_saturation}%, 58%), hsl(348, ${this.props.artist.major_saturation}%, ${this.props.artist.major_brightness}%))`}}/>
