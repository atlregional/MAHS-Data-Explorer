import axios from 'axios';

const APIs = () => {
  getData: async (url) => {
    const { data } = await axios.get(url);
    console.log('req successful || data: ', data);
  };
};

export { APIs };
