import React from 'react';
import { shallow } from 'enzyme';
import { find } from 'lodash';
import {
  Checkbox,
  Select,
} from 'semantic-ui-react';
import Sidebar from '../../../components/App/Sidebar';
import { ALL_LOCATIONS } from '../../../common/locations';

const PHILADELPHIA_ID = 79;
const PHILADELPHIA_OBJECT = find(ALL_LOCATIONS, { 'id': PHILADELPHIA_ID });

const changeLocation = jest.fn();
const loadShows = jest.fn();
const toggleWeekendsOnly = jest.fn();

const props = {
  activeCity: 'New York City',
  changeLocation,
  loadShows,
  isVisible: true,
  isWeekendsOnly: true,
  toggleWeekendsOnly,
};

describe('Sidebar component', () => {
  it('parses text and value into location options', () => {
    const component = shallow(<Sidebar {...props} />);

    const firstLocation = ALL_LOCATIONS[0];
    const firstDropdownOption = component.find(Select).prop('options')[0];

    expect(firstDropdownOption).toEqual({
      text: firstLocation.name,
      value: firstLocation.id,
    });
  });
  it('creates location dropdown options for all available locations', () => {
    const component = shallow(<Sidebar {...props} />);

    const dropdownOptions = component.find(Select).prop('options');
    expect(dropdownOptions.length).toEqual(ALL_LOCATIONS.length);
  });
  it('calls changeLocation with the full location object when updateActiveLocation', () => {
    const component = shallow(<Sidebar {...props} />);

    const dropdownOnChange = component.find(Select).prop('onChange');
    dropdownOnChange(undefined, { value: PHILADELPHIA_ID });

    expect(changeLocation).toHaveBeenCalledWith(PHILADELPHIA_OBJECT);
  });
  it('calls loadShows with the full location object when updateActiveLocation', () => {
    const component = shallow(<Sidebar {...props} />);

    const dropdownOnChange = component.find(Select).prop('onChange');
    dropdownOnChange(undefined, { value: PHILADELPHIA_ID });

    expect(loadShows).toHaveBeenCalledWith(PHILADELPHIA_OBJECT);
  });
  it('labels the weekendsOnly toggle "Weekends Only" when isWeekendsOnly', () => {
    const component = shallow(<Sidebar {...props} />);

    const weekendsOnlyLabel = component.find(Checkbox).prop('label');
    expect(weekendsOnlyLabel).toEqual('Weekends Only');
  });
  it('labels the weekendsOnly toggle "Raves All Week" when !isWeekendsOnly', () => {
    const allWeekProps = {
      ...props,
      isWeekendsOnly: false,
    };

    const component = shallow(<Sidebar {...allWeekProps} />);

    const weekendsOnlyLabel = component.find(Checkbox).prop('label');
    expect(weekendsOnlyLabel).toEqual('Raves All Week');
  });
});
