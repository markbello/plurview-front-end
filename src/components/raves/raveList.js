import React from 'react';
import { connect } from 'react-redux';
import Genre from '../genres/genre'
import Rave from './rave'
import ArtistList from '../artists/artistList'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu, Grid, Header, Container, Image } from 'semantic-ui-react'
import moment from 'moment'
import logo from '../../assets/raves-header.svg'



class RaveList extends React.Component {

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
    const { contextRef } = this.state

    return (
        <Segment basic >
            <Grid stackable>
              {this.props.activeArtists.length > 0 ? <ArtistList /> : null }

              {this.state.loading ? <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vw', justifyContent: 'center'}}><Loader inverted active><h2>Checking IDs</h2></Loader></div> : null}
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

              </Grid.Row>)

              : null  }
            </Grid>


        </Segment>

    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, raves: state.raves, activeArtists: state.activeArtists };
};

export default connect(mapStateToProps)(RaveList)

// { this.state.loading ? <Loader active inverted /> : this.props.raves.keys.map((date) => <Grid.Row columns={3}>{date}</Grid.Row>) }

// <Rail position='right'>
//   <Sticky context={contextRef} offset={200}>
//     <Menu basic vertical inverted borderless>
//
//       <Menu.Item>
//         <Button color='pink' circular>Big Room (4)</Button>
//       </Menu.Item>
//
//       <Menu.Item>
//         <Button color='green' circular>Dubstep (2)</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='yellow' circular>Trap (1)</Button>
//       </Menu.Item>
//     </Menu>
//   </Sticky>
// </Rail>

// <div ref={this.handleContextRef}>
//   <Rail position='left'>
//     <Sticky context={contextRef} offset={200}>
//       <Menu basic vertical inverted borderless>
//         <Menu.Item>
//           <Button color='red' circular>House (3)</Button>
//         </Menu.Item>
//         <Menu.Item>
//           <Button color='blue' circular>Trance (6)</Button>
//         </Menu.Item>
//         <Menu.Item>
//           <Button color='violet' circular>Bass Music (5)</Button>
//         </Menu.Item>
//       </Menu>
//     </Sticky>
//
//   </Rail>
// </div>

// style={{marginLeft: "150px", marginTop: "50px"}}

// <Segment basic >
//   <Image src={logo} centered size="tiny" />
// </Segment>
