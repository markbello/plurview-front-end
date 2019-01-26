import React, { Component } from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ArtistDetails from './ArtistDetails';

class Artist extends Component {
  state = {
    active: false,
  };

  toggleDetails = () => {
    const { active: currentState } = this.state;

    this.setState({
      active: !currentState,
    });
  };

  render() {
    const { active } = this.state;
    const { artist, artist: { name, hsl } } = this.props;

    return (
      <Segment basic={true} inverted={true} onClick={() => this.toggleDetails()} as="div" className="show-component">
        <Header as="p">
          {name}
          {' '}
          <Icon name="chevron right" rotated={active && 'clockwise'} />
        </Header>
        { active && <ArtistDetails artist={artist} /> }
        { hsl && <div className="primary-gradient" style={{ background: `linear-gradient(to right, ${hsl})` }} /> }
      </Segment>
    );
  }
}

Artist.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hsl: PropTypes.string.isRequired,
  }).isRequired,
};


export default Artist;
