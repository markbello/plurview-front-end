export default function rootReducer(state = {
  artists: []
}, action) {
  console.log(action)
  switch(action.type) {

    case 'LOAD_ARTISTS':
      console.log("LOAD_ARTISTS Action Payload: ", action.payload)
      return {...state, artists: action.payload}
    default:
    console.log("App initialized");

      return state;
  }
}
