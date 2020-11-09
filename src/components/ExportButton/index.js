import React, { useState } from 'react';
// import API from '../../utils/API';
import { ExportToCsv } from 'export-to-csv';
// import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import moment from 'moment';
import './style.css';


const ExportButton = props => {
  const csvTitle = props.csvTitle ? props.csvTitle : null;
  const csvFilename = props.csvFilename ? props.csvFilename : `download-${moment().format()}`;
  const csvHeaders = props.csvHeaders ? props.csvHeaders : null;

  const data = props.data ? props.data : [];

  const csvOptions = 
            { 
              fieldSeparator: ',',
              quoteStrings: '"',
              decimalSeparator: '.',
              filename: csvFilename, 
              showTitle: csvTitle ? true : false,
              showLabels: true,
              title: csvTitle,
              useTextFile: false,
              useKeysAsHeaders: csvHeaders ? false : true,
              // headers: csvHeaders
            };

  const csvExporter = new ExportToCsv(csvOptions);


  return (
    <Icon
      name='download'
      onClick={data ? () =>
        csvExporter.generateCsv(data) 
        : console.log('No Data for CSV Button')}

    />
  )
};

export default ExportButton;