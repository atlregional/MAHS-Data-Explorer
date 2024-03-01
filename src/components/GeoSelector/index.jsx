import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import utils from './utils';
import './style.css';

const GeoSelector = ({
  data,
  geoTypeOptions,
  selection,
  setClickedSubarea,
  setHighlightedSubarea,
  setSelection
}) => {
  const [subMenus, setSubMenus] = useState();

  const topMenu = geoTypeOptions;

  useEffect(() => {
    const subMenuGeoData = utils.handleGeoOptions(data, topMenu);
    setSubMenus(subMenuGeoData);
  }, []);

  return (
    <>
      <Dropdown inline item text='Change Geography'>
        <Dropdown.Menu>
          {subMenus
            ? topMenu.map((geoType, idx) => (
              <Dropdown key={idx} item text={geoType}>
                <Dropdown.Menu>
                  {subMenus[geoType].map((geo, idx) => (
                    <Dropdown.Item
                      key={geo + idx}
                      onClick={() => {
                        setSelection({
                          ...selection,
                          geoType: geoType,
                          geo: geo
                        });
                        setClickedSubarea();
                        setHighlightedSubarea();
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

GeoSelector.propTypes = {
  data: PropTypes.array,
  geoTypeOptions: PropTypes.array,
  selection: PropTypes.object,
  setSelection: PropTypes.func,
  setClickedSubarea: PropTypes.func,
  setHighlightedSubarea: PropTypes.func
};

export default GeoSelector;
