import React from 'react';
import { storiesOf } from '@storybook/react';
import Show from '../../components/Show/Show';
import { defaultProps } from '../../__fixtures__/Show';

storiesOf('Show Component', module)
  .add('Default Story', () => <Show { ...defaultProps} />)
