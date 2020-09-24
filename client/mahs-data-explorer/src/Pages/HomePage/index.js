import React from 'react';
import './style.css';

const HomePage = () => {
  return (
    <>
      <div className="navbar header">Home Page</div>
      <div className="home-container row">
        <div className="left-column subarea-selector">SubArea selector</div>

        <div className="map-box">Map</div>

        <div className="parent-box">
          <div className="chart top-box">Chart</div>
          <div className="tab bottom-box">Tab</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
