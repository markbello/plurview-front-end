import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu } from 'semantic-ui-react'

class ArtistList extends React.Component {

  state = {
    loading: true
  }

  handleContextRef = contextRef => this.setState({ contextRef })

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
    const { contextRef } = this.state

    return (
      <Segment basic>
        <div ref={this.handleContextRef}>
          <Card.Group itemsPerRow={2}>
            { this.state.loading ? <Loader active inverted /> : this.props.activeArtists.sort((a,b)=> b[searchTerm] - a[searchTerm] ).map((artist) => <Artist key={artist.id} artist={artist} allArtists={this.props.artists} />) }
          </Card.Group>
          <Rail position='right'>
            <Sticky context={contextRef}>
              <Menu basic vertical inverted borderless>
                <Menu.Item>
                  <Button color='red' circular>House</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='pink' circular>Big Room</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='blue' circular>Trance</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='violet' circular>Bass Music</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='green' circular>Dubstep</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='yellow' circular>Trap</Button>
                </Menu.Item>
              </Menu>
            </Sticky>
          </Rail>

        </div>
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
