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
  const [indicator, setIndicator] = useState();
  const [dropDownOpen, setDropdownOpen] = useState();

  let colormap = props.colormap;
  // console.log(colormap);
  const tractInfo = props.tractInfo;
  // console.log(tractInfo);

  const [data, setData] = useState();

  // console.log(JSON.stringify(tractInfo));

  const indicatorArray = props.indicators;

  const selectedIndicator = indicatorArray[0];

  // setIndicator(selectedIndicator.indicator);
  console.log('data: ', data);
  console.log('selectedIndicator: ', selectedIndicator);
  // const handleAggregate = () =>
  //   tractInfo ?

  const handleAggregation = () => {
    const array = [];
    const data = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    const aggregatedData = utils.aggregate(data, selectedIndicator, 'Subarea');

    Object.entries(aggregatedData).forEach(([key, value]) =>
      array.push({
        name: key,
        Subarea: parseInt(key.replace('Subarea ', '')),
        [selectedIndicator.name]: value,
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
        <p className="label">{`${selectedIndicator.name}: ${payload[0].value}`}</p>
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
          <div
            id="indicator-selector-dropdown"
            onClick={() => setDropdownOpen(dropDownOpen ? false : true)}
          >
            <div id="indicator-selector-dropdown-header">
              {selectedIndicator.name} //Add triangle icon here
            </div>
            {indicatorArray.map(item => {
              console.log(item);
              // <div
              //   id={
              //     item.name === props.selectedIndicator.name
              //       ? 'selected-option'
              //       : null
              //   }
              //   className="item-selector-dropdown-option"
              //   onClick={() => props.setIndicator(item.name)}
              // >
              //   {' '}
              //   {item.name}
              // </div>;
            })}
            {/* {dropDownOpen ? console.log(props) : null} */}
          </div>
          {/* <SingleDropdown
            indicatorArray={indicatorArray}
            selectedIndicator={selectedIndicator}
            setIndicator={setIndicator}
          /> */}
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

            <Bar dataKey={selectedIndicator.name}>
              {data.map((barData, idx) => (
                <Cell
                  key={selectedIndicator.name + idx}
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
      ) : null}
    </>
  );
};

export default Chart;
