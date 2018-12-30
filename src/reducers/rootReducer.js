import { NYC } from '../common/locations';

export default function rootReducer(state = {
  activeArtists: [],
  activeLocation: NYC,
  artists: [],
  genres: [],
  shows: [],
  onlyWeekends: true,
}, action) {
  switch (action.type) {
    case 'LOAD_ARTISTS':
      return { ...state, artists: action.payload };
    case 'SET_ARTISTS_FROM_LOCAL_STORAGE':
      return { ...state, artists: action.payload };
    case 'SET_SHOWS_FROM_LOCAL_STORAGE':
      return { ...state, shows: action.payload };
    case 'LOAD_SHOWS':
      return { ...state, shows: action.payload };
    case 'UPDATE_RELATED_ARTISTS':
      const foundArtist = state.artists.find(artist => artist.id === action.payload.id)
      const foundArtistIndex = state.artists.indexOf(foundArtist)
      const newArtists = state.artists.slice()
      newArtists[foundArtistIndex] = action.payload
      return { ...state, artists: newArtists };
    case 'FIND_NEW_ARTIST':
      return { ...state, artists: [ ...state.artists, action.payload ] };
    case 'CHANGE_LOCATION':
      return { ...state, activeLocation: action.payload };
    default:
      return state;
  };
};
