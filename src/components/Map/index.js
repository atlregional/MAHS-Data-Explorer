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
import { Checkbox } from 'semantic-ui-react';
import RingLoader from 'react-spinners/RingLoader';
import './style.css';

const MapComp = props => {
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
  const indicatorType = props.selection.indicator.type;
  const setViewMapData = props.setViewMapData;
  const viewMapData = props.viewMapData;

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
      ? //
        data[tractInfo.GEOID].colorIndex
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

  // console.log('data', data);
  // console.log('geoJSONs',geoJSONs);

  const CustomTooltip = () => {
    const thisFeature = hoverFeature.properties;
    const tractInfo = thisFeature ? props.tractInfo[thisFeature.GEOID10] : null;
    const subarea = tractInfo ? tractInfo.Subarea : null;
    const subareaNumber = subarea
      ? parseInt(subarea.replace('Subarea ', ''))
      : null;
    const selectionInfo = props.selection;
    // console.log('subarea data in map:', props.subareaData);
    const subareaValue =
      props.subareaData && subarea
        ? props.subareaData.filter(item => item.name === subarea)[0]
          ? props.subareaData.filter(item => item.name === subarea)[0][
              selectionInfo.indicator.name
            ]
          : null
        : null;

    //
    return data && thisFeature ? (
      <div className="map-custom-tooltip">
        <span className="tooltip-header">{thisFeature.NAMELSAD10} </span>{' '}
        <div>
          in{' '}
          <span className="tooltip-county-thin">
            {thisFeature.COUNTY_NM ? `${thisFeature.COUNTY_NM} County` : null}
          </span>
        </div>
        <span className="tooltip-key-indicator">
          {selectionInfo.indicator.name}
          <br />
          <span className="tooltip-key-indicator-value">
            {data[thisFeature.GEOID10]
              ? //
                numeral(data[thisFeature.GEOID10].value).format(
                  indicatorType === 'percent' ? '0.0%' : '0,0'
                )
              : null}
          </span>
          <br />
        </span>
        <div className="tooltip-compare-metrics">
          Compare to{' '}
          <span
            style={{ color: props.config.style.colormap[subareaNumber - 1] }}
          >
            <span className="tooltip-subarea">
              <strong>{subarea}</strong>{' '}
            </span>
          </span>
          in <span className="tooltip-county-thic">{selectionInfo.geo}</span> at{' '}
          <strong>
            <span className="tooltip-percent-comparison">
              {subareaValue
                ? numeral(subareaValue).format(
                    indicatorType === 'percent' ? ' 0.0%' : '0,0'
                  )
                : null}
            </span>
          </strong>
          <br />
          Compare to
          <span className="tooltip-percent-comparison">
            {' '}
            {selectionInfo.geo}{' '}
            {selectionInfo.geoType !== 'City' ? selectionInfo.geoType : ' '}
          </span>{' '}
          at{' '}
          <span className="tooltip-percent-comparison">
            {data['All']
              ? //
                numeral(data['All'].value).format(
                  indicatorType === 'percent' ? ' 0.0%' : '0,0'
                )
              : null}
          </span>
        </div>
        <span id="data-source" className="data-credits">
          Data Source : {}{' '}
        </span>
        <span className="data-credits">
          Universe : {selectionInfo.indicator.universe.name}
        </span>
      </div>
    ) : (
      <h3>No Data</h3>
    );
  };
  // console.log('hoverFeature :', hoverFeature);

  const handleBounds = featureBounds =>
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
        {geoJSONs ? (
          layerConfigs
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
                  const geoID = feature.properties[config.geoField].toString();
                  const tractInfo = props.tractInfo[geoID];

                  return tractInfo
                    ? props.selection.geo === '10 Counties'
                      ? true
                      : props.selection.geoType === 'County'
                      ? feature.properties['COUNTY_NM'] === props.selection.geo
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
        ) : (
          <div id="map-loading-spinner">
            <RingLoader
              css={{
                margin: '35vh auto',
                zIndex: '9999999',
              }}
              color="#4B7B90"
              size="75px"
            />
          </div>
        )}
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
      {/* {!geoJSONs ? (
        (
          <div id="map-loading-spinner">
          <RingLoader
            css={{
              margin: 'auto',
              zIndex: '9999999',
            }}
            color={'#bebebebc'}
            size="75px"
          />
        </div>)
      ) : null} */}
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
      <div id="chart-map-toggle-box">
        <div id="map-data-toggle-label">Show Data on Map</div>
        <Checkbox
          toggle
          onChange={() => setViewMapData(viewMapData === false ? true : false)}
        />
      </div>
    </>
  );
};

export default MapComp;
// {(
//   <renderThing />
// )
