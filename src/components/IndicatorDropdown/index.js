import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './style.css';

const IndicatorDropdown = props => {

  const multiple = props.multiple;
  const multipleSelections = props.selection.indicators ? props.selection.indicators : [];
  // console.log('dropdown props:', props);
  const options = props.options;
  const [dropDownOpen, setDropdownOpen] = useState(false);

  return (
    // <div id="indicator-container">
    //   {' '}
      <div className="indicator-selector-dropdown-box">
        <div
          key={props.selection.indicator.name}
          className="indicator-selector-dropdown-header"
        >
          <Icon
            name="caret square down outline"
            size=""
            className="indicator-selector-dropdown-icon"
            onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
          />
          {props.selection.indicator.name ? props.selection.indicator.name : null}
        </div>
        <div className='indicator-dropdown-menu'>
        { dropDownOpen
          ? options.map(item => {
              // console.log(item.indicator);
              console.log(
                item.indicator.name,
                '||',
                props.selection.indicator.name
              );
              return (
                <div
                  key={item.indicator.name}
                  id={
                    item.indicator.name ===
                    props.selection.indicator.indicator.name
                      ? 'selected-indicator'
                      : 'unselected-indicator'
                  }
                  className="indicator-selector-dropdown-option"
                  onClick={() => props.setSelection({
                    ...props.selection,
                    indicator : item
                  })}
                >
                  {item.indicator.name}
                </div>
              );
            })
          : null}

        </div>

      </div>
    // </div>
  );
};

export default IndicatorDropdown;
