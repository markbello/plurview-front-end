import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from  './actions/index';
import './App.css';
import ShowList from './components/shows/showList'
import { Grid, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import {Route, Switch} from 'react-router-dom'
import Logo from './components/app/logo'
import SidebarRightScaleDown from './components/app/sidebarRightScaleDown'

class App extends Component {

  componentDidMount() {
    this.props.loadArtists()
    .then(() => {
      this.props.loadShows(70)
    })
  }

  state = { sidebarVisible: false }

  toggleSidebarVisibility = () => this.setState({ sidebarVisible: !this.state.sidebarVisible })

  render() {
    const { sidebarVisible } = this.state

    return (
        <Grid stackable padded >
          <Logo />
          <Menu fixed='bottom' right inverted borderless >
            <Menu.Item position={'right'}><Button onClick={this.toggleSidebarVisibility}>Options</Button></Menu.Item>
            <Menu.Item position={''}><Button onClick={this.toggleSidebarVisibility}>Color Guide</Button></Menu.Item>
          </Menu>
          <Sidebar.Pushable as={Segment} padded basic style={{marginLeft: '5vw'}}>
              <Sidebar
                as={Menu}
                animation='overlay'
                width='wide'
                direction='right'
                visible={sidebarVisible}
                icon='labeled'
                vertical
                inverted
              >
                <Menu.Item name='home'>
                  <Icon name='home' />
                  Home
                </Menu.Item>
                <Menu.Item name='gamepad'>
                  <Icon name='gamepad' />
                  Games
                </Menu.Item>
                <Menu.Item name='camera'>
                  <Icon name='camera' />
                  Channels
                </Menu.Item>
              </Sidebar>
              <Sidebar.Pusher style={{background: 'transparent'}}>
                  <Switch>
                    <Route path='/' render={() => <ShowList />} />
                  </Switch>
              </Sidebar.Pusher>

            </Sidebar.Pushable>
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
