import React from 'react';
import { connect } from 'react-redux';
import Genre from '../genres/genre'
import Rave from './rave'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu, Grid, Header } from 'semantic-ui-react'

class EventList extends React.Component {

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps){
    this.setState({loading: false})
  }

  componentShouldUpdate(nextProps){
    nextProps.raves.length > this.props.raves.length
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    // const searchTerm = this.props.searchTerm
    const { contextRef } = this.state

    return (
      <Segment basic>
        <div ref={this.handleContextRef}>
          <Rail position='left'>
            <Sticky context={contextRef}>
              <Menu basic vertical inverted borderless>
                <Menu.Item>
                  <Button color='red' circular>House (3)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='blue' circular>Trance (6)</Button>
                </Menu.Item>
                <Menu.Item>
                  <Button color='violet' circular>Bass Music (5)</Button>
                </Menu.Item>
              </Menu>
            </Sticky>
          </Rail>
          <Grid>
            {Object.keys(this.props.raves).length > 0 ? Object.keys(this.props.raves).map((key) =>
              <Grid.Row>
                <Segment.Group>
                  <Segment basic>
                    {<Header inverted>{key}</Header>}
                  </Segment>
                  {this.props.raves[key].map((rave) =>
                    <Rave rave={rave} />
                  )}
                </Segment.Group>

            </Grid.Row>)

            : null }
          </Grid>
          <Rail position='right'>
            <Sticky context={contextRef}>
              <Menu basic vertical inverted borderless>

                <Menu.Item>
                  <Button color='pink' circular>Big Room (4)</Button>
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

// { this.state.loading ? <Loader active inverted /> : this.props.raves.keys.map((date) => <Grid.Row columns={3}>{date}</Grid.Row>) }
