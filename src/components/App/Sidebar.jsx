import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Menu,
  Select,
  Segment,
  Sidebar as SemanticUISidebar,
} from 'semantic-ui-react';
import Logo from './Logo';
import { ALL_LOCATIONS } from '../../common/locations';

const Sidebar = ({
  activeLocationName,
  changeLocation,
  loadShows,
  isVisible,
  isWeekendsOnly,
  toggleWeekendsOnly,
}) => {
  const locationOptions = ALL_LOCATIONS.map(({ id, name }) => ({
    text: name,
    value: id,
  }));

  const weekendsOnlyLabel = isWeekendsOnly
    ? 'Weekends Only'
    : 'Raves All Week';

  const updateActiveLocation = (newLocationId) => {
    changeLocation(newLocationId);
    loadShows(newLocationId);
  };

  return (
    <SemanticUISidebar.Pushable as={Segment} padded={true} basic={true}>
      <SemanticUISidebar
        as={Menu}
        animation="push"
        width="wide"
        direction="left"
        visible={isVisible}
        icon="labeled"
        inverted={true}
        vertical={true}
        style={{ height: '150%' }}
      >
        <Menu.Item name="marker">
          <Select
            placeholder={activeLocationName}
            options={locationOptions}
            onChange={(e, { value: newLocationId }) => updateActiveLocation(newLocationId)}
          />
        </Menu.Item>
        <Menu.Item name="calendar">
          <Checkbox
            checked={isWeekendsOnly}
            onChange={toggleWeekendsOnly}
            toggle={true}
            label={weekendsOnlyLabel}
          />
        </Menu.Item>
        <Menu.Item name="mail outline">
          <a href="mailto:mcbello51286@gmail.com">Contact Mark</a>
        </Menu.Item>
      </SemanticUISidebar>
      <SemanticUISidebar.Pusher style={{ background: 'transparent' }}>
        <Logo />
      </SemanticUISidebar.Pusher>
    </SemanticUISidebar.Pushable>
  );
};

Sidebar.propTypes = {
  activeLocationName: PropTypes.string.isRequired,
  changeLocation: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isWeekendsOnly: PropTypes.bool.isRequired,
  loadShows: PropTypes.func.isRequired,
  toggleWeekendsOnly: PropTypes.func.isRequired,
};

export default Sidebar;
