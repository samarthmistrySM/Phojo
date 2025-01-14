import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import secrets from "../secrets";

const API_URL = secrets.API_URL;

export const getAllPosts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/posts`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.posts;
        
    } catch (error) {
        console.error("Error Getting Posts:", error.response?.data || error.message);
        throw error;
    }
}