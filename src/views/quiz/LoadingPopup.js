import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingPopup = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data from an API)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {"Please wait....."}
        </div>
      )}
    </div>
  );
};

export default LoadingPopup;