import { fetchArtists, fetchShows, fetchInitialShows } from '../apiAdapter'

export const loadArtists = () => {
  return function(dispatch){
    return fetchArtists()
    .then(res => res.json())
    .then(artists => {
      localStorage.setItem('artistsList', JSON.stringify(artists));
      dispatch({
        type: "LOAD_ARTISTS",
        payload: artists
      })
    })
  }
}

export const setArtistsFromLocalStorage = () => {
  const artists = JSON.parse(localStorage.getItem('artistsList'));
  return function(dispatch){
    dispatch({
      type: "SET_ARTISTS_FROM_LOCAL_STORAGE",
      payload: artists
    })
  }
}

export const loadShows = ({ id: locationId }) => {
  return function(dispatch){
    return fetchShows(locationId)
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('showList', JSON.stringify(json.shows))
      dispatch({
        type: "LOAD_SHOWS",
        payload: json.shows
      })
    })
  }
}

export const setShowsFromLocalStorage = () => {
  const shows = JSON.parse(localStorage.getItem('showList'));
  return function(dispatch){
    dispatch({
      type: "SET_SHOWS_FROM_LOCAL_STORAGE",
      payload: shows
    })
  }
}

export const loadInitialShows = () => {
  return function(dispatch){
    return fetchInitialShows()
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: "LOAD_SHOWS",
        payload: json.shows
      });
    });
  };
};

export const changeLocation = newLocation => ({
  type: 'CHANGE_LOCATION',
  newLocation,
});

export const setLocationName = locationName => {
  return function(dispatch) {
    dispatch({
      type: "SET_LOCATION_NAME",
      payload: locationName,
    });
  };
};
