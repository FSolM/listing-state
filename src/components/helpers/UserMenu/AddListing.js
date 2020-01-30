import React from 'react';

import '../../../css/AddListing.css';

function AddListing() {
  const handleAddListing = () => { window.location.href = '/New-Listing'; };

  return (
    <div className = 'btn-addListing'>
      <svg width="100%" height="5rem" viewBox="0 0 350 350" onClick = {() => { handleAddListing() }}><path fill="#fff" d="M-1-1h313v313H-1z"/><g><circle stroke="#c500cd" cy="155.5" cx="155.5" strokeWidth="1.5" fill="#c500cd" r="154.5"/><rect stroke="#fff" rx="5" height="161.491" width="11" y="74.754" x="150" strokeWidth="1.5" fill="#fff"/><rect transform="rotate(90 155.5 155.5)" stroke="#fff" rx="5" height="161.491" width="11" y="74.754" x="150" strokeWidth="1.5" fill="#fff"/></g></svg>
    </div>
  );
}

export default AddListing;
