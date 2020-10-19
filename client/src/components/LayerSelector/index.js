import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import './style.css';
import 'semantic-ui-css/semantic.min.css';

const LayerSelector = props => {
  console.log('props.layers: ', props.layers);
  const layers = props.layers ? props.layers : [];
  const layerOptions = layers.map(layer => ({
    id: layer.id,
    text: layer.name,
    value: layer.name,
  }));

  // console.log('layerSelector layers: ', layers);
  // console.log('layerOptions : ', layerOptions);

  // return dynamically created rows that are buttons with a radio button from semantic ui,
  // each the radio button checked property biased on the visibility of the layer
  // checked === visible ?;

  return (
    <>
      {layers.map(layer => (
        <div className="layer-selection-row">
          <div>
            {/* put toggle */}{' '}
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
          <div>{layer.name}</div>
        </div>
      ))}
      {/* <Dropdown
        placeholder="DISPLAY ON MAP"
        fluid
        multiple
        selection
        options={layerOptions}
        // renderLabel={(item, index, defaultLabelProps, returns) => console.log(item)}
        onChange={
          (event, data) => {
            // loop over props.layers
            // check if data.value === name,
            // if true, do nothing
            // if false,
            // set visibility to false;
            const layerArr = [];

            props.layers.forEach(element => {
              console.log('data: ', data);
              // if (`${data.value}` !== element.name) {
              //   element.visible = false;
              // }
              data.value === element.name
                ? layerArr.push({
                    ...element,
                    visible: element.visible ? false : true,
                  })
                : layerArr.push({ ...element });
            });
            console.log('layerArr: ', layerArr);
          }
          props.setSelectedLayers(data.value)
        }
      /> */}
    </>
  );
};

export default LayerSelector;
