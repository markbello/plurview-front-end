import React from 'react'
import { connect } from 'react-redux';
import { updateRelatedArtists } from '../../actions/index'
import { Card, Button, Loader, Menu } from 'semantic-ui-react'

class Genre extends React.Component {
  state = {
    loading: false,
    trapCount: '',
    dubstepCount: '',
    houseCount: '',
    bigRoomCount: '',
    bassMusicCount: '',
    tranceCount: '',
  }

  render() {

    return (
      <Card id={`genre-${this.props.genre.id}`}>
        <Card.Content>
          <Card.Header>{this.props.genre.name}</Card.Header>

          { this.props.genre.hsl ? <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, ${this.props.genre.hsl}) `}}/> : null }
            <Menu basic borderless>
              <Menu.Item>
                <Button color='red' circular value='House' onClick={() => console.log("Clicked genre button")}>{this.props.genre.houseCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='pink' circular value='Big Room' onClick={() => console.log("Clicked genre button")}>{this.props.genre.bigRoomCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='yellow' circular value='Trap' onClick={() => console.log("Clicked genre button")}>{this.props.genre.trapCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='green' circular value='Dubstep' onClick={() => console.log("Clicked genre button")}>{this.props.genre.dubstepCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='blue' circular value='Trance' onClick={() => console.log("Clicked genre button")}>{this.props.genre.tranceCount}</Button>
              </Menu.Item>
              <Menu.Item>
                <Button color='violet' circular value='Bass Music' onClick={() => console.log("Clicked genre button")}>{this.props.genre.bassMusicCount}</Button>
              </Menu.Item>
          </Menu>

        </Card.Content>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeGenre: state.activeGenre
  }
}

export default connect(mapStateToProps, { updateRelatedArtists })(Genre)

// <li>{this.props.artist.related_artists.map((artist) => <a key={`${artist}`} href={`#artist-${artist.id}`}>{artist.name}, </a>)}</li>
// <li>{this.props.artist.genres.map((genre) => genre.name)}</li>

// <div style={{height: '20px', width: '100%', background: `linear-gradient(to right, hsl(348, ${this.props.artist.major_saturation}%, 58%), hsl(348, ${this.props.artist.major_saturation}%, ${this.props.artist.major_brightness}%))`}}/>
