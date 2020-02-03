import React, { useEffect } from 'react';

import UserMenu from './helpers/UserMenu';

import session from '../helpers/session';

import '../css/UserView.css';

function UserView() {
  useEffect(() => {
    if (!session.getCurrentUser()) {
      window.location.href = '/LogIn';
    }
  }, []);

  const signOut = () => {
    session.deleteCurrentUser();
    window.location.href = '/LogIn';
  };

  return (
    <div className = 'config'>
      <div className = 'container'>
        <div className = 'row banner'>User Config</div>
        <div className = 'row sign-out' onClick = {() => { signOut() }}>Sign Out</div>
      </div>
      <UserMenu />
    </div>
  );
}

export default UserView;
