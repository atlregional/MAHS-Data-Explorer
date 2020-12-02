import React, { useEffect, useState } from 'react';
import utils from '../../utils';
import {
  Map as LeafletMap,
  TileLayer,
  GeoJSON,
  ZoomControl,
  Tooltip,
} from 'react-leaflet';
// import RingLoader from 'react-spinners/RingLoader';
import MapLegend from '../MapLegend';
import polygonToLine from '@turf/polygon-to-line';
import { Icon } from 'semantic-ui-react';
import numeral from 'numeral';
import './style.css';
import RingLoader from 'react-spinners/RingLoader';
import PulseLoader from 'react-spinners/PulseLoader';

const MapComp = props => {
  const mobile = window.screen.width < 800;
  // console.log('MapComp - props :', props);
  const [geoJSONs, setGeoJSONs] = useState();
  console.log('geoJSONs :', geoJSONs);
  const [hoverFeature, setHoverFeature] = useState({});
  // console.log('hoverFeature :', hoverFeature);
  // const [tractInfo, setTractInfo] = useState();

  const [hoverBin, setHoverBin] = useState();
  // console.log('hoverBin :', hoverBin);

  const layerConfigs = props.layers;
  // data is geoId obj with the value from the chart filter and corresponding color index
  // {111111112 : {value: , colorIndex: }};
  const [data, setData] = useState();
  console.log('data: ', data);

  // stats are the aggragated percentage values from the chart relative to the entire map
  // {max: , min: , range: }
  const [stats, setStats] = useState();
  // console.log('MapComp - stats :', stats);

  const tileLayer = props.config.tilelayers;
  const [tile, setTile] = useState(1);

  const [openTileLayerSelector, setOpenTileLayerSelector] = useState(false);

  const [mapSpinner, setMapSpinner] = useState(true);

  // type of indicator, ie. percentage....
  const indicatorType = props.selection.indicator.type;

  const handleTractData = () => {
    const array = [];
    const tractInfo = props.tractInfo;
    const dataObj = {};
    const tractData = tractInfo
      ? Object.values(tractInfo).filter(tract =>
          utils.filterBySelection(tract, props.selection)
        )
      : null;

    // geoId : aggVal
    const aggregatedData = tractData
      ? utils.aggregate(tractData, props.selection.indicator, 'GEOID')
      : {};

    // console.log(aggregatedData);

    Object.entries(aggregatedData).forEach(([key, value]) =>
      array.push({
        name: key,
        Subarea: parseInt(key.replace('Subarea ', '')),
        [props.selection.indicator.name]: value,
      })
    );

    const valueArray = array.map(item =>
      parseFloat(item[props.selection.indicator.name])
    );
    const maxValue = valueArray ? Math.max(...valueArray) : null;
    const minValue = valueArray ? Math.min(...valueArray) : null;

    Object.entries(aggregatedData).forEach(([key, value]) => {
      const disFromMin = value - minValue;
      const binningRatio = disFromMin / (maxValue - minValue);
      const colorIndex = Math.floor(binningRatio * props.numBins);

      dataObj[key] = { value: value, colorIndex: colorIndex };
    });
    // console.log('dataObj :', dataObj);

    setData(dataObj);
    setStats({ max: maxValue, min: minValue, range: maxValue - minValue });
  };

  const handleGeoJSONs = () => {
    const getGeoJSON = (key, url) =>
      new Promise(resolve =>
        utils
          .getData(url)
          .then(res => [key, res.data])
          .catch(err => console.log(err))
          .then(data => resolve(data))
          .catch(err => console.log(err))
      );

    let returnedGeoJSONs = [];

    // console.log(returnedGeoJSONs);

    layerConfigs.forEach(config =>
      returnedGeoJSONs.push(getGeoJSON(config.name, config.url))
    );

    Promise.all(returnedGeoJSONs).then(geoJSONS => {
      // console.log('returnedGeoJSONs: ', returnedGeoJSONs);
      const geoJSONsObj = {};
      [...geoJSONS].forEach(([key, value]) => (geoJSONsObj[key] = value));
      setGeoJSONs(geoJSONsObj);
    });
  };

  const [bounds, setBounds] = useState();

  const tractIDField = layerConfigs.find(info => info.name === 'tracts')
    .geoField;

  const tractStyle = tractInfo => {
    const viewMapData = props.viewMapData;
    const subarea = tractInfo
      ? parseInt(tractInfo.Subarea.replace('Subarea ', ''))
      : null;
    const config = props.config;

    const colorIndex = data[tractInfo.GEOID]
      ? data[tractInfo.GEOID].colorIndex
      : null;
    const color = viewMapData
      ? props.colors[colorIndex]
      : subarea
      ? config.style.colormap[subarea - 1]
      : null;

    return {
      fillColor: color,
      color: viewMapData ? 'black' : color,
      // fillOpacity: 0.7,
    };
  };

  console.log('hoverFeature', hoverFeature);

  const CustomTooltip = () =>
    data && hoverFeature.properties ? (
      <div>
        {props.tractInfo[hoverFeature.properties.GEOID10].Subarea}
        <br />
        {hoverFeature.properties.NAMELSAD10}
        <br />
        {hoverFeature.properties.COUNTY_NM}
        <br />
        {props.selection.indicator.name + ' : '}
        {data[hoverFeature.properties.GEOID10]
          ? numeral(data[hoverFeature.properties.GEOID10].value).format(
              indicatorType === 'percent' ? '0.0%' : '0,0'
            )
          : null}
      </div>
    ) : (
      <h3>No Data</h3>
    );
  // console.log('hoverFeature :', hoverFeature);

  const handleBounds = featureBounds =>
    Object.keys(featureBounds).length > 0 ? setBounds(featureBounds) : null;
  useEffect(handleGeoJSONs, []);
  useEffect(handleTractData, [geoJSONs, props.selection]);

  // ****** TRIED TO IMPLEMENT THE LOADER SEVERAL OTHER WAYS
  // BUT COULDN'T GET THEM TO WORK CONDITIONALLY,
  // SO I IMPLEMENTED A TIMEOUT AND THE 3SEC IS WORKING PRETTY DARN WELL;
  // setTimeout(() => {
  //   setMapSpinner(false);
  // }, 10000);

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
        zoom={10}
        bounds={bounds ? bounds : null}
        zoomDelta={0.3}
        zoomSnap={0.3}
        maxZoom={16}
        minZoom={3}
        zoomControl={false}
      >
        {geoJSONs
          ? layerConfigs
              .filter(config => config.visible && config.type === 'boundary')
              .map(config => {
                const boundary = geoJSONs[config.name].features.map(feature =>
                  polygonToLine(feature)
                );
                return (
                  <GeoJSON
                    onAdd={e => {
                      e.target.bringToFront();
                      const featureBounds = e.target.getBounds();
                      handleBounds(featureBounds);
                    }}
                    key={`boundary-layer-${config.name}-${props.selection.geo}`}
                    data={boundary}
                    filter={feature =>
                      props.selection.geo === '10 Counties'
                        ? config.name === 'counties'
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
        {geoJSONs
          ? layerConfigs
              .filter(config => config.visible && config.type === 'data')
              .map(config => (
                <GeoJSON
                  onAdd={e => e.target.bringToBack()}
                  key={`data-layer-${config.name}-${props.selection.geo}-${
                    props.viewMapData ? 'data' : 'nodata'
                  }`}
                  style={feature => {
                    const geoID = feature.properties[tractIDField];
                    const tractInfo = props.tractInfo[geoID];
                    const subarea = tractInfo['Subarea'];
                    // const data = tractInfo['Data'];
                    // console.log(data);
                    const highlight =
                      subarea === `Subarea ${props.highlightedSubarea}`;
                    const style = tractStyle(tractInfo);
                    return {
                      ...style,
                      color:
                        props.highlightedSubarea && highlight
                          ? 'black'
                          : config.boundaryColor,
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
                  }}
                  // onm
                  onmouseout={() => setHoverBin()}
                  onmouseover={
                    e => {
                      setHoverBin(
                        data[e.layer.feature.properties[tractIDField]]
                          ? data[e.layer.feature.properties[tractIDField]]
                              .colorIndex
                          : null
                      );
                      setHoverFeature(e.layer.feature);
                    }
                    // console.log(data[e.layer.feature.properties[tractIDField]])
                  }
                  filter={feature => {
                    const geoID = feature.properties[
                      config.geoField
                    ].toString();
                    const tractInfo = props.tractInfo[geoID];

                    return tractInfo
                      ? props.selection.geo === '10 Counties'
                        ? true
                        : props.selection.geoType === 'County'
                        ? feature.properties['COUNTY_NM'] ===
                          props.selection.geo
                        : props.selection.geoType === 'City'
                        ? tractInfo.Cities.includes(props.selection.geo)
                        : true
                      : false;
                  }}
                  data={geoJSONs[config.name]}
                >
                  <Tooltip>
                    <CustomTooltip />
                  </Tooltip>
                </GeoJSON>
              ))
          : null}
        {geoJSONs
          ? layerConfigs
              .filter(
                config => config.visible && config.type === 'transportation'
              )
              .map(config => (
                <GeoJSON
                  onAdd={e => e.target.bringToFront()}
                  key={`data-layer-${config.name}-${props.selection.geo}`}
                  style={feature => ({
                    color:
                      config.name === 'transit'
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
      {!geoJSONs ? (
        <div id="map-loading-spinner">
          <RingLoader
            css={{
              margin: 'auto',
              zIndex: '9999999',
            }}
            color={'#bebebebc'}
            size="75px"
          />
        </div>
      ) : null}
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
                ? 'tile-layer-selector-open'
                : 'tile-layer-selector-closed'
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
                      ? 'solid blue 3px'
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
                      ? 'solid blue 3px'
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
        <div id="map-legend-box">
          <MapLegend
            // colorScaleHoverIdx={props.colorScaleHoverIdx}
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
// {(
//   <renderThing />
// )
