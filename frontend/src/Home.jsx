import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          navigate('/map');
        },
        (error) => {
          console.error("Location permission denied", error);
        }
      );
    } else {
      alert('Geolocation is not supported by this device.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleStart}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Start
      </button>
    </div>
  );
};

export default Home;
