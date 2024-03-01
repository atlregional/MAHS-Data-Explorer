import React from 'react';
import { Row, Cell } from 'react-sticky-table';
import ExportButton from '../ExportButton/index.jsx';
import moment from 'moment';
import numeral from 'numeral';
import util from './util.js';




const Rows = (props) => {
  const { 
    indicatorInfo,
    selectedIndicators,
    data,
    header
  } = props;
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
          data={util.dataForExport(data, headerArray, selectedIndicators)}
          //
          csvTitle={`TITLE: MAHS Submarket Summary ${props.selectedGeo} \n SOURCE: MAHS DATA EXPLORER - https://data.metroatlhousing.org/ \n\n`}
          
          csvFilename={`MAHS-Submarket-Summary-${props.selectedGeo
            .split(' ')
            .join('-')}-${moment().format('M/DD/YYYY')}`}
          content={'Download Data'}
          selection={props.selection}
          mobile={props.mobile}
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
};

export default Rows;