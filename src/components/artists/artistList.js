import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { Card } from 'semantic-ui-react'


const ArtistList = (props) => {
  return (
    <Card.Group itemsPerRow={2}>
      { props.artists.map((artist) => <Artist key={artist.id} artist={artist} allArtists={props.artists} />)}
    </Card.Group>
  )
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps)(ArtistList)
