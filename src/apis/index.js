import {getData} from '../components/CommonStorage';
import httpService from '../utils/https';

export const getEmployeeDetails = async () => {
  const storedData = await getData('userData');
  const res = httpService({
    method: 'get',
    url: `/getEmp/${storedData._id}`,
  });
  return res;
};

export const applyEmpLeave = async data => {
  const res = await httpService({
    method: 'post',
    url: '/applyleave',
    data: data,
  });
  return res;
};

export const listLeaves = async () => {
  const res = await httpService({
    method: 'get',
    url: '/listleaves',
  });
  return res;
};

export const emplistLeaves = async () => {
  const res = await httpService({
    method: 'get',
    url: '/emplistleave',
  });
  return res;
};


export const updateLeaveRequest = async (item, action) => {
  const leaveId = item?._id;
  await httpService({
    method: 'post',
    url: `/updateleave/${leaveId}`,
    data: {status: action, fcmToken: item?.employeeFcm},
  });
};


export const listNotifications = async () => {
  const res = await httpService({
    method: 'get',
    url: '/notifications',
  });
  return res;
};
