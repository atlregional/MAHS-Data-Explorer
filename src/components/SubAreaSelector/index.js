import React, { useEffect, useState } from 'react';
import './style.css';

const SubAreaSelector = props => {
  const [buttonSize, setButtonSize] = useState(75);
  const windowWidth = window.innerWidth;
  const subareas = props.subareaOptions;
  const count = subareas.length;
  const scaler = count < 6 ? 1.25 : windowWidth > 1100 ? 2.5 : 2;

  const handleButtonSize = () =>
    setButtonSize(
      windowWidth > 800 ? (windowWidth * 0.1) / scaler : windowWidth / 5 - 15
    );

  useEffect(handleButtonSize, [subareas]);

  const selectedSubareas = props.selectedSubareas;
  const setSelectedSubareas = array => props.setSelectedSubareas(array);

  // Add these to mouseenter event and set state to null on mouseleave
  const highlightedSubarea = props.highlightedSubarea;
  const setHighlightedSubarea = number => props.setHighlightedSubarea(number);
  const colormap = props.colormap;


  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map(subarea => (
        <div
          key={`subarea-selector-button-${subarea}-${highlightedSubarea}`}
          className="subarea-selector-button"
          style={{
            height: `${buttonSize}px`,
            width: `${buttonSize}px`,
            margin: 'auto',
            lineHeight: `${buttonSize}px`,
            backgroundColor: `${colormap[subarea - 1]}`,
            opacity: highlightedSubarea === subarea ? '1' : highlightedSubarea ? '.4' : '1',
            borderColor: highlightedSubarea === subarea ? 'black' : `${colormap[subarea - 1]}`,
            borderWidth: '3px',
            borderStyle: 'solid'
          }}
          onClick={() => {
            const array = [...selectedSubareas];
            array.includes(subarea)
              ? array.splice(array.indexOf(subarea), 1)
              : array.push(subarea);
            // console.log(array);
            setSelectedSubareas(array);
          }}
          onMouseEnter={() => {
            setHighlightedSubarea(subarea);
            // console.log("subarea: ", subarea);
          }}
          onMouseLeave={() => {
            setHighlightedSubarea();
            // console.log(subarea);
          }}
        >
          {subarea}
        </div>
      ))}
    </div>
  ) : null;
};

export default SubAreaSelector;
