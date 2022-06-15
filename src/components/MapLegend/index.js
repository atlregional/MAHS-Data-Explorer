import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './style.css';

const MapLegend = ({ colors, hoverBin, selection, stats, viewMapData }) => {
  const hoveredColorIdx = hoverBin;
  const colorArr = colors;
  const formatter = selection.indicator.formatter.replace(/"/g, '');
  const minVal = numeral(stats.min).format(formatter);
  const maxVal = numeral(stats.max).format(formatter);
  const numBin = colorArr.length;

  return viewMapData ? (
    <div id='legend'>
      {stats ? (
        <div className='color-row'>
          <span className='min-value value-perimeter'>{minVal}</span>
          {colorArr.map((color, idx) => (
            <div
              key={`color-block-${idx}`}
              className='color-scale-block'
              style={{
                backgroundColor: color,
                width: `${hoveredColorIdx !== idx ? 100 / numBin : 10}%`,
                border: `${hoveredColorIdx !== idx ? '1px transparent' : '2px solid black'}`
              }}
            />
          ))}
          <span className='max-value value-perimeter'>{maxVal}</span>
        </div>
      ) : null}
    </div>
  ) : null;
};

MapLegend.propTypes = {
  colors: PropTypes.array,
  hoverBin: PropTypes.number,
  selection: PropTypes.object,
  stats: PropTypes.object,
  viewMapData: PropTypes.bool
};

export default MapLegend;
