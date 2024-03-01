import React, { useState, useEffect } from 'react';
import globalUtils from './globalUtils';
import queryString from 'query-string';
import HomePage from './View/HomePage';
import RingLoader from 'react-spinners/RingLoader';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const queryObj = queryString.parse(document.location.search);
  const [tractInfo, setTractInfo] = useState();
  const [indicators, setIndicators] = useState();
  const [config, setConfig] = useState();

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();

  const handleStart = () => {
    globalUtils
      .getData('/api/tractinfo', 'mahs')
      .then(res => {
        setTractInfo(res.data);
      })
      .catch(err => console.log(err));

    globalUtils
      .getData('/api/datainfo', 'mahs')
      .then(res =>
        setIndicators(
          res.data
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .sort(a => (a.changeType ? -1 : 0))
            .reverse()
        )
      )
      .catch(err => console.log(err));

    globalUtils
      .getData('/api/config', 'mahs')
      .then(res =>
        queryObj.geo && queryObj.geotype
          ? setConfig({
            ...res.data[0],
            selection: {
              ...res.data[0].selection,
              geoType: queryObj.geotype,
              geo: queryObj.geo
            }
            // Remove after adding to DB
            // indicators: [...indicators],
          })
          : setConfig({
            ...res.data[0]
            // indicators: [...indicators],
          })
      )
      .catch(err => console.log(err));
  };

  useEffect(handleStart, []);

  return (
    <div className='App'>
      {tractInfo && config && indicators ? (
        <HomePage
          tractInfo={tractInfo}
          indicators={indicators}
          config={config}
        />
      ) : (
        <div id='app-loader-spinner'>
          <RingLoader
            css={{
              top: '5vh',
              margin: 'auto',
              right: '50px'
            }}
            size='100px'
          />
          <h1>Loading MAHS Data Explorer</h1>
        </div>
      )}
    </div>
  );
};

export default App;
