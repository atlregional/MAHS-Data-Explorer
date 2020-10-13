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
  const colormap = props.colormap;
  console.log('props: ', props);

  const data = props.data
    ? props.data
    : [
        {
          Subarea: '1',
          'Example Indicator': 6,
        },
        {
          Subarea: '5',
          'Example Indicator': 1,
        },
        {
          Subarea: '6',
          'Example Indicator': 12,
        },
        {
          Subarea: '7',
          'Example Indicator': 2,
        },
        {
          Subarea: '9',
          'Example Indicator': 9,
        },
      ];

  // const CustomTooltip = ({ active, payload, label }) => {
  //   // console.log(payload);
  //   const tooltip = (
  //     <div>
  //       <span className="tooltip-data">Subarea {data.Subarea}</span>
  //     </div>
  //   );
  // };

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
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey={'Subarea'} />
          <YAxis />
          <Tooltip dataKey={['Example Indicator']} />
          <Legend />
          <Bar
            dataKey="Subarea"
            barSize={20}
            fill="#413ea0"
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
