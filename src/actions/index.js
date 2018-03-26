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

export const loadRaves = (locationId) => {
  return function(dispatch){
    return fetch(`http://edmtrain.com/api/events?locationIds=${locationId}&client=dd19c823-0beb-4950-b036-8a2a2d55114c`)
    .then(res => res.json())
    .then(raves => {
      dispatch({
        type: "LOAD_RAVES",
        payload: raves.data
      })
    })

  }
}

export const loadGenres = (genres) => {
  return function(dispatch){
    return fetch('http://localhost:3001/api/v1/genres')
    .then(res => res.json())
    .then(genres => {
      dispatch({
        type: "LOAD_GENRES",
        payload: genres
      })
    })
  }
}

export const loadGenreArtists = (genreId) => {
  return function(dispatch){
    return fetch(`http://localhost:3001/api/v1/genres/${genreId}`)
    .then(res => res.json())
    .then(artists => {
      dispatch({
        type: "LOAD_GENRE_ARTISTS",
        payload: {artists: artists, genreId: genreId}
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

export const findNewArtist = (artistId) => {
  return function(dispatch){
    return fetch(`http://localhost:3001/api/v1/artists/find_new`, {
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

export const filterArtists = (term) => {
  return { type: 'FILTER_ARTISTS', payload: term}
}

export const filterGenre = (genre) => {
  return { type: 'FILTER_GENRE', payload: [genre]}
}
