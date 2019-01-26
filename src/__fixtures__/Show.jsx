import allArtists from './artists';
import { PHILADELPHIA_OBJECT } from './locations';

export const TEST_LOCATION_NAME = PHILADELPHIA_OBJECT.name;
export const TEST_VENUE_NAME = 'Electric Factory';
export const TEST_SHOW_NAME = 'Super Groovy-Ass Rave';

export const defaultProps = {
  ages: null,
  allArtists,
  artistList: [allArtists[0]],
  isFestival: false,
  location: TEST_LOCATION_NAME,
  name: null,
  ticketLink: '#',
  venueName: TEST_VENUE_NAME,
};
