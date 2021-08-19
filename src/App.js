import React, { useState, useEffect } from "react";
import globalUtils from "./globalUtils";
import queryString from "query-string";
import HomePage from "./View/HomePage";
import RingLoader from "react-spinners/RingLoader";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  const queryObj = queryString.parse(document.location.search);
  const [tractInfo, setTractInfo] = useState();
  const [indicators, setIndicators] = useState();
  const [config, setConfig] = useState();

  const handleStart = () => {
    globalUtils
      .getData("https://mahs-api-server.herokuapp.com/api/tractinfo")
      .then((res) => {
        setTractInfo(res.data);
      })
      .catch((err) => console.log(err));

    globalUtils
      .getData("https://mahs-api-server.herokuapp.com/api/datainfo")
      .then((res) => {
        setIndicators(res.data);
      })
      .catch((err) => console.log(err));

    globalUtils
      .getData("https://mahs-api-server.herokuapp.com/api/config")
      .then((res) =>
        queryObj.geo && queryObj.geotype
          ? setConfig({
              ...res.data[0],
              selection: {
                ...res.data[0].selection,
                geoType: queryObj.geotype,
                geo: queryObj.geo,
              },
              // Remove after adding to DB
              // indicators: [...indicators],
            })
          : setConfig({
              ...res.data[0],
              // indicators: [...indicators],
            })
      )
      .catch((err) => console.log(err));
  };

  useEffect(handleStart, []);

  return (
    <div className="App">
      {tractInfo && config && indicators ? (
        <HomePage
          tractInfo={tractInfo}
          indicators={indicators}
          config={config}
        />
      ) : (
        <div id="app-loader-spinner">
          <RingLoader css={{ margin: "auto" }} size="100px" />
          <h1>Loading MAHS Data Explorer...</h1>
        </div>
      )}
    </div>
  );
};

export default App;
