import React from 'react';
import { connect } from 'react-redux';
import Rave from './rave'
import About from '../app/about'
import { Segment, Loader, Grid, Header } from 'semantic-ui-react'
import moment from 'moment'

class RaveList extends React.Component {

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps){
    this.setState({loading: false})
  }

  render() {
    const {raves} = this.props

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
                <Header inverted as='h2' textAlign='center'>Upcoming Events</Header>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>}

        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column>
            <Segment basic >
              <Grid stackable>
                {Object.keys(raves).length > 0 ? Object.keys(raves).map((key,idx) =>
                  <Grid.Row id={`raveDate-${idx}`} key={`raveDate-${idx}`} >
                    <Segment.Group>
                        <Segment basic>
                          {<Header inverted as={'p'} ><em>{moment(key).format('dddd, MMMM Do')}</em></Header>}
                        </Segment>
                      <Segment.Group>
                        {raves[key].map((rave, idx) =>
                          rave.artistList.length > 0 ? <Rave rave={rave} key={`raveArtist-${idx}`} /> : null
                        ) }
                      </Segment.Group>
                    </Segment.Group>
                  </Grid.Row>) : null  }
                </Grid>
              </Segment>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { raves: state.raves };
};

export default connect(mapStateToProps)(RaveList)
