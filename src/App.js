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
      <React.Fragment>
        <Menu inverted borderless fixed={'top'}>
          <Menu.Item position={'right'}>Options<Icon style={{marginLeft: '15px', marginRight: '15px;'}}inverted name='options' onClick={this.toggleSidebarVisibility}/></Menu.Item>
        </Menu>
        <Grid stackable padded >

          <Sidebar.Pushable as={Segment} padded basic>
              <Sidebar
                as={Menu}
                animation='overlay'
                width='wide'
                direction='right'
                visible={sidebarVisible}
                icon='labeled'
                inverted
                vertical
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
  return { artists: state.artists };
};

export default connect(mapStateToProps, actions)(App)
