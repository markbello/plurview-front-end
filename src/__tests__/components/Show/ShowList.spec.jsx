import React from 'react';
import { Segment } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import ShowList from '../../../components/Show/ShowList';
import defaultProps from '../../../__fixtures__/ShowList';

const props = {
  activeLocationName: defaultProps.activeLocationName,
  allArtists: defaultProps.allArtists,
  isWeekendsOnly: defaultProps.isWeekendsOnly,
  shows: defaultProps.shows,
};

const WEEKEND_DAYS = [
  'Friday',
  'Saturday',
  'Sunday',
];

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
];

describe('ShowList component', () => {
  it('only renders weekend shows by default', () => {
    const component = shallow(<ShowList {...props} />);

    WEEKDAYS.map(weekday => {
      expect(component.debug()).not.toContain(weekday);
    });
  });
  it('only renders weekend shows by default', () => {
    const allWeekProps = {
      ...props,
      isWeekendsOnly: false,
    };

    const component = shallow(<ShowList {...allWeekProps} />);

    expect(component.debug()).toContain('Wednesday');
  });
});
