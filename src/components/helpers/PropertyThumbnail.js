import React from 'react';
import PropTypes from 'prop-types';

import '../../css/PropertyThumbnail.css';

function PropertyThumbnail(props) {
  const getURL = () => `http://192.168.1.81:3000${props.image.url}`;

  const getDescription = () => {
    if (props.description.length > 25) {
      return `${props.description.substring(0, 25)}...`;
    } else {
      return props.description;
    }
  }

  return (
    <div className = 'col-6 property-thumbnail'>
      <div className = 'container'>
        <div className = 'row'>
          <div className = 'col-12'><img src = {getURL()} alt = ' Listing Thumbnail' /></div>
        </div>
        <div className = 'row'>
          <div className = 'col-12'>$ {props.price}</div>
          <div className = 'col-12'>{getDescription()}</div>
        </div>
      </div>
    </div>
  );
}

PropertyThumbnail.propTypes = {
  image: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
};

export default PropertyThumbnail;
