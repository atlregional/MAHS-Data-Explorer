import React from 'react';
import GeoSelector from '../GeoSelector';
import headerBackground from '../../header-background.png';
import './style.css';

const ARCHeader = props => {
  const selection = props.selection;
  return (
    <div
      id="ARC-Header"
      className="arc-header-div"
      style={{ backgroundImage: `url(${headerBackground})` }}
    >
      {' '}
      <div className="back-to-main-site-button">back to main site</div>
      <div className="arc-header-box">
        {/* <h2 className="tool-header">MAHS Data Explorer : </h2> */}
        <div className="geo-selector-box">
          <div id="geo-label-header">
            {selection.geo}{' '}
            {selection.geoType !== 'City' ? selection.geoType : ''}
          </div>
          <div>
            <GeoSelector
              geoTypeOptions={props.geoTypeOptions}
              selection={selection}
              setClickedSubarea={props.setClickedSubarea}
              setHighlightedSubarea={props.setHighlightedSubarea}
              setSelection={props.setSelection}
              data={props.data}
            />
          </div>
        </div>
      </div>
      <div className="ARC-logo-div">
        <img
          className="ARC-logo"
          src="https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/logo.svg"
          alt="Atlanta Regional Commission logo"
        />
      </div>
    </div>
  );
};
export default ARCHeader;
