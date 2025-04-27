import axios from 'axios';
import { Horse } from '../api/horses';
import { getToken } from '../utils/auth';

const API_URL = 'https://noonacademy_anCOzle.jeyad360.com/organization/v1/d/horses';
export const HorseService = {
  async listHorses(): Promise<any[]> {
    const token = getToken();
    const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data.data.data ;
  },
  async getHorseById(id: number): Promise<Horse> {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.horse;
  },
};
