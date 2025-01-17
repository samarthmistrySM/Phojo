import axios from "axios";
import secrets from "../secrets";

const API_URL = secrets.API_URL;

export const Login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const Register = async (fullname, username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      fullname,
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("Error registering:", error.response?.data || error.message);
    throw error;
  }
};
