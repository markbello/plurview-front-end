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
    newArtist: ''
  }

  loadArtists = (props) => {
    const {rave, artists} = props
    let storedArtists = []
    if(rave){
      rave.artistList.forEach((artist) => {
      if(artists.length > 1){
        let verifiedArtists = artists.filter((storedArtist) => artist.name === storedArtist.name)
        if(verifiedArtists.length > 0){
          this.setState({raveArtists: verifiedArtists})
          storedArtists.push(verifiedArtists)
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
      this.setState({raveArtists: storedArtists})
    }
  }

  componentDidMount(){
    this.loadArtists(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.loadArtists(nextProps)
  }

  render() {
    const {rave: {venue: {name: venue, location}, ticketLink, ages} } = this.props
    const {raveArtists: artists} = this.state

    return (
      <React.Fragment>
        {artists.length > 0
          ?  <Card fluid >
                <Segment basic inverted>
                  <Header className={'rave-location'} as={"h2"} >
                    <em>{venue}</em>
                    <a href={ticketLink}>
                      <Image className={'ticket-link'} src={ticketImage} size='mini' verticalAlign='middle' />
                    </a>
                  </Header>
                  <em className={'rave-location'}>{location} {ages ? <span>({ages})</span> : null}</em>
                </Segment>
                <Grid container id={`rave-${this.props.rave.id}`} columns={1} inverted stackable>
                  {artists.map((artist, idx) =>
                    <Grid.Column key={`raveList-artist-${idx}`} className={'artist-column'}>
                        <Artist artist={artist[0]} />
                    </Grid.Column>
                  )}
              </Grid>
            </Card>
         :  null}
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

// processGradient = () => {
//   fetch('https://plurview-api.herokuapp.com/api/v1/raves/process_gradient', {
//     headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     },
//     method: "POST",
//     mode: 'cors',
//     body: JSON.stringify({
//       raveArtists: this.state.raveArtists
//     })
//   })
//   .then(res => res.json())
//   .then(gradient => console.log(gradient))
// }
