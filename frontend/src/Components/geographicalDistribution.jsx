import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Default icon URL
const defaultIconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';

const customIcon = new L.Icon({
    iconUrl: defaultIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

function GeoDistribution() {
  const [geographicalData, setGeographicalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geographicalResponse = await axios.get('http://localhost:3000/geographicaldistribution');
        console.log('Fetched data:', geographicalResponse.data);
        setGeographicalData(geographicalResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading map...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Geographical Distribution of Customers</h2>
      <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geographicalData.map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <strong>{location.city}</strong><br />
              Count: {location.count}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default GeoDistribution;
