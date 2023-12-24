import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoaderComponent.css'; // Create a separate CSS file for styling

const LoaderComponent = () => {
  return (
    <div className="loader-container">
      <div className="loader-overlay"></div>
      <div className="loader-content">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default LoaderComponent;