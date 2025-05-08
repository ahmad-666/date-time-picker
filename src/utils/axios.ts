import axios from 'axios';
import envs from '@/utils/envs';

export const landingAxios = axios.create({ baseURL: '' });

landingAxios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
landingAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
