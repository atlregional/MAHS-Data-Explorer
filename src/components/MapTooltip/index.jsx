import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './style.css';

const MapTooltip = props => {
  const featureInfo = props.hoverFeature.properties;
  const tractInfo = featureInfo ? props.tractInfo[featureInfo.GEOID] : null;
  const subarea = tractInfo ? tractInfo.Subarea : null;
  const data = props.data;
  const indicatorFormatter = props.indicatorFormatter.replace(/"/g, '');
  const subareaNumber = subarea ? parseInt(subarea?.replace('Subarea ', '')) : null;
  const selectionInfo = props.selection;
  const subareaValue =
    props.subareaData && subarea
      ? props.subareaData.filter(item => item.name === subarea)[0]
        ? props.subareaData.filter(item => item.name === subarea)[0][selectionInfo.indicator.name]
        : null
      : null;

  const countyDictionary = {
    "113": "Fayette",
    "247": "Rockdale",
    "067": "Cobb",
    "117": "Forsyth",
    "063": "Clayton",
    "151": "Henry",
    "135": "Gwinnett",
    "121": "Fulton",
    "097": "Douglas",
    "089": "DeKalb",
    "057": "Cherokee"
  };     

  return data && featureInfo ? (
    <div id='map-custom-tooltip'>
      <div id='tooltip-header'>Census Tract {featureInfo.NAME}</div>
      <div id='tooltip-subheader'>
        {/* <span className="tooltip-thic"> */}
        in {countyDictionary?.[featureInfo.COUNTYFP] || 'Unknown'} County
        {/* </span> */}
      </div>
      <div id='tooltip-key-indicator'>{selectionInfo.indicator.name}</div>
      <div id='tooltip-key-indicator-value'>
        {data[featureInfo.GEOID] ? (
          numeral(data[featureInfo.GEOID].value).format(indicatorFormatter)
        ) : (
          <span>Data unavailable</span>
        )}
      </div>
      <div id='tooltip-compare-metrics'>
        <div className='tooltip-thic' id='tooltip-compare-header'>
          Compare to...
        </div>
        <div>
          All of
          <span className='tooltip-thic'>
            {' '}
            {selectionInfo.geo} {selectionInfo.geoType !== 'City' ? selectionInfo.geoType : ' '}
          </span>{' '}
          at{' '}
          <span className='tooltip-percent-comparison'>
            {data['All'] ? numeral(data['All'].value).format(indicatorFormatter) : null}
          </span>
        </div>
        <div>
          Only
          <span
            style={{
              color: props.config.style.colormap[subareaNumber - 1]
            }}
          >
            <span id='tooltip-subarea'> {subarea.replace('Subarea', 'Submarket')} </span>
          </span>
          within the
          <span className='tooltip-thic'> {selectionInfo.geoType}</span> at{' '}
          <strong>
            <span className='tooltip-percent-comparison'>
              {subareaValue ? numeral(subareaValue).format(indicatorFormatter) : null}
            </span>
          </strong>
        </div>
      </div>
      <div id='tooltip-footer'>
        <div id='data-source' className='data-credits'>
          Data Source : <span>{selectionInfo.indicator.source}</span>
        </div>
        <div className='data-credits'>
          Universe : <span>{selectionInfo.indicator.universe}</span>
        </div>
      </div>
    </div>
  ) : (
    <h3>No Data</h3>
  );
};

MapTooltip.propTypes = {
  config: PropTypes.object,
  data: PropTypes.object,
  hoverFeature: PropTypes.object,
  indicatorFormatter: PropTypes.string,
  selection: PropTypes.object,
  subareaData: PropTypes.array,
  tractInfo: PropTypes.object
};

export default MapTooltip;
