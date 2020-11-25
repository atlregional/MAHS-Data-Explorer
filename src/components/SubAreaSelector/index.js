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

  // Add these to mouseenter event and set state to null on mouseleave
  const highlightedSubarea = props.highlightedSubarea;
  const setHighlightedSubarea = number => props.setHighlightedSubarea(number);
  const colormap = props.colormap;


  return subareas ? (
    <div id="subarea-selector-container"
    // onClick={() => {
    //   setClickedSubarea();
    //   // console.log("subarea: ", subarea);
    // }}
    >
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
            opacity: highlightedSubarea === subarea ? '1' : highlightedSubarea ? props.clickedSubarea ? '.3' : '.6' : '1',
            borderColor: highlightedSubarea === subarea ? 'black' : `${colormap[subarea - 1]}`,
            borderWidth: '3px',
            borderStyle: 'solid'
          }}
          onMouseEnter={() => {
            setHighlightedSubarea(props.clickedSubarea ? props.clickedSubarea : subarea);
          }}
          onMouseLeave={() => {
            setHighlightedSubarea(props.clickedSubarea);
          }}
          onClick={() => {
            props.setClickedSubarea(props.clickedSubarea ? subarea === props.clickedSubarea ? null : props.clickedSubarea : subarea);
          }}
        >
          {subarea}
        </div>
      ))}
    </div>
  ) : null;
};

export default SubAreaSelector;
