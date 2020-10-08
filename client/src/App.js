import React, { useState, useEffect } from 'react';
import utils from './utils';
import HomePage from './View/HomePage';
import './App.css';

const App = () => {
  const [data, setData ] = useState();
  const [dataManifest, setDataManifest] = useState()

  useEffect(() => {
    utils
    .getData('/tractinfo')
    .then(res => setData(res.data))
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
        data &&
        dataManifest ?
          <HomePage data={data} manifest={dataManifest} />
        : null
      }
    </div>
  );
}

export default App;
