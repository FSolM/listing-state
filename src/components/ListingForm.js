import React from 'react';

import axios from 'axios';

import session from '../helpers/session';

import '../css/ListingForm.css';

function ListingForm() {
  const renderNumberOptions = () => [1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option value = {number} key = {number}>{number}</option>)

  const getData = () => ({
    name: document.getElementById('property-name').value,
    price: document.getElementById('property-price').value,
    description: document.getElementById('property-description').value,
    images: document.getElementById('property-images').value,
    location: document.getElementById('property-address').value,
    type: document.getElementById('property-type').value,
    bedrooms: document.getElementById('property-bedrooms').value,
    bathrooms: document.getElementById('property-bathrooms').value,
    size: document.getElementById('property-size').value,
    owner: session.getCurrentUser(),
  });

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
    // Does something with the data
  };

  const axiosRequest = (payload) => {
    axios.post('http://192.168.1.81:3000/api/property/create', { name: payload.name,
                                                                 price: payload.price,
                                                                 description: payload.description,
                                                                 location: payload.location,
                                                                 type: payload.type,
                                                                 bedrooms: payload.bedrooms,
                                                                 bathrooms: payload.bathrooms,
                                                                 size: payload.size,
                                                                 owner: payload.owner, })
      .then((res) => { handleResponse(res.data); })
      .catch((err) => { console.error(`There was an error in axios ${err}`); })
  };

  const handlePayload = (e) => {
    e.preventDefault();

    axiosRequest(getData());
  };
  
  return (
    <form onSubmit = {(e) => { handlePayload(e) }}>
      <div className = 'container listing-form'>
        <div className = 'row'>
          <label htmlFor = 'property-name'>Property's Name</label>
          <input type = 'text' id = 'property-name' name = 'property-name' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-price'>Property's Price</label>
          <input type = 'number' id = 'property-price' name = 'property-price' required />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-description'>Description</label>
          <input type = 'text' id = 'property-description' name = 'property-description' />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-images'>Add Images</label>
          <input type = 'file' id = 'property-images' name = 'property-images' accept = 'image/png, image/jpeg' />
        </div>
        <div className = 'row'>
          <label htmlFor = 'property-address'>Address</label>
          <input type = 'text' id = 'property-address' name = 'property-address' required />
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-type'>Property Type</label>
            <select id = 'property-type' name = 'property-type'>
              <option value = 'House'>House</option>
              <option value = 'Apartment'>Apartment</option>
              <option value = 'Loft'>Loft</option>
            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-bedrooms'>Bedrooms</label>
            <select id = 'property-bedrooms' name = 'property-bedrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-bathrooms'>Bathrooms</label>
            <select id = 'property-bathrooms' name = 'property-bathrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-size'>Property Size m<sup>2</sup></label>
            <input type = 'number' id = 'property-size' name = 'property-size' />
          </div>
        </div>
        <div className = 'row'>
          <button>Send</button>
        </div>
      </div>
    </form>
  );
}

export default ListingForm;
