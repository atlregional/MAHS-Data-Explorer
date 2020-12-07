import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  // Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  // Scatter,
  Cell,
} from 'recharts';
import './style.css';
import utils from '../../utils';

const Chart = props => {
  const colormap = props.colormap;
  const tractInfo = props.tractInfo;
  const indicatorInfo = props.selection.indicator;

  const handleAggregation = () => {
    const array = [];
    const tractData = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = utils.aggregate(tractData, indicatorInfo, 'Subarea');

    Object.entries(aggregatedData)
      .filter(([key]) => key !== 'All')
      .forEach(([key, value]) =>
        array.push({
          name: key,
          Subarea: parseInt(key.replace('Subarea ', '')),
          [indicatorInfo.name]: value,
          [props.selection.geo]: aggregatedData['All'],
        })
      );

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    // console.log(array);
    // setData(array);
    props.setSubareaData(array);
  };

  // console.log('Chart data', props.subareaData);

  const CustomTooltip = ({ active, payload, label }) =>
    active ? (
      <div className="custom-tooltip">
        <h5 className="tooltip-indicator">{`${payload[0].payload.name}`}</h5>
        <p className="label">{`${indicatorInfo.name}: ${payload[0].value}`}</p>
      </div>
    ) : null;

  // console.log(props.selection);

  useEffect(handleAggregation, [props.selection]);

  return (
    <>
      {props.subareaData ? (
        <ResponsiveContainer
          className="chart-responsive-container"
          width="92%"
          height="100%"
        >
          <ComposedChart className="bar-chart" data={props.subareaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'Subarea'} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey={indicatorInfo.name}>
              {props.subareaData.map((barData, idx) => (
                <Cell
                  key={indicatorInfo.name + idx}
                  fillOpacity={
                    barData.Subarea === props.highlightedSubarea
                      ? 1
                      : props.highlightedSubarea
                      ? props.clickedSubarea
                        ? 0.3
                        : 0.6
                      : 1
                  }
                  stroke={
                    barData.Subarea === props.highlightedSubarea
                      ? 'black'
                      : null
                  }
                  strokeWidth={
                    barData.Subarea === props.highlightedSubarea ? 3 : null
                  }
                  fill={colormap[barData.Subarea - 1]}
                  onMouseEnter={() =>
                    props.setHighlightedSubarea(
                      props.clickedSubarea
                        ? props.clickedSubarea
                        : barData.Subarea
                    )
                  }
                  onMouseLeave={() =>
                    props.setHighlightedSubarea(props.clickedSubarea)
                  }
                  onClick={() => {
                    props.setClickedSubarea(
                      props.clickedSubarea
                        ? barData.Subarea === props.clickedSubarea
                          ? null
                          : props.clickedSubarea
                        : barData.Subarea
                    );
                    // console.log("subarea: ", subarea);
                  }}
                />
              ))}
            </Bar>
            <Line
              dataKey={props.selection.geo}
              strokeDasharray="1 4"
              stroke={'black'}
              strokeWidth={4}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default Chart;
