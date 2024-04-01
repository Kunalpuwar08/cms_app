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

export const updateLeaveRequest = async data => {
  const item = data.item;
  const leaveId = item?._id;
  await httpService({
    method: 'post',
    url: `/updateleave/${leaveId}`,
    data: {status: data.action, fcmToken: item?.employeeFcm},
  });
};

export const createProjectCall = async data => {
  await httpService({
    method: 'post',
    url: `/project/create`,
    data: data,
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const listNotifications = async () => {
  const res = await httpService({
    method: 'get',
    url: '/notifications',
  });
  return res;
};

export const listEmpName = async () => {
  const res = await httpService({
    method: 'get',
    url: '/getEmp',
  });
  return res;
};

export const listAssetAdmin = async () => {
  const res = await httpService({
    method: 'get',
    url: '/asset/listAsset',
  });
  return res;
};

export const listAssetEmployee = async () => {
  const res = await httpService({
    method: 'get',
    url: '/asset/get-asset',
  });
  return res;
};

export const assignAssetTo = async data => {
  await httpService({
    method: 'post',
    url: `/asset/assign`,
    data: data,
  });
};

export const employeeData = async id => {
  const res = await httpService({
    method: 'get',
    url: `/getEmp/${id}`,
  });
  return res;
};

export const logoutCall = async data => {
  await httpService({
    method: 'post',
    url: `/logout`,
    data: data,
  });
};

export const createTimesheet = async data => {
  await httpService({
    method: 'post',
    url: `/timesheet/create`,
    data: data,
  });
};

export const createEmpCall = async data => {
  await httpService({
    method: 'post',
    url: `/createemp`,
    data: data,
  });
};

export const changePassCall = async data => {
  await httpService({
    method: 'post',
    url: `/change-password`,
    data: data,
  });
};

export const projectListEmpCall = async () => {
  const res = await httpService({
    method: 'get',
    url: `/project/list`,
  });
  return res;
};

export const listProjectEmpCall = async () => {
  const res = await httpService({
    method: 'get',
    url: `/project/listProject`,
  });
  return res;
};

export const projectListAdminCall = async () => {
  const res = await httpService({
    method: 'get',
    url: `/project/admin-list`,
  });
  return res;
};

export const timesheetListCall = async () => {
  const res = await httpService({
    method: 'get',
    url: `/timesheet/list`,
  });
  return res;
};

export const dashboardCall = async () => {
  const res = await httpService({
    method: 'get',
    url: `/dashboard`,
  });
  return res;
};
