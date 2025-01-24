import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import secrets from '../secrets';

const API_URL = secrets.API_URL;

export const getChat = async prompt => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/chat`,
      {prompt},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log('Error Getting chat:', error.response?.data || error.message);
    throw error;
  }
};
