import React, { useState } from 'react';
// import NavBar from '../../components/navbar';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';



import './style.css';

// const [mobileOrDesktop, setMobileOrDesktop] = useState();

const HomePage = () => {
  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');

  return (
    <>
      <div id="header">
        <h1>Metro Atlanta Housing Data Explorer</h1>
      </div>
      <div id="dynamic-wrapper">
        <div id="subarea-selector">
          <SubAreaSelector />
        </div>
        <div id="viz-box">
          {!mobile || mobileVizView === 'map' ? (
            <div id="map-box" className="leaflet-container">
              <MapComp mobileVizView={mobileVizView} />
            </div>
          ) : null}
          <div id="right-col-viz-view">
            {!mobile || mobileVizView === 'chart' ? (
              <div id="chart-box">
                <Chart mobileVizView={mobileVizView} />
              </div>
            ) : null}
            {!mobile || mobileVizView === 'table' ? (
              <div id="table-box">
                <Table mobileVizView={mobileVizView} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {mobile ? (
        <VizViewSelector
          mobileVizView={mobileVizView}
          setMobileVizView={setMobileVizView}
        />
      ) : null}
    </>
  );
};

export default HomePage;
