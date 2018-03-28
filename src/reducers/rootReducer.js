export default function rootReducer(state = {
  artists: [],
  genres: [],
  activeGenre: [],
  activeArtists: [],
  sortingMetric: '',
  searchTerm: '',
  raves: []
}, action) {
  switch(action.type) {

    case 'LOAD_ARTISTS':
      return {...state, artists: action.payload, activeArtists: action.payload}
    case 'LOAD_GENRES':
      return {...state, genres: action.payload}
    case 'LOAD_RAVES':
      return {...state, raves: action.payload}
    case 'LOAD_GENRE_ARTISTS':
      return {...state, activeArtists: action.payload.artists, activeGenre: action.payload.genreId}
    case 'SORT_ARTISTS':
      return {...state, sortingMetric: action.payload}
    case 'FILTER_ARTISTS':
      console.log("filter artists: ", action.payload)
      console.dir(state.activeArtists)
      return {...state, activeArtists: action.payload}
    case 'FILTER_GENRE':
      return {...state, activeGenre: action.payload}
    case 'UPDATE_RELATED_ARTISTS':
      const foundArtist = state.artists.find((artist) => artist.id === action.payload.id)
      let foundArtistIndex = state.artists.indexOf(foundArtist)
      let newArtists = state.artists.slice()
      newArtists[foundArtistIndex] = action.payload
      return {...state, artists: newArtists}
    case 'FIND_NEW_ARTIST':
      return {...state, artists: [...state.artists, action.payload]}
    default:
    console.log("App initialized");

      return state;
  }
}
