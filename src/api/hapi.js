import axios from 'axios';

export const FetchLaunchPads = async (term) => {
  const response = await axios.get('http://localhost:8001/launchpads');
  console.log(response);
  return response.data;
};
export const FetchLaunchs = async (term) => {
  const response = await axios.get('http://localhost:8001/launches');
  console.log(response); 
  return response.data;
};
