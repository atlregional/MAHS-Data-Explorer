import axios from 'axios';

const APIs = () => {
  const getData = async (url) => {
    const { data } = await axios.get(url);
    console.log('req successful || data: ', data);
  };

  const aggregateBySubarea = (geo, indicator) => {
    console.log(geo, indicator);
  };

  const exportCSV = (data, params) => {
    console.log(data, params);
  };

  const exportPDF = (params) => {
    console.log(params);
  };

  const ExportImage = (divID) => {
    console.log(divID);
  };
};

export { APIs };
