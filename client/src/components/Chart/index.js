import React, {useState, useEffect} from 'react';
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

  const [ data, setData ] = useState();


  // console.log(JSON.stringify(tractInfo));


  const indicatorInfo = 
  
  // {
  //   name: "Average Number of HHs by Tract, 2017",
  //   type: "average",
  //   indicator: {
  //      id: "ID078",
  //      name: "Number of HHs 2017"
  //   },
  //   universe: {
  //     id: "ID078",
  //     name: "Number of HHs 2017"
  //  },

  // };

  // {
  //   name: "Change in Percent Owner Households since 2010",
  //   type: "weighted average",
  //   indicator: {
  //      id: "ID008",
  //      name: "Change in Percent Owner Households since 2010"
  //   },
  //   universe:  {
  //     id: "ID091",
  //     name: "Total Occupied Housing Units 2010"
  //   }
  // };



  {
    name: "Averge Population in Poverty 2017",
    type: "average",
    indicator: {
       id: "ID088",
       name: "Population in Poverty 2017"
    },
    universe: {
      id: "ID088",
      name: "Population in Poverty 2017"
   },
  };

  // const handleAggregate = () => 
  //   tractInfo ?

  const handleAggregation = () => {
    const array = [];
    const aggregatedData = utils.aggregate(tractInfo, indicatorInfo, 'Subarea');

    Object.entries(aggregatedData).forEach(([key, value]) =>
      array.push({
        name: key,
        Subarea: parseInt(key.replace('Subarea ', '')),
        [indicatorInfo.name] : value
      })
    );

    array.sort((a,b) => a.Subarea < b.Subarea ? -1 : 1)
    setData(array)

  }
    // : null;
  console.log(data);

  useEffect(handleAggregation, [])

  // const handleTractInfo = () => { 

  //     setTractInfo(props.tractInfo ? props.tractInfo : {});
  //     handleAggregate(props.tractInfo ? props.tractInfo : {}) 
  // }


  // useEffect(handleAggregate, [tractInfo]);


  // console.log('props: ', props);

   
  
  // props.data
  //   ? props.data
  //   : [
  //       //     {
  //       //       Subarea: '1',
  //       //       ExampleIndicator: 6,
  //       //     },
  //       //     {
  //       //       Subarea: '5',
  //       //       ExampleIndicator: 1,
  //       //     },
  //       //     {
  //       //       Subarea: '6',
  //       //       ExampleIndicator: 12,
  //       //     },
  //       //     {
  //       //       Subarea: '7',
  //       //       ExampleIndicator: 2,
  //       //     },
  //       //     {
  //       //       Subarea: '9',
  //       //       ExampleIndicator: 9,
  //       //     },
  //       { name: 'Subarea 1', Subarea: 1, ExampleIndicator: 6, amt: 2400 },
  //       { name: 'Subarea 5', Subarea: 5, ExampleIndicator: 1, amt: 2210 },
  //       { name: 'Subarea 6', Subarea: 6, ExampleIndicator: 12, amt: 2290 },
  //       { name: 'Subarea 7', Subarea: 7, ExampleIndicator: 2, amt: 2000 },
  //       { name: 'Subarea 9', Subarea: 9, ExampleIndicator: 9, amt: 2181 },
  //     ];

  // const colorBar = barProps => {
  //   // console.log('barProps: ', barProps);
  //   const colorArr = [];
  //   data.forEach(obj => {
  //     let subareaColor = obj.Subarea - 1;
  //     colorArr.push(colormap[subareaColor]);
  //   });
  //   console.log('colorArr: ', colorArr);
  //   // return;
  // };
  // CustomBar();

  const CustomTooltip = ({ active, payload, label }) => {
    // console.log(payload);
    if (active) {
      return (
        <div className="custom-tooltip">
          <h5 className="tooltip-indicator">{`${payload[0].payload.name}`}</h5>
          <p className="label">{`${indicatorInfo.name}: ${payload[0].value}`}</p>
        </div>
      );
    } else return null;
  };

  return (
    <>
      { data ?

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
            {data.map(barData => 
              <Cell
                fill={colormap[barData.Subarea - 1]}
              />
            )}
          </Bar>

          {/* <Line
            type="monotone"
            dataKey={data['Example Indicator']}
            stroke="#ff7300"
          /> */}
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
      : null
      }
    </>
  );
};

export default Chart;
