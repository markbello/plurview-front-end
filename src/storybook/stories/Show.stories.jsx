import React from 'react';
import { storiesOf } from '@storybook/react';
import Show from '../../components/Show';

const props = {
  venueName: 'Terminal 5',
  location: '70',
  ticketLink: '#',
  ages: '18+',
  name: 'Bass in Ya Face',
  festivalInd: false,
  id: '123',
};

storiesOf('Show Component', module)
  .add('Default Story', () => <Show { ...props} />)
