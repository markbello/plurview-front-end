import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import Artist from './components/artists/artist'
import ArtistList from './components/artists/artistList'
import Navbar from './components/app/navbar'
import { Container, Segment } from 'semantic-ui-react'

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
            <ArtistList />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
