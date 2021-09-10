import React, { useState, useEffect } from "react";
// import GeoSelector from '../../components/GeoSelector';
import SubAreaSelector from "../../components/SubAreaSelector";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import MapComp from "../../components/Map";
import VizViewSelector from "../../components/VizViewSelector";
// import LayerSelector from "../../components/LayerSelector";
import IndicatorDropdown from "../../components/IndicatorDropdown";
import Footer from "../../components/Footer";
import ARCHeader from "../../components/ARCHeader";
// import tinygradient from "tinygradient";
// import { by3Points } from 'get-parabola';

// import globalUtils from "../../globalUtils";
import util from "./util";
// import config from "./config";
import "./style.css";

const HomePage = (props) => {
  const mobile = window.screen.width < 850;
  const defaultSelection = {
    ...props.config.selection,
    indicator: props.config.selection.indicator || props.indicators[0],
    indicators: props.indicators,
  }
  const [mobileVizView, setMobileVizView] = useState("map");
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState(defaultSelection);
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  const [viewMapData, setViewMapData] = useState(false);
  const [clickedSubarea, setClickedSubarea] = useState();
  const [subareaData, setSubareaData] = useState();
  const [data, setData] = useState();

  // color gradient displayed on the map;
//   const numBins = 100;
//   const zeroPos = .3;

//   const calibrateToCenter = (initPos, centerPosition) => {
//     // const scaler = centerPosition / .25;
//     // const rescaledPos = scaler * initPos * initPos;
//     const points = [[0,0], [.5, centerPosition], [1,1]]
//     const coeffs = by3Points(points.map(point => ({
//       x: point[0], y: point[1]
//     })));
//     // console.log(coeffs);
//     const rescaledPos = (coeffs.a * initPos * initPos) + (coeffs.b * initPos) + coeffs.c
//     // console.log(rescaledPos);
//     return rescaledPos > 1 ? 1 : rescaledPos < 0 ? 0 : rescaledPos;

//   }
//   // DIVERGENT COLOR SCALE;
//   const colors = tinygradient(
//     selection.indicator.changeType
//       ? config.indicatorColors1.map((color,i) => 
//           ({
//             color : color, 
//             pos: calibrateToCenter(i/(config.indicatorColors1.length - 1), zeroPos)
//           })
//         )
//       : config.indicatorColors2.map((color,i) => 
//           ({
//             color : color, 
//             pos: i/(config.indicatorColors2.length - 1)
//           })
//         )
//   ).rgb(numBins);

//   console.log(colors.map(color => {
//     const { _r, _g, _b} = color;
//     return `rgb(${_r}, ${_g}, ${_b})`
// }))
  
  const style = props.config.style;
  const geoTypeOptions = ["Region", "City", "County"];
  const indicators = props.indicators;

  useEffect(() => {
    const tractInfo = util.handleTractInfo(props);
    setTractInfo(tractInfo);
  }, []);
  useEffect(() => {
    const subareaOptions = util.handleSubareaOptions(props, selection);
    setSubareaOptions(subareaOptions);
  }, [selection.geo]);
  return (
    <>
      {
        <ARCHeader
          selection={selection}
          geoTypeOptions={geoTypeOptions}
          setClickedSubarea={setClickedSubarea}
          setHighlightedSubarea={setHighlightedSubarea}
          setSelection={setSelection}
          data={[...props.tractInfo]}
          mobile={mobile}
        />
      }
      <div id="mobile-mainwrapper">
        <div id={!mobile ? "subarea-selector" : "subarea-selector-mobile"}>
          <SubAreaSelector
            mobile={mobile}
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
          className={
            mobile && mobileVizView === "map"
              ? "mobile-map-indicator-selector"
              : "hidden"
          }
        >
          {mobile && viewMapData ? (
            <IndicatorDropdown
              mobile
              placeholderText={"Change Indicator"}
              options={indicators}
              selection={selection}
              setSelection={setSelection}
            />
          ) : null}
        </div>
        <div
          id={mobile && viewMapData ? "map-box-data" : "map-box"}
          className={mobile && mobileVizView !== "map" ? "hidden" : null}
        >
          <MapComp
            subareaData={subareaData}
            // colors={colors}
            viewMapData={viewMapData}
            mobile={mobile}
            tractInfo={tractInfo}
            selection={selection}
            config={props.config}
            setLayers={setLayers}
            layers={layers}
            subareaOptions={subareaOptions}
            highlightedSubarea={highlightedSubarea}
            numberOfSubareas={subareaOptions.length}
            // numBins={numBins}
            hidden={mobile && mobileVizView !== "map"}
            data={data}
            setData={setData}
            setViewMapData={setViewMapData}
          />
        </div>

        <div
          id={"chart-box"}
          className={mobile && mobileVizView !== "chart" ? "hidden" : null}
        >
          <div className="chart-indicator-selector-box">
            {(mobile && mobileVizView === "chart") || !mobile ? (
              <div id="chart-map-indicator-selector">
                <IndicatorDropdown
                  mobile={mobile && mobileVizView === "chart"}
                  placeholderText={"Change Indicator"}
                  options={indicators}
                  selection={selection}
                  setSelection={setSelection}
                />
              </div>
            ) : null}
          </div>
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

        <div
          id={"table-box"}
          className={mobile && mobileVizView !== "table" ? "hidden" : null}
        >
          {(mobile && mobileVizView === "table") || !mobile ? (
            <div id="table-indicators-selector">
              <IndicatorDropdown
                multiple
                mobile={mobile && mobileVizView === "table"}
                placeholderText={"Choose Indicators for Table"}
                options={indicators}
                selection={selection}
                setSelection={setSelection}
              />
            </div>
          ) : null}

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
      </div>
      <div id="footer-box">
        {mobile ? (
          <VizViewSelector
            mobileVizView={mobileVizView}
            setMobileVizView={setMobileVizView}
          />
        ) : null}

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
