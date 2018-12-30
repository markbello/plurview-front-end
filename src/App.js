import React, { Component, Fragment } from 'react';
import { find } from 'lodash';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Grid, Menu, Icon } from 'semantic-ui-react';
import Sidebar from './components/App/Sidebar';
import './semantic/dist/semantic.min.css';
import './App.css';
import {
  changeLocation,
  loadArtists,
  loadShows,
} from  './actions/index';
import './App.css';
import ShowList from './components/Show/ShowList';
import { ALL_LOCATIONS } from './common/locations';

class App extends Component {
  state = {
    isWeekendsOnly: true,
    isSidebarVisible: false,
  };

  componentDidMount() {
    this.props.loadArtists()
    .then(this.props.loadShows(this.props.activeLocation));
  };

  render() {
    const {
      isSidebarVisible,
      isWeekendsOnly,
    } = this.state;

    const {
      activeLocation,
      artists,
      loadShows,
      shows,
    } = this.props;

    const toggleWeekendsOnly = () => this.setState({ isWeekendsOnly: !this.state.isWeekendsOnly });
    const toggleSidebarVisibility = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible });

    const updateActiveLocation = (e, { value }) => {
      const newLocation = find(ALL_LOCATIONS, { 'id': value });
      changeLocation(newLocation);
      loadShows(newLocation);
    };

    const isLoaded = !!shows && !!artists.length;

    return (
      <Fragment>
        <Menu inverted borderless >
          <Menu.Item
            position={'left'}
            onClick={ toggleSidebarVisibility }
            style={{ marginTop: '30px' }}
          >
            Change Location
            <Icon
              style={{ marginLeft: '15px', marginRight: '15px' }}
              inverted
              name='options'
            />
          </Menu.Item>
        </Menu>
        <Grid stackable padded >
          <Sidebar
            updateActiveLocation={updateActiveLocation}
            isWeekendsOnly={isWeekendsOnly}
            isVisible={isSidebarVisible}
            activeCity={activeLocation.city}
            toggleWeekendsOnly={toggleWeekendsOnly}
          />
        {isLoaded && (
          <ShowList
            isWeekendsOnly={isWeekendsOnly}
            activeCity={activeLocation.city}
            shows={shows}
          />)}
        </Grid>
      </Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  const { artists, shows, activeLocation } = state;
  return { artists, shows, activeLocation };
};

export default connect(mapStateToProps, { changeLocation, loadArtists, loadShows })(withCookies(App));
