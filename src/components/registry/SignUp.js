import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, connect } from 'react-redux';

import axios from 'axios';
import bcrypt from 'bcryptjs';

import { setSession } from '../../actions/index';

import '../../css/SignUp.css';

const mapStateToProps = (state) => ({ user: state.user });

function SignUp(props) {
  const dispatch = useDispatch();

  let [alerts, setAlerts] = useState('');

  useEffect(() => {
    if (props.user) {
      window.location.href = '/';
    }
  }, [props.user]);

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
    switch (data.code) {
      case 101:
        clearData();
        dispatch(setSession(username));
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
        <div className = 'row'>
          <svg height = '30%' width = '45%' viewBox = '0 0 2500 2500' style = {{ fill: '#c500cd', margin: '0 auto' }}><path d='M1283.5 24.7c-4.4.2-202 .4-439.2.5l-431.1.3-2.5 2.3-2.4 2.2-.7 121.3c-.8 157.9-.8 1979.5 0 2129.1l.7 114.8 2.3 2.8c2.3 2.7 2.4 2.7 19.2 3.3 21.4.9 1716.1.7 1730.1-.2 9.9-.6 10.5-.7 12.5-3.4l2.1-2.8.2-1179.7c.1-953.5-.1-1180.3-1.2-1182.7-.7-1.6-2.2-3.9-3.5-5-2.2-2-3.8-2-347.4-2.3-189.8-.1-386.9-.3-438.1-.5-51.1-.1-96.6-.1-101 0zm-677.8 188c-.2 2.7-.3.5-.3-4.7s.1-7.4.3-4.8c.2 2.7.2 6.9 0 9.5zm638.7-2c.3 2.1.6 120.7.6 263.6V734l-309.9-.2c-170.5-.2-310.2-.5-310.5-.8-.3-.3-.6-118.6-.8-262.7l-.3-262.2 5-.4c2.8-.2 142.3-.4 310.1-.5l305.1-.2.7 3.7zm721 4c.3 4.2.6 122.7.6 263.5V734h-323.7c-178.1 0-325.5-.3-327.5-.6l-3.8-.7V208.1l2.8-.4c1.5-.2 148.5-.5 326.8-.6l324.1-.1.7 7.7zm-701.7 517.5c-.2 1.3-.4.3-.4-2.2s.2-3.5.4-2.3c.2 1.3.2 3.3 0 4.5zm-307.9 36.5c-7.5.2-20.1.2-28 0-7.9-.1-1.7-.3 13.7-.3 15.4 0 21.8.2 14.3.3zm288.6 19.9c.3.9.6 106.8.6 235.5V1258H938.3c-168.8 0-308.5-.3-310.5-.6l-3.8-.7V788.1l2.8-.4c1.5-.2 140.9-.5 309.8-.6 279.3-.1 307.2 0 307.8 1.5zm721 .1c.5 2.1 1 215.3.8 365l-.2 104.3h-323.7c-178.1 0-325.5-.3-327.5-.6l-3.8-.7V788.1l2.8-.4c1.5-.2 148.6-.5 326.9-.6 307.9-.1 324.2 0 324.7 1.6zm-701.7 467.5c-.2 1.3-.4.3-.4-2.2s.2-3.5.4-2.3c.2 1.3.2 3.3 0 4.5zm-19.3 60.9c.3 3.4.6 202.1.6 441.5V2194H941.3c-167.1 0-306.8-.3-310.5-.7l-6.8-.6v-880.6l2.8-.4c1.5-.2 140.9-.5 309.8-.6l307.1-.1.7 6.1zm720.9.1c.6 6 .8 199.8.7 662V2194h-323.7c-178.1 0-325.5-.3-327.5-.6l-3.8-.7v-880.6l2.8-.4c1.5-.2 148.6-.5 326.8-.6l324.1-.1.6 6.2z'/></svg>
        </div>
        <div className = 'row'>
          <label htmlFor='username'>Username</label>
          <input type = 'text' id = 'username' name = 'username' required />
        </div>
        <div className = 'row alert'>{alerts}</div>
        <div className = 'row'>
          <label htmlFor='password'>Password</label>
          <input type = 'password' id = 'password' name = 'password' minLength = '6' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'password_confirmation'>Confirm your password</label>
          <input type = 'password' id = 'password_confirmation' name = 'password_confirmation' minLength = '6' required />
          <Link to = '/LogIn'>You already have an account?</Link>
        </div>
        <div className = 'row'>
          <button>Sign me in!</button>
        </div>
      </div>
    </form>
  );
}

export default connect(mapStateToProps)(SignUp);
