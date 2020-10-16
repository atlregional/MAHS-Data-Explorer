
import getData from './getData';
import aggregate from './aggregate';
import exportCSV from './exportCSV';
import exportPDF from './exportPDF';
import exportImage from './exportImage';

const utils = {
  getData: (url) => getData(url),
  aggregate: (data, indicatorInfo, aggregator) => aggregate(data, indicatorInfo, aggregator),
  exportCSV: (data, params) => exportCSV(data, params),
  exportPDF: (params) => exportPDF(params),
  exportImage: (divID) => exportImage(divID),
};

export default utils;
