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
      {buttonParamArr.map((item) => (
        <div
          type="button"
          key={`${item.value}-viz-view-selector-button`}
          onClick={() => props.setMobileVizView(item.value)}
          className="viz-view-selector-button"
          id={
            props.mobileVizView === item.value
              ? 'selected-viz-view-button'
              : null
          }
          style={{ width: `${100 / buttonParamArr.length}%` }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default VizViewSelector;
