import React from 'react';
import { connect } from 'react-redux';
import Genre from '../genres/genre'
import Rave from './rave'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu } from 'semantic-ui-react'

class EventList extends React.Component {

  state = {
    loading: true,
    raves: []
  }

  componentDidMount(){
    this.fetchEvents(70)
  }

  fetchEvents(locationId){
    fetch(`http://edmtrain.com/api/events?locationIds=${locationId}&client=dd19c823-0beb-4950-b036-8a2a2d55114c`)
    .then(res => res.json())
    .then(json => {
      this.setState({raves: json.data, loading: false})}
      )
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    // const searchTerm = this.props.searchTerm
    const { contextRef } = this.state

    return (
      <Segment basic>
        <div ref={this.handleContextRef}>
          <Card.Group itemsPerRow={1}>
            { this.state.loading ? <Loader active inverted /> : this.state.raves.map((rave) => <Rave key={rave.id} rave={rave} />) }
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
              </Menu>
            </Sticky>
          </Rail>

        </div>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, raves: state.raves };
};

export default connect(mapStateToProps)(EventList)
