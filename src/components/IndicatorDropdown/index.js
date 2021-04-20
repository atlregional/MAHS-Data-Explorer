import React, { useState } from 'react';
import { Icon, Checkbox, Input } from 'semantic-ui-react';
import './style.css';

const IndicatorDropdown = props => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState();
  // const [selectedCategories, setSelectedCategories] = useState([]);

  const multiple = props.multiple;
  const multipleSelections = props.selection.indicators
    ? props.selection.indicators.map(indicator => indicator.name)
    : [];

  const searchFilter = (search, item) => {
    const searchArray = search.replace(/,/g, '').split(' ');

    const searchFields = [
      'name',
      'type',
      'category',
      'source'
    ];

    const resultsString = item
      ? Object.entries(item)
        .filter(([key,]) => searchFields.includes(key))
        .map(([, value]) => value).join(' ').toUpperCase().replace(/,/g, '')
      : null;

    const booleanArray = searchArray.map(searchItem =>
      item
        ? resultsString.includes(searchItem.trim().toUpperCase().replace(/,/g, ''))
        : null
    );

    // console.log(booleanArray)

    return booleanArray.includes(false) ? false : true;
  };
  const options = props.options
  // const categories = [...new Set(options.map(option => option.category))];
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
      indicators: modifiedIndicators
    });
  };

  const handleSelectAll = category => {
    const currentIndicators = [...multipleSelections].sort();
    // console.log(currentIndicators);
    const selectedIndicators = [...props.options]
      .filter(item =>
        search && item
          ? searchFilter(search, item)
          : true
      )
      .filter(option => 
        category ? option.category === category : true)
      .map(option => option.name);

    selectedIndicators.forEach(indicator =>
      !currentIndicators.includes(indicator)
        ? currentIndicators.push(indicator)
        : null
    )

    const modifiedIndicators = [...options]
      .filter(option =>
        currentIndicators.includes(option.name)
      );

    props.setSelection({
      ...props.selection,
      indicators: modifiedIndicators
    });
  };

  const handleUnselectAll = category => {
    const currentIndicators = [...multipleSelections].sort();
    // console.log(currentIndicators);
    const selectedIndicators = [...props.options]
      .filter(item =>
        search && item
          ? searchFilter(search, item)
          : true
      )
      .filter(option => 
        category ? option.category === category : true)
      .map(option => option.name).reverse();
    // console.log(selectedIndicators)

    selectedIndicators.forEach(indicator =>
      currentIndicators.includes(indicator)
        ? currentIndicators.splice(
            currentIndicators.indexOf(indicator), 1
          )
        : null
    )

    const modifiedIndicators = [...options].filter(option =>
      currentIndicators.includes(option.name)
    );

    props.setSelection({
      ...props.selection,
      indicators: modifiedIndicators
    });
  }



  return (
      <div
        className="indicator-selector-dropdown-box"
        onMouseLeave={() => {
          setDropdownOpen(false);
        }}
      >
        <div className="indicator-header">
          {!multiple ? props.selection.indicator.name : null}
        </div>
        <div
          onClick={() => {
            setDropdownOpen(dropDownOpen ? false : true);
            setSearch();
          }}
          className="indicator-selector-dropdown-header"
        >
          <em>{props.placeholderText}</em>
          <Icon
            name="caret down"
            className="indicator-selector-dropdown-icon"
          />
        </div>
        { multiple 
            ? <div className='top-level-select-all-toggle-wrapper'>
                <span 
                  className='select-unselect-all-toggle' 
                  onClick={() => handleSelectAll()}
                >
                  add all
                </span>
                <span 
                  className='select-unselect-all-toggle' 
                  onClick={() => handleUnselectAll()}
                >
                  remove all
                </span>
              </div> 
            : null 
        }  
        {dropDownOpen
          ? <>
            { !props.mobile 
              ? <Input
                  fluid
                  placeholder='Search indicators' 
                  onFocus={() => setDropdownOpen(true)}
                  onChange={(e,d) => setSearch(d.value)}
                />
              : null
            } 

            <div className="indicator-dropdown-menu">
         
              {
              options
              .filter(item =>
                search && item
                  ? searchFilter(search, item)
                  : true
              ).length === 0 ? <div>No matching indicators</div> : null 
            }
            {[...new Set(options.filter(item =>
                search && item
                  ? searchFilter(search, item)
                  : true
              ).map(option => option.category))].map(category =>
              <> 
              <div
              key={`${category.split(' ').join('-')}-${
                multipleSelections ? 'multiple' : 'single'
              }`}
              className={'indicator-selector-dropdown-category'}
            >
              {category}
              { multiple 
                  ? <span 
                      className='select-unselect-all-toggle' 
                      onClick={() => handleSelectAll(category)}
                    >
                      add all
                    </span> 
                  : null 
              }
              { multiple 
                  ? <span 
                      className='select-unselect-all-toggle' 
                      onClick={() => handleUnselectAll(category)}
                    >
                      remove all
                    </span> 
                  : null 
              }

            </div>
            {  

              options
              .filter(item => item.category === category)
              .filter(item =>
                search && item
                  ? searchFilter(search, item)
                  : true
              )
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
            </>
          : null}
      </div>
  );
};

export default IndicatorDropdown;
