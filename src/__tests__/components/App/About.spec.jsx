import React from 'react';
import { Segment } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import About from '../../../components/App/About';

describe('About Component', () => {
  const component = shallow(<About />);

  it('Renders a closed segment by default', () => {
    expect(component.find(Segment).length).toEqual(1);
  });

  it('Displays the explainer when toggled active', () => {
    component.setState({ active: true });
    expect(component.find(Segment).length).toEqual(2);
  });
});
