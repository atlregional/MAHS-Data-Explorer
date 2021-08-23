import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import numeral from "numeral";
import utils from "./utils";
import "./style.css";

const Chart = (props) => {
  const data = props.data;
  const colormap = props.colormap;
  const tractInfo = props.tractInfo;
  const selectedIndicator = props.selection.indicator;
  const indicatorType = props.selection.indicator.type;
  const changeType = props.selection.indicator.changeType;
  const indicatorFormatter = props.selection.indicator.formatter.replace(
    /"/g,
    ""
  );
  const [chartHover, setChartHover] = useState();
  const geoType = props.selection.geoType;
  const geo = props.selection.geo;

  const CustomTooltip = ({ active, payload, label }) => {
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
        <div className="chart-tooltip-indicator">{selectedIndicator.name}</div>
        <div id="chart-tooltip-indicator-value">
          {numeral(payload[0].value).format(indicatorFormatter)}
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

  useEffect(() => {
    const aggregatedSubareaData = utils.handleAggregation(
      tractInfo,
      selectedIndicator,
      props
    );
    props.setSubareaData(aggregatedSubareaData);
  }, [props.selection]);

  return props.subareaData ? (
    <>
      <ResponsiveContainer
        className="chart-responsive-container"
        width={"100%"}
        height={"100%"}
      >
        <ComposedChart
          margin={{ bottom: 20, left: 30 }}
          className="bar-chart"
          data={props.subareaData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"Subarea"} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) => numeral(tick).format(indicatorFormatter)}
          />

          {!props.mobile ? <Tooltip content={<CustomTooltip />} /> : null}

          <Bar dataKey={selectedIndicator.name}>
            {props.subareaData.map((barData, idx) => (
              <Cell
                key={selectedIndicator.name + idx}
                fillOpacity={
                  barData.Subarea === props.highlightedSubarea ||
                  barData.Subarea === chartHover
                    ? 1
                    : props.highlightedSubarea
                    ? props.clickedSubarea
                      ? 0.3
                      : 0.6
                    : 1
                }
                stroke={
                  barData.Subarea === props.highlightedSubarea ? "black" : null
                }
                strokeWidth={
                  barData.Subarea === props.highlightedSubarea ? 3 : null
                }
                fill={colormap[barData.Subarea - 1]}
                onMouseEnter={() => {
                  props.setHighlightedSubarea(
                    props.clickedSubarea
                      ? props.clickedSubarea
                      : barData.Subarea
                  );
                  setChartHover(barData.Subarea);
                }}
                onMouseLeave={() => {
                  props.setHighlightedSubarea(props.clickedSubarea);
                  setChartHover();
                }}
                onClick={() => {
                  props.setClickedSubarea(
                    props.clickedSubarea
                      ? barData.Subarea === props.clickedSubarea
                        ? null
                        : props.clickedSubarea
                      : barData.Subarea
                  );
                }}
              />
            ))}
          </Bar>

          {changeType || indicatorType !== "Sum" ? (
            <Line
              dataKey={props.selection.geo}
              stroke="#000000"
              strokeDasharray="4 4"
              dot={false}
            />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
      <div></div>
    </>
  ) : null;
};

export default Chart;
