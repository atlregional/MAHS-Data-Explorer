import React, { useEffect, useState } from 'react';
import './style.css';

const SubAreaSelector = props => {
  const [buttonSize, setButtonSize] = useState(75);
  const windowWidth = window.innerWidth;
  const subareas = props.subareaOptions;
  const count = subareas.length;
  const scaler = count < 6 ? 1.25 : 2.5;

  const handleButtonSize = () =>
    setButtonSize(
      windowWidth > 800 ? (windowWidth * 0.1) / scaler : windowWidth / 5 - 15
    );

  // if (windowWidth > 800) {
  //   size = (windowWidth * 0.1) / denom;
  //   setButtonStyle({
  //     size: size,
  //     margin: 5,
  //   });
  // }
  // if (windowWidth < 800) {
  //   size = windowWidth / 5 - 15;
  //   setButtonStyle({
  //     size: size,
  //     margin: 4,
  //   });
  // }
  // }

  useEffect(handleButtonSize, [subareas]);

  const selectedSubareas = props.selectedSubareas;
  const setSelectedSubareas = array => props.setSelectedSubareas(array);

  // Add these to mouseenter event and set state to null on mouseleave
  const highligthedSubarea = props.highligthedSubarea;
  const setHighlightedSubarea = number => props.setHighlightedSubarea(number);

  // const [selectedSubareas, setSelectedSubareas] = useState([])

  // console.log('props: ', props);

  const colormap = props.colormap;

  const handleButtonProps = () => {};
  // windowWidth / 5 -

  // handleButtonProps();

  // const selectedSubareas = props.selectedSubareas
  //   ? [...props.selectedSubareas]
  //   : [];
  // console.log(selectedSubareas);
  // const setSelectedSubareas = (array) =>
  //   props.setSelectedSubarea
  //     ? props.setSelectedSubarea(array)
  //     : console.log(array);
  // console.log(setSelectedSubareas);

  // useEffect(() => subareas, []);
  // console.log('buttonStyle: ', buttonStyle);

  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map(subarea => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{
            height: `${buttonSize}px`,
            width: `${buttonSize}px`,
            margin: 'auto',
            lineHeight: `${buttonSize}px`,
            backgroundColor: `${colormap[subarea - 1]}`,
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
