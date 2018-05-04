let API_URL

process.env.REACT_APP_STAGE === 'dev'
  ? API_URL = 'http://localhost:3001/api/v1'
  : API_URL = 'https://plurview-api.herokuapp.com/api/v1'

export const loadArtists = (artist) => {
  // alert(`${API_URL}`)
  return function(dispatch){
    return fetch(`${API_URL}/artists`)
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
    return fetch(`${API_URL}/raves`)
    .then(res => res.json())
    .then(json => {
      dispatch({
        type: "LOAD_RAVES",
        payload: json.raves
      })
    })

  }
}

export const loadGenres = (genres) => {
  return function(dispatch){
    return fetch(`${API_URL}/genres`)
    .then(res => res.json())
    .then(genres => {
      dispatch({
        type: "LOAD_GENRES",
        payload: genres
      })
    })
  }
}

export const loadGenreArtists = (genre) => {
  return function(dispatch){
    return fetch(`${API_URL}/genres/${genre.id}`)
    .then(res => res.json())
    .then(artists => {
      dispatch({
        type: "LOAD_GENRE_ARTISTS",
        payload: {artists: artists, genreId: genre.id, genre: genre, searchTerm: genre.name}
      })
    })
  }
}

export const updateRelatedArtists = (artist) => {
  return function(dispatch){
    return fetch(`${API_URL}/artists/${artist.id}/find_related`)
    .then(res => res.json())
    .then(artist => {
      dispatch({
        type: "UPDATE_RELATED_ARTISTS",
        payload: artist
      })
    })
  }
}

export const findNewArtist = (artistId) => {
  return function(dispatch){
    return fetch(`${API_URL}/artists/find_new`, {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        artistId: artistId
      })
    })
    .then(res => res.json())
    .then(artist => {
      dispatch({
        type: "FIND_NEW_ARTIST",
        payload: artist
      })
    })
  }
}

export const sortArtists = (term) => {
  return { type: 'SORT_ARTISTS', payload: term}
}

export const filterArtists = (artists, searchTerm) => {
  return { type: 'FILTER_ARTISTS', payload: {artists: artists, searchTerm: searchTerm}}
}

export const filterGenre = (genre) => {
  return { type: 'FILTER_GENRE', payload: [genre]}
}
