import React from "react";
import GeoSelector from "../GeoSelector";
import headerBackground from "../../header-background.png";
import { Icon } from "semantic-ui-react";
import "./style.css";

const ARCHeader = (props) => {
  const selection = props.selection;
  return (
    <div
      id="ARC-Header"
      className="arc-header-div"
      style={{ backgroundImage: `url(${headerBackground})` }}
    >
      {!props.mobile ? (
        <a class="back-to-site" href="https://metroatlhousing.org">
          ← Back<span> to Main Site</span>
        </a>
      ) : (
        <a class="back-to-site" href="https://metroatlhousing.org">
          <Icon name="chevron left" />
        </a>
      )}
      <div className="arc-header-box">
        <div className="geo-selector-box">
          <div id="geo-label-header">
            {selection.geo}{" "}
            {selection.geoType !== "City" ? selection.geoType : ""}
          </div>
          <div className="dropdown-box">
            <GeoSelector
              geoTypeOptions={props.geoTypeOptions}
              selection={selection}
              setClickedSubarea={props.setClickedSubarea}
              setHighlightedSubarea={props.setHighlightedSubarea}
              setSelection={props.setSelection}
              data={props.data}
            />
          </div>
        </div>
      </div>
      <div className="ARC-logo-div">
        {!props.mobile ? (
          <img
            className="ARC-logo"
            src="https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/logo.svg"
            alt="Atlanta Regional Commission logo"
          />
        ) : (
          <img
            className="ARC-mobile-logo"
            src="https://metroatlhousing.org/wp-content/themes/bsc-arcmahs/images/icon-home.svg"
            alt="ARC mobile logo"
          />
        )}
      </div>
    </div>
  );
};
export default ARCHeader;
