import React, { useState } from 'react';
import NavBar from '../../components/Header';
import SubArea from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';

import './style.css';
// import './style2.css';

// const [mobileOrDesktop, setMobileOrDesktop] = useState();

const HomePage = () => {
  // you will need to reload the page under new screen size but works just fine for implementation.
  const mobile = window.screen.width < 800;
  // const desktop = window.screen.width > 800;
  // let mobile = window.screen.width < 800;
  const [mobileVizView, setMobileVizView] = useState('chart');

  return (
    <>
      <div id="header">Header</div>
      <div id="dynamic-wrapper">
        <div id="subarea-selector">Subarea Selector</div>
        <div id="viz-box">
          {!mobile || mobileVizView === 'map' ? (
            <div id="map-box">
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

      {mobile ? <VizViewSelector mobileVizView={mobileVizView} setMobileVizView={setMobileVizView} /> : null}
    </>
  );
};

export default HomePage;
