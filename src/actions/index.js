import {
  fetchArtists,
  fetchShows,
} from '../apiAdapter';
import {
  CHANGE_LOCATION,
  LOAD_ARTISTS,
  LOAD_SHOWS,
} from './actionTypes';

export const changeLocation = newLocationId => ({
  type: CHANGE_LOCATION,
  newLocationId,
});

export const loadArtists = () => {
  return function(dispatch){
    return fetchArtists()
    .then(res => res.json())
    .then(artists => {
      localStorage.setItem('artistsList', JSON.stringify(artists));
      dispatch({
        type: LOAD_ARTISTS,
        artists,
      });
    });
  };
};

export const loadShows = (locationId) => {
  return function(dispatch){
    return fetchShows(locationId)
    .then(res => res.json())
    .then(({ shows }) => {
      dispatch({
        type: LOAD_SHOWS,
        shows,
      });
    });
  };
};
