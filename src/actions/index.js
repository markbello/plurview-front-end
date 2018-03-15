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
