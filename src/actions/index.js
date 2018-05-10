import { fetchArtists, fetchRaves, fetchGenres, fetchGenreArtists, fetchRelatedArtists, fetchNewArtist } from '../apiAdapter'

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

export const loadGenres = (genres) => {
  return function(dispatch){
    return fetchGenres()
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
    return fetchGenreArtists(genre)
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
    return fetchRelatedArtists(artist)
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
    return fetchNewArtist(artistId)
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
