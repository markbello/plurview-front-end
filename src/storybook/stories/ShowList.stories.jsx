import React from 'react';
import { storiesOf } from '@storybook/react';
import ShowList from '../../components/Show/ShowList';
import defaultProps from '../../__fixtures__/ShowList';

storiesOf('ShowList Component', module)
  .add('Default Story', () => <ShowList {...defaultProps} />);
