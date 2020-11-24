import React, { useEffect } from 'react';
import numeral from 'numeral';
import './style.css';

const MapLegend = props => {
  //   console.log('MapLegend - props :', props);

  const hoveredColorIdx = props.hoverBin;
  console.log('hoveredColorIdx :', hoveredColorIdx);
  const viewMapData = props.viewMapData;
  const colorArr = props.colors;
  // const inidicatorName = props.selection.indicator.name;
  const indicatorType = props.selection.indicator.type;

  //   console.log(indicatorType);
  const minVal = numeral(props.stats.min).format(
    indicatorType === 'percent' ? '0.0%' : '0,0'
  );
  const maxVal = numeral(props.stats.max).format(
    indicatorType === 'percent' ? '0.0%' : '0,0'
  );
  const numBin = colorArr.length;

//   useEffect(hoveredColorIdx, [hoveredColorIdx]);

  //   console.log(colorScaleBlockWidth);
  return (
    <>
      {viewMapData ? (
        <div id="legend">
          {/* <p className="map-legend-title">{inidicatorName}</p> */}
          {props.stats ? (
            <div className="color-row">
              <span className="min-value value-perimeter">{minVal}</span>
              {colorArr.map((color, idx) => {
                console.log(hoveredColorIdx === idx);
                if (hoveredColorIdx === idx) {
                  return (
                    <div
                      key={`color-block-${color}`}
                      className="color-scale-block"
                      style={{
                        backgroundColor: `${color}`,
                        width: `15%`,
                        height: `100%`,
                        border: `2.5px black solid`,
                      }}
                    />
                  );
                } else {
                  return (
                    <div
                      key={`color-block-${color}`}
                      className="color-scale-block"
                      style={{
                        backgroundColor: `${color}`,
                        width: `${200 / numBin}%`,
                        border: `1px transparent`,
                      }}
                    />
                  );
                }
              })}{' '}
              <span className="max-value value-perimeter">{maxVal}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default MapLegend;
