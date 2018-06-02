import { fetchArtists, fetchShows, fetchInitialShows } from '../apiAdapter'

export const loadArtists = (artist) => {
  return function(dispatch){
    return fetchArtists()
    .then(res => res.json())
    .then(artists => {
      dispatch({
        type: "LOAD_ARTISTS",
        payload: artists
      })
    })

  }
}

export const loadShows = (locationId) => {
  return function(dispatch){
    return fetchShows(locationId)
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: "LOAD_SHOWS",
        payload: json.shows
      })
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
      })
    })
  }
}

export const changeLocation = (locationId) => {
  return function(dispatch){
    dispatch({
      type: "CHANGE_LOCATION",
      payload: locationId
    })
  }
}
