import React from 'react';

import { Link } from 'react-router-dom';

function Login() {
  const handlePayload = () => {
    // Grabs data from inputs

    // Sends axios POST request, searches for user by username

    // Returns password, uses bcrypt to compare hashes

    // If hashes matched, user is signed in
  };

  return (
    <div className = 'login-page'>
      <label htmlFor='login_user'>Username</label>
      <input type='text' id='login_user' name='login_user' />
      <label htmlFor='login_password'>Password</label>
      <input type='password' id='login_password' name='login_password' />
      <button onClick={() => { handlePayload() }}>Log me in!</button>
      <Link to = '/signin'>You don't have an account?</Link>
    </div>
  );
}

export default Login;
