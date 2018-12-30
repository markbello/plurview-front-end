import React from 'react';
import { Image } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import Logo from '../../../components/App/Logo';

describe('Logo Component', () => {
  const component = shallow(<Logo />);
  it('Renders', () => {
    expect(component.find(Image).length).toEqual(1);
  });
});
