import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import Artist from './components/artists/artist'
import ArtistList from './components/artists/artistList'
import GenreList from './components/genres/genreList'
import Navbar from './components/app/navbar'
import { Container, Segment } from 'semantic-ui-react'
import {Route, Switch, Redirect} from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.loadGenres()
    // .then(() => {
    //   this.props.loadArtists()
    //
    // })
  }


  render() {

    return (
      <div className="App">
        <Navbar />
        <Container>
          <Switch>
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
