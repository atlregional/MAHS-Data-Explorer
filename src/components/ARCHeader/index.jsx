import React from 'react';
import PropTypes from 'prop-types';
import GeoSelector from '../GeoSelector';
import headerBackground from '../../header-background.png';
import { Icon } from 'semantic-ui-react';
import './style.css';

const ARCHeader = ({
  data,
  geoTypeOptions,
  mobile,
  selection,
  setClickedSubarea,
  setHighlightedSubarea,
  setSelection
}) => {
  return (
    <div
      id='ARC-Header'
      className='arc-header-div'
      style={{ backgroundImage: `url(${headerBackground})` }}
    >
      {!mobile ? (
        <a className='back-to-site' href='https://metroatlhousing.org'>
          ← Back<span> to Main Site</span>
        </a>
      ) : (
        <a className='back-to-site' href='https://metroatlhousing.org'>
          <Icon name='chevron left' />
        </a>
      )}
      <div className='arc-header-box'>
        <div className='geo-selector-box'>
          <div id='geo-label-header'>
            {selection.geo} {selection.geoType !== 'City' ? selection.geoType : ''}
          </div>
          <div className='dropdown-box'>
            <GeoSelector
              geoTypeOptions={geoTypeOptions}
              selection={selection}
              setClickedSubarea={setClickedSubarea}
              setHighlightedSubarea={setHighlightedSubarea}
              setSelection={setSelection}
              data={data}
            />
          </div>
        </div>
      </div>
      <div className='ARC-logo-div'>
        {!mobile ? (
          <img
            className='ARC-logo'
            src='https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/logo.svg'
            alt='Atlanta Regional Commission logo'
          />
        ) : (
          <img
            className='ARC-mobile-logo'
            src='https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/icon-home.svg'
            alt='ARC mobile logo'
          />
        )}
      </div>
    </div>
  );
};

ARCHeader.propTypes = {
  data: PropTypes.array,
  geoTypeOptions: PropTypes.array,
  mobile: PropTypes.bool,
  selection: PropTypes.object,
  setClickedSubarea: PropTypes.func,
  setHighlightedSubarea: PropTypes.func,
  setSelection: PropTypes.func
};

export default ARCHeader;
