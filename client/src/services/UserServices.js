import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import secrets from '../secrets';

const API_URL = secrets.API_URL;

export const updateUser = async (username, fullname, image) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/users/update`,
      {
        username,
        fullname,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(
        'Error Updating User:',
        error.response?.data || error.message,
      );
      throw error;
  }
};

export const searchUser = async (query) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/search/user?query=${query}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.log('Error Getting Users',
      error.response?.data || error.message,
    );
    throw error;
  }
}

export const getUser = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;
  } catch (error) {
    console.log('Error Getting User',
      error.response?.data || error.message,
    );
    throw error;
  }
}

export const followUser = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(`${API_URL}/users/follow/${userId}`,
      {}, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data;
  } catch (error) {
    console.log('Error Following User',
      error.response?.data || error.message,
    );
    throw error;
  }
}