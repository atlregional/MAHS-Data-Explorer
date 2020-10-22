import React, {useState, useEffect} from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import utils from '../../utils';


const Table = props => {
  // Bring in data and map to table with indicator name as row headers and subarea name as column headers
  const tractInfo = props.tractInfo;
  console.log(tractInfo)
  const headerArray = [];
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
    }
  ];

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
    // const aggregatedData = utils.aggregate(data, indicatorInfo[0], 'Subarea');
    //   console.log(aggregatedData)


    // Object.entries(aggregatedData).forEach(([key, value]) =>
    //   array.push({
    //     name: key,
    //     Subarea: parseInt(key.replace('Subarea ', '')),
    //     [indicatorInfo.name] : value
    //   })
    // );

    array.sort((a,b) => a.Subarea < b.Subarea ? -1 : 1)
    setData(array)

  }
    // : null;
  console.log(data);
  console.log(header)
  console.log(data)
  console.log(data)
  var rows = [];
  var cells;

  for (var r = 0; r < 3; r++) {
    cells = [];

    for (var c = 0; c < header.length; c++) {
      cells.push(<Cell key={c}>{( r === 0 && c === 0 ? 'Indicator'
        :r === 0 ? header[c] 
        : c === 0 ? data[c].indicator
        : 'Cell')}
        </Cell>);
    }

    rows.push(<Row key={r}>{cells}</Row>);
  }



  useEffect(handleAggregation, [props.selection])

  return (
    <div>
      <div style={{ width: '100%', height: '200px' }}>
        <StickyTable stickyHeaderCount={2}>{rows}</StickyTable>
      </div>
    </div>
  );
};

export default Table;
