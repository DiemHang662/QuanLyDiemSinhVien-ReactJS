import axios from 'axios';

const BASE_URL = 'http://localhost:8080/QuanLyDiemSinhVien/api';

export const endpoints = {
    dangNhap: '/auth/login',
    currentUser: '/auth/currentUser',
    monHoc: '/monhoc/list'
};

export const authApi = () => {
    const token = localStorage.getItem('access_token');
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
