import axios from 'axios';


export const fetchQuestion = async () => {
  const response = await axios.get('https://opentdb.com/api.php?amount=1');
  return response.data.results[0];
};
