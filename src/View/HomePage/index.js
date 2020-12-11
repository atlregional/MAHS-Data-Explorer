import React, { useState, useEffect } from 'react';
import GeoSelector from '../../components/GeoSelector';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import LayerSelector from '../../components/LayerSelector';
import IndicatorDropdown from '../../components/IndicatorDropdown';
import Footer from '../../components/Footer';
import ARCHeader from '../../components/ARCHeader';
import gradient from 'gradient-color';
import utils from '../../utils';
import './style.css';
import { Checkbox } from 'semantic-ui-react';

const HomePage = props => {
  // console.log('HomePage - props: ', props);
  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  console.log('tractInfo :', tractInfo);
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({
    ...props.config.selection,
    indicator: props.config.indicators[0],
  });
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  const [viewMapData, setViewMapData] = useState(false);
  const [clickedSubarea, setClickedSubarea] = useState();
  const [subareaData, setSubareaData] = useState();
  const [data, setData] = useState();
  console.log('data: ', data);

  // color gradient displayed on the map;
  const numBins = 100;
  // DIVERGENT COLOR SCALE;
  const colors = gradient(
    [
      '#cfdfd9',
      '#cfe6d9',
      '#d2edd7',
      '#d8f3d3',
      '#e2f8cd',
      '#effcc7',
      '#ffffc1',
      '#f9e39d',
      '#f4c57f',
      '#efa667',
      '#e98658',
      '#e16451',
      '#d43d51',
    ],
    numBins
  );

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
      {!mobile ? (
        <div id="ARC-Header">
          {' '}
          <ARCHeader />
        </div>
      ) : null}
      <div id="header">
        <div id="geo-label-header">
          {selection.geo}{' '}
          {selection.geoType !== 'City' ? selection.geoType : ''}
        </div>
        <div>
          <GeoSelector
            geoTypeOptions={geoTypeOptions}
            selection={selection}
            setClickedSubarea={setClickedSubarea}
            setHighlightedSubarea={setHighlightedSubarea}
            setSelection={setSelection}
            data={[...props.tractInfo]}
          />
        </div>
      </div>
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
          clickedSubarea={clickedSubarea}
          setClickedSubarea={setClickedSubarea}
        />
      </div>
      <div
        id={
          subareaOptions.length <= 5 || !mobile ? 'map-box' : 'map-box-reduced'
        }
        className={mobile && mobileVizView !== 'map' ? 'hidden' : null}
      >
        <MapComp
          subareaData={subareaData}
          colors={colors}
          viewMapData={viewMapData}
          mobile={mobile}
          tractInfo={tractInfo}
          selection={selection}
          config={props.config}
          layers={layers}
          subareaOptions={subareaOptions}
          highlightedSubarea={highlightedSubarea}
          numberOfSubareas={subareaOptions.length}
          numBins={numBins}
          data={data}
          setData={setData}
        />
      </div>
      {(mobile && mobileVizView === 'chart') || !mobile ? (
        <div id="chart-map-indicator-selector">
          <div id="chart-map-toggle-box">
            <div id="map-data-toggle-label">Show Data on Map</div>
            <Checkbox
              toggle
              onChange={() =>
                setViewMapData(viewMapData === false ? true : false)
              }
            />
          </div>
          {/* <h3>{selection.indicator.name}</h3> */}
          <IndicatorDropdown
            options={indicators}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      ) : null}
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
            setSubareaData={setSubareaData}
            subareaData={subareaData}
            indicators={indicators}
            data={data}
            mobile={mobile}
            tractInfo={tractInfo}
            highlightedSubarea={highlightedSubarea}
            clickedSubarea={clickedSubarea}
            setClickedSubarea={setClickedSubarea}
            colormap={style.colormap}
            selection={selection}
            setHighlightedSubarea={setHighlightedSubarea}
          />
        ) : null}
      </div>
      {(mobile && mobileVizView === 'table') || !mobile ? (
        <div id="table-indicators-selector">
          <IndicatorDropdown
            multiple
            options={indicators}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      ) : null}
      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'table-box'
            : 'table-box-reduced'
        }
        className={mobile && mobileVizView !== 'table' ? 'hidden' : null}
      >
        {tractInfo && selection.indicators.length > 0 ? (
          <Table
            mobile={mobile}
            tractInfo={tractInfo}
            selection={selection}
            indicators={indicators}
            highlightedSubarea={highlightedSubarea}
            selectedSubareas={selectedSubareas}
            selectedGeo={selection.geo}
          />
        ) : (
          <div id="subarea-not-selected-box">
            <p>Select INDICATOR(S) to display on table...</p>
          </div>
        )}
      </div>

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
      {!mobile ? (
        <div id="footer-box">
          <Footer />
        </div>
      ) : null}
    </>
  );
};

export default HomePage;
