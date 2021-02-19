import React, { useState, useEffect } from 'react';
import utils from './utils';
import queryString from 'query-string';
import HomePage from './View/HomePage';
import RingLoader from 'react-spinners/RingLoader';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const queryObj = queryString.parse(document.location.search);
  // console.log(queryObj);

  const [tractInfo, setTractInfo] = useState();
  // const [dataManifest, setDataManifest] = useState();
  const [config, setConfig] = useState();

  const indicators = {
    indicators: [
      {
        name: 'Percent Renters, 2017',
        type: 'percent',
        category: 'Housing',
        numeratorID: 'ID093',
        denominatorID: 'ID094',
        universe: 'Total Occupied Housing Units, 2017',
        source: 'American Community Survey, 5-year estimates, 2013-17'
      },

      {
        name: 'Change in Percent Owner Households, 2010 to 2017',
        type: 'weighted average',
        category: 'Housing',
        numeratorID: 'ID008',
        denominatorID: 'ID091',
        universe: 'Total Occupied Housing Units, 2010 & 2017',
        source: 'American Community Survey, 5-year estimates, 2006-10 & 2013-17'
      },
      {
        name: 'Averge Population in Poverty 2017',
        type: 'average',
        category: 'Economic',
        numeratorID: 'ID088',
        denominatorID: 'ID088',
        universe: 'Total Population for which Poverty Status was Determined, 2017',
        source: 'American Community Survey, 5-year estimates, 2013-17'

      }
    ]
  };

  const handleStart = () => {
    utils
      .getData('https://mahs-api-server.herokuapp.com/api/tractinfo')
      .then(res => setTractInfo(res.data))
      .catch(err => console.log(err));

    // utils
    //   .getData('https://mahs-api-server.herokuapp.com/api/datainfo')
    //   .then(res => setDataManifest(res.data))
    //   .catch(err => console.log(err));

    utils
      .getData('https://mahs-api-server.herokuapp.com/api/config')
      .then(res =>
        queryObj.geo && queryObj.geotype
          ? setConfig({
              ...res.data[0],
              selection: {
                ...res.data[0].selection,
                geoType: queryObj.geotype,
                geo: queryObj.geo,
              },
              // Remove after adding to DB
              ...indicators,
            })
          : setConfig({
              ...res.data[0],
              ...indicators,
            })
      )
      .catch(err => console.log(err));
  };

  useEffect(handleStart, []);

  // console.log(tractInfo);
  // console.log('tractInfo :', tractInfo);
  // console.log('config :', config);

  return (
    <div className="App">
      {tractInfo && config ? (
        <HomePage
          tractInfo={tractInfo}
          // manifest={dataManifest}
          config={config}
        />
      ) : (
        <div id="app-loader-spinner">
          <RingLoader css={{ margin: 'auto' }} size="100px" />
          <h1>Loading Data Explorer...</h1>
        </div>
      )}
    </div>
  );
};

export default App;
