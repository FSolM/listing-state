import React, { useEffect } from 'react';

import UserMenu from './helpers/UserMenu';

import session from '../helpers/session';

function Listing() {
  useEffect(() => {
    if (!session.getCurrentUser()) {
      window.location.href = '/LogIn';
    }
  });

  return (
    <div className = 'listing'>
      Hello there! You're in the main part of the app
      <button onClick={() => { session.deleteCurrentUser() }}>Close session</button>
      <UserMenu />
    </div>);
}

export default Listing;
