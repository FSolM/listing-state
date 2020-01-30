import React from 'react';

function ListingForm() {
  const renderNumberOptions = () => [1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option value = {number}>{number}</option>)

  const handlePayload = () => {
    // Does something
  };
  
  return (
    <form onSubmit = {() => { handlePayload() }}>
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
          <label htmlFor = 'property-address'>Address</label>
          <input type = 'text' id = 'property-address' name = 'property-address' required />
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-type'>Property Type</label>
            <select id = 'property-type' name = 'property-type'>

            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-bedrooms'>Number of Bedrooms</label>
            <select id = 'property-bedrooms' name = 'property-bedrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-6'>
            <label htmlFor = 'property-bathrooms'>Number of Bathrooms</label>
            <select id = 'property-bathrooms' name = 'property-bathrooms' required>
              {renderNumberOptions()}
            </select>
          </div>
          <div className = 'col-6'>
            <label htmlFor = 'property-size'>Property Size in square meters</label>
            <input type = 'number' id = 'property-size' name = 'property-size' />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ListingForm;
