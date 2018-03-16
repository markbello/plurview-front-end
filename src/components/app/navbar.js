import React from 'react'
import { Input, Menu, Form, Button, Select } from 'semantic-ui-react'
import { filterArtists, filterGenre } from '../../actions/index'
import {connect} from 'react-redux'

class Navbar extends React.Component {

  state = {
    searchTerm: '',
    activeArtists: this.props.artists
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
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
        value: genre.id,
        onClick: () => this.filterGenre(genre.id)
      }

    })
    return (
      <Menu>
        <Menu.Item>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field><input placeholder='Sort' onChange={this.handleChange}/></Form.Field>
            <Button type='submit'>Sort Artists</Button>
          </Form>
        </Menu.Item>
        <Menu.Item>
          <Select placeholder='Select Genre' options={options} />
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, artists: state.artists};
};

export default connect(mapStateToProps, { filterArtists, filterGenre })(Navbar)
