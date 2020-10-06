import React, { useEffect, useState, useRef } from 'react';
import utils from '../../utils';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';

const MapComp = props => {

  // console.log(props);
  const mapRef = useRef();
  const [geoJSONs, setGeoJSONs] = useState();

  const tileLayerConfig = [
    {
      name: 'ArcGIS Satellite',
      attribution:
        '&copy <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ESRI World Imagery</a>',
      url:
        'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    },
    {
      name: 'ArcGIS Light Grey',
      attribution:
        '&copy <a href=https://www.arcgis.com/home/item.html?id=ed712cb1db3e4bae9e85329040fb9a49>ESRI World Light Grey</a>',
      url:
        'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    }
  ];

  const openDataAPIConfig = [
    {
      name: 'cities',
      visible: true,
      type: 'boundary',
      url:
        'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/58/query?where=County10%20%3D%20%27YES%27&outFields=OBJECTID,Name,County10,Sq_Miles&outSR=4326&f=geojson',
    },
    {
      name: 'counties',
      visible: true,
      type: 'boundary',
      url:
        'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/68/query?where=Reg_Comm%20%3D%20%27ATLANTA%20REGIONAL%20COMMISSION%27&outFields=*&outSR=4326&f=geojson',
    },
    {
      name: 'tracts',
      visible: true,
      type: 'data',
      url:
        `https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/56/query?where=PLNG_REGIO%20%3D%20%27ARC%2010%27&outFields=OBJECTID,STATEFP10,COUNTYFP10,TRACTCE10,GEOID10,NAME10,NAMELSAD10,COUNTY_NM,PLNG_REGIO,COUNTY,TRACT,SqMi_Total,SqMi_Land&outSR=4326&f=geojson`,
    }
  ];

  // console.log('geoJSONs: ', JSON.stringify(geoJSONs));
  // const handleTractGeoJSONs = () => {
  //   utils
  //   .getData
  // };

  const handleBoundryGeoJSONs = () => {

    const getBoundaryGeoJSON = (key, url) =>
      new Promise(resolve =>
        utils
          .getData(url)
          .then(res => [key, res.data])
          .catch(err => console.log(err)
          )
          .then(data => resolve(data))
          .catch(err => console.log(err)));


    let returnedGeoJSONs = [];

    // console.log(openDataAPIConfig);

    openDataAPIConfig.forEach(config =>
      returnedGeoJSONs.push(
        getBoundaryGeoJSON(config.name, config.url)
      )
    );

    Promise.all(returnedGeoJSONs)
      .then(boundaryGeoJSONS => {
        // console.log(boundaryGeoJSONS);
        const geoJSONsObj = {};
        [...boundaryGeoJSONS].forEach(([key, value]) =>
          geoJSONsObj[key] = value
        );
        setGeoJSONs(geoJSONsObj);
      });
  };

  useEffect(handleBoundryGeoJSONs, []);


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
            .map(config =>
              // boundaryLayerKeys.map((key, i) =>
              <GeoJSON
                onAdd={e => e.target.bringToBack()}
                key={`boundary-layer-${config.name}`}
                data={geoJSONs[config.name]}
              />
            )
          : null
      }
      {
        geoJSONs ?
          openDataAPIConfig
            .filter(config => config.visible && config.type === 'data')
            .map(config =>
              // boundaryLayerKeys.map((key, i) =>
              <GeoJSON
              onAdd={e => e.target.bringToBack()}
              style={{
                  color: 'red',
                  weight: 1,
                  fillColor: 'red',
                  fillOpacity: .7
            
                }}
                key={`boundary-layer-${config.name}`}
                data={geoJSONs[config.name]}
              />
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
