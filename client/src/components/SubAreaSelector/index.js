import React, { useEffect, useState } from 'react';
import './style.css';

const SubAreaSelector = (props) => {

  const [selectedSubareas, setSelectedSubareas] = useState([])

  console.log('props: ', props);
  const subareas = props.subareaOptions;
  console.log('subareas: ', subareas);

  const colormap = props.colormap;

<<<<<<< HEAD
=======
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
>>>>>>> 80ea9ab807822d03ef6fd2a961470217605a0dd4
  return subareas ? (
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
