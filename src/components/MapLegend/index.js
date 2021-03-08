import React from 'react';
import numeral from 'numeral';
import './style.css';

const MapLegend = props => {
  //   console.log('MapLegend - props :', props);

  const hoveredColorIdx = props.hoverBin;
  //   console.log('hoveredColorIdx :', hoveredColorIdx);
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
  return viewMapData 
    ? <div id="legend">
          {/* <p className="map-legend-title">{inidicatorName}</p> */}
          {props.stats ? (
            <div className="color-row">
              <span className="min-value value-perimeter">{minVal}</span>
              {colorArr.map((color, idx) => (
                <div
                  key={`color-block-${idx}`}
                  className="color-scale-block"
                  style={{
                    backgroundColor: color,
                    width: `${hoveredColorIdx !== idx ? 100 / numBin : 10}%`,
                    border: `${
                      hoveredColorIdx !== idx
                        ? '1px transparent'
                        : '2px solid black'
                    }`,
                  }}
                />
              ))}
              <span className="max-value value-perimeter">{maxVal}</span>
            </div>
          ) : null}
        </div>
      : null;
};

export default MapLegend;
