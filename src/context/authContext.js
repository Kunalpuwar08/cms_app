import React, {createContext, useState, useEffect} from 'react';
import httpService from '../utils/https';
import {getData} from '../components/CommonStorage';

export const UserAuthContext = createContext();

const UserAuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getData('userToken');
        setToken(token);

        const sdata = await getData('userData');
        const getID = sdata?._id;

        const responce = await httpService({
          method: 'get',
          url: `/getEmp/${getID}`,
        });

        console.log(responce?.data,"responce?.data>>>>>>>>>>>");

        setUserData(responce?.data);
      } catch (error) {
        console.log(error, 'error context');
      }
    }
    fetchData();
  }, []);

  return (
    <UserAuthContext.Provider value={{token, userData}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
