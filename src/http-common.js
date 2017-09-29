import axios from 'axios';

export const HTTP = axios.create({
  baseURL: API_URL
})