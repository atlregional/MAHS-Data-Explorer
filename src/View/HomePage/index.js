import React, { useState, useEffect } from 'react';
import GeoSelector from '../../components/GeoSelector';
import SubAreaSelector from '../../components/SubAreaSelector';
import Chart from '../../components/Chart';
import Table from '../../components/Table';
import MapComp from '../../components/Map';
import VizViewSelector from '../../components/VizViewSelector';
import LayerSelector from '../../components/LayerSelector';
import IndicatorDropdown from '../../components/IndicatorDropdown';
import gradient from 'gradient-color';
import utils from '../../utils';
import './style.css';
import { Checkbox } from 'semantic-ui-react';

const HomePage = props => {
  // console.log('HomePage - props: ', props);
  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({
    ...props.config.selection,
    indicator: props.config.indicators[0],
  });
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  const [viewMapData, setViewMapData] = useState(false);

  // color gradient displayed on the map;
  const numBins = 100;
  const colors = gradient(['#F4F75B', '#1AA2C3', '#F5B53C'], numBins).reverse();

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
        />
      </div>
      {(mobile && mobileVizView === 'chart') || !mobile ? (
        // single indicator
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
          <IndicatorDropdown
            // indicatorInfo={props.config.indicatorInfo}
            options={indicators}
            selection={selection}
            setSelection={setSelection}
            // style={{ width: '50%' }}
          />
        </div>
      ) : null}
      <div
        id={
          subareaOptions.length <= 5 || !mobile
            ? 'chart-box'
            : 'chart-box-reduced'
        }
        // use this condition to control when the class and css;
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
      {(mobile && mobileVizView === 'table') || !mobile ? (
        <div id="table-indicators-selector">
          <IndicatorDropdown
            multiple
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
            <p>Please CHOOSE INDICATORS to populate data</p>
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
    </>
  );
};

export default HomePage;
