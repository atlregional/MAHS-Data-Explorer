import React, {useState, useEffect} from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import utils from '../../utils';
import numeral from 'numeral';
import './style.css'


const Table = props => {
  // Bring in data and map to table with indicator name as row headers and subarea name as column headers
  const tractInfo = props.tractInfo;
  console.log(tractInfo)
  const headerArray = ['indicator'];
  const [ data, setData ] = useState();
  const [ header, setheader ] = useState([]);
  const indicatorInfo = [
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
    },
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
    },
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
    },
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

  const lineBreaker = string =>
    string
    .match(/\b[\w']+(?:[^\w\n]+[\w']+){0,3}\b/g)
    .map(line =>
      <p
        className='indicator-column'
      >
        {line}
      </p>
    ) 


  const handleAggregation = () => {
    const array = [];
    const data = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
   indicatorInfo.forEach(indicator =>{
     const aggregatedData = utils.aggregate(data, indicator, 'Subarea')
     aggregatedData["indicator"] = indicator.name
      array.push(aggregatedData)
   })
   
   
   data.forEach(tract => 
    !headerArray.includes(tract.Subarea) ? 
      headerArray.push(tract.Subarea)
      :null

   )

   headerArray.sort((a,b) => parseInt(a.replace('Subarea ', '')) < parseInt(b.replace('Subarea ', '')) ? -1 : 1)
   setheader(headerArray)
  

    array.sort((a,b) => a.Subarea < b.Subarea ? -1 : 1)
    setData(array)

  }
    // : null;
  console.log(data);
  console.log(header)
 
  var rows = [];
  // var cells;

  indicatorInfo.forEach((indicator, r) => {
    const cells = [];

    header.forEach((item, c) =>
      cells.push(
        <Cell 
          key={`${c}-${r}`}
          className='table-cells'
          style={{
            backgroundColor: item === `Subarea ${props.highlightedSubarea}` ? 'lightgrey' : null
          }}
        >
          {
            r === 0 && 
            c === 0 ?
              '' // Could maybe put dropdown selector here
            : r === 0 ? 
                item 
              : c === 0 ? 
                  lineBreaker(data[r].indicator)
                : numeral(data[r][item]).format('0,0')
          }
        </Cell>
        )
      );
    // }

    rows.push(<Row key={r}>{cells}</Row>);
  })



  useEffect(handleAggregation, [props.selection])

  return (
    // <div>
      <div 
        style={{ 
          width: '100%', 
          height: '100%',
          padding: '4px', 
        }} 
        id="table">
        <StickyTable stickyHeaderCount={1}>
          {rows}
        </StickyTable>
      </div>
    // </div>
  );
};

export default Table;
