import React from 'react';
import './style.css';

const MapLegend = props => {
  console.log('MapLegend - props :', props);

  const viewMapData = props.viewMapData;
  const colorArr = props.colors;
  const minVal = (props.stats.min * 100).toFixed(2);
  const maxVal = (props.stats.max * 100).toFixed(2);
  //   const colorScaleBlockWidth = document.getElementsById('map-legend-box')
  //     .offsetWidth;

  //   console.log(colorScaleBlockWidth);
  return (
    <>
      {viewMapData ? (
        <div id="legend">
          <h4 className="map-legend-title">{props.selection.indicator.name}</h4>
          <div className="values-row"></div>
          {props.stats ? (
            <div className="color-row" style={{ backgroundColor: 'white' }}>
              <span className="min-value value-perimeter">{minVal}%</span>
              {colorArr.map(color => (
                <div
                  key={`color-block-${color}`}
                  className="color-scale-block"
                  style={{
                    backgroundColor: `${color}`,
                    width: `2.5px`,
                  }}
                ></div>
              ))}{' '}
              <span className="max-value value-perimeter">{maxVal}%</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default MapLegend;
