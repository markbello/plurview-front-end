import React from 'react'
import { connect } from 'react-redux';
import Artist from '../artists/artist'
import { Grid, Segment, Header, Image, Card } from 'semantic-ui-react'
import ticketImage from '../../assets/ticket.svg'

class Show extends React.Component {

  state = {
    showArtists: []
  }

  verifyArtists = (props) => {
    const {show, artists} = props
    let storedArtists = []
    if(show){
      show.artistList.forEach((artist) => {
      if(artists.length > 1){
        let verifiedArtists = artists.filter((storedArtist) => artist.name === storedArtist.name)
        if(verifiedArtists.length > 0){
          this.setState({showArtists: verifiedArtists})
          storedArtists.push(verifiedArtists)
        }
      }
    })}
    if(storedArtists.length > 0){
      this.setState({showArtists: storedArtists})
    }
  }

  componentDidMount(){
    this.verifyArtists(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.verifyArtists(nextProps)
  }

  render() {
    const {show: {venue: {name: venue, location}, ticketLink, ages, name, festivalInd} } = this.props
    const {showArtists: artists} = this.state

    name ? console.log(name) : null

    return (
      <React.Fragment>

          <Card fluid >
                <Segment basic inverted>
                  <Header className={'show-location'} as={"h2"} >
                    <em>{venue}</em>
                    <a href={ticketLink}>
                      <Image className={'ticket-link'} src={ticketImage} size='mini' verticalAlign='middle' />
                    </a>
                  </Header>
                  <em className={'show-location'}>{location} {ages ? <span>({ages})</span> : null}</em>
                </Segment>
                <Grid container id={`show-${this.props.show.id}`} columns={1} inverted stackable>
                  {name
                    ?   <Segment basic inverted as={'div'} className={'show-component'}>
                          <Header as={'p'}>{name} {festivalInd ? <React.Fragment> - Festival</React.Fragment> : null}</Header>
                        </Segment>
                    : null}

                  {artists.length > 0
                    ? artists.map((artist, idx) =>
                        <Grid.Column key={`showList-artist-${idx}`} className={'artist-column'}>
                            <Artist artist={artist[0]} />
                        </Grid.Column>
                      )
                    : name
                        ? null
                        : <Segment basic inverted as={'div'} className={'show-component'}>
                          <p>See ticket link for more info...</p>
                        </Segment>

                  }
              </Grid>
            </Card>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists
  }
}

export default connect(mapStateToProps)(Show)
