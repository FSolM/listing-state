import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Signup from './components/registry/Signup';
import Login from './components/registry/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/SignUp'>
          <Signup />
        </Route>
        <Route path = '/LogIn'>
          <Login />
        </Route>
        <Route path = '/'></Route>
      </Switch>
    </div>
  );
}

export default App;
