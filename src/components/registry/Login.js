import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import bcrypt from 'bcryptjs';

function Login() {
  const axiosRequest = (payload) => {
    axios.post('http://localhost:3001/api/user/login', { username: payload.username })
      .then((res) => {
        console.log(bcrypt.compareSync(payload.password, res.data.payload[0].password))
      })
      .catch((err) => {
        // Catches axios error
        console.log('There was a problem with the axios request');
        console.log(err)
      })
  };

  const getData = () => ({
    username: document.getElementById('login_user').value,
    password: document.getElementById('login_password').value,
  });

  const handlePayload = () => {
    axiosRequest(getData());

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
