import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const Map = () => {

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // return (
  //   <div>
  //     <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '100vh', width: '100vw'}}>
  //             <TileLayer
  //               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //             />
  //             <Marker position={position}>
  //               <Popup>
  //                 A pretty CSS3 popup. <br /> Easily customizable.
  //               </Popup>
  //             </Marker>
  //           </MapContainer>
  //   </div>
  // )

  return position ? (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100vw' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <p>Loading your location...</p>
  );
}

export default Map