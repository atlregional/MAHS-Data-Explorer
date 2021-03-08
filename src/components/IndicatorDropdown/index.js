import React, { useState } from 'react';
import { Icon, Checkbox } from 'semantic-ui-react';
import './style.css';

const IndicatorDropdown = props => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  // const [selectedCategories, setSelectedCategories] = useState([]);

  const multiple = props.multiple;
  const multipleSelections = props.selection.indicators
    ? props.selection.indicators.map(indicator => indicator.name)
    : [];
  const options = props.options;
  const categories = [...new Set(options.map(option => option.category))];
  // console.log(categories);

  const handleMultipleSelection = selection => {
    const currentIndicators = [...multipleSelections];
    
    currentIndicators.includes(selection.name)
      ? currentIndicators.splice(currentIndicators.indexOf(selection.name), 1)
      : currentIndicators.push(selection.name);

    const modifiedIndicators = [...options].filter(option =>
      currentIndicators.includes(option.name)
    );
    props.setSelection({
      ...props.selection,
      indicators: modifiedIndicators,
    });
  };

  return (
      <div
        className="indicator-selector-dropdown-box"
        onMouseLeave={() => setDropdownOpen(false)}
        onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
      >
        <div className="indicator-header">
          {!multiple ? props.selection.indicator.name : null}
        </div>
        <div className="indicator-selector-dropdown-header">
          <em>{multiple ? 'Choose Indicators' : 'Choose Indicator'}</em>
          <Icon
            name="caret down"
            // size=""
            className="indicator-selector-dropdown-icon"
          />
        </div>
        {dropDownOpen
          ? <div className="indicator-dropdown-menu">
            {categories.map(category =>
              <> 
              <div
              key={`${category.split(' ').join('-')}-${
                multipleSelections ? 'multiple' : 'single'
              }`}
              // id={'unselected-indicator'}
              className={'indicator-selector-dropdown-category'}
              // onClick={() => 
              //   multiple
              //     ? handleCategorySelection(category)
              //     : null
              // }
            >
              {/* {multiple ? <Checkbox checked={selectedCategories.includes(category)} /> : null} */}
              {category}
            </div>
            {  

              options
              .filter(item => item.category === category)
              .map(item => {
                const multipleSelected =
                  multiple && multipleSelections.includes(item.name);

                return (
                  <div
                    key={`${item.name.split(' ').join('-')}-${
                      multipleSelections ? 'multiple' : 'single'
                    }`}
                    id={
                      !multiple
                        ? item.name === props.selection.indicator.name
                          ? 'selected-indicator'
                          : 'unselected-indicator'
                        : null
                    }
                    className={`indicator-selector-dropdown-option` 
                    // ${
                    //   multipleSelected
                    //     ? 'indicator-selector-dropdown-option-multiple-selected'
                    //     : ''
                    // }`
                    }
                    onClick={() => {
                      multiple
                        ? handleMultipleSelection(item)
                        : props.setSelection({
                            ...props.selection,
                            indicator: item,
                          });
                      setDropdownOpen(!multiple ? false : true);
                    }}
                  >
                    {multiple 
                      ? <Checkbox 
                          checked={multipleSelected} 
                          style={{margin: '0 .5em 0 0'}} 
                        /> 
                      : null}
                    {item.name}
                  </div>

                );

              })
            }
            </>)
            }
        </div>
        : null}
      </div>
  );
};

export default IndicatorDropdown;
