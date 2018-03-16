import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { Card, Segment } from 'semantic-ui-react'


// const ArtistList = (props) => {
//   const searchTerm = props.searchTerm
//   const activeArtists = () => {
//     if(this.props.activeGenre){
//       return this.props.artists.filter((artist) => artist.genres.includes(this.props.activeGenre))
//     } else{
//       return this.props.artists
//     }
//   }
//   return (
//     <Segment basic>
//       <Card.Group itemsPerRow={2}>
//         { activeArtists.sort((a,b)=> b[searchTerm] - a[searchTerm] ).map((artist) => <Artist key={artist.id} artist={artist} allArtists={props.artists} />)}
//       </Card.Group>
//     </Segment>
//   )
// }

// import React from 'react'

class ArtistList extends React.Component {

  state = {
    activeArtists: []
  }

  componentDidMount = () => {
    this.setState({
      activeArtists: this.props.artists
    })
    this.filterActiveArtists()
  }

  filterActiveArtists = () => {
    this.setState({ activeArtists: this.props.artists})
    if(this.props.activeGenre){
      const filteredArtists = this.props.artists.filter((artist) => artist.genres.includes(this.props.activeGenre))
      this.setState({ activeArtists: filteredArtists})
    }
  }

  render() {
    const searchTerm = this.props.searchTerm
    console.dir(this.props)
    console.dir(this.state)
    return (
      <Segment basic>
        <Card.Group itemsPerRow={2}>
          { this.props.artists.sort((a,b)=> b[searchTerm] - a[searchTerm] ).map((artist) => <Artist key={artist.id} artist={artist} allArtists={this.props.artists} />)}
        </Card.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists,
           searchTerm: state.searchTerm,
           activeGenre: state.activeGenre
   };
};

export default connect(mapStateToProps)(ArtistList)
