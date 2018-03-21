import React from 'react';
import { connect } from 'react-redux';
import Genre from './genre'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu } from 'semantic-ui-react'

class GenreList extends React.Component {

  state = {
    loading: false
  }


  // componentWillReceiveProps(nextProps){
  //   this.filterActiveArtists(nextProps)
  // }

  // filterActiveArtists = (props) => {
  //   console.dir(props)
  //   if(props.activeArtists[0]){
  //     this.setState({ loading: false}, () => console.dir(this.state))
  //   }
  // }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    // const searchTerm = this.props.searchTerm
    const { contextRef } = this.state

    return (
      <Segment basic>
        <div ref={this.handleContextRef}>
          <Card.Group itemsPerRow={2}>
            { this.state.loading ? <Loader active inverted /> : this.props.genres.map((genre) => <Genre key={genre.id} genre={genre} />) }
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
  return { genres: state.genres };
};

export default connect(mapStateToProps)(GenreList)
