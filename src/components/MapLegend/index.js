import React from 'react';
import './style.css';

const MapLegend = props => {
  const colorArr = props.colors;
  const minVal = (props.stats.min * 100).toFixed(2);
  const maxVal = (props.stats.max * 100).toFixed(2);
  console.log('MapLegend - props :', props);
  return (
    <div id="legend">
      <h4 className="map-legend-title">{props.selection.indicator.name}</h4>
      <div className="values-row">
        <span className="min-value">{minVal}%</span>
        <span className="max-value">{maxVal}%</span>
      </div>
      {props.stats ? (
        <div className="color-row" style={{ backgroundColor: 'white' }}>
          {colorArr.map(color => (
            <div
              key={`color-block-${color}`}
              className="color-scale-block"
              style={{ backgroundColor: `${color}`, width: '2.5px' }}
            ></div>
          ))}
        </div>
      ) : null}{' '}
    </div>
  );
};

export default MapLegend;
