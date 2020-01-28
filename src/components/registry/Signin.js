import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import bcrypt from 'bcryptjs';

function Signin() {
  const getData = () => ({
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    password_confirmation: document.getElementById('password_confirmation').value,
  });

  const axiosRequest = (payload, hash) => {
    axios.post('http://localhost:3001/api/user/signin', { username: payload.username, password: hash })
      .then(
        // Success case
        console.log('Success')
      ).catch((err) => {
        console.log('Axios error')
        // Catch Axios error
      });
  };

  const bcryptHash = (payload) => {
    console.log(payload.username)
    bcrypt.hash(payload.password, (Math.floor(Math.random() * 10) + 10))
      .then((hash) => { axiosRequest(payload, hash) })
      .catch((err) => {
        console.log('bcrypt error')
        // Catch error
      });
  };

  const clearPassword = () => {
    document.getElementById('password').value = '';
    document.getElementById('password_confirmation').value = '';
  };

  const clearData = () => {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password_confirmation').value = '';
  };

  const handlePayload = () => {
    const payload = getData();

    if (payload.password === payload.password_confirmation) {
      if (payload.password.length > 6) {
        bcryptHash(payload);
      } else {
        // Password is lesser or equal to 6
        // Render msg password must include more than 6 characters
        clearPassword();
      }
    } else {
      // Passwords are different
      // Render msg password must match
      clearPassword();
    }
    clearData();

    // Set session

    // Route to properties index
  };
  
  return (
    <div className = 'signin-page'>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name='username' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' />
      <label htmlFor='password_confirmation'>Confirm your password</label>
      <input type='password' id='password_confirmation' name='password_confirmation' />
      <button onClick={() => { handlePayload() }}>Sign me in!</button>
      <Link to = '/LogIn'>You already have an account?</Link>
    </div>
  );
}

export default Signin;
