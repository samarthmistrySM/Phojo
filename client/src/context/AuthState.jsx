import React, {useState, useEffect, useCallback} from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import secrets from '../secrets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthState = props => {
  const API_URL = secrets.API_URL;
  const [loggedUser, setLoggedUser] = useState({});
  const [reload, setReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token && token !== '') {
          const userId = jwtDecode(token).id;
          const response = await axios.get(`${API_URL}/users/user/${userId}`);
          setLoggedUser(response.data.user);
          console.log(loggedUser);
          
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoggedIn(false);
      }
    };

    getUser();
  }, [reload]);

  const update = () => {
    setReload(!reload);
  };

  const isAuthenticated = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token && token !== '') {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.exp) {
          return decoded.exp > Date.now() / 1000;
        } else {
          console.error('Token does not contain exp field');
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    return false;
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await AsyncStorage.removeItem('token');
      setLoggedUser({});
      setIsLoggedIn(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await isAuthenticated();
      if (!isLoggedIn) {
        setLoggedUser({});
      }
    };
    checkAuth();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        loggedUser,
        isLoggedIn,
        update,
        reload,
        isAuthenticated,
        handleLogout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
