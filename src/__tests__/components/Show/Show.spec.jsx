import React from 'react';
import { Segment } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import Show from '../../../components/Show/Show';
import {
  defaultProps,
  TEST_LOCATION_NAME,
  TEST_SHOW_NAME,
  TEST_VENUE_NAME,
} from '../../__fixtures__/Show';

const props ={
  ages: defaultProps.ages,
  allArtists: defaultProps.allArtists,
  artistList: defaultProps.artistList,
  isFestival: defaultProps.isFestival,
  location: defaultProps.location,
  name: defaultProps.name,
  ticketLink: defaultProps.ticketLink,
  venueName: defaultProps.venueName,
};

describe('Show component', () => {
  it('uses only the raw location name if no ages are supplied', () => {
    const component = shallow(<Show {...props} />);

    const locationName = component.find('em').last().text();

    expect(locationName).toEqual(props.location);
  })
  it('appends ages metadata to location when supplied', () => {
    const withAgesProps = {
      ...props,
      ages: '18+',
    };

    const component = shallow(<Show {...withAgesProps} />);

    const locationName = component.find('em').last().text();

    expect(locationName).toContain(withAgesProps.ages);
  });
  it('renders show name when provided', () => {
    const withNameProps = {
      ...props,
      name: TEST_SHOW_NAME,
    };

    const component = shallow(<Show {...withNameProps} />);

    const showName = component.find('em').last().text();

    expect(showName).toEqual(TEST_SHOW_NAME);
  });
  it('appends festival indicator to show name when isFestival', () => {
    const withNameProps = {
      ...props,
      isFestival: true,
      name: TEST_SHOW_NAME,
    };

    const component = shallow(<Show {...withNameProps} />);

    const showName = component.find('em').last().text();

    expect(showName).toContain(' - Festival');
  });
});
