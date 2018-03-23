import React from 'react';
import { connect } from 'react-redux';
import Artist from './artist'
import { filterArtists } from '../../actions/index'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu, Search } from 'semantic-ui-react'
import _ from 'lodash'

class ArtistList extends React.Component {

  state = {
    loading: true,
    searchTerm: ''
    }

  handleContextRef = contextRef => this.setState({ contextRef })

  componentWillReceiveProps(nextProps){
    this.filterActiveArtists(nextProps)
  }

  filterActiveArtists = (props) => {
    if(props.activeArtists[0]){
      this.setState({ loading: false})
    }
  }

  sortArtists = (props) => {
    if(this.state.searchTerm){
      return props.activeArtists.sort((a,b)=> b[props.sortingMetric] - a[props.sortingMetric] ).filter((artist) => artist.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    } else {
      return props.activeArtists.sort((a,b)=> b[props.sortingMetric] - a[props.sortingMetric] )
    }
  }

  handleSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render() {
    const { contextRef } = this.state


    return (
      <Segment basic>
        <div ref={this.handleContextRef}>
          <Card.Group itemsPerRow={2}>
            { this.state.loading ? <Loader active inverted /> : this.sortArtists(this.props).map((artist) => <Artist key={artist.id} artist={artist} allArtists={this.props.artists} />) }
          </Card.Group>
          <Rail position='right'>
            <Sticky context={contextRef}>
              <Menu basic vertical inverted borderless>
                <Menu.Item>
                  <Button color='red' circular>House (3)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='pink' circular>Big Room (4)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='blue' circular>Trance (6)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='violet' circular>Bass Music (5)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='green' circular>Dubstep (2)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='yellow' circular>Trap (1)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Search
                    onSearchChange={this.handleSearchChange}
                  />
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
           sortingMetric: state.sortingMetric,
           activeGenre: state.activeGenre,
           activeArtists: state.activeArtists,
           searchTerm: state.searchTerm
   };
};

export default connect(mapStateToProps, { filterArtists })(ArtistList)
