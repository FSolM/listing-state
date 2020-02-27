import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import L from 'leaflet';
import { EsriProvider } from 'leaflet-geosearch';

import 'leaflet/dist/leaflet.css';

function Map(props) {
  useEffect(() => {
    const provider = new EsriProvider();

    provider.search({ query: props.location })
      .then((res) => {
        const map = L.map('map', {
          center: [res[0].y, res[0].x],
          zoom: 17,
          zoomControl: false,
        });
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          maxZoom: 25,
          maxNativeZoom: 25,
        }).addTo(map);
    
        L.marker([res[0].y, res[0].x]).addTo(map).bindPopup(props.name).openPopup();
      })
      .catch((err) => { console.error(`An error was encountered while retrieving location data: ${err}`); })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id = 'map' style = {{ height: '25rem', width: '100vw' }}></div>;
}

Map.propTypes = { location: PropTypes.string, name : PropTypes.string };

export default Map;
