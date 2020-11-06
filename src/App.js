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
  const [dataManifest, setDataManifest] = useState();
  const [config, setConfig] = useState();

  const indicators = {
    indicators: [
      {
        name: 'Percent Renters 2017',
        type: 'percent',
        category: 'Housing',
        indicator: {
          id: 'ID093',
          name: 'Total Renter Occupied Housing Units 2017',
        },
        universe: {
          id: 'ID094',
          name: 'Total Occupied Housing Units 2017',
        },
      },

      {
        name: 'Change in Percent Owner Households since 2010',
        type: 'weighted average',
        category: 'Housing',
        indicator: {
          id: 'ID008',
          name: 'Change in Percent Owner Households since 2010',
        },
        universe: {
          id: 'ID091',
          name: 'Total Occupied Housing Units 2010',
        },
      },
      {
        name: 'Averge Population in Poverty 2017',
        type: 'average',
        category: 'Economic',
        indicator: {
          id: 'ID088',
          name: 'Population in Poverty 2017',
        },
        universe: {
          id: 'ID088',
          name: 'Population in Poverty 2017',
        },
      },
    ],
  };

  const handleStart = () => {
    utils
      .getData('https://mahs-api-server.herokuapp.com/api/tractinfo')
      .then(res => setTractInfo(res.data))
      .catch(err => console.log(err));

    utils
      .getData('https://mahs-api-server.herokuapp.com/api/datainfo')
      .then(res => setDataManifest(res.data))
      .catch(err => console.log(err));

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

  return (
    <div className="App">
      {tractInfo && dataManifest && config ? 
        <HomePage
          tractInfo={tractInfo}
          manifest={dataManifest}
          config={config}
        />
      : 
        <div id="app-loader-spinner">
          <RingLoader css={{ margin: 'auto' }} size="100px" />
          <h1>Loading Data Explorer...</h1>
        </div>
      }
    </div>
  );
};

export default App;
