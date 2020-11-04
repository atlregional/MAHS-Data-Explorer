import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './style.css';

const SingleDropdown = props => {
  // console.log('dropdown props:', props);
  const indicators = props.indicators;
  const [dropDownOpen, setDropdownOpen] = useState(false);

  return (
    <div id="indicator-container">
      {' '}
      <div className="indicator-selector-dropdown-box">
        <div
          key={props.selectedIndicator.name}
          id="indicator-selector-dropdown-header"
        >
          <Icon
            name="caret square down outline"
            size=""
            id="indicator-selector-dropdown-icon"
            onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
          />
          {props.selectedIndicator.name ? props.selectedIndicator.name : null}
        </div>
        {dropDownOpen
          ? indicators.map(item => {
              // console.log(item.indicator);
              console.log(
                item.indicator.name,
                '||',
                props.selectedIndicator.name
              );
              return (
                <div
                  key={item.indicator.name}
                  id={
                    item.indicator.name ===
                    props.selectedIndicator.indicator.name
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
      </div>
    </div>
  );
};

export default SingleDropdown;
