import {
  ALL_LOCATIONS,
  NYC,
} from '../../common/locations';
import {
  CHANGE_LOCATION,
  LOAD_ARTISTS,
  LOAD_SHOWS,
} from '../../actions/actionTypes';
import {
  PHILADELPHIA_ID,
  PHILADELPHIA_OBJECT,
} from '../__fixtures__/locations';
import reducer from '../../reducers/rootReducer';

const defaultState = reducer(undefined, { type: '@@INIT' });

describe('reducer', () => {
  describe('@@INIT', () => {
    it('returns the correct defaultState', () => {
      const expectedState = {
        activeArtists: [],
        activeLocationId: NYC.id,
        activeLocationName: NYC.name,
        allArtists: [],
        shows: [],
        onlyWeekends: true,
      };

      expect(defaultState).toEqual(expectedState);
    });
  });
  describe('CHANGE_LOCATION', () => {
    it('parses in the new activeLocationName based on newLocationId', () => {
      const changeLocationAction = {
        type: CHANGE_LOCATION,
        newLocationId: PHILADELPHIA_ID,
      };

      const testState = reducer(undefined, changeLocationAction);

      const expectedState = {
        ...defaultState,
        activeLocationId: PHILADELPHIA_ID,
        activeLocationName: PHILADELPHIA_OBJECT.name,
      };

      expect(testState).toEqual(expectedState);
    });
  });
  describe('LOAD_ARTISTS', () => {
    it('sets an array of artists', () => {
      const loadArtistsAction = {
        type: LOAD_ARTISTS,
        artists: ['testArtist'],
      };

      const testState = reducer(undefined, loadArtistsAction);

      const expectedState = {
        ...defaultState,
        allArtists: ['testArtist'],
      };

      expect(testState).toEqual(expectedState);
    });
  });
  describe('LOAD_SHOWS', () => {
    it('sets an array of shows', () => {
      const loadShowsAction = {
        type: LOAD_SHOWS,
        shows: ['testShow'],
      };

      const testState = reducer(undefined, loadShowsAction);

      const expectedState = {
        ...defaultState,
        shows: ['testShow'],
      };

      expect(testState).toEqual(expectedState);
    });
  });
});
