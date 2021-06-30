import React, { useEffect, useState } from "react";
import utils from "../../utils";
import {
  Map as LeafletMap,
  TileLayer,
  GeoJSON,
  ZoomControl,
  Tooltip,
} from "react-leaflet";
import MapLegend from "../MapLegend";
import polygonToLine from "@turf/polygon-to-line";
import { Icon } from "semantic-ui-react";
// import numeral from 'numeral';
import { Checkbox } from "semantic-ui-react";
import RingLoader from "react-spinners/RingLoader";
import MapTooltip from "../MapTooltip";
import "./style.css";

const MapComp = (props) => {
  const mobile = window.screen.width < 800;

  const [tile, setTile] = useState(1);
  const [stats, setStats] = useState();
  const [geoJSONs, setGeoJSONs] = useState();
  const [hoverBin, setHoverBin] = useState();
  const [hoverFeature, setHoverFeature] = useState({});
  const [openTileLayerSelector, setOpenTileLayerSelector] = useState(false);

  const data = props.data;
  const setData = props.setData;
  const layerConfigs = props.layers;
  const tileLayer = props.config.tilelayers;
  const indicatorFormatter = props.selection.indicator.formatter;
  const setViewMapData = props.setViewMapData;
  const viewMapData = props.viewMapData;

  const handleTractData = () => {
    const array = [];
    const tractInfo = props.tractInfo;
    const dataObj = {};
    const tractData = tractInfo
      ? Object.values(tractInfo).filter((tract) =>
          utils.filterBySelection(tract, props.selection)
        )
      : null;

    const aggregatedData = tractData
      ? utils.aggregate(tractData, props.selection.indicator, "GEOID")
      : {};

    // console.log(aggregatedData);

    Object.entries(aggregatedData).forEach(([key, value]) =>
      key !== "All"
        ? array.push({
            name: key,
            Subarea: parseInt(key.replace("Subarea ", "")),
            [props.selection.indicator.name]: value,
          })
        : null
    );

    const valueArray = array
      .map((item) => parseFloat(item[props.selection.indicator.name]))
      .filter((item) => !isNaN(item));

    // console.log(valueArray);
    const maxValue = valueArray ? Math.max(...valueArray) : null;
    const minValue = valueArray ? Math.min(...valueArray) : null;

    Object.entries(aggregatedData).forEach(([key, value]) => {
      const disFromMin = value - minValue;
      const binningRatio = disFromMin / (maxValue - minValue);
      const colorIndex = Math.floor(binningRatio * props.numBins) - 1;

      dataObj[key] = {
        value: value,
        colorIndex: colorIndex < 0 ? 0 : colorIndex,
      };
    });
    // console.log('dataObj :', dataObj);

    setData(dataObj);
    setStats({ max: maxValue, min: minValue, range: maxValue - minValue });
  };

  const handleGeoJSONs = () => {
    const getGeoJSON = (key, url) =>
      new Promise((resolve) =>
        utils
          .getData(url)
          .then((res) => [key, res.data])
          .catch((err) => console.log(err))
          .then((data) => resolve(data))
          .catch((err) => console.log(err))
      );

    let returnedGeoJSONs = [];

    layerConfigs
      .filter((config) => !config.disabled)
      .forEach((config) =>
        returnedGeoJSONs.push(getGeoJSON(config.name, config.url))
      );

    Promise.all(returnedGeoJSONs)
      .then((geoJSONS) => {
        console.log("returnedGeoJSONs: ", returnedGeoJSONs);
        const geoJSONsObj = {};
        [...geoJSONS].forEach(([key, value]) => (geoJSONsObj[key] = value));
        setGeoJSONs(geoJSONsObj);
      })
      .catch((err) => console.log(err));
  };

  const [bounds, setBounds] = useState();

  const tractIDField = layerConfigs.find(
    (info) => info.name === "tracts"
  ).geoField;

  const tractStyle = (tractInfo) => {
    const viewMapData = props.viewMapData;
    const subarea = tractInfo
      ? parseInt(tractInfo.Subarea.replace("Subarea ", ""))
      : null;
    const config = props.config;

    const colorIndex = data[tractInfo.GEOID]
      ? data[tractInfo.GEOID].colorIndex
      : null;
    const color = viewMapData
      ? colorIndex !== null
        ? props.colors[colorIndex]
        : "transparent"
      : subarea
      ? config.style.colormap[subarea - 1]
      : null;

    return {
      fillColor: color,
      color: viewMapData ? "black" : color,
    };
  };

  const geoJSONStyle = (feature, config) => {
    const geoID = feature.properties[tractIDField];
    const tractInfo = props.tractInfo[geoID];
    const subarea = tractInfo["Subarea"];
    const highlight = subarea === `Subarea ${props.highlightedSubarea}`;
    const style = tractStyle(tractInfo);
    return {
      ...style,
      color:
        props.highlightedSubarea && highlight ? "black" : config.boundaryColor,
      weight:
        props.highlightedSubarea && highlight
          ? 1
          : props.highlightedSubarea
          ? 0
          : config.boundaryWidth,
      fillOpacity:
        props.highlightedSubarea && highlight
          ? 1
          : props.highlightedSubarea
          ? 0.2
          : 1,
    };
  };

  const regionCounties = [
    "Fulton",
    "DeKalb",
    "Cobb",
    "Gwinnett",
    "Clayton",
    "Douglas",
    "Henry",
    "Cherokee",
    "Fayette",
    "Rockdale",
    "Forsyth",
  ];

  const handleBounds = (featureBounds) =>
    Object.keys(featureBounds).length > 0 ? setBounds(featureBounds) : null;
  useEffect(handleGeoJSONs, []);
  useEffect(handleTractData, [geoJSONs, props.selection]);

  return (
    <>
      <LeafletMap
        key={`subarea-map-${props.numberOfSubareas}`}
        animate
        boxZoom
        trackResize
        doubleClickZoom
        scrollWheelZoom
        dragging
        center={[33.753, -84.386]}
        zoom={8}
        bounds={bounds ? bounds : null}
        zoomDelta={0.3}
        zoomSnap={0.3}
        maxZoom={16}
        minZoom={3}
        zoomControl={false}
      >
        {geoJSONs
          ? layerConfigs
              .filter((config) => config.visible && config.type === "boundary")
              .map((config) => {
                const boundary = geoJSONs[config.name].features.map((feature) =>
                  polygonToLine(feature)
                );
                return (
                  <GeoJSON
                    onAdd={(e) => {
                      e.target.bringToFront();
                      const featureBounds = e.target.getBounds();
                      handleBounds(featureBounds);
                    }}
                    key={`boundary-layer-${config.name}-${props.selection.geo}`}
                    data={boundary}
                    filter={(feature) =>
                      props.selection.geo === "11-County"
                        ? regionCounties.includes(
                            feature.properties[config.geoField]
                          )
                        : feature.properties[config.geoField] ===
                          props.selection.geo
                    }
                    style={{
                      color: config.boundaryColor,
                      weight: config.boundaryWidth,
                    }}
                  />
                );
              })
          : null}
        {geoJSONs ? (
          layerConfigs
            .filter((config) => config.visible && config.type === "data")
            .map((config) => (
              <GeoJSON
                onAdd={(e) => e.target.bringToBack()}
                key={`data-layer-${config.name}-${props.selection.geo}-${
                  props.viewMapData ? "data" : "nodata"
                }`}
                style={(feature) => geoJSONStyle(feature, config)}
                onmouseout={() => setHoverBin()}
                onmouseover={(e) => {
                  setHoverBin(
                    data[e.propagatedFrom.feature.properties[tractIDField]]
                      ? data[e.propagatedFrom.feature.properties[tractIDField]]
                          .colorIndex
                      : null
                  );
                  setHoverFeature(e.propagatedFrom.feature);
                }}
                filter={(feature) => {
                  const geoID = feature.properties[config.geoField].toString();
                  const tractInfo = props.tractInfo[geoID];

                  return tractInfo
                    ? props.selection.geo === "11-County"
                      ? true
                      : props.selection.geoType === "County"
                      ? feature.properties["COUNTY_NM"] === props.selection.geo
                      : props.selection.geoType === "City"
                      ? tractInfo.Cities.includes(props.selection.geo)
                      : true
                    : false;
                }}
                data={geoJSONs[config.name]}
              >
                <Tooltip
                  style={{
                    border: "solid #808080 1px",
                    borderRadius: "5px",
                    boundaryColor: "transparent",
                  }}
                >
                  <MapTooltip
                    {...props}
                    data={data}
                    hoverFeature={hoverFeature}
                    indicatorFormatter={indicatorFormatter}
                  />
                </Tooltip>
              </GeoJSON>
            ))
        ) : (
          <div id="map-loading-spinner">
            <RingLoader
              css={{
                margin: "35vh auto",
                zIndex: "9999999",
              }}
              color="#4B7B90"
              size="75px"
            />
          </div>
        )}
        {geoJSONs
          ? layerConfigs
              .filter(
                (config) => config.visible && config.type === "transportation"
              )
              .map((config) => (
                <GeoJSON
                  onAdd={(e) => e.target.bringToFront()}
                  key={`data-layer-${config.name}-${props.selection.geo}`}
                  style={(feature) => ({
                    color:
                      config.name === "transit"
                        ? `#${feature.properties.route_color}`
                        : config.color,
                    weight: config.weight,
                  })}
                  data={geoJSONs[config.name]}
                />
              ))
          : null}
        <TileLayer
          key={`tile-layer-${tileLayer[tile].name}`}
          url={tileLayer[tile].url}
          attribution={tileLayer[tile].attribution}
        />
        <ZoomControl position="bottomleft" />
      </LeafletMap>
      {mobile ? (
        <>
          <div
            id="tile-layer-icon"
            onClick={() =>
              setOpenTileLayerSelector(openTileLayerSelector ? false : true)
            }
          >
            <Icon name="map" size="big" />
          </div>
          <div
            id={
              openTileLayerSelector
                ? "tile-layer-selector-open"
                : "tile-layer-selector-closed"
            }
            className="tile-layer-selector"
          >
            {tileLayer.map((item, idx) => (
              <img
                className="tile-layer-thumb"
                draggable="false"
                alt="tile layer"
                style={{
                  border:
                    tileLayer[tile].name === item.name
                      ? "solid blue 3px"
                      : null,
                }}
                onClick={() => {
                  setTile(tileLayer.indexOf(item));
                  setOpenTileLayerSelector(false);
                }}
                key={`${item.name}-thumb-${idx}`}
                src={item.thumbUrl}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="tile-layer-selection-box" id="tile-layer-selector">
          {tileLayer.map((item, idx) => (
            <div key={`tile-layer-map-div${idx}`}>
              <img
                className="tile-layer-thumb"
                draggable="false"
                alt={`Tile Layer Thumbnail Selector ${item.name}`}
                style={{
                  border:
                    tileLayer[tile].name === item.name
                      ? "solid blue 3px"
                      : null,
                }}
                onClick={() => {
                  setTile(tileLayer.indexOf(item));
                }}
                key={`${idx}-thumb`}
                src={item.thumbUrl}
              />
            </div>
          ))}
        </div>
      )}
      {props.selection && stats ? (
        <div id={props.mobile ? "map-legend-box-above" : "map-legend-box"}>
          {/* <div
            id='map-data-toggle-wrapper'
          > */}
          <div id="map-data-toggle-label">Show Data on Map</div>
          <Checkbox
            toggle
            onChange={() =>
              setViewMapData(viewMapData === false ? true : false)
            }
          />
          {/* </div> */}
          <MapLegend
            hoverBin={hoverBin}
            viewMapData={props.viewMapData}
            selection={props.selection}
            colors={props.colors}
            stats={stats}
          />
        </div>
      ) : null}
    </>
  );
};

export default MapComp;
