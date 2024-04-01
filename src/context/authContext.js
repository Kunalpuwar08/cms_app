import React, {createContext, useState, useEffect} from 'react';
import {getData} from '../components/CommonStorage';

export const UserAuthContext = createContext();

const UserAuthProvider = ({children}) => {
  const [fcm, setFcm] = useState('');
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getStoredData() {
      const storedData = await getData('userData');
      if (storedData) {
        setUserData(storedData);
      }
    }
    getStoredData();
  }, []);

  return (
    <UserAuthContext.Provider value={{fcm, setFcm, userData}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
