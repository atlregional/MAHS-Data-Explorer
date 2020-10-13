import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import './style.css';

const Chart = props => {
  let colormap = props.colormap;
  // console.log('props: ', props);

  const data = props.data
    ? props.data
    : [
        //     {
        //       Subarea: '1',
        //       ExampleIndicator: 6,
        //     },
        //     {
        //       Subarea: '5',
        //       ExampleIndicator: 1,
        //     },
        //     {
        //       Subarea: '6',
        //       ExampleIndicator: 12,
        //     },
        //     {
        //       Subarea: '7',
        //       ExampleIndicator: 2,
        //     },
        //     {
        //       Subarea: '9',
        //       ExampleIndicator: 9,
        //     },
        { name: 'Subarea 1', Subarea: 1, ExampleIndicator: 6, amt: 2400 },
        { name: 'Subarea 5', Subarea: 5, ExampleIndicator: 1, amt: 2210 },
        { name: 'Subarea 6', Subarea: 6, ExampleIndicator: 12, amt: 2290 },
        { name: 'Subarea 7', Subarea: 7, ExampleIndicator: 2, amt: 2000 },
        { name: 'Subarea 9', Subarea: 9, ExampleIndicator: 9, amt: 2181 },
      ];

  const barColor = (colormap, data) => {
    // console.log('colormap: ', colormap);
    const colorArr = [];
    data.forEach(obj => {
      let subareaColor = obj.Subarea - 1;
      colorArr.push(colormap[subareaColor]);
    });
    console.log('colorArr: ', colorArr);
    return colorArr;
  };
  barColor(colormap, data);

  const CustomTooltip = ({ active, payload, label }) => {
    // console.log(payload);
    if (active) {
      return (
        <div className="custom-tooltip">
          <h5 className="tooltip-indicator">{`Example Indicator : ${payload[0].payload.ExampleIndicator}`}</h5>
          <p className="label">{`Subarea : ${payload[0].value}`}</p>
        </div>
      );
    } else return null;
  };

  return (
    <>
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
          <XAxis dataKey={'name'} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="Subarea"
            barSize={20}
            fill={barColor}
            // style={{ backgroundColor: `${colormap - 1}` }}
            // label={data}
          />
          {/* <Line
            type="monotone"
            dataKey={data['Example Indicator']}
            stroke="#ff7300"
          /> */}
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
