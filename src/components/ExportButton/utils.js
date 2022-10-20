import { ExportToCsv } from 'export-to-csv';
import moment from 'moment';
import download from 'downloadjs';
// import axios from 'axios';

import getData from '../../globalUtils/getData';

const exportCSV = {
  subarea: (title, filename, headers, data) => {
    const csvTitle = title || null;
    const csvFilename = filename || `download-${moment().format()}`;
    const csvHeaders = headers || null;
    const csvData = data || [];

    const csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: csvFilename,
      showTitle: csvTitle ? true : false,
      showLabels: true,
      title: csvTitle,
      useTextFile: false,
      useKeysAsHeaders: csvHeaders ? false : true
    };

    const csvExporter = new ExportToCsv(csvOptions);

    return csvData[0] ? csvExporter.generateCsv(csvData) : null;
  },
  censusTracts: async selectionObj => {
    try {
      const { geo, geoType, indicators } = selectionObj;
      const indicatorIdsStr = [...indicators].map(({ _id }) => _id).join(',');

      const baseURL = 'https://mahs-api-server.herokuapp.com';
      const url = `${baseURL}/api/tractinfo/csv-download?geo=${geo}&geoType=${geoType}&indicatorIDs=${indicatorIdsStr}`;

      const { data } = await getData(url);
      return download(data, `MAHS-Census-Tract-Data-${geo}.csv`);
    } catch (err) {
      console.log(err);
      return;
    }
  }
};

export { exportCSV };
