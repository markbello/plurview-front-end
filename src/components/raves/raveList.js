import React from 'react';
import { connect } from 'react-redux';
import Rave from './rave'
import { Segment, Loader, Grid, Header, } from 'semantic-ui-react'
import moment from 'moment'

class RaveList extends React.Component {

  state = {
    loading: true
  }

  componentWillReceiveProps(nextProps){
    this.props !== nextProps ? this.setState({loading: false}) : null
  }

  // shouldComponentUpdate(nextProps){
  //   nextProps.raves.length > this.props.raves.length
  // }

  render() {

    return (
      <React.Fragment>
      {this.state.loading ? <Loader inverted active><h2>Checking IDs</h2></Loader> : null}

        <Grid.Row>

          <Grid.Column width={3}>
          </Grid.Column>

          <Grid.Column>
            <Segment basic >
              <Grid stackable>
                {Object.keys(this.props.raves).length > 0 ? Object.keys(this.props.raves).map((key) =>
                  <Grid.Row>
                    <Segment.Group>
                      <Segment basic>
                        {<Header inverted as={'h1'}><em>{moment(key).format('dddd, MMMM Do')}</em></Header>}
                      </Segment>
                      <Segment.Group>
                        {this.props.raves[key].map((rave) =>
                          rave.artistList.length > 0 ? <Rave rave={rave} /> : null
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
  return { genres: state.genres, raves: state.raves, activeArtists: state.activeArtists };
};

export default connect(mapStateToProps)(RaveList)
