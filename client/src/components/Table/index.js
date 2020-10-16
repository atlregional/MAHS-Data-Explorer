import React from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import utils from '../../utils';


const Table = () => {
  // Bring in data and map to table with indicator name as row headers and subarea name as column headers
  const indicators = [
    {
      name: "Average Number of HHs by Tract, 2017",
      type: "average",
      indicator: {
        id: "ID078",
        name: "Number of HHs 2017"
      },
      universe: {
        id: "ID078",
        name: "Number of HHs 2017"
      },
    },
    {
      name: "Change in Percent Owner Households since 2010",
      type: "weighted average",
      indicator: {
        id: "ID008",
        name: "Change in Percent Owner Households since 2010"
      },
      universe: {
        id: "ID091",
        name: "Total Occupied Housing Units 2010"
      }
    },
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
    }
  ];

  return <>{/* put a fancy Table component in here. */}Table</>;
};

export default Table;
