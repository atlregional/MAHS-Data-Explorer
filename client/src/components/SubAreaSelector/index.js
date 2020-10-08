import React, { useEffect, useState } from 'react';
import './style.css';

const SubAreaSelector = (props) => {
<<<<<<< HEAD

  const [selectedSubareas, setSelectedSubareas] = useState([])

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

  // const selectedSubareas = props.selectedSubareas
  //   ? [...props.selectedSubareas]
  //   : [];
  // console.log(selectedSubareas);
  // const setSelectedSubareas = (array) =>
  //   props.setSelectedSubarea
  //     ? props.setSelectedSubarea(array)
  //     : console.log(array);
  // console.log(setSelectedSubareas);

  useEffect(() => subareas, []);
  return subareas ? (
=======
  const subareas = props.subareaOptions;
  const colormap = props.colormap
  return (
>>>>>>> 528ab7c5880903e73a84382784748e9658b1d6d3
    <div id="subarea-selector-container">
      {subareas.map((subarea) => (
        <div
          key={`subarea-selector-button-${subarea}`}
          className="subarea-selector-button"
          style={{ backgroundColor: `${colormap[subarea - 1]}` }}
          onClick={(e) => {
            const array = [...selectedSubareas];
            array.includes(subarea)
              ? array.splice(array.indexOf(subarea), 1)
              : array.push(subarea);
            console.log(array);
            setSelectedSubareas(array);
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
