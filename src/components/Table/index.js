import React, { useState, useEffect } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import utils from '../../utils';
import numeral from 'numeral';
import ExportButton from '../ExportButton';

import './style.css';

const Table = props => {
  // Bring in data and map to table with indicator name as row headers and subarea name as column headers
  const tractInfo = props.tractInfo;
  // console.log(tractInfo)
  const headerArray = ['indicator'];
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const indicatorInfo = props.indicators;
  const selectedIndicators = props.selection.indicators
    ? props.selection.indicators.map(indicator => indicator.name)
    : [];
  // console.log(data);

  const lineBreaker = string =>
    string.match(/\b[\w']+(?:[^\w\n]+[\w']+){0,3}\b/g).map(line => (
      <p key={line} className="indicator-column">
        {line}
      </p>
    ));

  const handleAggregation = () => {
    const array = [];
    const data = Object.values(tractInfo).filter(tract =>
      utils.filterBySelection(tract, props.selection)
    );
    indicatorInfo.forEach(indicator => {
      const aggregatedData = utils.aggregate(data, indicator, 'Subarea');
      aggregatedData['indicator'] = indicator.name;
      array.push(aggregatedData);
    });

    data.forEach(tract =>
      !headerArray.includes(tract.Subarea)
        ? headerArray.push(tract.Subarea)
        : null
    );

    headerArray.sort((a, b) =>
      parseInt(a.replace('Subarea ', '')) < parseInt(b.replace('Subarea ', ''))
        ? -1
        : 1
    );
    setHeader(headerArray);

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    setData(array);
  };

  const rows = [];

  const handleCreateRows = () => {
    const headerCells = header.map((header, i) => (
      // headerCells.push(
      <Cell
        key={`header-${i}`}
        className="table-cells"
        style={{
          backgroundColor:
            header === `Subarea ${props.highlightedSubarea}`
              ? 'lightgrey'
              : null,
        }}
      >
        {
          // r === 0 &&
          i === 0
            ? '' // Could maybe put dropdown selector here
            : // : r === 0 ?
              header
          // : c === 0 ?
          //     lineBreaker(indicator.name)
          //   : numeral(data[r][item]).format('0,0')
        }
      </Cell>
    ));

    rows.push(<Row key="header-row">{headerCells}</Row>);

    indicatorInfo
      .filter(indicator => selectedIndicators.includes(indicator.name))
      .forEach((indicator, r) => {
        const cells = [];

        header.forEach((item, c) =>
          cells.push(
            <Cell
              key={`${c}-${r}`}
              className="table-cells"
              style={{
                backgroundColor:
                  item === `Subarea ${props.highlightedSubarea}`
                    ? 'lightgrey'
                    : null,
              }}
            >
              {
                // r === 0 &&
                // c === 0 ?
                //   '' // Could maybe put dropdown selector here
                // : r === 0 ?
                //     item
                //   :
                c === 0
                  ? lineBreaker(indicator.name)
                  : numeral(data[r][item]).format('0,0')
              }
            </Cell>
          )
        );
        // }
        rows.push(<Row key={r}>{cells}</Row>);
      });
  };

  const dataForExport = inputDataArray => {
    // filter and reorder properties in input data to match rendered table
    console.log('inputDataArray', inputDataArray);
    const outputDataArray = [];
    const headerArray = [...header];
    console.log(headerArray)
    console.log(inputDataArray);

    inputDataArray
    .filter(inputData => 
      selectedIndicators.includes(inputData.indicator)
    )
    .forEach(inputData => {
      const dataObj = {};
      headerArray.forEach(header => dataObj[header] = inputData[header]);
      outputDataArray.push(dataObj);
    });
    // filter and reorder properties in input data to match rendered table 

    return outputDataArray;
  };
  // dataForExport();

  handleCreateRows();

  useEffect(handleAggregation, [props.selection]);

  return (
    // <div>
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '4px',
      }}
      id="table"
    >
      {/* add a csvFilename & csvTitle prop to the ExportButton */}
      {/* filename should be  */}
      <ExportButton data={dataForExport(data)} />
      <StickyTable stickyHeaderCount={1}>
        {/* {headerRow} */}
        {rows}
      </StickyTable>
    </div>
    // </div>
  );
};

export default Table;
