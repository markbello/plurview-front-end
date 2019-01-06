import React, { Component, Fragment } from 'react';
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

class App extends Component {
  state = {
    isWeekendsOnly: true,
    isSidebarVisible: false,
  };

  componentDidMount() {
    this.props.loadArtists();
    this.props.loadShows(this.props.activeLocationId);
  };

  render() {
    const {
      isSidebarVisible,
      isWeekendsOnly,
    } = this.state;

    const {
      activeLocationId,
      activeLocationName,
      allArtists,
      changeLocation,
      loadShows,
      shows,
    } = this.props;

    const toggleWeekendsOnly = () => this.setState({ isWeekendsOnly: !this.state.isWeekendsOnly });
    const toggleSidebarVisibility = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible });

    const isLoaded = !!shows && !!allArtists.length;

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
            activeLocationName={activeLocationName}
            changeLocation={changeLocation}
            isVisible={isSidebarVisible}
            isWeekendsOnly={isWeekendsOnly}
            loadShows={loadShows}
            toggleWeekendsOnly={toggleWeekendsOnly}
          />
        {isLoaded && (
          <ShowList
            activeLocationName={activeLocationName}
            allArtists={allArtists}
            isWeekendsOnly={isWeekendsOnly}
            shows={shows}
          />)}
        </Grid>
      </Fragment>
    );
  };
};

const mapStateToProps = ({
  activeLocationId,
  activeLocationName,
  allArtists,
  shows,
}) => ({
  activeLocationId,
  activeLocationName,
  allArtists,
  shows,
});

const mapDispatchToProps = {
  changeLocation,
  loadArtists,
  loadShows,
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
