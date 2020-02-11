const initialState = { user: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return Object.assign({}, state, {user: action.payload });
    default:
      return state;
  }
}
