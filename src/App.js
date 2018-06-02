import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import ShowList from './components/shows/showList'
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header, Select, Checkbox } from 'semantic-ui-react'
import {Route, Switch} from 'react-router-dom'
import Logo from './components/app/logo'
import Locations from './common/locations'

class App extends Component {

  componentDidMount() {
    this.props.loadArtists()
    .then(() => {
      this.props.loadInitialShows()
    })
  }

  state = { sidebarVisible: false }

  toggleSidebarVisibility = () => this.setState({ sidebarVisible: !this.state.sidebarVisible })

  handleChangeLocation = (e, {value}) => {
    this.props.changeLocation(value)
  }

  handleWeekendToggle = () => {
    this.props.toggleWeekends()
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.location !== this.props.location ? this.props.loadShows(nextProps.location) : null
  }

  render() {
    const { sidebarVisible } = this.state
    const currentLocation = Locations.find((location) =>  location.value === this.props.location).text


    return (
      <React.Fragment>
        <Menu inverted borderless >
          <Menu.Item position={'left'} onClick={this.toggleSidebarVisibility} style={{marginTop: '30px'}}>Options<Icon style={{marginLeft: '15px', marginRight: '15px;'}}inverted name='options' /></Menu.Item>
        </Menu>
        <Grid stackable padded >

          <Sidebar.Pushable as={Segment} padded basic>
              <Sidebar
                as={Menu}
                animation='overlay'
                width='wide'
                direction='left'
                visible={sidebarVisible}
                icon='labeled'
                inverted
                vertical
                style={{height: '150%'}}
              >
                <Menu.Item name='marker'>
                  <Select
                    placeholder={currentLocation}
                    options={Locations}
                    onChange={this.handleChangeLocation}
                    />
                </Menu.Item>
                <Menu.Item name='calendar'>
                  <Checkbox
                    checked={this.props.onlyWeekends}
                    onChange={this.handleWeekendToggle}
                    toggle
                    label={this.props.onlyWeekends ? 'Weekends Only' : 'Shows All Week'}/>
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
  return { artists: state.artists, location: state.location, onlyWeekends: state.onlyWeekends };
};

export default connect(mapStateToProps, actions)(App)
