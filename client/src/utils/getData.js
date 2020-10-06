import axios from 'axios';

const getData = async url => await axios.get(url);

export default getData;
