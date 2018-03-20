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
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/api/v1/vibes/artists/${this.props.artist.id}`)
    .then(res => res.json())
    .then(vibeCounts => {
      this.setState({
        trapCount: vibeCounts.trap,
        dubstepCount: vibeCounts.dubstep,
        houseCount: vibeCounts.house,
        bigRoomCount: vibeCounts.big_room,
        bassMusicCount: vibeCounts.bass_music,
        tranceCount: vibeCounts.trance,
      })
    })
  }

  registerVibes = (vibeId, artistId ) => {
    console.log(vibeId, artistId)
    console.dir(this.props)
    fetch(`http://localhost:3001/api/v1/vibes`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify({
        vibeId: vibeId,
        genreId: this.props.activeGenre,
        artistId: artistId
      })
    })
    .then(res => res.json())
    .then(vibe => {
      switch(vibe.vibe_id){
        case 1:
          this.setState({trapCount: vibe.vibe_count})
          return
        case 2:
          this.setState({dubstepCount: vibe.vibe_count})
          return
        case 3:
          this.setState({houseCount: vibe.vibe_count})
          return
        case 4:
          this.setState({bigRoomCount: vibe.vibe_count})
          return
        case 5:
          this.setState({bassMusicCount: vibe.vibe_count})
          return
        case 6:
          this.setState({tranceCount: vibe.vibe_count})
          return
        default:
          console.log("Poop")
          return
      }
    })
  }

  render() {
    // console.dir(this.props.artist)
    return (
      <Card id={`artist-${this.props.artist.id}`}>
        <Card.Content>
          <Card.Header>{this.props.artist.name}</Card.Header>
          <li>loudness: {this.props.artist.loudness}</li>
          <li>valence: {this.props.artist.valence}</li>
          <li>energy: {this.props.artist.energy}</li>
          <li>danceability: {this.props.artist.danceability}</li>
          <li>tempo: {this.props.artist.tempo}</li>
          <li>popularity: {this.props.artist.popularity}</li>
          <li>followers: {this.props.artist.followers}</li>
          <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, hsl(348, ${this.props.artist.major_saturation}%, 58%), hsl(348, ${this.props.artist.major_saturation}%, ${this.props.artist.major_brightness}%)) `}}/>
          { this.state.loading ? <Loader active /> : <Button onClick={() => this.setState({loading: true}, () => this.props.updateRelatedArtists(this.props.artist))}>Update Related Artists</Button>}
            <Menu basic borderless>
              <Menu.Item>
                <Button color='red' circular value='House' onClick={() => this.registerVibes(3, this.props.artist.id)}>{this.state.houseCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='pink' circular value='Big Room' onClick={() => this.registerVibes(4, this.props.artist.id)}>{this.state.bigRoomCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='blue' circular value='Trance' onClick={() => this.registerVibes(6, this.props.artist.id)}>{this.state.tranceCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='violet' circular value='Bass Music' onClick={() => this.registerVibes(5, this.props.artist.id)}>{this.state.bassMusicCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='green' circular value='Dubstep' onClick={() => this.registerVibes(2, this.props.artist.id)}>{this.state.dubstepCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='yellow' circular value='Trap' onClick={() => this.registerVibes(1, this.props.artist.id)}>{this.state.trapCount}</Button>
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
