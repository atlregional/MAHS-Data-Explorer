import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  const [view, setView] = useState(false);
  const layers = props.layers ? props.layers : [];

  return (
    <>
      <div id={'layer-selection-header'}>
        <Icon
          className='layer-toggle-box'
          name={'list alternate outline'}
          onClick={() => setView(view === true ? false : true)}
        />
        <div id={'layer-selector-box'} className={view === true ? 'open' : 'closed'}>
          {view === true || props.mobile
            ? layers
              .filter(layer => !layer.disabled && layer.type === 'transportation')
              .map((layer, idx) => (
                <div key={layer.name + idx} className='layer-selection-row'>
                  <div className='layer-selection-checkbox'>
                    <Checkbox
                      checked={layer.visible}
                      onChange={() => {
                        const arr = [];
                        layers.forEach(el => {
                          // if element name is el.name
                          el.name === layer.name
                            ? arr.push({
                              ...el,
                              visible: el.visible ? false : true
                            })
                            : arr.push({
                              ...el
                            });
                        });
                        props.setLayers(arr);
                      }}
                    />
                  </div>
                  <div>{layer.label}</div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

LayerSelector.propTypes = {
  layers: PropTypes.array,
  mobile: PropTypes.bool,
  numberOfSubareas: PropTypes.number,
  setLayers: PropTypes.func
};

export default LayerSelector;
