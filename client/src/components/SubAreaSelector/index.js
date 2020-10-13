import React, { useEffect, useState } from 'react';
import './style.css';

const SubAreaSelector = (props) => {

  const selectedSubareas = props.selectedSubareas;
  const setSelectedSubareas = array => props.setSelectedSubareas(array);

  // Add these to mouseenter event and set state to null on mouseleave
  const highligthedSubarea = props.highligthedSubarea;
  const setHighlightedSubarea = number => props.setHighlightedSubarea(number); 

  // const [selectedSubareas, setSelectedSubareas] = useState([])

  console.log('props: ', props);
  const subareas = props.subareaOptions;
  console.log('subareas: ', subareas);

  const colormap = props.colormap;

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

  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{ backgroundColor: `${colormap[subarea - 1]}` }}
          onClick={() => {
            const array = [...selectedSubareas];
            array.includes(subarea)
              ? array.splice(array.indexOf(subarea), 1)
              : array.push(subarea);
            console.log(array);
            setSelectedSubareas(array);
          }}
          onMouseEnter={() => {
            setHighlightedSubarea(subarea)
            // console.log("subarea: ", subarea);
          }}
          onMouseLeave={() => {
            setHighlightedSubarea()
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
