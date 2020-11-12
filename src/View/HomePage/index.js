import React, { useState, useEffect } from 'react';
import GeoSelector from '../../components/GeoSelector';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import LayerSelector from '../../components/LayerSelector';
import IndicatorDropdown from '../../components/IndicatorDropdown';
import utils from '../../utils';
import './style.css';

const HomePage = props => {
  // console.log('homescreen props: ', props);
  const mobile = window.screen.width < 800;
  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({
    ...props.config.selection,
    indicator: props.config.indicators[0],
  });
  console.log('selection.geo :', selection.geo);
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  // const [selectedIndicator, setSelectedIndicator] = useState(
  //   props.config.indicators[0]
  // );
  // console.log('selectedIndicator: ', selectedIndicator);

  const style = props.config.style;
  const geoTypeOptions = ['Region', 'City', 'County'];
  const indicators = props.config.indicators;
  // console.log(JSON.stringify(indicators));

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
        <div id="geo-label-header">
          {selection.geo}{' '}
          {selection.geoType !== 'City' ? selection.geoType : ''}
        </div>
        <div>
          <GeoSelector
            geoTypeOptions={geoTypeOptions}
            selection={selection}
            // geoOptions={geoOptions}
            setSelection={setSelection}
            data={[...props.tractInfo]}
          />
        </div>
      </div>
      {(mobile && mobileVizView === 'chart') ||
      (mobile && mobileVizView === 'map') ||
      !mobile ? (
        <div id="chart-map-indicator-selector">
          <IndicatorDropdown
            // indicatorInfo={props.config.indicatorInfo}
            options={indicators}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      ) : null}

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
            // selectedSubareas={selectedSubareas}
            // selectedIndicator={selection.indicator}
            colormap={style.colormap}
            selection={selection}
            setHighlightedSubarea={setHighlightedSubarea}
          />
        ) : null}
      </div>
      <div id="table-indicators-selector">
        <IndicatorDropdown
          multiple
          // indicatorInfo={props.config.indicatorInfo}
          options={indicators}
          selection={selection}
          setSelection={setSelection}
        />
      </div>

      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'table-box'
            : 'table-box-reduced'
        }
        className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
      >
        {tractInfo ? (
          <Table
            mobile={mobile}
            tractInfo={tractInfo}
            selection={selection}
            indicators={indicators}
            highlightedSubarea={highlightedSubarea}
            selectedSubareas={selectedSubareas}
            selectedGeo={selection.geo}
          />
        ) : null}
      </div>
      {/* </div> */}
      {/* </div> */}

      {mobile ? (
        <VizViewSelector
          mobileVizView={mobileVizView}
          setMobileVizView={setMobileVizView}
        />
      ) : null}
      {!mobile || mobileVizView === 'map' ? (
        <LayerSelector
          setLayers={setLayers}
          layers={layers}
          mobile={mobile}
          numberOfSubareas={subareaOptions.length}
        />
      ) : null}
    </>
  );
};

export default HomePage;
