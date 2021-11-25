import { API_URL } from '../constants';
import axios from 'axios';

export const baseApi = axios.create({
    baseURL: API_URL
});