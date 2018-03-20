import React from 'react'
import { Input, Menu, Form, Button, Select, Radio, Label } from 'semantic-ui-react'
import { filterArtists, filterGenre, loadGenreArtists } from '../../actions/index'
import {connect} from 'react-redux'

class Navbar extends React.Component {

  state = {
    searchTerm: ''
  }

  // handleChange = (e) => {
  //   this.setState({
  //     searchTerm: e.target.value
  //   })
  // }

  handleChange = (value) => {
    this.state.value === value ? value = "" : null
    this.setState({
      searchTerm: value
    }, () => this.props.filterArtists(this.state.searchTerm))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.filterArtists(this.state.searchTerm)
  }

  filterGenre = (id) => {
    this.props.filterGenre(id)
  }

  render() {
    const options = this.props.genres.map((genre) => {
    return  {
        text: `${genre.name} (${genre.artist_count})`,
        value: genre,
        onClick: () => this.props.loadGenreArtists(genre.id),
        key: `genre-option-${genre.id}`,
        active: genre.id === this.props.activeGenre
      }

    })
    let selectOptionText = "Select a Genre"
    this.props.activeGenre.length > 0 ? selectOptionText = this.props.genres.find((genre) => genre.id === this.props.activeGenre).name : console.log( "No active genre yet")
    return (
      <Menu>
        <Menu.Item>

          <Form.Field>

            <Radio
              name='radioGroup'
              value='loudness'
              label='loudness'
              toggle
              checked={this.state.searchTerm === 'loudness'}
              onChange={() => this.handleChange('loudness')}
            />

          </Form.Field>
          <Form.Field>


            <Radio
              label='Valence'
              toggle
              name='radioGroup'
              value='valence'
              checked={this.state.searchTerm === 'valence'}
              onChange={() => this.handleChange('valence')}
            />
          </Form.Field>
          <Form.Field>

          <Radio
            toggle
            name='radioGroup'
            value='Energy'
            checked={this.state.searchTerm === 'Energy'}
            onClick={() => this.handleChange('energy')}
          />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Danceability'
              toggle
              name='radioGroup'
              value='danceability'
              checked={this.state.searchTerm === 'danceability'}
              onClick={() => this.handleChange('danceability')}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Tempo'
              name='radioGroup'
              toggle
              value='tempo'
              checked={this.state.searchTerm === 'tempo'}
              onClick={() => this.handleChange('tempo')}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Popularity'
              name='radioGroup'
              toggle
              value='popularity'
              checked={this.state.searchTerm === 'popularity'}
              onClick={() => this.handleChange('popularity')}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Followers'
              name='radioGroup'
              toggle
              value='followers'
              checked={this.state.searchTerm === 'followers'}
              onClick={() => this.handleChange('followers')}
            />
          </Form.Field>
        </Menu.Item>
        <Menu.Item>
          <Select placeholder='Select Genre' options={options}/>
        </Menu.Item>


      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, artists: state.artists, activeGenre: state.activeGenre};
};

export default connect(mapStateToProps, { filterArtists, filterGenre, loadGenreArtists })(Navbar)
