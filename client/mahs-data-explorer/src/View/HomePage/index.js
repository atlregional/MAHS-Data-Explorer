import React from 'react';
import './style.css';

const HomePage = () => {
  let mobile = window.screen.width < 800;

  return mobile ? (
    // mobile device
    <>
      <div className="navbar header">App header</div>
      <div className="home-container row">
        <div className="left-column subarea-selector">SubArea selector</div>

        <div className="map-box">Map</div>

        <div className="row mobile-row">
          <div
            className="col-4 map mobile-box"
            style={{ backgroundColor: 'grey' }}
          >
            Map
          </div>
          <div
            className="col-4 chart mobile-box"
            style={{ backgroundColor: 'maroon' }}
          >
            Chart
          </div>
          <div
            className="col-4 tab mobile-box"
            style={{ backgroundColor: 'purple' }}
          >
            Tab
          </div>
        </div>
      </div>
    </>
  ) : (
    // desk/laptop screen;
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
