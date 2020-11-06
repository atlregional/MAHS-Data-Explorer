import React, { useState } from 'react';
import { Icon, Checkbox } from 'semantic-ui-react';
import './style.css';

const IndicatorDropdown = props => {
  const [dropDownOpen, setDropdownOpen] = useState(false);

  const multiple = props.multiple;
  const multipleSelections = props.selection.indicators ? props.selection.indicators.map(indicator => indicator.name) : [];
  const options = props.options;

  const handleMultipleSelection = selection => {
    const indicatorsArray = [...multipleSelections]
    
    indicatorsArray.includes(selection.name) ? 
    indicatorsArray.splice(indicatorsArray.indexOf(selection.name),1)
    : indicatorsArray.push(selection.name)
    const optionsArray = [...options].filter(option => indicatorsArray.includes(option.name))
    props.setSelection({
      ...props.selection,
      indicators : optionsArray
    })
  }
  
// console.log(props.selection.indicators)
  return (
      <div 
        className="indicator-selector-dropdown-box"
        onMouseLeave={() => setDropdownOpen(false)}
      >

        <div
          className="indicator-selector-dropdown-header"
        >
           {!multiple ? props.selection.indicator.name : <em>Choose Indicators</em>}
          <Icon
            name="caret square down outline"
            size=""
            className="indicator-selector-dropdown-icon"
            onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
          />
        </div>
        <div className='indicator-dropdown-menu'>
        { dropDownOpen
          ? options.map(item => {
              const multipleSelected = multiple && multipleSelections.includes(item.name) 
  
              return (
                <div
                  key={`${item.name.split(' ').join('-')}-${multipleSelections ? 'multiple' : 'single'}`}
                  id={!multiple ?
                    item.name ===
                    props.selection.indicator.name
                      ? 'selected-indicator'
                      : 'unselected-indicator'
                    :null
                  }
                  className= {`indicator-selector-dropdown-option ${multipleSelected ? 'indicator-selector-dropdown-option-multiple-selected': ''}`}
                  onClick={ () => multiple ? handleMultipleSelection(item)
                    
                    
                    :props.setSelection({
                    ...props.selection,
                    indicator : item
                  })}
                >
                  {
                  multiple ? 
                  <Checkbox checked= {multipleSelected}/> 
                  :null
                 }
                  {item.name}
                </div>
              );
            })
          : null}
        </div>
      </div>
  );
};

export default IndicatorDropdown;
