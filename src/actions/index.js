export const loadArtists = (artist) => {
  return function(dispatch){
    return fetch('http://localhost:3001/api/v1/artists')
    .then(res => res.json())
    .then(artists => {
      dispatch({
        type: "LOAD_ARTISTS",
        payload: artists
      })
    })

  }
}

export const updateRelatedArtists = (artist) => {
  return function(dispatch){
    return fetch(`http://localhost:3001/api/v1/artists/${artist.id}/find_related`)
    .then(res => res.json())
    .then(artist => {
      dispatch({
        type: "UPDATE_RELATED_ARTISTS",
        payload: artist
      })
    })

  }
}
