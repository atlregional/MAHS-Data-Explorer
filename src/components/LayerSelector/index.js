import React, { useState } from 'react';
import { Checkbox, Icon } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  const [view, setView] = useState('open');
  const layers = props.layers ? props.layers : [];
  console.log(props.mobile, view);

  // if (props.mobile) setView('closed');

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
          onClick={() => setView(view === 'open' ? 'closed' : 'open')}
        />
      </div>

      <div
        id={
          props.numberOfSubareas <= 5 || !props.mobile
            ? 'layer-selector-box'
            : 'layer-selector-box-shifted'
        }
        className={view === 'open' ? 'open' : 'closed'}
      >
        {console.log()}
        {view === 'open'
          ? layers.map((layer, idx) => (
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
