import React, { useState, useEffect } from "react";
// import GeoSelector from '../../components/GeoSelector';
import SubAreaSelector from "../../components/SubAreaSelector";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import MapComp from "../../components/Map";
import VizViewSelector from "../../components/VizViewSelector";
import LayerSelector from "../../components/LayerSelector";
import IndicatorDropdown from "../../components/IndicatorDropdown";
import Footer from "../../components/Footer";
import ARCHeader from "../../components/ARCHeader";
import gradient from "gradient-color";
import globalUtils from "../../globalUtils";
import util from "./util";
import config from "../config";
import "./style.css";

const HomePage = (props) => {
  const mobile = window.screen.width < 850;
  const [mobileVizView, setMobileVizView] = useState("map");
  const [tractInfo, setTractInfo] = useState();
  const [subareaOptions, setSubareaOptions] = useState([]);
  const [selection, setSelection] = useState({
    ...props.config.selection,
    indicator: props.config.selection.indicator || props.indicators[0],
    indicators: props.indicators,
  });
  const [highlightedSubarea, setHighlightedSubarea] = useState();
  const [selectedSubareas, setSelectedSubareas] = useState([]);
  const [layers, setLayers] = useState(props.config.layers);
  const [viewMapData, setViewMapData] = useState(false);
  const [clickedSubarea, setClickedSubarea] = useState();
  const [subareaData, setSubareaData] = useState();
  const [data, setData] = useState();

  // color gradient displayed on the map;
  const numBins = 100;
  // DIVERGENT COLOR SCALE;
  const colors = gradient(
    selection.indicator.changeType
      ? config.indicatorColors1
      : config.indicatorColors2,
    numBins
  );

  const style = props.config.style;
  const geoTypeOptions = ["Region", "City", "County"];
  const indicators = props.indicators;

  const handleTractInfo = () => {
    const data = [...props.tractInfo];
    const dataObj = {};
    data.forEach((tract) => (dataObj[tract.GEOID] = tract));
    setTractInfo(dataObj);
  };

  const handleSubareaOptions = () => {
    const subareaArray = [];
    const data = [...props.tractInfo].filter((tract) =>
      globalUtils.filterBySelection(tract, selection)
    );
    data.forEach((tract) =>
      subareaArray.push(parseInt(tract.Subarea.replace("Subarea ", "")))
    );
    const subareaSet = [...new Set(subareaArray)].sort((a, b) =>
      a > b ? 1 : -1
    );
    setSubareaOptions(subareaSet);
  };

  useEffect(handleTractInfo, []);
  useEffect(handleSubareaOptions, [selection.geo]);
  useEffect(() => {
    const tractInfo = util.handleTractInfo(props);
    const subareaOptions = util.handleSubareaOptions(props, tractInfo);
    setSubareaData(subareaOptions);
    setTractInfo(tractInfo);
  }, []);

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
            colors={colors}
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
            numBins={numBins}
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
