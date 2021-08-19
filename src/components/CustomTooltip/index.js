import React from "react";
import numeral from "numeral";
import "./style.css";

const CustomTooltip = (
  { active, payload, label },
  props,
  selectedIndicator,
  indicatorFormatter,
  data
) => {
  return active ? (
    <div id="chart-custom-tooltip">
      <div
        id="chart-tooltip-subarea"
        style={{
          color: props.colormap[label - 1],
        }}
      >
        {`${payload[0].payload.name.replace("Subarea", "Submarket")}`}
      </div>
      <div id="chart-tooltip-props.geography-selection">
        {props.geo ? (
          props.geoType === "Region" ? (
            <div>
              in the <span id="tooltip-props.geo">{props.geo} Region </span>
            </div>
          ) : props.geoType === "City" ? (
            <div>
              in
              <span id="tooltip-props.geo"> {props.geo}</span>
            </div>
          ) : props.geoType === "County" ? (
            <div>
              in
              <span id="tooltip-props.geo"> {props.geo} County</span>
            </div>
          ) : null
        ) : null}
      </div>
      <div id="chart-tooltip-indicator">{selectedIndicator.name}</div>
      <div id="chart-tooltip-indicator-value">
        {numeral(payload[0].value).format(indicatorFormatter)}
      </div>

      <div id="chart-tooltip-comparison">
        <div id="tooltip-compare-header">Compare to...</div>
        <div>
          All of{" "}
          <span id="tooltip-props.geo">
            {props.geo}
            {props.geoType !== "City" ? ` ${props.geoType}` : ""}
          </span>{" "}
          at{" "}
          <span id="chart-tooltip-percent-comparison">
            {data["All"]
              ? numeral(data["All"].value).format(indicatorFormatter)
              : null}
          </span>
        </div>
      </div>
      <div id="tooltip-footer">
        <div>
          Data Source : <span>{selectedIndicator.source}</span>
        </div>
        <div>
          Universe : <span>{selectedIndicator.universe}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default CustomTooltip;
