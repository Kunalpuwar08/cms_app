import {getData} from '../components/CommonStorage';
import {Api_url} from '../constant';
import httpService from '../utils/https';

export const getEmployeeDetails = async () => {
  const storedData = await getData('userData');
  const res = httpService({
    method: 'get',
    url: `/getEmp/${storedData._id}`,
  });
  return res;
};
