import React from 'react';

const Chart = props => {

  const data = props.data ? props.data :
  [
    {
      "Subarea": "1",
      "Example Indicator" : 6
    },
    {
      "Subarea": "5",
      "Example Indicator" : 1
    },
    {
      "Subarea": "6",
      "Example Indicator" : 12
    },
    {
      "Subarea": "7",
      "Example Indicator" : 2
    },
    {
      "Subarea": "9",
      "Example Indicator" : 9
    },
  ];

  

  return <>{/* put a fancy chart component in here. */}Chart</>;
};

export default Chart;
