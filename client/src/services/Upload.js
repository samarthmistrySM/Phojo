import axios from 'axios';
import secrets from '../secrets';
import FormData from 'form-data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = secrets.API_URL;
const UploadPreset = secrets.CloudinaryUploadPreset;
const CloudName = secrets.CloudinaryCloudName;
const CloudinaryApi = secrets.CloudinaryApiUrl;

export const uploadImageToCloudinary = async imageUri => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  formData.append('upload_preset', UploadPreset);
  formData.append('cloud_name', CloudName);

  try {
    const response = await axios.post(CloudinaryApi,formData);

    return response.data.secure_url;
  } catch (error) {
    console.log('Image upload failed:', error);
    return error;
  }
};

export const createPost = async (image, caption, userId) => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.post(
      `${API_URL}/posts`,
      {
        image,
        caption,
        userId,
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
      'Error Uploading Post:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
