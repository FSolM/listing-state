import React from 'react';

function ListingForm() {
  const handlePayload = () => {
    // Does something
  };
  
  return (
    <form onSubmit = {() => { handlePayload() }}>
      <div className = 'container listing-form'>
        Hello there!
      </div>
    </form>
  );
}

export default ListingForm;
