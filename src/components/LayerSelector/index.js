import React, { useState } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  const [view, setView] = useState(false);
  const layers = props.layers ? props.layers : [];

  return (
    <>
      <div
        id={
          props.numberOfSubareas <= 5 || !props.mobile
            ? 'layer-selection-header'
            : 'layer-selection-header-shifted'
        }
      >
        <Icon
          name={'list alternate outline'}
          onClick={() => setView(view === true ? false : true)}
        />
      </div>

      <div
        id={
          props.numberOfSubareas <= 5 || !props.mobile
            ? 'layer-selector-box'
            : 'layer-selector-box-shifted'
        }
        className={view === true ? 'open' : 'closed'}
      >
        {view === true
          ? layers
              .filter(layer => layer.type === 'transportation' && !layer.disabled)
              .map((layer, idx) => (
                <div key={layer.name + idx} className="layer-selection-row">
                  <div className="layer-selection-checkbox">
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
