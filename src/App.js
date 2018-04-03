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
import { Container, Segment, Rail, Responsive, Grid } from 'semantic-ui-react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Logo from './components/app/logo'

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

        <Grid stackable padded>
          <Grid.Row>
            <Grid.Column width={2} padded centered>
              <Logo />

            </Grid.Column>
            <Grid.Column>
              <Switch>
                <Route path='/' render={() => <RaveList />} />

              </Switch>
            </Grid.Column>

          </Grid.Row>
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)

// <Route path='/artists/' render={() => <ArtistList />} />
// <Route path='/genres/' render={() => <GenreList />} />
