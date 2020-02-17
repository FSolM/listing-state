import React, { useState } from 'react';

import { connect } from 'react-redux';

import axios from 'axios';

import '../css/ListingForm.css';

const mapStateToProps = (state) => ({ user: state.session.user });

function ListingForm(props) {
  const renderNumberOptions = () => [1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option value = {number} key = {number}>{number}</option>)

  let [alerts, setAlerts] = useState('');

  const getData = (form) => new FormData(form);

  const clearData = () => {
    document.getElementById('property-name').value = '';
    document.getElementById('property-price').value = '';
    document.getElementById('property-description').value = '';
    document.getElementById('property-images').value = '';
    document.getElementById('property-address').value = '';
    document.getElementById('property-type').value = '';
    document.getElementById('property-bedrooms').value = '';
    document.getElementById('property-bathrooms').value = '';
    document.getElementById('property-size').value = '';
  };

  const handleResponse = (data) => {
    switch (data.code) {
      case 101:
        clearData();
        window.location.href = '/';
        break;
      case 3100:
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
    axios.post('http://192.168.1.81:3000/api/property/create', payload)
      .then((res) => { handleResponse(res.data); })
      .catch((err) => {
        console.error(`There was an error in axios ${err}`);
        setAlerts(<div className = 'col-12'>There was a connection error. Try again later</div>);
        clearData();
      });
  };

  const handlePayload = (e) => {
    e.preventDefault();

    console.log('Props')
    console.log(props)
    console.log(getData(e.target))

    axiosRequest(getData(e.target));
  };
  
  return (
    <form encType = 'multipart/form-data' onSubmit = {(e) => { handlePayload(e) }}>
      <div className = 'container listing-form'>
        <div className = 'row alert'>{alerts}</div>
        <div className = 'row'>
          <label htmlFor = 'property-name'>Property's Name</label>
          <input type = 'text' id = 'property-name' name = 'name' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-price'>Property's Price</label>
          <input type = 'number' id = 'property-price' name = 'price' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-description'>Description</label>
          <input type = 'text' id = 'property-description' name = 'description' />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-images'>Add Images</label>
          <input type = 'file' id = 'property-images' name = 'image' accept = 'image/png, image/jpg, image/jpeg' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-address'>Address</label>
          <input type = 'text' id = 'property-address' name = 'location' required />
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-type'>Property Type</label>
            <select id = 'property-type' name = 'property_type'>
              <option value = 'House'>House</option>
              <option value = 'Apartment'>Apartment</option>
              <option value = 'Loft'>Loft</option>
            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-bedrooms'>Bedrooms</label>
            <select id = 'property-bedrooms' name = 'bedrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-bathrooms'>Bathrooms</label>
            <select id = 'property-bathrooms' name = 'bathrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-size'>Property Size m<sup>2</sup></label>
            <input type = 'number' id = 'property-size' name = 'size' required />
          </div>
        </div>
        <div className = 'row'>
          <input type = 'hidden' id = 'property-owner' name = 'owner' value = {props.user} />
          <button>Send</button>
        </div>
      </div>
    </form>
  );
}

export default connect(mapStateToProps)(ListingForm);
