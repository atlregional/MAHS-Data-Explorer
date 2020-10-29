import React, { useState } from 'react';
import './style.css';

const SingleDropdown = props => {
  const [dropDownOpen, setDropdownOpen] = useState();

  console.log('props:', props);
  return (
    <div
      id="indicator-selector-dropdown"
      onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
    >
      <div id="indicator-selector-dropdown-header">
        {props.selectedIndicator.name} //Add triangle icon here
      </div>
      {props.indicatorArray.map(item => {
        console.log(item);
        // <div
        //   id={
        //     item.name === props.selectedIndicator.name
        //       ? 'selected-option'
        //       : null
        //   }
        //   className="item-selector-dropdown-option"
        //   onClick={() => props.setIndicator(item.name)}
        // >
        //   {' '}
        //   {item.name}
        // </div>;
      })}
      {/* {dropDownOpen ? console.log(props) : null} */}
    </div>
  );
};

export default SingleDropdown;
