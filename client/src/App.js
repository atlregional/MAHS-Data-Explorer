import React, { useState, useEffect } from 'react';
import utils from './utils';
import HomePage from './View/HomePage';
import RingLoader from "react-spinners/RingLoader";


import './App.css';

const App = () => {
  const [tractInfo, setTractInfo ] = useState();
  const [dataManifest, setDataManifest] = useState();
  const [config, setConfig] = useState({
    style: {
        colormap : [
          '#F1DB6A',
          '#F08292',
          '#FD9439',
          '#335594',
          '#E556D3',
          '#8B347F',
          '#3ECA99',
          '#878FD9',
          '#AECF7F',
          '#338A70',
        ]
    },
    selection: {
      geoType: 'City',
      geo: 'Atlanta',
      subareas: [],
      indicator: null
    },
    api : [
      {
        name: 'cities',
        visible: true,
        type: 'boundary',
        url:
          'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/58/query?where=County10%20%3D%20%27YES%27&outFields=OBJECTID,Name,County10,Sq_Miles&outSR=4326&f=geojson',
        geoField : 'Name'
      },
      {
        name: 'counties',
        visible: true,
        type: 'boundary',
        url:
          'https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/68/query?where=Reg_Comm%20%3D%20%27ATLANTA%20REGIONAL%20COMMISSION%27&outFields=*&outSR=4326&f=geojson',
        geoField : 'NAME10'
      },
      {
        name: 'tracts',
        visible: true,
        type: 'data',
        url:
          `https://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/56/query?where=PLNG_REGIO%20%3D%20%27ARC%2010%27&outFields=OBJECTID,STATEFP10,COUNTYFP10,TRACTCE10,GEOID10,NAME10,NAMELSAD10,COUNTY_NM,PLNG_REGIO,COUNTY,TRACT,SqMi_Total,SqMi_Land&outSR=4326&f=geojson`,
        geoField : 'GEOID10'

      }
    ],
    tilelayers : [
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
    ]
  });


  useEffect(() => {
    utils
    .getData('/tractinfo')
    .then(res => setTractInfo(res.data))
    .catch(err => console.log(err));

    utils
    .getData('/datainfo')
    .then(res => setDataManifest(res.data))
    .catch(err => console.log(err));

  }, [])

  // console.log(data);
  return (
    <div className="App">
      {
        tractInfo &&
        dataManifest &&
        config ?
          <HomePage tractInfo={tractInfo} manifest={dataManifest} config={config} />
        : 
        <div id='app-loader-spinner'>
          <RingLoader 
            css={{margin: 'auto' }} 
            size='100'/>
          <h1>Loading Data Explorer...</h1>
        </div>
      }
    </div>
  );
}

export default App;
