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
import CustomTooltip from "../CustomTooltip";
import "./style.css";

const Chart = (props) => {

  const [chartHover, setChartHover] = useState();

  const {
    mobile,
    data,
    colormap,
    tractInfo,
    selection: {
      indicator: selectedIndicator
    },
    subareaData
  } = props;

  console.log(subareaData);


  const indicatorType = selectedIndicator.type;
  const changeType = selectedIndicator.changeType;
  const indicatorFormatter = selectedIndicator.formatter.replace(
    /"/g,
    ''
  );

  useEffect(() => {
    const aggregatedSubareaData = utils.handleAggregation(
      tractInfo,
      props.selection
    );
    props.setSubareaData(aggregatedSubareaData);
  }, [props.selection]);

  return subareaData ? (
    <>
      <ResponsiveContainer
        className="chart-responsive-container"
        // aspect={.5}
        width={mobile ? 340 : '100%'}
        height={mobile ? 300 : '100%'}
      >
        <ComposedChart
          margin={{ bottom: 20, left: 30 }}
          // height={100}
          // width={100}
          className="bar-chart"
          data={subareaData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"Subarea"} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) => numeral(tick).format(indicatorFormatter)}
          />

          {/* {!props.mobile ? ( */}
            <Tooltip
              content={(obj) =>
                CustomTooltip(
                  obj,
                  props,
                  data,
                  selectedIndicator,
                  indicatorFormatter
                )
              }
            />
          {/* ) : null} */}

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
