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
