import React from 'react';

import { Switch, Route } from 'react-router-dom';
import SignUp from './components/registry/SignUp';
import LogIn from './components/registry/LogIn';
import ListingForm from './components/ListingForm';
import ListingShow from './components/ListingShow';
import UserView from './components/UserView';
import Listing from './components/Listing';

function App() {
  return (
    <div className = 'App'>
      <Switch>
        <Route path = '/SignUp'><SignUp /></Route>
        <Route path = '/LogIn'><LogIn /></Route>
        <Route path = '/Config'><UserView /></Route>
        <Route path = '/New-Listing'><ListingForm /></Route>
        <Route path = '/Property/:id' render = {(props) => <ListingShow {...props} />} />
        <Route path = '/'><Listing /></Route>
      </Switch>
    </div>
  );
}

export default App;
