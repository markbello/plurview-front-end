import { configure } from '@storybook/react';

function loadStories() {
  require('./stories/Show.stories.jsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
