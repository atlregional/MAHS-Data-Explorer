import React, { useState } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  // if vew is true, show the icon that will open the dropdown;
  const [view, setView] = useState('open');

  // console.log('props.layers: ', props.layers);
  const layers = props.layers ? props.layers : [];

  return (
    <>
      <div 
        id={
          props.numberOfSubareas <= 5 || !props.mobile
          ? "layer-selection-header"
          : "layer-selection-header-shifted"
        }
      >
        {/* hambugger icon when its closed, dissapears when open,  */}
        <Icon
          name={'list alternate outline'}
          onClick={() =>
            setView(view === 'open' ? 'closed' : 'open')
          }
          
        />
      </div>

      <div
        id={
          props.numberOfSubareas <= 5 || !props.mobile
          ? "layer-selector-box"
          : "layer-selector-box-shifted"
        }
        className={view === 'open' ? 'open' : 'closed'}
      >
          {/* <div id='layer-selector-'>
            <em>Turn on and off layers</em>
          </div> */}
        {view === 'open' ? layers.map((layer, idx) => (
          <div key={layer.name + idx} className="layer-selection-row">
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
                          visible: el.visible ? false : true,
                        })
                      : arr.push({
                          ...el,
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
    </>
  );
};

export default LayerSelector;
