import axios from 'axios';
import getData from './getData';
import aggregateBySubarea from './aggregateBySubarea';
import exportCSV from './exportCSV';
import exportPDF from './exportPDF';
import exportImage from './exportImage';


const APIs = () => {
  getData: (url) => getData(url);
  aggregateBySubarea: (geo, indicator) => aggregateBySubarea(geo, indicator);
  exportCSV: (data, params) => exportCSV(data, params);
  exportPDF: (params) => exportPDF(params);
  exportImage: (divID) => exportImage(divID);
};

export { APIs };