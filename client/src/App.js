import React, { useState, useEffect } from 'react';
import utils from './utils';
import queryString from 'query-string';
import HomePage from './View/HomePage';
import RingLoader from "react-spinners/RingLoader";


import './App.css';

const App = () => {

  const queryObj = queryString.parse(document.location.search);
  // console.log(queryObj);

  const [tractInfo, setTractInfo ] = useState();
  const [dataManifest, setDataManifest] = useState();
  const [config, setConfig] = useState();


  useEffect(() => {
    utils
    .getData('/api/tractinfo')
    .then(res => setTractInfo(res.data))
    .catch(err => console.log(err));

    utils
    .getData('/api/datainfo')
    .then(res => setDataManifest(res.data))
    .catch(err => console.log(err));

    utils
    .getData('/api/config')
    .then(res => 
      queryObj.geo && 
      queryObj.geotype ?
        setConfig({
          ...res.data[0],
          selection: {
            ...res.data[0].selection,
            geoType: queryObj.geotype,
            geo: queryObj.geo,
          }
        })
      : setConfig(res.data[0])

    )
    .catch(err => console.log(err));
  }, []);

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
            size='100px'/>
          <h1>Loading Data Explorer...</h1>
        </div>
      }
    </div>
  );
}

export default App;
