import React from 'react';
import GeoSelector from '../GeoSelector';
import headerBackground from '../../header-background.png';
// import mobileHouseLogo from '../../home-icon.svg';
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
      <button className="back-to-main-site-button">Main Site</button>
      <div className="arc-header-box">
        {/* <h2 className="tool-header">MAHS Data Explorer : </h2> */}
        <div className="geo-selector-box">
          <div id="geo-label-header">
            {selection.geo}{' '}
            {selection.geoType !== 'City' ? selection.geoType : ''}
          </div>
          <div className="dropdown-box">
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
        {
          !props.mobile ? (
            <img
              className="ARC-logo"
              src="https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/logo.svg"
              alt="Atlanta Regional Commission logo"
            />
          ) : null
          // <img className="ARC-logo" src={mobileHouseLogo} />
        }
      </div>
    </div>
  );
};
export default ARCHeader;
