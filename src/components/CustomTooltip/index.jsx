import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './style.css';

const CustomTooltip = (
  { active, payload, label },
  selection,
  colormap,
  data,
  selectedIndicator,
  indicatorFormatter
) => {
  const geoType = selection.geoType;
  const geo = selection.geo;
  return active ? (
    <div className='chart-custom-tooltip'>
      <div
        className='chart-tooltip-subarea'
        style={{
          color: colormap[label - 1]
        }}
      >
        {`${payload[0]?.payload?.name?.replace('Subarea', 'Submarket')}`}
      </div>
      <div className='chart-tooltip-geography-selection'>
        {geo ? (
          geoType === 'Region' ? (
            <div>
              in the <span className='tooltip-geo'>{geo} Region </span>
            </div>
          ) : geoType === 'City' ? (
            <div>
              in
              <span className='tooltip-geo'> {geo}</span>
            </div>
          ) : geoType === 'County' ? (
            <div>
              in
              <span className='tooltip-geo'> {geo} County</span>
            </div>
          ) : null
        ) : null}
      </div>
      <div className='chart-tooltip-indicator'>{selectedIndicator.name}</div>
      <div id='chart-tooltip-indicator-value'>
        {numeral(payload[0]?.value).format(indicatorFormatter)}
      </div>

      <div className='chart-tooltip-comparison'>
        <div id='tooltip-compare-header'>Compare to...</div>
        <div>
          All of{' '}
          <span className='tooltip-geo'>
            {geo}
            {geoType !== 'City' ? ` ${geoType}` : ''}
          </span>{' '}
          at{' '}
          <span className='chart-tooltip-percent-comparison'>
            {data['All'] ? numeral(data['All'].value).format(indicatorFormatter) : null}
          </span>
        </div>
      </div>
      <div id='tooltip-footer'>
        <div>
          Data Source : <span>{selectedIndicator.source}</span>
        </div>
        <div>
          Universe : <span>{selectedIndicator.universe}</span>
        </div>
      </div>
    </div>
  ) : null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.number
};

export default CustomTooltip;
