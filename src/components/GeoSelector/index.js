import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import utils from "./utils";
import "./style.css";

const GeoSelector = (props) => {
  const topMenu = props.geoTypeOptions;
  const [subMenus, setSubMenus] = useState();

  useEffect(() => {
    const subMenuGeoData = utils.handleGeoOptions(props, topMenu);
    setSubMenus(subMenuGeoData);
  }, []);

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
