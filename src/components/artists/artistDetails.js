import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Loader, Segment, List } from 'semantic-ui-react'

class ArtistDetails extends React.Component {

  state = {
    relatedArtists: [],
    subGenres: [],
    loading: true
  }

  componentDidMount(){
    this.fetchRelatedArtists()
    this.fetchSubGenres()
  }

  fetchRelatedArtists = () => {
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${this.props.artist.id}/show_related`)
    .then(res => res.json())
    .then(relatedArtists => this.setState({
      relatedArtists: relatedArtists,
      loading: false
    }))
  }

  fetchSubGenres = () => {
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${this.props.artist.id}/show_genres`)
    .then(res => res.json())
    .then(subGenres => this.setState({
      subGenres: subGenres,
      loading: false
    }))
  }

  handleUpdateRelatedArtists = (artist) => {
    this.props.updateRelatedArtists(artist)
    .then(() => this.inferGradient())
    .then(() => this.fetchRelatedArtists())
  }

  inferGradient = () => {
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/${this.props.artist.id}/infer_gradient`)
    .then(res => res.json())
    .then(json => {
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

  render() {
    return (
      <React.Fragment>
      {this.state.loading ? <Loader active inverted /> :

        <React.Fragment>
        <Segment basic >
          {this.state.relatedArtists.length > 0 ? <em>Related Artists:</em> : <div><em onClick={this.handleUpdateRelatedArtists(this.props.artist)}>Loading related artists...</em></div>}
          {this.state.loading ? <Loader active inverted /> :
            this.state.relatedArtists.sort((a,b) => a.followers > b.followers).slice(0,4).map((artist, idx) =>
              <Segment basic inverted key={`artist-details-name-${idx}`}>
                {artist.name}
                <div className={'secondary-gradient'} style={{background: `linear-gradient(to right, ${artist.hsl}) `}}/>
              </Segment>
            )}
          {this.state.subGenres.length > 0 ?

            <React.Fragment>
              <em>Subgenres:</em>
              <Segment basic inverted>
                <List>

                {this.state.subGenres.filter((subGenre) => subGenre.name !== "edm").slice(0,4).map((subGenre, idx) =>
                    <List.Item value={'-'} key={`artist-details-subgenre-${idx}`} >{subGenre.name}</List.Item>
                  )}
              </List>
            </Segment>
            </React.Fragment>
               : null}

        </Segment>
      </React.Fragment>
      }
    </React.Fragment>

    );
  }
}

export default connect(null, {updateRelatedArtists})(ArtistDetails)
