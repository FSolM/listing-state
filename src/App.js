import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Signin from './components/registry/Signin';
import Login from './components/registry/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/SignIn'>
          <Signin />
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
