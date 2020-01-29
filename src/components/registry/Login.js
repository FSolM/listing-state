import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import bcrypt from 'bcryptjs';

import session from '../../helpers/session';

import '../../css/LogIn.css';

function LogIn() {
  useEffect(() => {
    if (session.getCurrentUser()) {
      window.location.href = '/';
    }
  });

  let [alerts, setAlerts] = useState('');

  const getData = () => ({
    username: document.getElementById('login_user').value,
    password: document.getElementById('login_password').value,
  });

  const clearData = () => {
    document.getElementById('login_user').value = '';
    document.getElementById('login_password').value = '';
  };

  const clearPassword = () => { document.getElementById('login_password').value = ''; };

  const handleResponse = (data, username, password) => {
    switch(data.code) {
      case 101:
        if (bcrypt.compareSync(password, data.payload[0].password)) {
          clearData();
          session.setCurrentUser(username);
          window.location.href = '/';
        } else {
          clearPassword();
          setAlerts(<div className = 'col-12'>Password is incorrect</div>);
        }
        break;
      case 3001:
      case 3002:
        console.error(`Server response: ${data.message}`);
        setAlerts(<div className = 'col-12'>There was a problem with the server: {data.message}</div>);
        clearData();
        break;
      default:
        console.error('Unknown answer');
        break;
    }
  };

  const axiosRequest = (payload) => {
    axios.post('http://192.168.1.81:3000/api/user/login', { username: payload.username })
      .then((res) => { handleResponse(res.data, payload.username, payload.password); })
      .catch((err) => {
        console.error(`There was an error in axios ${err}`);
        setAlerts(<div className = 'col-12'>There was a connection error. Try again later</div>);
        clearPassword();
      })
  };

  const handlePayload = (e) => {
    e.preventDefault();

    setAlerts('');
    axiosRequest(getData());
  };

  return (
    <form onSubmit = {(e) => { handlePayload(e) }}>
      <div className = 'container login-page'>
        <div className = 'row'>Logo</div>
        <div className = 'row'>
          <label htmlFor='login_user'>Username</label>
          <input type='text' id='login_user' name='login_user' />
        </div>
        <div className = 'row alert'>{alerts}</div>
        <div className = 'row'>
          <label htmlFor='login_password'>Password</label>
          <input type='password' id='login_password' name='login_password' />
          <Link to = '/SignUp'>You don't have an account?</Link>
        </div>
        <div className = 'row'>
          <button>Log me in!</button>
        </div>
      </div>
    </form>
  );
}

export default LogIn;
