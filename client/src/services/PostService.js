import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import secrets from '../secrets';

const API_URL = secrets.API_URL;

export const deletePost = async postId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/posts/delete/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error Deleting Post:', error.response?.data || error.message);
    throw error;
  }
};

export const likeDisLikePost = async postId => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/posts/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error Liking Post:', error.response?.data || error.message);
    throw error;
  }
};

export const postComment = async (postId, comment) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/posts/comment`,{
        postId,
        comment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log('Error posting comment:', error.response?.data || error.message);
    throw error;
  }
}