import React from 'react'
import { Card } from 'semantic-ui-react'

class Artist extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.artist.name}</Card.Header>
          <li>loudness: {this.props.artist.loudness}</li>
          <li>valence: {this.props.artist.valence}</li>
          <li>energy: {this.props.artist.energy}</li>
          <li>danceability: {this.props.artist.danceability}</li>
          <li>tempo: {this.props.artist.tempo}</li>
          <li>{this.props.artist.related_artists.map((artist) => `${artist.name}, `)}</li>
        </Card.Content>

      </Card>
    );
  }
}

export default Artist
