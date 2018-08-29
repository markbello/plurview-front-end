import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header, Select, Checkbox } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import * as actions from  './actions/index';
import './App.css';
import ShowList from './components/shows/showList';
import Logo from './components/app/logo';
import Locations, { rawLocations } from './common/locations';

class App extends Component {

  componentDidMount() {
    const {
      cookies,
      changeLocation,
      setLocationName,
      loadArtists,
      loadInitialShows,
      loadShows
    } = this.props;
    let locationId = cookies.get('location');
    locationId ? null : locationId = this.detectLocation();
    const currentLocation = this.findLocationName(locationId);
    const scrollPosition = cookies.get('scrollY');
    changeLocation(locationId);
    setLocationName(currentLocation);
    loadArtists()
    .then(() => {
      loadShows(locationId);
    })
    .then(() => {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 1000);
    });

    window.addEventListener('scroll', () => {
      setTimeout(() => {
        cookies.set('scrollY', window.scrollY, { maxAge: 600 })
      }, 200);
    });
  };


  state = {
    sidebarVisible: false,
   };


  toggleSidebarVisibility = () => this.setState({ sidebarVisible: !this.state.sidebarVisible })

  handleChangeLocation = (e, { value }) => {
    const { cookies } = this.props;
    const newLocationName = this.findLocationName(value);
    cookies.set('location', value, { path: '/' });
    this.props.changeLocation(value);
    this.props.setLocationName(newLocationName);
    this.props.loadShows(value);
  };

  findLocationName = locationId => Locations.find(locationEntry =>  locationEntry.value == locationId).text;

  handleWeekendToggle = () => {
    this.props.toggleWeekends();
  };

  handleScroll = (cookies) => {
    setTimeout(() => {
      cookies.set('scrollY', window.scrollY)
    }, 500);
  };

  detectLocation = () => {
    let closestCity;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const { latitude, longitude } = position.coords;
        const closestLatitude = this.closestValue(rawLocations, 'latitude', latitude);
        const closestLongitude = this.closestValue(rawLocations, 'longitude', longitude);
        const locationsByLatitude = rawLocations.filter(loc => loc.latitude === closestLatitude);
        if(locationsByLatitude.length > 1){
          const locationByLongitude = locationsByLatitude.find(loc => loc.longitude === closestLongitude);
          closestCity = locationByLongitude;
        } else if (locationsByLatitude.length === 1) {
          closestCity = locationsByLatitude[0];
        }
        this.props.cookies.set('location', closestCity.id, { path: '/' });
      }.bind(this));
    };
  };

  closestValue = (array, key, value) => {
  let result,
      lastDelta;

  array.some(function (item) {
    let delta = Math.abs(value - item[key]);
    if (delta > lastDelta) {
        return true;
    }
    result = item[key];
    lastDelta = delta;
  });
  return result;
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.locationId !== this.props.locationId
      ? this.props.loadShows(nextProps.locationId)
      : null;
  };

  render() {
    const { cookies, locationName } = this.props;
    const { sidebarVisible } = this.state;
    // const currentLocation = Locations.find((location) =>  location.value === location).text;

    return (
      <React.Fragment>
        <Menu inverted borderless >
          <Menu.Item
            position={'left'}
            onClick={ this.toggleSidebarVisibility }
            style={{ marginTop: '30px' }}>
              Options
              <Icon
                style={{ marginLeft: '15px', marginRight: '15px' }}
                inverted
                name='options'
              />
          </Menu.Item>
        </Menu>
        <Grid stackable padded >

          <Sidebar.Pushable as={ Segment } padded basic>
              <Sidebar
                as={ Menu }
                animation='push'
                width='wide'
                direction='left'
                visible={ sidebarVisible }
                icon='labeled'
                inverted
                vertical
                style={{ height: '150%' }}
              >
                <Menu.Item name='marker'>
                  <Select
                    placeholder={ locationName }
                    options={ Locations }
                    onChange={ this.handleChangeLocation }
                    />
                </Menu.Item>
                <Menu.Item name='calendar'>
                  <Checkbox
                    checked={ this.props.onlyWeekends }
                    onChange={ this.handleWeekendToggle }
                    toggle
                    label={ this.props.onlyWeekends ? 'Weekends Only' : 'Shows All Week' }/>
                </Menu.Item>

                <Menu.Item name='mail outline'>
                  <a href='mailto:mark@nephewapps.com'>Contact Mark</a>
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher style={{background: 'transparent'}}>
                <Logo />
              </Sidebar.Pusher>

            </Sidebar.Pushable>
            <Switch>
              <Route path='/' render={() => <ShowList />} />
            </Switch>
        </Grid>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { artists, location, locationName, onlyWeekends } = state;
  return { artists, location, locationName, onlyWeekends };
};

export default connect(mapStateToProps, actions)(withCookies(App));
