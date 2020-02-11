import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Map from './helpers/Map';

import axios from 'axios';

import '../css/ListingShow.css';

const mapStateToProps = (state) => ({ user: state.user });

function ListingShow({ match: { params: { id } } }) {
  let [listing, setListing] = useState({
    name: '',
    description: '',
    image: { url: '' },
    price: 0,
    location: '',
    property_type: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    owner: '',
  });
  let [map, setMap] = useState('?');

  const handleResponse = (data) => {
    switch (data.code) {
      case 101:
        setListing(data.payload.data);
        setMap(<Map location = {data.payload.data.location} name = {data.payload.data.name} />);
        break;
      case 3101:
        console.error(`Server response: ${data.message}`);
        window.location.href = '/';
        break;
      default:
        console.error('Unknown answer');
        break;
    }
  };

  const axiosRequest = () => {
    axios.get(`http://192.168.1.81:3000/api/property/${id}`)
      .then((res) => { handleResponse(res.data); })
      .catch((err) => {
        console.error(`There was an error in axios ${err}`);
        window.location.href = '/';
      });
  };

  useEffect(() => {
    if (props.user) {
      window.location.href = '/LogIn';
    } else
    if (id !== 0 && !parseInt(id)) {
      console.error('What are you doing?')
      window.location.href = '/';
    } else {
      axiosRequest();
    }
  }, []);

  const handleDeletion = () => {
    axios.delete(`http://192.168.1.81:3000/api/property/${listing.id}`)
      .then(() => { window.location.href = '/'; })
      .catch((err) => { console.error(`There was an error in axios ${err}`); })
  };

  const renderDelete = () => props.user === listing.owner ? <button onClick = {() => { handleDeletion() }}>Delete</button> : '';

  const getMonth = (month) => {
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dic';
      default:
        return '';
    }
  };

  const renderDateFormat = () => {
    if (listing.created_at) {
      let date = listing.created_at.split('-');
      return `${date[2].substring(0, 2)} ${getMonth(date[1])}, ${date[0]}`;
    } else { return listing.created_at; }
  };

  return (
    <div className = 'listing-show'>
      <div className = 'container'>
        <div className = 'row banner-image'><img src = {`http://192.168.1.81:3000${listing.image.url}`} alt = {listing.image.url} /></div>
        <div className = 'row prices'>
          <div className = 'col-6'>$ {listing.price}</div>
          <div className = 'col-6'>{renderDelete()}</div>
        </div>
        <div className = 'row description'>{listing.description}</div>
        <div className = 'row metadata'>Posted: {renderDateFormat()}</div>
        <hr />
        <div className = 'row location'>
          <div className = 'col-12'>{listing.location}</div>
          <div className = 'col-12'>
            <div className = 'container map'>{map}</div>
          </div>
        </div>
        <div className = 'row general-info'>
          <div className = 'col-6'>
            <div className = 'container'>
              <div className = 'row'>
                <div className = 'col-12'>{listing.bedrooms}</div>
                <div className = 'col-12'>Bedrooms</div>
              </div>
            </div>
          </div>
          <div className = 'col-6'>
            <div className = 'container'>
              <div className = 'row'>
                <div className = 'col-12'>{listing.bathrooms}</div>
                <div className = 'col-12'>Bathrooms</div>
              </div>
            </div>
          </div>
          <div className = 'col-6'>
            <div className = 'container'>
              <div className = 'row'>
                <div className = 'col-12'>{listing.size}</div>
                <div className = 'col-12'>Size in m<sup>2</sup></div>
              </div>
            </div>
          </div>
          <div className = 'col-6'>
            <div className = 'container'>
              <div className = 'row'>
                <div className = 'col-12'>{listing.owner}</div>
                <div className = 'col-12'>Owner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ListingShow)
