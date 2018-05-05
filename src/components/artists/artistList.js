import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { filterArtists } from '../../actions/index'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu, Search, Grid, Header, Image } from 'semantic-ui-react'
import _ from 'lodash'
import logo from '../../assets/artists-header.svg'


class ArtistList extends React.Component {

  state = {
    loading: true,
    searchTerm: '',
    hsl: {background: 'linear-gradient(to right, rgb(185, 111, 126), rgb(99, 74, 79))'}
    }

  handleContextRef = contextRef => this.setState({ contextRef })

  componentWillReceiveProps(nextProps){
    this.filterActiveArtists(nextProps)
    if(nextProps.activeGenre && nextProps.activeGenre.hsl){
      this.setState({gradient: nextProps.activeGenre.hsl})
    }

  }

  filterActiveArtists = (props) => {
    let activeHsl = {background: 'linear-gradient(to right, rgb(185, 111, 126), rgb(99, 74, 79))'}
    props.activeGenre.hsl ? activeHsl = {background: `linear-gradient(to right, ${props.activeGenre.hsl})`} : null
    if(props.activeArtists[0]){
      this.setState({ loading: false, hsl: activeHsl})
    }
  }

  sortArtists = (props) => {

      return props.activeArtists.sort((a,b)=> b[props.sortingMetric] - a[props.sortingMetric] )

  }



  render() {
    const { contextRef } = this.state


    return (
      <Segment basic>
      <Segment basic>
        <Image src={logo} size="tiny" />
      </Segment>
      <Segment.Group basic>
        <Segment basic inverted>
          <Header as={"h1"}><em>Top Artists by {this.props.searchTerm}</em></Header>
            <div style={this.state.hsl}/>

        </Segment>
        <Grid container columns={3} padded inverted>
          {this.props.activeArtists.slice(0,15).map((artist) =>
              <Grid.Column>

                  <Artist artist={artist} />


              </Grid.Column>
            )}
        </Grid>



      </Segment.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists,
           sortingMetric: state.sortingMetric,
           activeGenre: state.activeGenre,
           activeArtists: state.activeArtists,
           searchTerm: state.searchTerm
   };
};

export default connect(mapStateToProps, { filterArtists })(ArtistList)

// <Rail position='right'>
//   <Sticky context={contextRef}>
//     <Menu basic vertical inverted borderless>
//       <Menu.Item>
//         <Button color='red' circular>House (3)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='pink' circular>Big Room (4)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='blue' circular>Trance (6)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='violet' circular>Bass Music (5)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='green' circular>Dubstep (2)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='yellow' circular>Trap (1)</Button>
//       </Menu.Item>
//
//     </Menu>
//   </Sticky>
// </Rail>

// <div ref={this.handleContextRef}>
//   <Card.Group itemsPerRow={2}>
//     { this.state.loading ? <Loader active inverted /> : this.sortArtists(this.props).map((artist) => <Artist key={artist.id} artist={artist}/>) }
//   </Card.Group>
