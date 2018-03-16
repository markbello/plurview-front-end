import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Card, Button } from 'semantic-ui-react'

class Artist extends React.Component {
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
          <li>{this.props.artist.related_artists.map((artist) => <a href={`#artist-${artist.id}`}>{artist.name}, </a>)}</li>
          <li>{this.props.artist.genres.map((genre) => genre.name)}</li>
          <Button onClick={() => this.props.updateRelatedArtists(this.props.artist)}>Update Related Artists</Button>
        </Card.Content>

      </Card>
    );
  }
}

export default connect(null, { updateRelatedArtists })(Artist)
