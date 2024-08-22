import React, { useState } from 'react';
import api from '../../configs/API'; // Import instance axios từ file api.js
import './DangKi.css'; // Nhập file CSS của bạn

function DangKi() {
    const [formData, setFormData] = useState({
        name: '',
        queQuan: '',
        gioiTinh: 'Nam',
        ngaySinh: '',
        email: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/sinhvien/dangki', formData);
            console.log(response.data);
         
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            }
        }
    };

    return (
        <div className="register-container">
            <h2>ĐĂNG KÝ TÀI KHOẢN SINH VIÊN</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="queQuan">Quê Quán:</label>
                    <input
                        type="text"
                        id="queQuan"
                        name="queQuan"
                        value={formData.queQuan}
                        onChange={handleChange}
                    />
                    {errors.queQuan && <p className="error">{errors.queQuan}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="gioiTinh">Giới Tính:</label>
                    <select
                        id="gioiTinh"
                        name="gioiTinh"
                        value={formData.gioiTinh}
                        onChange={handleChange}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nu">Nữ</option>
                    </select>
                    {errors.gioiTinh && <p className="error">{errors.gioiTinh}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="ngaySinh">Ngày Sinh:</label>
                    <input
                        type="date"
                        id="ngaySinh"
                        name="ngaySinh"
                        value={formData.ngaySinh}
                        onChange={handleChange}
                    />
                    {errors.ngaySinh && <p className="error">{errors.ngaySinh}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Tên tài khoản:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <button type="submit">Đăng Ký</button>
                </div>
            </form>

            <div className="login-link">
                <a href="/login">Đã có tài khoản? Đăng nhập...</a>
            </div>
        </div>
    );
}

export default DangKi;
