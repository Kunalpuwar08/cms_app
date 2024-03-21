import React, {createContext, useState, useEffect} from 'react';
import {getData} from '../components/CommonStorage';
import httpService from '../utils/https';

export const UserAuthContext = createContext();

const UserAuthProvider = ({children}) => {
  const [fcm, setFcm] = useState('');
  const [userData, setUserData] = useState();
  const [empData, setEmpData] = useState();

  useEffect(() => {
    async function getStoredData() {
      const storedData = await getData('userData');
      if (storedData) {
        setUserData(storedData);

        const res = await httpService({
          method: 'get',
          url: `/getEmp/${storedData?._id}`,
        });

        setEmpData(res.data);
      }
    }
    getStoredData();
  }, []);

  return (
    <UserAuthContext.Provider value={{fcm, setFcm, userData, empData}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
