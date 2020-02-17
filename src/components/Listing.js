import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import UserMenu from './helpers/UserMenu';
import PropertyThumbnail from './helpers/PropertyThumbnail';

import axios from 'axios';

import '../css/Listing.css';

const mapStateToProps = (state) => ({ user: state.session.user });

function Listing(props) {
  let [listing, setListing] = useState([]);
  let [alerts, setAlerts] = useState('');

  const handleResponse = (listings) => { setListing(listings); };

  useEffect(() => {
    if (!props.user) {
      window.location.href = '/LogIn';
    } else {
      axios.get('http://192.168.1.81:3000/api/properties')
        .then((res) => { handleResponse(res.data.payload.data) })
        .catch((err) => {
          console.error(`There was an error in axios ${err}`);
          setAlerts(<div className = 'col-12'>There was a connection error. Try again later</div>);
        });
    }
  }, [props.user]);

  const renderListing = () => {
    if (listing.length > 0) {
      let render = [];
      listing.forEach((property) => {
        render.push(<PropertyThumbnail key = {property.id} id = {property.id} image = {property.image} price = {property.price} description = {property.description} />);
      });
      return <div className = 'row'>{render}</div>
    } else {
      return(
        <div className = 'row'>
          <div className = 'col-12 empty-msg'>Seems like there are no properties available at the moment</div>
        </div>
      );
    }
  };

  return (
    <div className = 'listing'>
      <div className = 'container'>
        <div className = 'row banner'>Listings</div>
        <div className = 'row alert'>{alerts}</div>
        <div className = 'row'>
          <div className = 'container'>{renderListing()}</div>
        </div>
      </div>
      <UserMenu />
    </div>
  );
}

export default connect(mapStateToProps)(Listing);
