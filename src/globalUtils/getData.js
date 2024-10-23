import axios from 'axios';

const getData = async (url, server) => {
  const baseURL =  'https://mahs-api-dev-cf279de7185e.herokuapp.com';
  // 'http://localhost:3001'; 
  // 'https://mahs-api-server.herokuapp.com';

  const reqURL = server === 'mahs' ? `${baseURL}${url}` : url;

  return axios.get(reqURL);
};

export default getData;
