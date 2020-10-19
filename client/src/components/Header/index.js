import React, { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import './style.css';

const Header = props => {

    const topMenu = props.geoTypeOptions;
    const [subMenus, setSubMenus] = useState();

    const handleGeoOptions = () => {
      const subMenusObj = {};

      topMenu.forEach(geoType => {
        const type = geoType;
        const options = [];
        const data = [...props.data];
        type === 'City'
          ? data.forEach((tract) =>
              tract.Cities.forEach((city) => options.push(city))
            )
          : type === 'County'
          ? data.forEach((tract) => options.push(tract.County))
          : options.push('10 Counties');
        const geoSet = [...new Set(options)].sort((a, b) => (a > b ? 1 : -1));
        subMenusObj[type] = geoSet;
      })
  
      setSubMenus(subMenusObj);
    };

    useEffect(handleGeoOptions, []);

    // console.log(subMenus);



    return (
        <>
          <Menu horizontal stackable>
            <Dropdown fluid item text='Change Geography'>
              <Dropdown.Menu>
              {
                subMenus ?
                topMenu.map(geoType =>
                  
                  <Dropdown item text={geoType}>
                    <Dropdown.Menu>
                      {subMenus[geoType].map(geo =>
                        <Dropdown.Item
                          onClick={() => props.setSelection({
                            ...props.selection,
                            geoType: geoType,
                            geo: geo
                          })}
                        >
                          {geo}
                        </Dropdown.Item>
                      )}

                    </Dropdown.Menu>
                  </Dropdown>  
                )
                : null
              }              
              </Dropdown.Menu>
            </Dropdown>
          </Menu>

          {/* <div>
          {props.geoTypeOptions ?
          <select
            placeholder='Choose Geography Type'
            value={props.selection.geoType}
            className='geo-selector'
            onChange={e => props.setSelection({
              ...props.selection,
              geoType: e.target.value,
              geo: e.target.value === 'Region' ? '10 Counties' : props.selection.geo
            })}
          >
            {
              props.geoTypeOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div>
        <div>
          {props.geoOptions ?
          <select
            placeholder={`Choose a ${props.selection.geoType}`}
            value={props.selection.geo}
            className='geo-selector'
            onChange={e => props.setSelection({
              ...props.selection,
              geo: e.target.value
            })}          >
            {
              props.geoOptions.map(option =>
              <option
                className='geo-option'
                value={option}
                key={option}
              >
                {option}
              </option>  
              )
            }
          </select>
          : null
          }
        </div> */}
        </>
    )
}
export default Header;