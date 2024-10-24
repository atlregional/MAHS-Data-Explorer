import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Checkbox, Input } from 'semantic-ui-react';
import util from './util';
import './style.css';

const IndicatorDropdown = (props) => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const multiple = props.multiple;
  const multipleSelections = props.selection.indicators
    ? props.selection.indicators.map((indicator) => indicator.name)
    : [];
  const options = props.options;

  // Clear search function
  const clearSearch = () => setSearch('');

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
          // setSearch(''); // Reset search when opening the dropdown
        }}
        className="indicator-selector-dropdown-header"
      >
        <em>{props.placeholderText}</em>
        <Icon name="caret down" className="indicator-selector-dropdown-icon" />
      </div>
      {multiple ? (
        <div className="top-level-select-all-toggle-wrapper">
          <span
            className="select-unselect-all-toggle"
            onClick={() => {
              const selectAllIndicators = util.handleSelectAll(
                multipleSelections,
                props,
                props.search,
                props.searchFilter,
                options,
                options.category
              );
              props.setSelection({
                ...props.selection,
                indicators: selectAllIndicators,
              });
            }}
          >
            add all
          </span>
          <span
            className="select-unselect-all-toggle"
            onClick={() => {
              const unselectAllIndicators = util.handleUnselectAll(
                multipleSelections,
                props.search,
                props.searchFilter,
                options,
                options.category
              );
              props.setSelection({
                ...props.selection,
                indicators: unselectAllIndicators,
              });
            }}
          >
            remove all
          </span>
        </div>
      ) : null}
      {dropDownOpen ? (
        <>
          {!props.mobile ? (
            <Input
              fluid
              placeholder="Search indicators"
              value={search}
              icon={
                search ? (
                  <Icon
                    name="close"
                    link
                    onClick={clearSearch}
                    style={{ cursor: 'pointer' }}
                  />
                ) : null
              }
              onFocus={() => setDropdownOpen(true)}
              onChange={(e, d) => setSearch(d.value)}
            />
          ) : null}

          <div className="indicator-dropdown-menu">
            {options.filter((item) =>
              search && item ? util.searchFilter(search, item) : true
            ).length === 0 ? (
              <div>No matching indicators</div>
            ) : null}
            {[...new Set(
              options
                .filter((item) => (search && item ? util.searchFilter(search, item) : true))
                .map((option) => option.category)
            )].map((category) => (
              <Fragment
                key={`${category.split(' ').join('-')}-${
                  multipleSelections ? 'multiple' : 'single'
                }`}
              >
                <div className={'indicator-selector-dropdown-category'}>
                  {category}
                  {multiple ? (
                    <span
                      className="select-unselect-all-toggle"
                      onClick={() => {
                        const selectAllIndicators = util.handleSelectAll(
                          multipleSelections,
                          props,
                          props.search,
                          props.searchFilter,
                          options,
                          category
                        );
                        props.setSelection({
                          ...props.selection,
                          indicators: selectAllIndicators,
                        });
                      }}
                    >
                      add all
                    </span>
                  ) : null}
                  {multiple ? (
                    <span
                      className="select-unselect-all-toggle"
                      onClick={() => {
                        const unselectAllIndicators = util.handleUnselectAll(
                          multipleSelections,
                          props.search,
                          props.searchFilter,
                          options,
                          category
                        );
                        props.setSelection({
                          ...props.selection,
                          indicators: unselectAllIndicators,
                        });
                      }}
                    >
                      remove all
                    </span>
                  ) : null}
                </div>
                {options
                  .filter((item) => item.category === category)
                  .filter((item) =>
                    search && item ? util.searchFilter(search, item) : true
                  )
                  .map((item) => {
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
                        className={'indicator-selector-dropdown-option'}
                        onClick={() => {
                          if (multiple) {
                            const multiSelectionIndicators = util.handleMultipleSelection(
                              item,
                              multipleSelections,
                              options
                            );
                            props.setSelection({
                              ...props.selection,
                              indicators: multiSelectionIndicators,
                            });
                          } else {
                            props.setSelection({
                              ...props.selection,
                              indicator: item,
                            });
                          }
                          setDropdownOpen(!multiple ? false : true);
                        }}
                      >
                        {multiple ? (
                          <Checkbox
                            checked={multipleSelected}
                            style={{ margin: '0 .5em 0 0' }}
                          />
                        ) : null}
                        {item.name}
                      </div>
                    );
                  })}
              </Fragment>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

IndicatorDropdown.propTypes = {
  mobile: PropTypes.bool,
  multiple: PropTypes.bool,
  options: PropTypes.array,
  placeholderText: PropTypes.string,
  selection: PropTypes.object,
  setSelection: PropTypes.func,
  search: PropTypes.string,
  searchFilter: PropTypes.func,
};

export default IndicatorDropdown;


// import React, { useState, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { Icon, Checkbox, Input } from 'semantic-ui-react';
// import util from './util';
// import './style.css';

// const IndicatorDropdown = props => {
//   const [dropDownOpen, setDropdownOpen] = useState(false);
//   const [search, setSearch] = useState();
//   const multiple = props.multiple;
//   const multipleSelections = props.selection.indicators
//     ? props.selection.indicators.map(indicator => indicator.name)
//     : [];
//   const options = props.options;

//   return (
//     <div
//       className='indicator-selector-dropdown-box'
//       onMouseLeave={() => {
//         setDropdownOpen(false);
//       }}
//     >
//       <div className='indicator-header'>{!multiple ? props.selection.indicator.name : null}</div>
//       <div
//         onClick={() => {
//           setDropdownOpen(dropDownOpen ? false : true);
//           setSearch();
//         }}
//         className='indicator-selector-dropdown-header'
//       >
//         <em>{props.placeholderText}</em>
//         <Icon name='caret down' className='indicator-selector-dropdown-icon' />
//       </div>
//       {multiple ? (
//         <div className='top-level-select-all-toggle-wrapper'>
//           <span
//             className='select-unselect-all-toggle'
//             onClick={() => {
//               // console.log(props.search, props.searchFilter);
//               const selectAllIndicators = util.handleSelectAll(
//                 multipleSelections,
//                 props,
//                 props.search,
//                 props.searchFilter,
//                 options,
//                 options.category
//               );
//               props.setSelection({
//                 ...props.selection,
//                 indicators: selectAllIndicators
//               });
//             }}
//           >
//             add all
//           </span>
//           <span
//             className='select-unselect-all-toggle'
//             onClick={() => {
//               console.log(multipleSelections);
//               const unselectAllIndicators = util.handleUnselectAll(
//                 multipleSelections,
//                 props.search,
//                 props.searchFilter,
//                 options,
//                 options.category
//               );
//               console.log(unselectAllIndicators);
//               props.setSelection({
//                 ...props.selection,
//                 indicators: unselectAllIndicators
//               });
//             }}
//           >
//             remove all
//           </span>
//         </div>
//       ) : null}
//       {dropDownOpen ? (
//         <>
//           {!props.mobile ? (
//             <Input
//               fluid
//               placeholder='Search indicators'
//               onFocus={() => setDropdownOpen(true)}
//               onChange={(e, d) => setSearch(d.value)}
//             />
//           ) : null}

//           <div className='indicator-dropdown-menu'>
//             {options.filter(item => (search && item ? util.searchFilter(search, item) : true))
//               .length === 0 ? (
//                 <div>No matching indicators</div>
//               ) : null}
//             {[
//               ...new Set(
//                 options
//                   .filter(item => (search && item ? util.searchFilter(search, item) : true))
//                   .map(option => option.category)
//               )
//             ].map(category => (
//               <Fragment
//                 key={`${category.split(' ').join('-')}-${
//                   multipleSelections ? 'multiple' : 'single'
//                 }`}
//               >
//                 <div className={'indicator-selector-dropdown-category'}>
//                   {category}
//                   {multiple ? (
//                     <span
//                       className='select-unselect-all-toggle'
//                       onClick={() => {
//                         const selectAllIndicators = util.handleSelectAll(
//                           multipleSelections,
//                           props,
//                           props.search,
//                           props.searchFilter,
//                           options,
//                           category
//                         );
//                         props.setSelection({
//                           ...props.selection,
//                           indicators: selectAllIndicators
//                         });
//                       }}
//                     >
//                       add all
//                     </span>
//                   ) : null}
//                   {multiple ? (
//                     <span
//                       className='select-unselect-all-toggle'
//                       onClick={() => {
//                         const unselectAllIndicators = util.handleUnselectAll(
//                           multipleSelections,
//                           props.search,
//                           props.searchFilter,
//                           options,
//                           category
//                         );
//                         props.setSelection({
//                           ...props.selection,
//                           indicators: unselectAllIndicators
//                         });
//                       }}
//                     >
//                       remove all
//                     </span>
//                   ) : null}
//                 </div>
//                 {options
//                   .filter(item => item.category === category)
//                   .filter(item => (search && item ? util.searchFilter(search, item) : true))
//                   .map(item => {
//                     const multipleSelected = multiple && multipleSelections.includes(item.name);

//                     return (
//                       <div
//                         key={`${item.name.split(' ').join('-')}-${
//                           multipleSelections ? 'multiple' : 'single'
//                         }`}
//                         id={
//                           !multiple
//                             ? item.name === props.selection.indicator.name
//                               ? 'selected-indicator'
//                               : 'unselected-indicator'
//                             : null
//                         }
//                         className={'indicator-selector-dropdown-option'}
//                         onClick={() => {
//                           if (multiple) {
//                             const multiSelectionIndicators = util.handleMultipleSelection(
//                               item,
//                               multipleSelections,
//                               options
//                             );
//                             props.setSelection({
//                               ...props.selection,
//                               indicators: multiSelectionIndicators
//                             });
//                           } else {
//                             props.setSelection({
//                               ...props.selection,
//                               indicator: item
//                             });
//                           }
//                           setDropdownOpen(!multiple ? false : true);
//                         }}
//                       >
//                         {multiple ? (
//                           <Checkbox checked={multipleSelected} style={{ margin: '0 .5em 0 0' }} />
//                         ) : null}
//                         {item.name}
//                       </div>
//                     );
//                   })}
//               </Fragment>
//             ))}
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// };

// IndicatorDropdown.propTypes = {
//   mobile: PropTypes.bool,
//   multiple: PropTypes.bool,
//   options: PropTypes.array,
//   placeholderText: PropTypes.string,
//   selection: PropTypes.object,
//   setSelection: PropTypes.func,
//   search: PropTypes.string,
//   searchFilter: PropTypes.func
// };

// export default IndicatorDropdown;
