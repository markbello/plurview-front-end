export default function rootReducer(state = {
  artists: [],
  genres: [],
  activeGenre: [],
  activeArtists: [],
  searchTerm: ''
}, action) {
  switch(action.type) {

    case 'LOAD_ARTISTS':
      return {...state, artists: action.payload}
    case 'LOAD_GENRES':
      return {...state, genres: action.payload}
    case 'LOAD_GENRE_ARTISTS':
      console.log("Mothafuckin payload: ", action.payload)
      return {...state, activeArtists: action.payload.artists, activeGenre: action.payload.genreId}
    case 'FILTER_ARTISTS':
      return {...state, searchTerm: action.payload}
    case 'FILTER_GENRE':
      return {...state, activeGenre: action.payload}
    case 'UPDATE_RELATED_ARTISTS':
      const foundArtist = state.artists.find((artist) => artist.id === action.payload.id)
      let foundArtistIndex = state.artists.indexOf(foundArtist)
      let newArtists = state.artists.slice()
      newArtists[foundArtistIndex] = action.payload
      return {...state, artists: newArtists}
    default:
    console.log("App initialized");

      return state;
  }
}
