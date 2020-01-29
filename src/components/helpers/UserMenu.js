import React from 'react';

import AddListing from './UserMenu/AddListing';

import '../../css/UserMenu.css';

function UserMenu() {
  return (
    <div className = 'container user-menu'>
      <div className = 'row'>
        <div className = 'col-4 favourites'>Favourites Container</div>
        <div className = 'col-4 add-listing'><AddListing /></div>
        <div className = 'col-4 profile'>Profile Container</div>
      </div>
    </div>
  );
}

export default UserMenu;
