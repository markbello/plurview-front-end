import React from 'react'
import { Input, Menu, Form, Button, Select, Radio, Label, Search, Image, Segment, Sticky, Container } from 'semantic-ui-react'
import { filterArtists, sortArtists, filterGenre, loadGenreArtists, findNewArtist } from '../../actions/index'
import {connect} from 'react-redux'
import _ from 'lodash'

import logo from '../../assets/ticket-logo.svg'


class Navbar extends React.Component {



  state = {
    sortingMetric: '',
    value: '',
    isLoading: false,
    results: [],
    genre: '',
    newArtist: ''
  }

  handleSortChange = (value) => {
    this.state.value === value ? value = "" : null
    this.setState({
      sortingMetric: value
    }, () => this.props.sortArtists(this.state.sortingMetric))
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' }, () => this.props.filterArtists(this.state.results))

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleFindNewArtist = () => {
    this.props.findNewArtist(this.state.newArtist.id)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.artists, isMatch),
      }, () => {
        if(this.state.results.length > 0){
          this.props.filterArtists(this.state.results, this.state.value)
        } else{
          this.handleNoResults()
        }
        })
    }, 500)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.sortArtists(this.state.sortingMetric)
  }

  filterGenre = (id) => {
    this.props.filterGenre(id)
  }

  handleNoResults = () => {
    fetch(`https://plurview-api.herokuapp.com/api/v1/artists/find_new/${this.state.value}`)
    .then(res => res.json())
    .then(json => {
      this.setState({newArtist: json}, () => console.log(this.state.newArtist))
    })
  }

  render() {
    const FindArtist = (props) => {
      return (
        <div onClick={this.handleFindNewArtist}>{props.artist ? `Do you mean ${props.artist.name}?` : `No results...`}</div>
      )
    }

    const genreOptions = this.props.genres.map((genre) => {
      return  {
          text: `${genre.name}`,
          value: genre,
          onClick: () => {
            this.setState({genre: `${genre.name}`},() => this.props.loadGenreArtists(genre))},
          key: `genre-option-${genre.id}`,
          active: genre.id === this.props.activeGenre
        }
      })

    const sortingMetrics = ["Loudness", "Valence", "Danceability", "Tempo", "Popularity", "Followers"]

    const sortingOptions = sortingMetrics.map((metric) => {
      return  {
          text: `${metric}`,
          value: metric.toLowerCase(),
          onClick: () => {this.handleSortChange(metric)},
          key: `metric-option-${metric}`,
          active: genre === this.props.sortingMetric
        }
      })

    // this.props.activeGenre.length > 0 ? selectOptionText = this.props.genres.find((genre) => genre.id === this.props.activeGenre).name : console.log( "No active genre yet")

    const { isLoading, value, results, genre } = this.state

    return (
      <Container className={'flex-container'}>
        <Segment.Group  style={{background: 'transparent', marginTop: '100px', position: 'fixed'}}>
          <Segment basic style={{marginLeft: '50px'}}>

            <img src={logo} width="300px"/>
          </Segment>

          <Segment basic style={{marginTop: '100px', marginLeft: '100px'}}>
          <Search
            onSearchChange={this.handleSearchChange}
            onResultSelect={this.handleResultSelect}
            results={results}
            value={value}
            scrolling
            placeholder={'Search for an Artist'}
            resultRenderer={({name}) => <Segment basic content={name} />}
            noResultsMessage={<FindArtist artist={this.state.newArtist}/>}
            {...this.props}
          />
        </Segment>
        <Segment basic style={{marginLeft: '100px'}}>
          <Select placeholder={this.state.genre ? genre : "Browse Subgenres"} options={genreOptions}/>
        </Segment>
        </Segment.Group>

      </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return { genres: state.genres, artists: state.artists, activeGenre: state.activeGenre, activeArtists: state.activeArtists};
};

export default connect(mapStateToProps, { filterArtists, sortArtists, filterGenre, loadGenreArtists, findNewArtist })(Navbar)

// <Menu.Item>
//   <Select options={sortingOptions} placeholder={this.state.sortingMetric ? this.state.sortingMetric : "Sort Artists By"} />
// </Menu.Item>
