import React, { useState, useEffect } from 'react';
import utils from './utils';

// import  APIs  from './utils/API';

import HomePage from './View/HomePage';
import './App.css';

const App = () => {
  utils.getData('/data')
  // console.log(getData);
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
