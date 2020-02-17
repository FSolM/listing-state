const initialState = { user: document.cookie.length > 5 ? document.cookie.split('=')[1] : '' };

export default (state = initialState, action) => {
  console.log(action)
  console.log(document.cookie)
  switch (action.type) {
    case 'SET_SESSION':
      document.cookie = `user=${action.payload}`;
      return Object.assign({}, state, {user: action.payload });
    default:
      console.log('State')
      console.log(state)
      return state;
  }
}
