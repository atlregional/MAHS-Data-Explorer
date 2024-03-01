import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import config from './config';
import './style.css';

const VizViewSelector = ({ mobileVizView, setMobileVizView }) => {
  const buttonParamArr = config.buttonParams;
  return (
    <div id='viz-view-selector'>
      {buttonParamArr.map(item => (
        <div
          key={`${item.value}-viz-view-selector-button`}
          onClick={() => setMobileVizView(item.value)}
          className='viz-view-selector-button'
          id={mobileVizView === item.value ? 'selected-viz-view-button' : null}
          style={{ width: `${100 / buttonParamArr.length}%` }}
        >
          <Icon
            className='viz-view-icon'
            name={item.icon}
            inverted={mobileVizView === item.value}
          />
        </div>
      ))}
    </div>
  );
};

VizViewSelector.propTypes = {
  mobileVizView: PropTypes.string,
  setMobileVizView: PropTypes.func
};

export default VizViewSelector;
