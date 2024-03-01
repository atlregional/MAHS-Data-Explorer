import { generateCsv, download } from 'export-to-csv';
import moment from 'moment';

// Takes in API url and returns a blob and filename
const getCsvBlob = async url => {
  const response = await fetch(url); // fetch is working better with blob and getting headers for the filename
  const filename = response.headers.get('Content-Disposition')
    ? response.headers.get('Content-Disposition').split('filename="')[1].replace('"', '')
    : 'MAHS-Census-Tract-Data.csv';

  // set blob mime-type explicitly
  return {
    blob: new Blob([await response.blob()], { type: 'application/csv' }),
    filename
  };
};

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

    // console.log(csvData);

    if (csvData[0] ){
      const csv = generateCsv(csvOptions)(csvData);
      download(csvOptions)(csv);
    }

    return; 
  },
  censusTracts: async selectionObj => {
    try {
      const { geo, geoType, indicators } = selectionObj;
      const indicatorIdsStr = [...indicators].map(({ _id }) => _id).join(',');

      const baseURL = 'https://mahs-api-server.herokuapp.com';
      // 'http://localhost:3001' 
      // 'https://mahs-api-server.herokuapp.com';

      const url = `${baseURL}/api/tractinfo/csv-download?geo=${geo}&geoType=${geoType}&indicatorIDs=${indicatorIdsStr}`;

      // This blob method prevents unexpected results in Safari
      const { blob, filename } = await getCsvBlob(url);

      // handles older versions of MS Edge and IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
      } else {
        const objUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = objUrl;
        link.download = filename;
        link.click();
      }
    } catch (err) {
      console.log(err.message);
      return;
    }
  }
};

export { exportCSV };
