import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import Artist from '../../../components/Artist/Artist';

describe('Artist component', () => {
  const props = {
    artist: {
      name: 'Hardwell',
      hsl: 'awesome gradient',
    },
  };

  it('Renders closed by default', () => {
    const component = shallow(<Artist { ...props } />);

    expect(component.find(Segment).length).toEqual(1);
  });

  it('Fails with bad props', () => {
    const badProps = {
      artist: {
        hsl: 'awesome gradient',
      },
    };
    const component = shallow(<Artist { ...badProps }/>)

    expect(component.debug()).toEqual('fail');
  });
});
