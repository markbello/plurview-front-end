import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import RaveList from './components/raves/raveList'
import { Grid } from 'semantic-ui-react'
import {Route, Switch} from 'react-router-dom'
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

        <Grid stackable padded >
          <Logo />

          <Switch>
            <Route path='/' render={() => <RaveList />} />
          </Switch>

        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
