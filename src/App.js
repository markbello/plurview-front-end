import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import Artist from './components/artists/artist'
import ArtistList from './components/artists/artistList'
import GenreList from './components/genres/genreList'
import RaveList from './components/raves/raveList'
import Navbar from './components/app/navbar'
import { Container, Segment, Rail } from 'semantic-ui-react'
import {Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.loadArtists()

    .then(() => {
      this.props.loadGenres()})
    .then(() => {
      this.props.loadRaves(70)
    })
  }


  render() {

    return (
      <div className="App">
      <div />
        <Container>
          <Rail position='left' internal>
            <Navbar />
          </Rail>

          <Switch>
            <Route path='/' render={() => <RaveList />} />
            <Route path='/artists/' render={() => <ArtistList />} />
            <Route path='/genres/' render={() => <GenreList />} />
          </Switch>

        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
