import React from 'react';
import './style.css';

const VizViewSelector = (props) => {
  const buttonParamArr = [
    {
      text: 'Map',
      value: 'map',
    },
    {
      text: 'Chart',
      value: 'chart',
    },
    {
      text: 'Table',
      value: 'table',
    },
  ];

  return (
    <div id="viz-view-selector">
      {buttonParamArr.map((item) => {
        <a
          type="button"
          className="selector-button"
          id={`${item.value}-selector`}
        >
          {item.text}
        </a>;
      })}
      {/* <a className="button-columns" id="map-selector">
        Map
      </a>
      <a className="button-columns" id="chart-selector">
        Chart
      </a>
      <a className="button-columns" id="table-selector">
        Table
      </a> */}
    </div>
  );
};

export default VizViewSelector;
