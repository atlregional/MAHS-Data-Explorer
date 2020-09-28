import React from 'react';
import NavBar from '../../components/navbar';
import SubArea from '../../components/SubArea';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';

import './style.css';

const HomePage = () => {
  // you will need to reload the page under new screen size but works just fine for implementation.
  let mobile = window.screen.width < 800;

  return mobile ? (
    // mobile device
    <>
      <div className="home-container row">
        <div className="navbar header">
          <NavBar />
        </div>

        <div className="left-column subarea-selector">
          <SubArea />
        </div>

        <div className="map-box">
          <MapComp />
        </div>

        <div className="row mobile-row">
          <div
            className="col-sm-4 map mobile-box"
            style={{ backgroundColor: 'grey' }}
          >
            Map
          </div>
          <div
            className="col-sm-4 chart mobile-box"
            style={{ backgroundColor: 'maroon' }}
          >
            <Chart />
          </div>
          <div
            className="col-sm-4 tab mobile-box"
            style={{ backgroundColor: 'purple' }}
          >
            <Table />
          </div>
        </div>
      </div>
    </>
  ) : (
    // desk/laptop screen;
    <>
      <div className="navbar header">
        <NavBar />
      </div>
      <div className="home-container row">
        <div className="left-column subarea-selector">
          <SubArea />
        </div>
        <div className="map-box">
          <MapComp />
        </div>

        <div className="parent-box">
          <div className="chart top-box">
            <Chart />
          </div>
          <div className="tab bottom-box">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
