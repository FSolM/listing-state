const initialState = { user: document.cookies.split('=')[1] || '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      document.cookie = `user=${action.payload}`;
      return Object.assign({}, state, {user: action.payload });
    default:
      return state;
  }
}
