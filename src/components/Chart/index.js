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
import SingleDropdown from '../SingleDropdown';

const Chart = props => {
  let colormap = props.colormap;
  const tractInfo = props.tractInfo;

  const [data, setData] = useState();
  const [selectedIndicator, setSelectedIndicator] = useState();
  console.log('selectedIndicator: ', selectedIndicator);

  const indicatorArray = props.indicators;
  const indicatorInfo = indicatorArray[0];
  console.log('indicatorInfo: ', indicatorInfo)

  useEffect(() => setSelectedIndicator(indicatorInfo), []);

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

  useEffect(handleAggregation, [props.selection]);

  const CustomTooltip = ({ active, payload, label }) =>
    active ? (
      <div className="custom-tooltip">
        <h5 className="tooltip-indicator">{`${payload[0].payload.name}`}</h5>
        <p className="label">{`${indicatorInfo.name}: ${payload[0].value}`}</p>
      </div>
    ) : null;

  return data ? (
    <>
      <SingleDropdown
        indicatorInfo={indicatorInfo}
        indicatorArray={indicatorArray}
        selectedIndicator={selectedIndicator}
        setSelectedIndicator={setSelectedIndicator}
      />

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
            {data.map((barData, idx) => (
              <Cell
                key={indicatorInfo.name + idx}
                fill={colormap[barData.Subarea - 1]}
              />
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
    </>
  ) : null;
};

export default Chart;
