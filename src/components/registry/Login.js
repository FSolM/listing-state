import React from 'react';

import axios from 'axios';
import bcrypt from 'bcryptjs';

function Login() {
  const getData = () => ({
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    password_confirmation: document.getElementById('password_confirmation').value,
  });

  const axiosRequest = (payload) => {
    console.log(payload.username)
    bcrypt.hash(payload.password, (Math.floor(Math.random() * 10) + 10))
      .then((hash) => {
        axios.post('http://localhost:3001/api/user/create', { username: payload.username, password: hash })
          .then(
            // Success case
            console.log('Success')
          ).catch((err) => {
            console.log('Axios error')
            // Catch Axios error
          })
      })
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
        axiosRequest(payload);
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

    // Clear values

    // Set session

    // Route to properties index
    
    console.log('Handling payload')
  };
  
  return (
    <div className = 'login-page'>
      <label htmlFor='username'>Username</label>
      <input type='text' id='username' name='username' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' />
      <label htmlFor='password_confirmation'>Confirm your password</label>
      <input type='password' id='password_confirmation' name='password_confirmation' />
      <button onClick={() => { handlePayload() }}>Log me in!</button>
    </div>
  );
}

export default Login;
