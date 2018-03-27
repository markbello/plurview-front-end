import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import Artist from '../artists/artist'
import { Card, Button, Loader, Menu, Grid, Segment, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { findNewArtist } from '../../actions/index'


class Rave extends React.Component {

  state = {
    raveArtists: [],
    newArtist: ''
  }

  loadArtists = (props) => {
    let storedArtists = []
    if(props.rave){
      props.rave.artistList.forEach((artist) => {
      console.log(artist)
      console.log(props.artists)
      if(props.artists.length > 1){

        let test = props.artists.filter((storedArtist) => artist.name === storedArtist.name)

        console.log("TEST IS ", test)
        if(test.length > 0){
          storedArtists.push(test)
        }
        else{
            //
            // fetch(`http://localhost:3001/api/v1/artists/find_new/${artist.name}`)
            // .then(res => res.json())
            // .then(json => {
            //   console.log(json)
            //   this.setState({newArtist: json}, () => this.props.findNewArtist(this.state.newArtist.id))
            // })

        }
      }
    })}
    // console.log()
    console.log("STORED ARTISTS I ", storedArtists)
    if(storedArtists.length > 0){this.setState({raveArtists: storedArtists}, () => console.log("STATETETETE ", this.state))}
  }

  componentDidMount(){
    this.loadArtists(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.loadArtists(nextProps)
  }


  render() {
    return (
      <Segment basic>
        <Segment basic inverted><Header className={"poop"}>{this.props.rave.venue.name} - {this.props.rave.venue.location}</Header></Segment>
          <Grid id={`rave-${this.props.rave.id}`} columns={3} equal padded inverted>
            <Segment.Group style={{background: "transparent"}} columns={3} basic horizontal stackable>
              {this.state.raveArtists.length > 0 ? this.state.raveArtists.map((raveArtist) => <Segment><Card basic><Artist artist={raveArtist[0]} /></Card></Segment>) : null}
            </Segment.Group>
          </Grid>
      </Segment>
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
