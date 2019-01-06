const API_URL = process.env.REACT_APP_STAGE === 'dev'
  ? 'http://localhost:3001/api/v2'
  : 'https://plurview-api.herokuapp.com/api/v2'

export const fetchArtists = () => {
  return fetch(`${API_URL}/artists`)
}

export const fetchShows = (locationId) => {
  return fetch(`${API_URL}/shows/${locationId}`)
}

export const fetchRelatedArtists = (artist) => {
  return fetch(`${API_URL}/artists/${artist.id}/find_related`)
}

export const fetchShowRelatedArtists = (artist) => {
  return fetch(`${API_URL}/artists/${artist.id}/show_related`)
}

export const fetchArtistSubGenres = (artist) => {
  return fetch(`${API_URL}/artists/${artist.id}/show_genres`)
}

export const fetchColorGuide = () => {
  return fetch('https://nephewapps.com/wp-json/wp/v2/posts/264')
}
