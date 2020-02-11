import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import UserMenu from './helpers/UserMenu';

import { setSession } from '../../actions/index';

import '../css/UserView.css';

const mapStateToProps = (state) => ({ user: state.user });

function UserView() {
  useEffect(() => {
    if (props.user) {
      window.location.href = '/LogIn';
    }
  }, []);

  const signOut = () => {
    setSession('');
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

export default connect(mapStateToProps)(UserView);
