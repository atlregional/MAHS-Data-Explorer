import React, {useState, useEffect} from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import utils from '../../utils';


const Table = props => {
  // Bring in data and map to table with indicator name as row headers and subarea name as column headers
  const tractInfo = props.tractInfo;
  console.log(tractInfo)

  const [ data, setData ] = useState();
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
   
   const headerArray = [];
   data.forEach(tract => 
    !headerArray.includes(tract.Subarea) ? 
      headerArray.push(tract.Subarea)
      :null

   )

   headerArray.sort((a,b) => parseInt(a.replace('Subarea ', '')) < parseInt(b.replace('Subarea ', '')) ? -1 : 1)
console.log(headerArray)
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

  useEffect(handleAggregation, [props.selection])

  return (
    <div>
      <div style={{width: '100%', height: '400px'}}>
        <StickyTable
        stickHeaderCount={1}>
          <Row>
          {/* {data.map(field => 
          
            <Cell
              style={{
              
                width: '100px',
                textAlign: 'center', 
                verticalAlign: 'middle', 
                backgroundColor: '#d5bdbd',
                padding: '4px'
              }}
              key={'column-' + field} 
              
              value={'field'} >
              </Cell>
           )} */}
            

            
          </Row>
          <Row>
            <Cell>Cell 1</Cell>
            <Cell>Cell 2</Cell>
          </Row>
        </StickyTable>
      </div>
    </div>
  );
};

export default Table;
