import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import './style.css';

// const [mobileOrDesktop, setMobileOrDesktop] = useState();

const HomePage = props => {

  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [data, setData] = useState();
  const [geoOptions, setGeoOptions] = useState();
  const [subareaOptions, setSubareaOptions] = useState();

  const [selection, setSelection] = useState({
    geoType: 'Region',
    geo: '10 Counties',
    subareas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    indicator: null
  })

  const geoTypeOptions = ['Region', 'City', 'County']

  const handleGeoOptions = () => {
    const type = selection.geoType;
    const options = [];
    const data = [...props.data]
    type === 'City' ?
      data.forEach(tract =>
        tract.Cities.forEach(city =>
          options.push(city)
        )
      )
      : type === 'County' ?
        data.forEach(tract => options.push(tract.County))
        : options.push('10 Counties');;
    const geoSet = [
      ...new Set(options)
    ].sort((a, b) => a > b ? 1 : -1)

    setGeoOptions(geoSet)

  };

  const handleData = () => {
    const subareaArray = [];
    const data = [...props.data]
    data.forEach(tract => {
      const subarea = parseInt(tract.Subarea.replace('Subarea ', ''))
      // !subareaArray.includes(subarea) ? 
      subareaArray.push(subarea)
      // : null 
    });
    const subareaSet = [
      ...new Set(subareaArray)
    ].sort((a, b) => a > b ? 1 : -1);
    setSubareaOptions(subareaSet)
    setData(data);
  };

  useEffect(handleData, [selection.geo]);
  useEffect(handleGeoOptions, [selection.geoType])

  console.log(data);
  console.log(geoOptions);

  return (
    <>
      <div id="header">
        <Header
          geoTypeOptions={geoTypeOptions}
          selection={selection}
          geoOptions={geoOptions}
          setSelection={setSelection}
        />
      </div>
      <div id="dynamic-wrapper">
        <div id="subarea-selector">
          <SubAreaSelector
            subareaOptions={subareaOptions}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
        <div id="viz-box">
          {/* {!mobile || mobileVizView === 'map' ? ( */}
          <div
            id="map-box"
            className={mobile && mobileVizView !== 'map' ? 'hidden' : null}
          >
            <MapComp
              mobile={mobile}
              data={data}
              selection={selection}
            />
          </div>
          {/* ) : null} */}
          <div id="right-col-viz-view">
            <div
              id="chart-box"
              className={mobile && mobileVizView !== 'chart' ? 'hidden' : null}
            >
              <Chart
                mobile={mobile}
                data={data}
              />
            </div>
            <div
              id="table-box"
              className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
            >
              <Table
                mobile={mobile}
                data={data}
              />
            </div>
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
