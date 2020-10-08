import React from 'react';
import './style.css';

const SubAreaSelector = (props) => {
  const subareas = props.subareaOptions;
  const colormap = props.colormap
  return (
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{ backgroundColor: `${colormap[subarea - 1]}` }}
          onClick={(e) => {
            // event values are not coming through;
            console.log(subarea);
          }}
          // onMouseEnter={(e) => {
          //   console.log(e);
          // }}
          // onMouseLeave={(e) => {
          //   console.log(e);
          // }}
        >
          {subarea}
        </div>
      ))}
    </div>
  );
};

export default SubAreaSelector;
