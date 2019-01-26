import React from 'react';
import { shallow } from 'enzyme';
import ShowList from '../../../components/Show/ShowList';
import defaultProps from '../../../__fixtures__/ShowList';

const props = {
  activeLocationName: defaultProps.activeLocationName,
  allArtists: defaultProps.allArtists,
  isWeekendsOnly: defaultProps.isWeekendsOnly,
  shows: defaultProps.shows,
};

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
];

describe('ShowList component', () => {
  it('only renders weekend shows by default', () => {
    const component = shallow(<ShowList {...props} />);

    WEEKDAYS.map(weekday => (
      expect(component.debug()).not.toContain(weekday)
    ));
  });
  it('renders weekday shows when !isWeekendsOnly', () => {
    const allWeekProps = {
      ...props,
      isWeekendsOnly: false,
    };

    const component = shallow(<ShowList {...allWeekProps} />);

    expect(component.debug()).toContain('Wednesday');
  });
});
