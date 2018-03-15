export default function rootReducer(state = {
  artists: []
}, action) {
  console.log(action)
  switch(action.type) {

    case 'LOAD_ARTISTS':
      console.log("LOAD_ARTISTS Action Payload: ", action.payload)
      return {...state, artists: action.payload}
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
