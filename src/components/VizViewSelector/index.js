import React from "react";
import { Icon } from "semantic-ui-react";
import config from "./config";
import "./style.css";

const VizViewSelector = (props) => {
  const buttonParamArr = config.buttonParams;
  return (
    <div id="viz-view-selector">
      {buttonParamArr.map((item) => (
        <div
          key={`${item.value}-viz-view-selector-button`}
          onClick={() => props.setMobileVizView(item.value)}
          className="viz-view-selector-button"
          id={
            props.mobileVizView === item.value
              ? "selected-viz-view-button"
              : null
          }
          style={{ width: `${100 / buttonParamArr.length}%` }}
        >
          <Icon
            className="viz-view-icon"
            name={item.icon}
            inverted={props.mobileVizView === item.value}
          />
        </div>
      ))}
    </div>
  );
};

export default VizViewSelector;
