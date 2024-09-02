import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:8080/QuanLyDiemSinhVien/api';

// API endpoints
export const endpoints = {
    dangNhap: '/auth/login',  // Endpoint for login
    currentUser: '/auth/currentUser',  // Endpoint for fetching current user
    monHoc: (id) => `/monhoc/list?sinhVienId=${id}`,  // Endpoint for fetching subjects
};

// Create an axios instance with authorization header
export const authApi = () => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('access_token');
    
    // Debugging statement to ensure token is retrieved
    console.log('Token retrieved:', token);

    // If no token is found, log a warning
    if (!token) {
        console.warn('No access token found in localStorage');
    }

    // Create and return an axios instance with the token and content-type header
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
            'Content-Type': 'application/json',  // Set content type to JSON
        },
    });
};

// Default axios instance without authorization
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',  // Set content type to JSON
    },
});
