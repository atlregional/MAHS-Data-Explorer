import React, { useState } from 'react';
import NavBar from '../../components/navbar';
import SubArea from '../../components/SubArea';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';

import './style2.css';
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
              <MapComp />
            </div>
          ) : null}
          <div id="right-col-viz-view">
            {!mobile || mobileVizView === 'chart' ? (
              <div id="chart-box">
                <Chart />
              </div>
            ) : null}
            {!mobile || mobileVizView === 'table' ? (
              <div id="table-box">
                <Table />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {mobile ? <div id="viz-view-selector"></div> : null}
    </>
  );

  //   <>
  //     <div className="home-container row">
  //       <div className="navbar header">Header</div>
  //       <div id="dynamic-wrapper">
  //         <div className="left-column subarea-selector">Subarea Selector</div>
  //         <div id="viz-box">
  //           {!mobile || mobileVizView === 'map' ? (
  //             <div id="map-box">
  //               <MapComp />
  //             </div>
  //           ) : null}
  //           {!mobile || mobileVizView === 'chart' ? (
  //             <div id="chart-box">
  //               <Chart />
  //             </div>
  //           ) : null}
  //           {!mobile || mobileVizView === 'table' ? (
  //             <div id="table-box">
  //               <Table />
  //             </div>
  //           ) : null}
  //         </div>
  //       </div>

  //       {mobile ? <div id="viz-view-selector"></div> : null}
  //     </div>
  //   </>
  // );

  // mobile ? (
  // mobile device
  //   <>
  //     <div className="home-container row">
  //       <div className="navbar header">
  //         <NavBar />
  //       </div>

  //       <div className="left-column subarea-selector">
  //         <SubArea />
  //       </div>

  //       <div className="row mobile-row">
  //         { !mobile || mobileVizView === 'map' ?
  //         <div
  //           className="col-sm-4 map mobile-box"
  //           style={{ backgroundColor: 'grey' }}
  //         >
  //           <div className="map-box">
  //             <MapComp />
  //           </div>
  //         </div>
  //         : null
  //         }
  //         <div
  //           className="col-sm-4 chart mobile-box"
  //           style={{ backgroundColor: 'maroon' }}
  //         >
  //           <Chart />
  //         </div>
  //         <div
  //           className="col-sm-4 tab mobile-box"
  //           style={{ backgroundColor: 'purple' }}
  //         >
  //           <Table />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // ) : (
  //   // desk/laptop screen;
  //   <>
  //     <div className="navbar header">
  //       <NavBar />
  //     </div>
  //     <div className="home-container row">
  //       <div className="left-column subarea-selector">
  //         <SubArea />
  //       </div>
  //       <div className="map-box">
  //         <MapComp />
  //       </div>

  //       <div className="parent-box">
  //         <div className="chart top-box">
  //           <Chart />
  //         </div>
  //         <div className="tab bottom-box">
  //           <Table />
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default HomePage;
