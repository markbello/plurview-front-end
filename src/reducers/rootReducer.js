import { find } from 'lodash';
import {
  ALL_LOCATIONS,
  NYC,
} from '../common/locations';
import {
  CHANGE_LOCATION,
  LOAD_ARTISTS,
  LOAD_SHOWS,
} from '../actions/actionTypes';

export default function rootReducer(state = {
  activeArtists: [],
  activeLocationId: NYC.id,
  activeLocationName: NYC.name,
  artists: [],
  shows: [],
  onlyWeekends: true,
}, action) {
  switch (action.type) {
    case CHANGE_LOCATION:
      const newLocationObject = find(ALL_LOCATIONS, { 'id': action.newLocationId });

      return {
        ...state,
        activeLocationId: action.newLocationId,
        activeLocationName: newLocationObject.name,
      };
    case LOAD_ARTISTS:
      return { ...state, artists: action.artists };
    case LOAD_SHOWS:
      return { ...state, shows: action.shows };
    default:
      return state;
  };
};
