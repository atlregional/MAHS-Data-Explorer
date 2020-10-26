import React, { useState } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  // if vew is true, show the icon that will open the dropdown;
  const [view, setView] = useState('slide-open');

  console.log('props.layers: ', props.layers);
  const layers = props.layers ? props.layers : [];

  return (
    <>
      <div className="layer-selection-header">
        {/* hambugger icon when its closed, dissapears when open,  */}
        <Icon
          name={view === 'slide-open' ? 'close' : 'list alternate outline'}
          size="large"
          onClick={() =>
            view == 'slide-open'
              ? setView('slide-closed')
              : setView('slide-open')
          }
        />
      </div>

      <div
        id="layer-selector-box"
        className={view == 'slide-open' ? 'slide-open' : 'slide-closed'}
      >
        {layers.map((layer, idx) => (
          <div key={layer.name + idx} className="layer-selection-row">
            <div>
              {' '}
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
              />{' '}
            </div>
            <div>{layer.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LayerSelector;
