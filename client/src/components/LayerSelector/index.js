import React from 'react';

const LayerSelector = props => {
  const layers = props.layers ? props.layers : [];
  console.log(layers);
  
  return <> <h1>Layer Selector</h1></>
}

export default LayerSelector;