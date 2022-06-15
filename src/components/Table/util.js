import React from 'react';
import { Row, Cell } from 'react-sticky-table';
import ExportButton from '../ExportButton';
import moment from 'moment';
import numeral from 'numeral';
import globalUtils from '../../globalUtils';

export default {
  handleAggregation(headerArray, props, indicatorInfo, tractInfo) {
    const array = [];
    const data = Object.values(tractInfo).filter(tract =>
      globalUtils.filterBySelection(tract, props.selection)
    );
    indicatorInfo.forEach(indicator => {
      const aggregatedData = globalUtils.aggregate(data, indicator, 'Subarea');
      aggregatedData['indicator'] = indicator.name;
      array.push(aggregatedData);
    });

    data.forEach(tract =>
      !headerArray.includes(tract.Subarea) ? headerArray.push(tract.Subarea) : null
    );

    // Sort based on sub area but also ensure indicator is first in array
    headerArray.sort((a, b) =>
      parseInt(a.replace('Subarea ', '')) < parseInt(b.replace('Subarea ', '')) || a === 'indicator'
        ? -1
        : 1
    );

    // map each object to be in correct format for table
    const dataArray = array.map(obj => {
      const result = {};

      result['All'] = obj['All'];

      // Sort all Subarea keys based on subarea number
      Object.keys(obj)
        .filter(key => key !== 'All' && key !== 'indicator')
        .sort((a, b) =>
          parseInt(a.replace('Subarea ', '')) < parseInt(b.replace('Subarea ', '')) ? -1 : 1
        )
        .forEach(item => {
          result[item] = obj[item];
        });

      result['indicator'] = obj['indicator'];

      return result;
    });

    // array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));

    return {
      headerArray: headerArray,
      data: dataArray
    };
  },

  handleCreateRows(indicatorInfo, selectedIndicators, props, data, header) {
    const rows = [];
    const headerArray = header;
    const headerCells = header.map((header, i) => (
      <Cell
        key={`header-${i}-${header.split(' ').join('-')}`}
        className={`table-cells ${i !== 0 ? 'header-cell' : ''}`}
        style={{
          backgroundColor: header === `Subarea ${props.highlightedSubarea}` ? 'lightgrey' : null,
          padding: '1em'
        }}
      >
        {i === 0 ? (
          <ExportButton
            data={this.dataForExport(data, headerArray, selectedIndicators)}
            //
            csvTitle={
              `TITLE: MAHS Submarket Summary ${props.selectedGeo} ` +
              '\nSOURCE: MAHS DATA EXPLORER - https://data.metroatlhousing.org/'
            }
            csvFilename={`MAHS-Submarket-Summary-${props.selectedGeo
              .split(' ')
              .join('-')}-${moment().format('M/DD/YYYY')}`}
            content={'Download Data'}
          />
        ) : (
          header.replace('Subarea', 'Submarket')
        )}
      </Cell>
    ));

    rows.push(
      <Row key={`header-row-${props.selectedGeo.split(' ').join('-')}`}>{headerCells}</Row>
    );

    const dataFiltered = data.filter(item => selectedIndicators.includes(item.indicator));

    indicatorInfo
      .filter(indicator => selectedIndicators.includes(indicator.name))
      .forEach((indicator, r) => {
        const cells = [];

        header.forEach((item, c) =>
          cells.push(
            <Cell
              key={`cell-${indicator.name.split(' ').join('-')}-${item.split(' ').join('-')}`}
              className='table-cell'
              style={{
                backgroundColor: item === `Subarea ${props.highlightedSubarea}` ? 'lightgrey' : null
              }}
            >
              {c === 0 ? (
                <div className='indicator-column'>{indicator.name}</div>
              ) : (
                numeral(dataFiltered[r][item]).format(indicator.formatter.replace(/"/g, ''))
              )}
            </Cell>
          )
        );
        rows.push(<Row key={`row-${r}-${indicator.name}`}>{cells}</Row>);
      });
    return rows;
  },

  dataForExport(inputDataArray, headerArray, selectedIndicators) {
    const outputDataArray = [];
    inputDataArray
      .filter(inputData => selectedIndicators.includes(inputData.indicator))
      .forEach(inputData => {
        const dataObj = {};
        headerArray.forEach(
          header => (dataObj[header.replace('Subarea', 'Submarket')] = inputData[header])
        );
        outputDataArray.push(dataObj);
      });
    return outputDataArray;
  }
};
