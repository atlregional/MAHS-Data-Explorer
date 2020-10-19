import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  // Line,
  // Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // Scatter,
  Cell,
} from 'recharts';
import './style.css';
import utils from '../../utils';

const Chart = props => {
  let colormap = props.colormap;
  // console.log(colormap);
  const tractInfo = props.tractInfo;
  // console.log(tractInfo);

  const [data, setData] = useState();

  // console.log(JSON.stringify(tractInfo));

  const indicatorArray = [
    {
      name: 'Percent Renters 2017',
      type: 'percent',
      indicator: {
        id: 'ID093',
        name: 'Total Renter Occupied Housing Units 2017',
      },
      universe: {
        id: 'ID094',
        name: 'Total Occupied Housing Units 2017',
      },
    },

    {
      name: 'Change in Percent Owner Households since 2010',
      type: 'weighted average',
      indicator: {
        id: 'ID008',
        name: 'Change in Percent Owner Households since 2010',
      },
      universe: {
        id: 'ID091',
        name: 'Total Occupied Housing Units 2010',
      },
    },
    {
      name: 'Averge Population in Poverty 2017',
      type: 'average',
      indicator: {
        id: 'ID088',
        name: 'Population in Poverty 2017',
      },
      universe: {
        id: 'ID088',
        name: 'Population in Poverty 2017',
      },
    },
  ];

  const indicatorInfo = indicatorArray[0];

  // const handleAggregate = () =>
  //   tractInfo ?

  const handleAggregation = () => {
    const array = [];
    const data = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = utils.aggregate(data, indicatorInfo, 'Subarea');

    Object.entries(aggregatedData).forEach(([key, value]) =>
      array.push({
        name: key,
        Subarea: parseInt(key.replace('Subarea ', '')),
        [indicatorInfo.name]: value,
      })
    );

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    setData(array);
  };
  // : null;
  // console.log(data);

  useEffect(handleAggregation, [props.selection]);

  const CustomTooltip = ({ active, payload, label }) =>
    active ? (
      <div className="custom-tooltip">
        <h5 className="tooltip-indicator">{`${payload[0].payload.name}`}</h5>
        <p className="label">{`${indicatorInfo.name}: ${payload[0].value}`}</p>
      </div>
    ) : null;

  return (
    <>
      {data ? (
        <ResponsiveContainer
          className="chart-responsive-container"
          width="92%"
          height="85%"
        >
          <ComposedChart
            className="bar-chart"
            width={500}
            height={500}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'Subarea'} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            <Bar dataKey={indicatorInfo.name}>
              {data.map(barData => (
                <Cell fill={colormap[barData.Subarea - 1]} />
              ))}
            </Bar>

            {/* <Line
            type="monotone"
            dataKey={data['Example Indicator']}
            stroke="#ff7300"
          /> */}
            {/* <Scatter dataKey="cnt" fill="red" /> */}
          </ComposedChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default Chart;
