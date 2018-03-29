import React from 'react';
import { connect } from 'react-redux';
import Genre from '../genres/genre'
import Rave from './rave'
import { Card, Segment, Loader, Sticky, Rail, Button, Menu, Grid, Header, Container } from 'semantic-ui-react'
import DynamicSVG from '../app/dynamicSVG';
import moment from 'moment'


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

    Object.keys(this.props.raves).map((key) => console.log(moment(key).format('dddd, MMMM Do')))
    return (
      <Container >
      <Segment basic style={{marginLeft: "100px", marginTop: "50px"}}>

          <Grid>
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

            : null }
          </Grid>


      </Segment>
      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, raves: state.raves };
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
