import axios from 'axios';
import axiosApi from '../Util';


export const getList = () => {
    return axiosApi.get('/faqs');
}

export const getQueryFaqList = (key, value) => { 
    return axiosApi.get(`/faqs?${key}=${value}`);
}