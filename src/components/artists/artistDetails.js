import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Card, Button, Loader, Menu, Segment } from 'semantic-ui-react'

class ArtistDetails extends React.Component {

  state = {
    relatedArtists: [],
    loading: true
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/artists/${this.props.artist.id}/show_related`)
    .then(res => res.json())
    .then(relatedArtists => this.setState({
      relatedArtists: relatedArtists,
      loading: false
    }), console.log("ARtist details ", this.state, this.props.artist))
  }

  render() {
    return (
      <React.Fragment>
      {this.state.loading ? <Loader active inverted /> :

        <Segment basic>
          {this.state.relatedArtists.length > 0 ? <em>Related Artists:</em> : <em>No related artists data</em>} 
          {this.state.loading ? <Loader active inverted /> : this.state.relatedArtists.map((artist) =>
            <Segment basic>
              {artist.name}
              <div style={{width: "100%", height: "10px", background: `linear-gradient(to right, ${artist.hsl}) `}}/>
            </Segment>
          )}
        </Segment>
      }
    </React.Fragment>

    );
  }
}

export default ArtistDetails
