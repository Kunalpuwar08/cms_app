import axios from 'axios';
import { getData } from '../components/CommonStorage';

const Api_url = 'https://cmsbackend-production-d00e.up.railway.app'
// const Api_url = 'http://10.0.2.2:3000'

const client = axios.create({
  baseURL: Api_url,
});

const httpService = async options => {
  
  options.type != 'Login' &&
    (options.headers = {...options.headers, ...(await getHeader())});

  const onSuccess = response => {
    // console.debug('Request Successful!', response);
    return response;
  };

  const onError = error => {
    console.log('Request Failed:', error.config);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

const getHeader = async () => {
  const token = await getData('userToken');
  return {
    Authorization: `${token}`,
  };
};

export default httpService;