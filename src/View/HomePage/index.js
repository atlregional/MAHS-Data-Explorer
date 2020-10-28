import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import LayerSelector from '../../components/LayerSelector';
import utils from '../../utils';
import './style.css';

const HomePage = props => {
  // console.log(props);
  const mobile = window.screen.width < 800;
  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({ ...props.config.selection });
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  // console.log('selectedLayers: ', selectedLayers);

  // use includes method to filter the stuff;

  const style = props.config.style;
  const geoTypeOptions = ['Region', 'City', 'County'];
  const indicators = props.config.indicators;

  const handleTractInfo = () => {
    const data = [...props.tractInfo];
    const dataObj = {};
    data.forEach(tract => (dataObj[tract.GEOID] = tract));
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
    const subareaSet = [...new Set(subareaArray)].sort((a, b) =>
      a > b ? 1 : -1
    );
    setSubareaOptions(subareaSet);
  };

  useEffect(handleTractInfo, []);
  useEffect(handleSubareaOptions, [selection.geo]);

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
      {/* <div id="dynamic-wrapper"> */}
      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'subarea-selector'
            : 'subarea-selector-enlarged'
        }
      >
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
      {/* <div id="viz-box"> */}
      {/* {!mobile || mobileVizView === 'map' ? ( */}
      <div
        id={
          subareaOptions.length <= 5 || !mobile ? 'map-box' : 'map-box-reduced'
        }
        className={mobile && mobileVizView !== 'map' ? 'hidden' : null}
      >
        <MapComp
          mobile={mobile}
          tractInfo={tractInfo}
          selection={selection}
          config={props.config}
          layers={layers}
          subareaOptions={subareaOptions}
          highlightedSubarea={highlightedSubarea}
          numberOfSubareas={subareaOptions.length}
        />
      </div>
      {/* ) : null} */}
      {/* <div id="right-col-viz-view"> */}
      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'chart-box'
            : 'chart-box-reduced'
        }
        className={mobile && mobileVizView !== 'chart' ? 'hidden' : null}
      >
        {tractInfo ? (
          <Chart
            indicators={indicators}
            mobile={mobile}
            tractInfo={tractInfo}
            highlightedSubarea={highlightedSubarea}
            selectedSubareas={selectedSubareas}
            colormap={style.colormap}
            selection={selection}
          />
        ) : null}
      </div>
      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'table-box'
            : 'table-box-reduced'
        }
        className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
      >
        { tractInfo ?
          <Table
            mobile={mobile}
            tractInfo={tractInfo}
            selection={selection}
            highlightedSubarea={highlightedSubarea}
            selectedSubareas={selectedSubareas}
          />
          : null
        } 
      </div>
      {/* </div> */}
      {/* </div> */}

      {mobile ? (
        <VizViewSelector
          mobileVizView={mobileVizView}
          setMobileVizView={setMobileVizView}
        />
      ) : null}
      { 
        !mobile || mobileVizView === 'map' ?
          <LayerSelector 
            setLayers={setLayers} 
            layers={layers} 
            mobile={mobile}
            numberOfSubareas={subareaOptions.length}
          />
        : null
      }
    </>
  );
};

export default HomePage;
