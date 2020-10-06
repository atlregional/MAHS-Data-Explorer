import React, {useEffect, useState} from 'react';
import utils from '../../utils';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';

const MapComp = (props) => {
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

  const [boundaryGeos, setBoundaryGeos] = useState({});

  console.log('boundaryGeos: ', boundaryGeos);

  const handleBoundryGeoJSONs = () => {
    const openDataAPIConfig = [
      {
        name: 'cities',
        visible: true,
        url:
          'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/58/query?where=County10%20%3D%20%27YES%27&outFields=OBJECTID,Name,County10,Sq_Miles&outSR=4326&f=geojson',
      },
      {
        name: 'counties',
        visible: true,
        url:
          'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/68/query?where=Reg_Comm%20%3D%20%27ATLANTA%20REGIONAL%20COMMISSION%27&outFields=*&outSR=4326&f=geojson',
      },
    ];

    const boundariesObj = {};

    console.log('openDataAPI: ', openDataAPIConfig);

    openDataAPIConfig.map((boundary) =>
      utils
        .getData(boundary.url)
        .then((res) => (boundariesObj[boundary.name] = res))
        .catch((err) => console.log(err))
    );
    setBoundaryGeos(boundariesObj);
  };

  useEffect(() => {
    handleBoundryGeoJSONs();
  }, []);


  return (
    // container for map
    <LeafletMap center={[33.753, -84.386]} zoom={10} key={'leaflet-map'}>
      {/* GeoJSON components are used to draw the boundaries for the api calls;
      api calls for the 10 & 20 counties boundaries */}

      {
        Object.keys(boundaryGeos).length > 0
          ? Object.entries(boundaryGeos).map(([key, boundaryGeo]) => {
              console.log("boundaryGeo: line70", boundaryGeo);
              return <GeoJSON key={`boundary-layer-${key}`} data={boundaryGeo}/>;
            })
          : null
      }
      {/* noninteractive layer, tiles that make up the leafletMap; */}
      <TileLayer
      key={`tile-layer-${tileLayerConfig[1].name}`}
        url={tileLayerConfig[1].url}
        attribution={tileLayerConfig[1].attribution}
      ></TileLayer>
    </LeafletMap>
  );
};

export default MapComp;
