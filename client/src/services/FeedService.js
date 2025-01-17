import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import secrets from "../secrets";

const API_URL = secrets.API_URL;

export const getAllPosts = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}/posts`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data.posts;
        
    } catch (error) {
        console.log("Error Getting Posts:", error.response?.data || error.message);
        throw error;
    }
}