import { fetchArtists, fetchShows } from '../apiAdapter'

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
    return fetchShows()
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: "LOAD_SHOWS",
        payload: json.shows
      })
    })

  }
}
