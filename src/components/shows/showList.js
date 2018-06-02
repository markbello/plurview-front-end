import React from 'react';
import { connect } from 'react-redux';
import Show from './show'
import About from '../app/about'
import { Segment, Loader, Grid, Header } from 'semantic-ui-react'
import moment from 'moment'
import Locations from '../../common/locations'

class ShowList extends React.Component {

  state = {
    loading: true,
    showDays: ['0', '5', '6'],
    location: null
  }

  componentWillReceiveProps(nextProps){
    const currentLocation = Locations.find((location) =>  location.value === nextProps.location).text
    const weekends = ['0', '5', '6']
    const allWeek = ['0', '1', '2', '3', '4', '5', '6']
    let selectedDays
    nextProps.onlyWeekends ? selectedDays = weekends : selectedDays = allWeek

    this.setState({loading: false, location: currentLocation, showDays: selectedDays})
  }


  render() {
    const {shows} = this.props
    const {showDays} = this.state


    return (
      <React.Fragment>
      {this.state.loading
        ?  <Loader inverted active><h2>Checking IDs</h2></Loader>
        :  <React.Fragment>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={11}>
                <About />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={11}>
                <Header inverted as='h2' textAlign='center'>Upcoming Events - {this.state.location}</Header>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>}

        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column>
            <Segment basic >
              <Grid stackable>
                {Object.keys(shows).length > 0
                  ? Object.keys(shows).map((key,idx) =>
                      showDays.includes(moment(key).format('d'))
                        ? <Grid.Row id={`showDate-${idx}`} key={`showDate-${idx}`} >
                            <Segment.Group>
                              <Segment basic>
                                {<Header inverted as={'p'} ><em>{moment(key).format('dddd, MMMM Do')}</em></Header>}
                              </Segment>
                              <Segment.Group>
                                {shows[key].map((show, idx) =>
                                  <Show show={show} key={`showArtist-${idx}`} />

                                ) }
                              </Segment.Group>
                            </Segment.Group>
                          </Grid.Row>
                        : null
                    )
                  :  null}
                </Grid>
              </Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { shows: state.shows, location: state.location, onlyWeekends: state.onlyWeekends };
};

export default connect(mapStateToProps)(ShowList)
