import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { Card, Segment, Loader } from 'semantic-ui-react'

class ArtistList extends React.Component {

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps){
    this.filterActiveArtists(nextProps)
  }

  filterActiveArtists = (props) => {
    console.dir(props)
    if(props.activeArtists[0]){
      this.setState({ loading: false}, () => console.dir(this.state))
    }
  }

  render() {
    const searchTerm = this.props.searchTerm
    return (
      <Segment basic>
        <Card.Group itemsPerRow={2}>
          { this.state.loading ? <Loader active inverted /> : this.props.activeArtists.sort((a,b)=> b[searchTerm] - a[searchTerm] ).map((artist) => <Artist key={artist.id} artist={artist} allArtists={this.props.artists} />) }
        </Card.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists,
           searchTerm: state.searchTerm,
           activeGenre: state.activeGenre,
           activeArtists: state.activeArtists
   };
};

export default connect(mapStateToProps)(ArtistList)
