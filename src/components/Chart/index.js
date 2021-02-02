import React, { useState, useEffect } from 'react';
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
} from 'recharts';
import './style.css';
import numeral from 'numeral';
import utils from '../../utils';

const Chart = props => {
  // console.log(props);
  const data = props.data;
  // console.log('data :', data);
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
  const CustomTooltip = ({ active, payload, label }) => {
    const geoType = props.selection.geoType;
    const geo = props.selection.geo;
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
            indicatorType === 'percent' ? '0.0%' : '0,0'
          )}
        </div>
        <br />
        <div className="chart-tooltip-comparison">
          Compare to{' '}
          <span className="chart-tooltip-percent-comparison">{geo}</span> at{' '}
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
        <span id="data-source" className="chart-data-credits">
          Data Source : {}{' '}
        </span>
        <span className="chart-data-credits">
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
                  }}
                />
              ))}
            </Bar>
            <Line
              dataKey={props.selection.geo}
              stroke="#000000"
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default Chart;
