import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import './style.css';

const HomePage = props => {

  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  const [geoOptions, setGeoOptions] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);

  const [selection, setSelection] = useState({...props.config.selection});
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState();

  const style = props.config.style;

  const geoTypeOptions = ['Region', 'City', 'County']

  const handleGeoOptions = () => {
    const type = selection.geoType;
    const options = [];
    const data = [...props.tractInfo]
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

  const handleTractInfo = () => {
    const data = [...props.tractInfo]
    // .filter(tract =>
    //   selection.geo === '10 Counties' ? 
    //     true : selection.geoType === 'County' ?
    //       tract['County'] === selection.geo
    //       : selection.geoType === 'City' ?
    //         tract.Cities.includes(selection.geo)
    //   : true
          
    // );
    // console.log(data);
    const dataObj = {};
    data.forEach(tract => 
      dataObj[tract.GEOID] = tract
    )
    setTractInfo(dataObj);

  };

  const handleSubareaOptions = () => {
    const subareaArray = [];
    const data = [...props.tractInfo].filter(tract =>
      selection.geo === '10 Counties' ? 
        true : selection.geoType === 'County' ?
          tract['County'] === selection.geo
          : selection.geoType === 'City' ?
            tract.Cities.includes(selection.geo)
      : true
          
    );
    data.forEach(tract => 
      subareaArray.push(parseInt(tract.Subarea.replace('Subarea ', '')))
    );
    const subareaSet = [
      ...new Set(subareaArray)
    ].sort((a, b) => a > b ? 1 : -1);
    setSubareaOptions(subareaSet);
  };

  // console.log(subareaOptions);

  useEffect(handleTractInfo, []);
  useEffect(handleSubareaOptions, [selection.geo])
  useEffect(handleGeoOptions, [selection.geoType])

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
            colormap={style.colormap}
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
              tractInfo={tractInfo}
              selection={selection}
              config={props.config}
              subareaOptions={subareaOptions}
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
                tractInfo={tractInfo}
              />
            </div>
            <div
              id="table-box"
              className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
            >
              <Table
                mobile={mobile}
                tractInfo={tractInfo}
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
