import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import {
  Checkbox,
  Menu,
  Select,
  Segment,
  Sidebar as SemanticUISidebar,
} from 'semantic-ui-react';
import { ALL_LOCATIONS } from '../../common/locations';

const Sidebar = ({
  updateActiveLocation,
  isWeekendsOnly,
  isVisible,
  activeCity,
  toggleWeekendsOnly,
}) => {
  const locationOptions = ALL_LOCATIONS.map(({ id, name }) => ({
    text: name,
    value: id,
  }));

  const weekendsOnlyLabel = isWeekendsOnly
    ? 'Weekends Only'
    : 'Raves All Week';


  return (
    <SemanticUISidebar.Pushable as={ Segment } padded basic>
      <SemanticUISidebar
        as={Menu}
        animation='push'
        width='wide'
        direction='left'
        visible={isVisible}
        icon='labeled'
        inverted
        vertical
        style={{ height: '150%' }}
      >
        <Menu.Item name='marker'>
          <Select
            placeholder={activeCity}
            options={locationOptions}
            onChange={updateActiveLocation}
            />
        </Menu.Item>
        <Menu.Item name='calendar'>
          <Checkbox
            checked={isWeekendsOnly}
            onChange={toggleWeekendsOnly}
            toggle
            label={weekendsOnlyLabel}/>
        </Menu.Item>
        <Menu.Item name='mail outline'>
          <a href='mailto:mcbello51286@gmail.com'>Contact Mark</a>
        </Menu.Item>
      </SemanticUISidebar>
      <SemanticUISidebar.Pusher style={{ background: 'transparent' }}>
        <Logo />
      </SemanticUISidebar.Pusher>
    </SemanticUISidebar.Pushable>
  );
};

Sidebar.propTypes = {
  activeCity: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isWeekendsOnly: PropTypes.bool.isRequired,
  toggleWeekendsOnly: PropTypes.func.isRequired,
  updateActiveLocation: PropTypes.func.isRequired,
};

export default Sidebar;
