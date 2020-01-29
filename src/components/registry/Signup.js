import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import bcrypt from 'bcryptjs';

import session from '../../helpers/session';

import '../../css/Signup.css';

function Signup() {
  useEffect(() => {
    console.log(session.getCurrentUser())
    if (session.getCurrentUser()) {
      window.location.href = '/';
    }
  });

  let [alerts, setAlerts] = useState('');

  const getData = () => ({
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
    password_confirmation: document.getElementById('password_confirmation').value,
  });
  
  const clearPassword = () => {
    document.getElementById('password').value = '';
    document.getElementById('password_confirmation').value = '';
  };

  const clearData = () => {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password_confirmation').value = '';
  };

  const handleResponse = (data, username) => {
    switch(data.code) {
      case 101:
        clearData();
        session.setCurrentUser(username);
        window.location.href = '/';
        break;
      case 3003:
      case 3004:
        console.error(`Server response: ${data.message}`);
        setAlerts(<div className = 'col-12'>There was a problem with the server: {data.message}</div>);
        clearData();
        break;
      default:
        console.error('Unknown answer');
        break;
    }
  };

  const axiosRequest = (payload, hash) => {
    axios.post('http://192.168.1.81:3000/api/user/signup', { username: payload.username, password: hash })
      .then((res) => { handleResponse(res.data, payload.username) })
      .catch((err) => {
        console.error(`There was an error in axios ${err}`);
        setAlerts(<div className = 'col-12'>There was a connection error. Try again later</div>);
        clearPassword();
      });
  };

  const bcryptHash = (payload) => {
    bcrypt.hash(payload.password, (Math.floor(Math.random() * 10) + 10))
      .then((hash) => { axiosRequest(payload, hash) })
      .catch((err) => {
        console.error(`There was an error in bcrypt ${err}`);
        setAlerts(<div className = 'col-12'>There was an error while processing your request. Try again later</div>)
        clearPassword();
      });
  };

  const handlePayload = (e) => {
    e.preventDefault();
    
    setAlerts('');
    const payload = getData();

    if (payload.password === payload.password_confirmation) {
      bcryptHash(payload);
    } else {
      setAlerts(<div className = 'col-12'>Passwords must match</div>);
      clearPassword();
    }
  };
  
  return (
    <form onSubmit = {(e) => { handlePayload(e) } }>
      <div className = 'container signup-page'>
        <div className = 'row'>Logo</div>
        <div className = 'row'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' required />
        </div>
        <div className = 'row alert'>{alerts}</div>
        <div className = 'row'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' minLength = '6' required />
        </div>
        <div className = 'row'>
          <label htmlFor='password_confirmation'>Confirm your password</label>
          <input type='password' id='password_confirmation' name='password_confirmation' minLength = '6' required />
          <Link to = '/LogIn'>You already have an account?</Link>
        </div>
        <div className = 'row'>
          <button>Sign me in!</button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
