import axios from 'axios';

export const FetchLaunchPads = async () => {
  try{
    const response = await axios.get('http://localhost:8001/launchpads');
    console.log(response);
    return response.data;
  }catch(e){
    console.log(e);
  }
};
export const FetchLaunchs = async () => {
  try {
    const response = await axios.get('http://localhost:8001/launches');
    console.log(response); 
    return response.data;
  }catch(e){
    console.log(e);
  }

};
