import React, { useEffect, useState, useRef } from 'react';
import utils from '../../utils';
import { Map as LeafletMap, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import polygonToLine from '@turf/polygon-to-line';
// import RingLoader from "react-spinners/RingLoader";


const MapComp = props => {

  const mapRef = useRef();
  const [geoJSONs, setGeoJSONs] = useState();

  const tileLayerConfig = props.config.tilelayers;

  const layerConfigs = props.config.layers;

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

    console.log(returnedGeoJSONs);

    layerConfigs.forEach(config =>
      returnedGeoJSONs.push(
        getGeoJSON(config.name, config.url)
      )
    );

    Promise.all(returnedGeoJSONs)
      .then(geoJSONS => {
        const geoJSONsObj = {};
        [...geoJSONS].forEach(([key, value]) =>
          geoJSONsObj[key] = value
        );
        setGeoJSONs(geoJSONsObj);
      });
  };

  const [bounds, setBounds] = useState();

  const tractIDField = layerConfigs.find(info =>
    info.name === 'tracts').geoField

  const tractStyle = tractInfo => {
    const subarea = tractInfo ? 
      parseInt(tractInfo.Subarea.replace('Subarea ', '')) 
    : null;
    const config = props.config;
    // const style = layerConfigs.find(item => item.name === 'tracts')
    // console.log(subarea);
    const color = subarea ? config.style.colormap[subarea - 1] : null;
    return {
    fillColor: color,
    fillOpacity: .7
    }
  };

  const handleBounds = featureBounds => 
    Object.keys(featureBounds).length > 0 ? 
      setBounds(featureBounds)
    : null;
  useEffect(handleGeoJSONs, []);

  // console.log(JSON.stringify(props.tractInfo));
  return (
    // container for map
    <LeafletMap
      animate
      boxZoom
      trackResize
      doubleClickZoom
      scrollWheelZoom
      dragging
      center={[33.753, -84.386]}
      zoom={10}
      bounds={bounds ? bounds : null}
      key={`leaflet-map-${mapRef}`}
      zoomDelta={0.3}
      zoomSnap={0.3}
      maxZoom={20}
      minZoom={3}
    >
      {
        geoJSONs ?
          layerConfigs
            .filter(config => config.visible && config.type === 'boundary')
            .map(config => {
              const boundary = geoJSONs[config.name].features.map(feature =>
                polygonToLine(feature));
              return (
                <GeoJSON
                  onAdd={e => {
                    e.target.bringToFront()
                    const featureBounds = e.target.getBounds();
                    handleBounds(featureBounds);
                  }}
                  key={`boundary-layer-${config.name}-${props.selection.geo}`}
                  data={boundary}
                  filter={feature => 
                    props.selection.geo === '10 Counties' ?
                      config.name === 'counties'
                    : feature.properties[config.geoField] === props.selection.geo
                  }
                  style={{
                    color: config.boundaryColor,
                    weight: config.boundaryWidth,
                  }}
                />
              );
            })
          : null
      }
      {
        geoJSONs ?  
          layerConfigs
            .filter(config => config.visible && config.type === 'data')
            .map(config =>
              <GeoJSON
                onAdd={e => e.target.bringToBack()}
                key={`data-layer-${config.name}-${props.selection.geo}`}
                style={feature => {
                  const geoID = feature.properties[tractIDField];
                  const tractInfo = props.tractInfo[geoID];
                  // const style = layerConfigs.find(item => item.name === config)

                  return {
                    color: config.boundaryColor,
                    weight: config.boundaryWidth,
                    ...tractStyle(tractInfo),

                  };
                }}
                filter={feature => {
                  const geoID = feature.properties[config.geoField].toString();
                  const tractInfo = props.tractInfo[geoID];
                  // console.log(tractInfo);
                  return (
                    tractInfo ?
                      props.selection.geo === '10 Counties' ? 
                        true :  props.selection.geoType === 'County' ?
                          feature.properties['COUNTY_NM'] === props.selection.geo
                          : props.selection.geoType === 'City' ?
                            tractInfo.Cities.includes(props.selection.geo)
                      : true
                    : false
                  );
                }}
                data={geoJSONs[config.name]}
              />
            )
          : null

      }
      <TileLayer
        key={`tile-layer-${tileLayerConfig[0].name}`}
        url={tileLayerConfig[0].url}
        attribution={tileLayerConfig[0].attribution}
      />
    </LeafletMap>
  );
};

export default MapComp;
