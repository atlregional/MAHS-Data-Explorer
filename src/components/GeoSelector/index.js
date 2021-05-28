import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import './style.css';

const GeoSelector = props => {
  const topMenu = props.geoTypeOptions;
  const [subMenus, setSubMenus] = useState();

  const handleGeoOptions = () => {
    const subMenusObj = {};

    topMenu.forEach(geoType => {
      const type = geoType;
      const options = [];
      const data = [...props.data];
      type === 'City'
        ? data.forEach(tract =>
            tract.Cities.forEach(city => options.push(city))
          )
        : type === 'County'
        ? data.forEach(tract => options.push(tract.County))
        : options.push('11-County');
      const geoSet = [...new Set(options)].sort((a, b) => (a > b ? 1 : -1));
      subMenusObj[type] = geoSet;
    });

    setSubMenus(subMenusObj);
  };

  useEffect(handleGeoOptions, []);

  return (
    <>
      <Dropdown inline item text="Change Geography">
        <Dropdown.Menu>
          {subMenus
            ? topMenu.map((geoType, idx) => (
                <Dropdown key={idx} item text={geoType}>
                  <Dropdown.Menu>
                    {subMenus[geoType].map((geo, idx) => (
                      <Dropdown.Item
                        key={geo + idx}
                        onClick={() => {
                          props.setSelection({
                            ...props.selection,
                            geoType: geoType,
                            geo: geo,
                          });
                          props.setClickedSubarea();
                          props.setHighlightedSubarea();
                        }}
                      >
                        {geo}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ))
            : null}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default GeoSelector;
