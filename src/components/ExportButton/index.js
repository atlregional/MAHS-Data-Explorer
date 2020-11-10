import React, { useState } from 'react';
// import API from '../../utils/API';
import { ExportToCsv } from 'export-to-csv';
// import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import moment from 'moment';
import './style.css';

const ExportButton = props => {
  const csvTitle = props.csvTitle ? props.csvTitle : {};
  const csvFilename = props.csvFilename
    ? props.csvFilename
    : `download-${moment().format()}`;
  const csvHeaders = props.csvHeaders ? props.csvHeaders : {};

  const data = props.data ? props.data : [{}];

  const csvOptions = {
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

  const csvExporter = data ? new ExportToCsv(csvOptions) : null;

  return (
    <Icon
      name='download'
      onClick={() =>
        data.length > 0 ? 
          csvExporter.generateCsv(data) 
        : console.log('No Data for CSV Button')}

    />
  );
};

export default ExportButton;
