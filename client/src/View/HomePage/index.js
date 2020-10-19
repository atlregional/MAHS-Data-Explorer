import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
// import LayerSelector from '../../components/LayerSelector';
import utils from '../../utils';
import './style.css';


const HomePage = (props) => {
  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  // const [geoOptions, setGeoOptions] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);

  const [selection, setSelection] = useState({...props.config.selection});
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);

  // console.log(highlightedSubarea);

  const style = props.config.style;

  const geoTypeOptions = ['Region', 'City', 'County'];

  // const handleGeoOptions = () => {
  //   const type = selection.geoType;
  //   const options = [];
  //   const data = [...props.tractInfo];
  //   type === 'City'
  //     ? data.forEach((tract) =>
  //         tract.Cities.forEach((city) => options.push(city))
  //       )
  //     : type === 'County'
  //     ? data.forEach((tract) => options.push(tract.County))
  //     : options.push('10 Counties');
  //   const geoSet = [...new Set(options)].sort((a, b) => (a > b ? 1 : -1));

  //   setGeoOptions(geoSet);
  // };

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
    );
    // const indicatorInfo =      {
    //     name: "Percent in Poverty 2017",
    //     type: "weighted average",
    //     indicator: {
    //        id: "ID088",
    //        name: "Population in Poverty 2017"
    //     },
    //     universe:  {
    //        id: "ID102",
    //        name:  "Total Population"
    //     }
    //   }
    // utils.aggregateBySubarea(dataObj, 
 
    // indicatorInfo
    // , 'County')
    setTractInfo(dataObj);

  };

  const handleSubareaOptions = () => {
    const subareaArray = [];
    const data = [...props.tractInfo].filter(tract =>
      utils.filterBySelection(tract, selection)
    
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
  // useEffect(handleGeoOptions, [selection.geoType])


  return (
    <>
      <div id="header">
        <Header
          geoTypeOptions={geoTypeOptions}
          selection={selection}
          // geoOptions={geoOptions}
          setSelection={setSelection}
          data={[...props.tractInfo]}
        />
      </div>
      <div id="dynamic-wrapper">
        <div id="subarea-selector">
          <SubAreaSelector
            colormap={style.colormap}
            subareaOptions={subareaOptions}
            selection={selection}
            setSelection={setSelection}
            highlightedSubarea={highlightedSubarea}
            setHighlightedSubarea={setHighlightedSubarea}
            selectedSubareas={selectedSubareas}
            setSelectedSubareas={setSelectedSubareas}
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
              highlightedSubarea={highlightedSubarea}

            />
          </div>
          {/* ) : null} */}
          <div id="right-col-viz-view">
            <div
              id="chart-box"
              className={mobile && mobileVizView !== 'chart' ? 'hidden' : null}
            > 
              {
                tractInfo ?
                  <Chart
                    mobile={mobile}
                    tractInfo={tractInfo}
                    highlightedSubarea={highlightedSubarea}
                    selectedSubareas={selectedSubareas}
                    colormap={style.colormap}
                    selection={selection}
                  />
                : null
              }
            </div>
            <div
              id="table-box"
              className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
            >
              <Table
                mobile={mobile}
                tractInfo={tractInfo}
                highlightedSubarea={highlightedSubarea}
                selectedSubareas={selectedSubareas}
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
      ) 
      : null}
{/* 
      <div id='layer-selector-box'>
        <LayerSelector layers={props.config.layers} />
      </div> */}
    </>
  );
};

export default HomePage;
