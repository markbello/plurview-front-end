import {
  CHANGE_LOCATION,
  LOAD_ARTISTS,
  LOAD_SHOWS,
} from '../../actions/actionTypes';
import {
  PHILADELPHIA_ID,
  PHILADELPHIA_OBJECT,
} from '../__fixtures__/locations';
import {
  changeLocation,
  loadArtists,
  loadShows,
} from '../../actions/';
import {
  fetchArtists,
  fetchShows,
} from '../../apiAdapter';

jest.mock('../../apiAdapter', () => ({
  fetchShows: async () => jest.fn(() => Promise.resolve(true)()),
}));

describe('action creators', () => {
  describe('changeLocation', () => {
    it('passes along the newLocationId', () => {
      const payload = changeLocation(PHILADELPHIA_ID);

      const expectedPayload = {
        type: CHANGE_LOCATION,
        newLocationId: PHILADELPHIA_ID,
      };

      expect(payload).toEqual(expectedPayload);
    });
  });
  describe('loadShows', () => {
    it('creates a thunk with locationId to fetch shows from API', () => {
      const dispatch = jest.fn(() => Promise.resolve(true));

      loadShows(PHILADELPHIA_ID)(dispatch);
      expect(fetchShows).toHaveBeenCalled();
    });
  })
});
