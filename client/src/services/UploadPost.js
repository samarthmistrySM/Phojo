import axios from 'axios';
import secrets from '../secrets';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = secrets.API_URL;

export const createPost = async (image, caption, userId) => {
  const token =  await AsyncStorage.getItem('token');
  try {
    const response = await axios.post(
        `${API_URL}/posts`,
        {
          image,
          caption,
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};
