import React, { useState, useEffect } from 'react';
// import NavBar from '../../components/navbar';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';

import './style.css';
import { options } from 'yargs';

// const [mobileOrDesktop, setMobileOrDesktop] = useState();

const HomePage = props => {

  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [ data, setData ] = useState();
  const [ geoOptions, setGeoOptions ] = useState();
  const [ selectedGeo, setSelecteGeo ] = useState();
  const [ selectedGeoType, setSelectedGeoType ] = useState('Region');
  const [ subareaOptions, setSubareaOptions ] = useState();

  const geoTypeOptions = ['Region', 'City', 'County' ]

  const handleGeoOptions = () => {
    const type = selectedGeoType;
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
      ].sort((a,b) => a > b ? 1 : -1)

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
    ].sort((a,b) => a > b ? 1 : -1);
    setSubareaOptions(subareaSet)
    setData(data);
  };

  useEffect(handleData, [ selectedGeo ]);
  useEffect(handleGeoOptions, [props.data, selectedGeoType])

  console.log(data);
  console.log(geoOptions);

  return (
    <>
      <div id="header">
        <div>
          {geoTypeOptions ?
          <select
            className='geo-selector'
            onChange={e => setSelectedGeoType(e.target.value)}
          >
            {
              geoTypeOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div>
        <div>
          {geoOptions ?
          <select
            className='geo-selector'
            onChange={e => setSelecteGeo(e.target.value)}
          >
            {
              geoOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div>
        {/* <h1>Metro Atlanta Housing Data Explorer</h1> */}
      </div>
      <div id="dynamic-wrapper">
        <div id="subarea-selector">
          <SubAreaSelector
            subareaOptions={subareaOptions}
          />
        </div>
        <div id="viz-box">
          {!mobile || mobileVizView === 'map' ? (
            <div id="map-box" className="leaflet-container">
              <MapComp
                mobile={mobile}
                data={data} 
              />
            </div>
          ) : null}
          <div id="right-col-viz-view">
            {!mobile || mobileVizView === 'chart' ? (
              <div id="chart-box">
                <Chart
                  mobile={mobile}
                  data={data} 
                />
              </div>
            ) : null}
            {!mobile || mobileVizView === 'table' ? (
              <div id="table-box">
                <Table
                  mobile={mobile}
                  data={data} 
                />
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
