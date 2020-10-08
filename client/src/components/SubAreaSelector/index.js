import React, { useEffect } from 'react';
import './style.css';

const SubAreaSelector = (props) => {
  console.log('props: ', props);
  const subareas = props.subareaOptions;
  console.log('subareas: ', subareas);
  
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

  const selectedSubareas = props.selectedSubareas
    ? [...props.selectedSubareas]
    : [];
  console.log(selectedSubareas);
  const setSelectedSubareas = (array) =>
    props.setSelectedSubarea
      ? props.setSelectedSubarea(array)
      : console.log(array);
  // console.log(setSelectedSubareas);

  useEffect(() => subareas, []);
  return subareas ? (
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{ backgroundColor: `${colormap[subarea - 1]}` }}
          onClick={(e) => {
            const array = selectedSubareas;
            array.includes(subarea)
              ? array.splice(array.indexOf(subarea), 1)
              : array.push(subarea);
            setSelectedSubareas(subareas);
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
  ) : null;
};

export default SubAreaSelector;
