import { fetchArtists, fetchRaves } from '../apiAdapter'

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

export const loadRaves = (locationId) => {
  return function(dispatch){
    return fetchRaves()
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: "LOAD_RAVES",
        payload: json.raves
      })
    })

  }
}
