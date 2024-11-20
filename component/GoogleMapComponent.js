import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const GoogleMapComponent = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const address = 'Via della Zarga, 42, 38015 Lavis, Italy'; // L'indirizzo da geocodificare

  useEffect(() => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder(); // Corretta istanza del geocoder
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          // Stampa per verificare le coordinate restituite
          console.log('Coordinate ottenute:', results[0].geometry.location);
          setCoordinates(results[0].geometry.location); // Imposta le coordinate
        } else {
          console.error('Errore nella geocodifica: ' + status);
        }
      });
    } else {
      console.error('Google Maps non è stato caricato correttamente.');
    }
  }, []); // Esegui l'effetto solo al primo montaggio del componente

  useEffect(() => {
    console.log('Coordinates state updated:', coordinates);
  }, [coordinates]); // Questo effetto ci aiuta a monitorare le modifiche delle coordinate

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
      onLoad={() => setMapLoaded(true)}
    >
      {mapLoaded && coordinates.lat !== 0 && coordinates.lng !== 0 && (
        <Marker position={coordinates} />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
