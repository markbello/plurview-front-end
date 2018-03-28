import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import Artist from '../artists/artist'
import { Card, Button, Loader, Menu, Grid, Segment, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { findNewArtist } from '../../actions/index'
import DynamicSVG from '../app/dynamicSVG'


class Rave extends React.Component {

  state = {
    raveArtists: [],
    newArtist: '',
    raveGradient: {background: 'linear-gradient(to right, rgb(185, 111, 126), rgb(99, 74, 79))'}
  }

  loadArtists = (props) => {
    let storedArtists = []
    let hsl = {background: 'linear-gradient(to right, hsl(348, 34%, 58%), hsl(348, 14%, 34%))'}
    if(props.rave){
      props.rave.artistList.forEach((artist) => {
      if(props.artists.length > 1){

        let test = props.artists.filter((storedArtist) => artist.name === storedArtist.name)

        if(test.length > 0){
          storedArtists.push(test)
        }
        else{

            // fetch(`http://localhost:3001/api/v1/artists/find_new/${artist.name}`)
            // .then(res => res.json())
            // .then(json => {
            //   console.log(json)
            //   this.setState({newArtist: json}, () => this.props.findNewArtist(this.state.newArtist.id))
            // })

        }
      }
    })}
    if(storedArtists.length > 0){
      hsl = {background: `linear-gradient(to right, ${storedArtists[0][0].hsl})`}
      this.setState({raveArtists: storedArtists, raveGradient: hsl}, () => console.log(storedArtists[0][0].hsl))
    }
  }

  processGradient = () => {
    fetch('http://localhost:3001/api/v1/raves/process_gradient', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        raveArtists: this.state.raveArtists
      })
    })
    .then(res => res.json())
    .then(gradient => console.log(gradient))
  }

  componentDidMount(){
    this.loadArtists(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.loadArtists(nextProps)
  }


  render() {
    return (
      <Segment.Group basic >
          <Segment basic inverted>
            <Header as={"h2"}>{this.props.rave.venue.name}</Header>
            <div className={'bordertest'} style={this.state.raveGradient}/>
            <em>{this.props.rave.venue.location} {this.props.rave.ages ? <span>({this.props.rave.ages})</span> : null} </em>

          </Segment>


          <Grid container id={`rave-${this.props.rave.id}`} columns={3} padded inverted>
              {this.state.raveArtists.length > 0 ? this.state.raveArtists.map((raveArtist, idx) =>
                <Grid.Column>

                    <Artist artist={raveArtist[0]} />

                </Grid.Column>
              ) : null}
          </Grid>
          <Segment basic>
            <Button inverted circular color={"green"} href={this.props.rave.ticketLink} target={'_blank'}>Buy Tickets</Button>
          </Segment>
        </Segment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists
  }
}

export default connect(mapStateToProps, { updateRelatedArtists, findNewArtist })(Rave)

// {this.props.rave.artistList.map((artist) => artist.name )}
// {this.state.artists.map((artist) => <Artist artist={artist} />)}

// <Card.Content>
//   <Card.Header>{this.props.artist.name} ({this.props.artist.id})</Card.Header>
//
//   { this.state.loading ? <Loader active /> : <Button onClick={() => this.setState({loading: true}, () => this.handleUpdateRelatedArtists(this.props.artist))}>Update Related Artists</Button>}
//   { this.state.loading ? <Loader active /> : <Button onClick={() => this.setState({loading: true}, () => this.inferGradient())}>Infer Gradient</Button>}
//   { this.state.hsl ? <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, ${this.state.hsl}) `}}/> : null }
//     <Menu basic borderless>
//       <Menu.Item>
//         <Button color='red' circular value='House' onClick={() => this.registerVibes("house", this.props.artist.id)}>{this.state.houseCount}</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='pink' circular value='Big Room' onClick={() => this.registerVibes("big_room", this.props.artist.id)}>{this.state.bigRoomCount}</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='yellow' circular value='Trap' onClick={() => this.registerVibes("trap_music", this.props.artist.id)}>{this.state.trapCount}</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='green' circular value='Dubstep' onClick={() => this.registerVibes("dubstep", this.props.artist.id)}>{this.state.dubstepCount}</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='blue' circular value='Trance' onClick={() => this.registerVibes("trance", this.props.artist.id)}>{this.state.tranceCount}</Button>
//       </Menu.Item>
//       <Menu.Item>
//         <Button color='violet' circular value='Bass Music' onClick={() => this.registerVibes("bass_music", this.props.artist.id)}>{this.state.bassMusicCount}</Button>
//       </Menu.Item>
//   </Menu>
//
// </Card.Content>

// <Segment.Group style={{background: "transparent"}} horizontal compact>
// <Button onClick={() => this.processGradient()}>CLICK</Button>
