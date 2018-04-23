import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import Artist from '../artists/artist'
import { Grid, Segment, Header, Image, Card } from 'semantic-ui-react'
import { findNewArtist } from '../../actions/index'
import ticketImage from '../../assets/ticket.svg'

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
            // fetch(`https://plurview-api.herokuapp.com/api/v1/artists/find_new/${artist.name}`)
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
      this.setState({raveArtists: storedArtists, raveGradient: hsl})
    }
  }

  processGradient = () => {
    fetch('https://plurview-api.herokuapp.com/api/v1/raves/process_gradient', {
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
      <React.Fragment>
        {this.state.raveArtists.length > 0 ?
          <Card fluid >
              <Segment basic inverted>
                <Header className={'rave-location'} as={"h2"} ><em>{this.props.rave.venue.name} </em> <a href={this.props.rave.ticketLink}><Image style={{marginLeft: '25px'}} src={ticketImage} size='mini' verticalAlign='middle' /></a></Header>
                <em className={'rave-location'} style={{fontSize: '.75em'}}>{this.props.rave.venue.location} {this.props.rave.ages ? <span>({this.props.rave.ages})</span> : null}</em>
              </Segment>
              <Grid container id={`rave-${this.props.rave.id}`} columns={1} inverted stackable>

                {this.state.raveArtists.map((raveArtist, idx) =>

                  <Grid.Column key={`raveList-raveArtist-${idx}`} style={{marginLeft: '5%'}}>
                      <Artist artist={raveArtist[0]} />
                  </Grid.Column>
                )}
            </Grid>

          </Card>
           : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists
  }
}

export default connect(mapStateToProps, { updateRelatedArtists, findNewArtist })(Rave)
