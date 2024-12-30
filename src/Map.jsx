import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MdLocationOn } from "react-icons/md";
import marker from './assets/react.svg';

const MapRotationControl = () => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      // Apply a CSS transform to rotate the map container
      map.getContainer().style.transform = 'rotate(0deg)'; // Set initial rotation angle (adjust as needed)

      return () => {
        // Clean up the rotation if needed
        map.getContainer().style.transform = ''; // Remove transformation on cleanup
      };
    }
  }, [map]);

  return null;
};

const Map = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        console.log(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location", error);
      },
      {
        enableHighAccuracy: true,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const myIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/isometric/50/truck.png",
    iconRetinaUrl: 'https://img.icons8.com/isometric/50/truck.png',
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  return position ? (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* MapRotationControl enables map rotation */}
        <MapRotationControl />
        <Marker position={position} icon={myIcon}>
          <Popup>
            Your Live Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <p>Loading your location...</p>
  );
};

export default Map;
