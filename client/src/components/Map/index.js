import React, { useEffect, useState, useRef } from 'react';
import utils from '../../utils';
import { Map as LeafletMap, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import polygonToLine from '@turf/polygon-to-line';
// import RingLoader from "react-spinners/RingLoader";


const MapComp = props => {

  const mapRef = useRef();
  const [geoJSONs, setGeoJSONs] = useState();
  const showSubareas = true;

  const tileLayerConfig = props.config.tilelayers;

  const openDataAPIConfig = props.config.api;

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

    openDataAPIConfig.forEach(config =>
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

  const tractIDField = openDataAPIConfig.find(info =>
    info.name === 'tracts').geoField

  const tractStyle = feature => {
    const geoID = feature.properties[tractIDField];
    const tractInfo = props.tractInfo[geoID];
    const subarea = tractInfo ? parseInt(tractInfo.Subarea.replace('Subarea ', '')) : null;
    console.log(subarea);
    const color = subarea ? props.config.style.colormap[subarea - 1] : 'transparent';
    return {
    color: color,
    weight: 2,
    fillColor: color,
    fillOpacity: 1
    }
  };

  useEffect(handleGeoJSONs, []);

  console.log(props.tractInfo)
  return (
    // container for map
    <LeafletMap
      animate
      center={[33.753, -84.386]}
      zoom={10}
      key={`leaflet-map-${mapRef}`}>
      {
        geoJSONs ?
          openDataAPIConfig
            .filter(config => config.visible && config.type === 'boundary')
            .map(config => {
              const boundary = geoJSONs[config.name].features.map(feature =>
                polygonToLine(feature));
              return (
                <GeoJSON
                  onAdd={e => e.target.bringToFront()}
                  key={`boundary-layer-${config.name}-${props.selection.geo}`}
                  data={boundary}
                  filter={feature => 
                    props.selection.geo === '10 Counties' ?
                      config.name === 'counties'
                    : feature.properties[config.geoField] === props.selection.geo
                  }
                />
              );
            })
          : null
      }
      {
        geoJSONs ?
          openDataAPIConfig
            .filter(config => config.visible && config.type === 'data')
            .map(config =>
              <GeoJSON
                onAdd={e => e.target.bringToBack()}
                style={feature => tractStyle(feature) }
                filter={feature => {
                  const geoID = feature.properties[config.geoField];
                  const tractInfo = props.tractInfo[geoID];
                  // console.log(tractInfo);
                  // console.log(feature);
                  // console.log(props.selection);
                  // const tractInfo = props.tractInfo
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
                key={`data-layer-${config.name}-${props.selection.geo}`}
                data={geoJSONs[config.name]}
              >
                <Tooltip
                  content={'TEST'}
                />
              </GeoJSON>
            )
          : null

      }
      <TileLayer
        key={`tile-layer-${tileLayerConfig[1].name}`}
        url={tileLayerConfig[1].url}
        attribution={tileLayerConfig[1].attribution}
      />
    </LeafletMap>
  );
};

export default MapComp;
