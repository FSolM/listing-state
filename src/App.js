import React from 'react';

import { Switch, Route } from 'react-router-dom';
import SignUp from './components/registry/SignUp';
import LogIn from './components/registry/LogIn';
import Listing from './components/Listing';
import ListingForm from './components/ListingForm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/SignUp'>
          <SignUp />
        </Route>
        <Route path = '/LogIn'>
          <LogIn />
        </Route>
        <Route path = '/New-Listing'>
          <ListingForm />
        </Route>
        <Route path = '/'>
          <Listing />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
