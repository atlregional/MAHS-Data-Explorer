import axios from 'axios';

const getData = async (url, server) => {
  const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://mahs-api-server.herokuapp.com'
    : 'http://localhost:3001';

  console.log(baseURL);

  const reqURL = server === 'mahs' ? `${baseURL}${url}` : url;

  return axios.get(reqURL);
};

export default getData;
