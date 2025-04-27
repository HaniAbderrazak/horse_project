import axios from 'axios';
import {setToken} from '../utils/auth';
const API_URL = 'https://noonacademy_anCOzle.jeyad360.com/organization/v1/d';

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const token = response.data.data.token;
    setToken(token);

    return { token };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};