import React from "react";
import numeral from "numeral";
import "./style.css";

const CustomTooltip = (props, { active, payload, label }) => {
  const geoType = props.geoType;
  const geo = props.geo;
  console.log(props);
  // return <div>test</div>;
  return active ? (
    <div className="chart-custom-tooltip">
      <div
        className="chart-tooltip-subarea"
        style={{
          color: props.colormap[label - 1],
        }}
      >
        {`${payload[0].payload.name.replace("Subarea", "Submarket")}`}
      </div>
      <div className="chart-tooltip-geography-selection">
        {geo ? (
          geoType === "Region" ? (
            <div>
              in the <span className="tooltip-geo">{geo} Region </span>
            </div>
          ) : geoType === "City" ? (
            <div>
              in
              <span className="tooltip-geo"> {geo}</span>
            </div>
          ) : geoType === "County" ? (
            <div>
              in
              <span className="tooltip-geo"> {geo} County</span>
            </div>
          ) : null
        ) : null}
      </div>
      <div className="chart-tooltip-indicator">
        {props.selectedIndicator.name}
      </div>
      <div id="chart-tooltip-indicator-value">
        {numeral(payload[0].value).format(props.indicatorFormatter)}
      </div>

      <div className="chart-tooltip-comparison">
        <div id="tooltip-compare-header">Compare to...</div>
        <div>
          All of{" "}
          <span className="tooltip-geo">
            {geo}
            {geoType !== "City" ? ` ${geoType}` : ""}
          </span>{" "}
          at{" "}
          <span className="chart-tooltip-percent-comparison">
            {props.data["All"]
              ? numeral(props.data["All"].value).format(
                  props.indicatorFormatter
                )
              : null}
          </span>
        </div>
      </div>
      <div id="tooltip-footer">
        <div>
          Data Source : <span>{props.selectedIndicator.source}</span>
        </div>
        <div>
          Universe : <span>{props.selectedIndicator.universe}</span>
        </div>
      </div>
    </div>
  ) : null;
};

export default CustomTooltip;
