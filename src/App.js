import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import Artist from './components/artists/artist'
import ArtistList from './components/artists/artistList'

class App extends Component {

  componentDidMount() {
    this.props.loadArtists()
    .then(() => console.log("Doing a thing: ", this.props.artists[0].name))
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={(event) => this.handleOnClick(event)} >
          Click
        </button>
        <p className="App-intro">
          <ArtistList />
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
