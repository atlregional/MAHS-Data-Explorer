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

const HomePage = (props) => {

  console.log(props);
  const mobile = window.screen.width < 800;

  const [mobileVizView, setMobileVizView] = useState('chart');
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({...props.config.selection});
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);

  const style = props.config.style;
  const geoTypeOptions = ['Region', 'City', 'County'];

  const handleTractInfo = () => {
    const data = [...props.tractInfo]
    const dataObj = {};
    data.forEach(tract => 
      dataObj[tract.GEOID] = tract
    );
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

  useEffect(handleTractInfo, []);
  useEffect(handleSubareaOptions, [selection.geo])

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
                selection={selection}
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

      <div id='layer-selector-box'>
        <LayerSelector layers={props.config.layers} />
      </div>
    </>
  );
};

export default HomePage;
