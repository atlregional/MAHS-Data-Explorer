import getData from './getData';
import aggregate from './aggregate';
import exportCSV from './exportCSV';
import exportPDF from './exportPDF';
import exportImage from './exportImage';
import filterBySelection from './filterBySelection';

const globalUtils = {
  getData: (url, server) => getData(url, server),
  aggregate: (data, indicatorInfo, aggregator) => aggregate(data, indicatorInfo, aggregator),
  exportCSV: (data, params) => exportCSV(data, params),
  exportPDF: params => exportPDF(params),
  exportImage: divID => exportImage(divID),
  filterBySelection: (tract, selection) => filterBySelection(tract, selection)
};

export default globalUtils;
