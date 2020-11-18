import React, { useEffect, useState } from 'react';
import utils from '../../utils';
import {
  Map as LeafletMap,
  TileLayer,
  GeoJSON,
  ZoomControl,
} from 'react-leaflet';
import polygonToLine from '@turf/polygon-to-line';
import { Icon } from 'semantic-ui-react';

import './style.css';
// import RingLoader from "react-spinners/RingLoader";

const MapComp = props => {
  // const mapRef = useRef();
  const [geoJSONs, setGeoJSONs] = useState();
  const mobile = window.screen.width < 800;

  // const tileLayerConfig = props.config.tilelayers;

  const layerConfigs = props.layers;

  const tileLayer = props.config.tilelayers;
  const [tile, setTile] = useState(1);
  const [openTileLayerSelector, setOpenTileLayerSelector] = useState(false);

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
    const subarea = tractInfo
      ? parseInt(tractInfo.Subarea.replace('Subarea ', ''))
      : null;
    const config = props.config;
    // const style = layerConfigs.find(item => item.name === 'tracts')
    // console.log(subarea);
    const color = subarea ? config.style.colormap[subarea - 1] : null;
    return {
      fillColor: color,
      color: color,
      // fillOpacity: 0.7,
    };
  };

  const handleBounds = featureBounds =>
    Object.keys(featureBounds).length > 0 ? setBounds(featureBounds) : null;
  useEffect(handleGeoJSONs, []);

  // console.log(props.highlightedSubarea);

  // console.log(JSON.stringify(props.tractInfo));
  return (
    // container for map
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
                  key={`data-layer-${config.name}-${props.selection.geo}`}
                  style={feature => {
                    const geoID = feature.properties[tractIDField];
                    const tractInfo = props.tractInfo[geoID];
                    const subarea = tractInfo['Subarea'];
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
                          ? 3
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
    </>
  );
};

export default MapComp;
