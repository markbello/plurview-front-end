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
    fetch(`http://localhost:3001/api/v1/artists/${this.props.artist.id}/show_related`)
    .then(res => res.json())
    .then(relatedArtists => {
      const filteredRelatedArtists = relatedArtists.sort((a,b) => a.followers > b.followers).slice(0,4)
      this.setState({
        relatedArtists: filteredRelatedArtists,
        loading: false
      })
    })
  }

  fetchSubGenres = () => {
    fetch(`http://localhost:3001/api/v1/artists/${this.props.artist.id}/show_genres`)
    .then(res => res.json())
    .then(subGenres => {
      const filteredSubGenres = subGenres.filter((subGenre) => subGenre.name !== "edm").slice(0,4)
      this.setState({
        subGenres: filteredSubGenres,
        loading: false
      })
    })
  }

  handleUpdateRelatedArtists = (artist) => {
    this.props.updateRelatedArtists(artist)
    .then(() => this.inferGradient())
    .then(() => this.fetchRelatedArtists())
  }

  inferGradient = () => {
    fetch(`http://localhost:3001/api/v1/artists/${this.props.artist.id}/infer_gradient`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        loading: false,
        hsl: json.hsl
      })
    })
  }

  render() {
    const {loading, relatedArtists, subGenres} = this.state
    const {artist} = this.props
    
    return (
      <React.Fragment>
      {loading
        ? <Loader active inverted />
        : <React.Fragment>
          <Segment basic >
            {relatedArtists.length > 0
              ? <em>Related Artists:</em>
              : <div>
                  <em onClick={this.handleUpdateRelatedArtists(artist)}>Loading related artists...</em>
                </div>
            }
            {loading
              ? <Loader active inverted />
              : relatedArtists.map((artist, idx) =>
                  <Segment basic inverted key={`related-artist-${idx}`}>
                    {artist.name}
                    <div className={'secondary-gradient'} style={{background: `linear-gradient(to right, ${artist.hsl}) `}}/>
                  </Segment>
                )
            }
            {subGenres.length > 0
              ? <React.Fragment>
                  <em>Subgenres:</em>
                  <Segment basic inverted>
                    <List>
                      {subGenres.map((subGenre, idx) => <List.Item value={'-'} key={`subgenre-${idx}`} >{subGenre.name}</List.Item>)}
                    </List>
                  </Segment>
                </React.Fragment>
              : null
            }
          </Segment>
        </React.Fragment>
      }
    </React.Fragment>

    );
  }
}

export default connect(null, {updateRelatedArtists})(ArtistDetails)
