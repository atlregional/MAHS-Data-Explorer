import React from 'react';
import './style.css';

const SubAreaSelector = (props) => {
  const subareas = [1, 3, 6, 8, 9];
  const colormap = [
    '#F1DB6A',
    '#F08292',
    '#FD9439',
    '#335594',
    '#E556D3',
    '#8B347F',
    '#3ECA99',
    '#878FD9',
    '#AECF7F',
    '#338A70',
  ];
  return (
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{ backgroundColor: `"${colormap[subarea] - 1}"` }}
          onClick={(e) => {
            // event values are not coming through;
            console.log(e);
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
