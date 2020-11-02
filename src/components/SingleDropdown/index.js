import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './style.css';

const SingleDropdown = props => {
  const allIndicators = props.indicatorArray;
  const [dropDownOpen, setDropdownOpen] = useState(false);

  console.log('props:', props);
  return (
    <div className="indicator-container">
      {' '}
      <div className="indicator-selector-dropdown-box">
        <Icon
          name="caret square down outline big"
          id="indicator-selector-dropdown"
          onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
        />

        <div
          key={props.selectedIndicator.name}
          id="indicator-selector-dropdown-header"
        >
          {props.selectedIndicator.name ? props.selectedIndicator.name : null}
        </div>
        {dropDownOpen
          ? props.indicatorArray.map(item => {
              console.log(item.indicator);
              return (
                // console.log('item: ', item.indicator.name);
                <div
                  key={item.indicator.name}
                  id={
                    item.indicator.name === props.selectedIndicator.name
                      ? 'selected-indicator'
                      : 'unselected-indicator'
                  }
                  className="indicator-selector-dropdown-option"
                  onClick={() => props.setSelectedIndicator(item)}
                >
                  {item.indicator.name}
                </div>
              );
            })
          : null}

        {/* {dropDownOpen ? console.log(props) : null} */}
      </div>
    </div>
  );
};

export default SingleDropdown;
