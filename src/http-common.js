import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://95.85.8.80:8080/'
})