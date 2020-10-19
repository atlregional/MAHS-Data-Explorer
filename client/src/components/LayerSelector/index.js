import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
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

  return (
    <>
      <Dropdown
        placeholder="DISPLAY ON MAP"
        fluid
        multiple
        selection
        options={layerOptions}
        // renderLabel={(item, index, defaultLabelProps, returns) => console.log(item)}
        onChange={
          (event, data) =>
            // loop over props.layers
            // check if data.value === name,
            // if true, do nothing
            // if false,
            // set visibility to false;
            props.layers.forEach(element => {
              // element.visible = false;
              if (`${data.value}` !== element.name) {
                element.visible = false;
              } 
              console.log(props.layers);
            })
          // props.setSelectedLayers(data.value)
        }
        // selectedLabel={}
      />
    </>
  );
};

export default LayerSelector;
