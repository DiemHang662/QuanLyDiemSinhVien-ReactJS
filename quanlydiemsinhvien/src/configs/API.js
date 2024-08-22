import axios from 'axios';

const BASE_URL = 'http://localhost:8080/QuanLyDiemSinhVien/api';

export const endpoints = {
    dangNhap: '/auth/login',
    dangKi: '/sinhvien/dangki',
    currentUser: '/auth/current-user', // Thêm endpoint cho thông tin người dùng hiện tại
    sinhVienList: '/sinhvien/list',
    sinhVienDetail: (id) => `/sinhvien/chitiet/${id}`,
    sinhVienSaveOrUpdate: '/sinhvien/saveOrUpdate',
    sinhVienDelete: (id) => `/sinhvien/${id}`,
    sinhVienRegister: '/sinhvien/dangki',
    formOptions: '/sinhvien/form',
};

export const authApi = () => {
    const token = localStorage.getItem('access_token');
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
};

// Instance API mặc định
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});
