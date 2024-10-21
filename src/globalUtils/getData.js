import axios from 'axios';

const getData = async (url, server) => {
  const baseURL =  'http://localhost:3001';
  // 'http://localhost:3001'; 
  // 'https://mahs-api-server.herokuapp.com';

  const reqURL = server === 'mahs' ? `${baseURL}${url}` : url;

  return axios.get(reqURL);
};

export default getData;
