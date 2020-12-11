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
import numeral from 'numeral';
import utils from '../../utils';

const Chart = props => {
  console.log(props);
  const data = props.data;
  console.log('data :', data);
  const colormap = props.colormap;
  const tractInfo = props.tractInfo;

  const selectedIndicator = props.selection.indicator;
  const indicatorType = props.selection.indicator.type;

  const handleAggregation = () => {
    const array = [];
    const tractData = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = utils.aggregate(
      tractData,
      selectedIndicator,
      'Subarea'
    );

    Object.entries(aggregatedData)
      .filter(([key]) => key !== 'All')
      .forEach(([key, value]) =>
        array.push({
          name: key,
          Subarea: parseInt(key.replace('Subarea ', '')),
          [selectedIndicator.name]: value,
          [props.selection.geo]: aggregatedData['All'],
        })
      );

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    // console.log(array);
    // setData(array);
    props.setSubareaData(array);
  };

  // console.log('Chart data', props.subareaData);
  // ****** CSS NOT WORKINNG IN HTE
  const CustomTooltip = ({ active, payload, label }) => {
    console.log('chart tooltip props :', props);
    const geoType = props.selection.geoType;
    const geo = props.selection.geo;
    // const data =

    return active ? (
      <div className="chart-custom-tooltip">
        <div
          className="chart-tooltip-subarea"
          style={{
            color: props.colormap[label - 1],
          }}
        >
          {`${payload[0].payload.name}`}
        </div>
        <br />
        <div className="chart-tooltip-geography-selection">
          {geo ? (
            geoType === 'Region' ? (
              <div>
                in the <span className="tooltip-geo">{geo}</span> Region
              </div>
            ) : geoType === 'City' ? (
              <div>
                in the City of
                <span className="tooltip-geo">{geo}</span>
              </div>
            ) : geoType === 'County' ? (
              <div>
                in
                <span className="tooltip-geo"> {geo} </span>
                County
              </div>
            ) : null
          ) : null}
        </div>
        <br />
        <div className="chart-tooltip-indicator">
          {selectedIndicator.name}
          <br />
          {numeral(payload[0].value).format(
            indicatorType === 'percent'
              ? '0.0%'
              : indicatorType === 'average'
              ? '0.0%'
              : indicatorType === 'weighted average'
              ? '0.0%'
              : indicatorType === 'all'
              ? '0.0'
              : '0,0'
          )}
        </div>
        <br />
        <div className="chart-tooltip-percent-comparison">
          Compare to {geo} at{' '}
          {
            <span className="chart-tooltip-percent-comparison">
              {data['All']
                ? numeral(data['All'].value).format(
                    indicatorType === 'percent' ? ' 0.0%' : '0,0'
                  )
                : null}
            </span>
          }
        </div>
        <br />
        <span id="data-source" className="data-credits">
          Data Source : {}{' '}
        </span>
        <span className="data-credits">
          Universe : {props.selection.indicator.universe.name}
        </span>
      </div>
    ) : null;
  };

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

            <Bar dataKey={selectedIndicator.name}>
              {props.subareaData.map((barData, idx) => (
                <Cell
                  key={selectedIndicator.name + idx}
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
                  // onMouseOver={e => console.log(e)}
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
