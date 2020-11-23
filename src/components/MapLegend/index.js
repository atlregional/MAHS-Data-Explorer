import React from 'react';
import numeral from 'numeral';
import './style.css';

const MapLegend = props => {
  console.log('MapLegend - props :', props);

  const viewMapData = props.viewMapData;
  const colorArr = props.colors;
  const inidicatorName = props.selection.indicator.name;
  const indicatorType = props.selection.indicator.type;

  console.log(indicatorType);
  const minVal = numeral(props.stats.min).format(indicatorType === 'percent' ? '0.0%' : '0,0');
  const maxVal = numeral(props.stats.max).format(indicatorType === 'percent' ? '0.0%' : '0,0');
  //   const colorScaleBlockWidth = document.getElementsById('map-legend-box')
  //     .offsetWidth;

  //   console.log(colorScaleBlockWidth);
  return (
    <>
      {viewMapData ? (
        <div id="legend">
          <p className="map-legend-title">{inidicatorName}</p>
          {props.stats ? (
            <div className="color-row" style={{ backgroundColor: 'white' }}>
              <span className="min-value value-perimeter">{minVal}</span>
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
              <span className="max-value value-perimeter">{maxVal}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default MapLegend;
