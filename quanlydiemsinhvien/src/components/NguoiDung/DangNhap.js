import React, { useState, useContext } from 'react';
import { authApi, endpoints } from '../../configs/API';
import { useNavigate } from 'react-router-dom'; 
import { MyDispatchContext } from '../../App'; 
import './DangNhap.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ROLE_SINHVIEN'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useContext(MyDispatchContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the username, password, and userRole to the login endpoint
      const authResponse = await authApi().post(endpoints.dangNhap, {
        username,
        password,
        userRole: role
      });

      const { token, userRole } = authResponse.data;

      // Store the token in local storage
      localStorage.setItem('access_token', token);

      // Fetch current user details using the token
      const userResponse = await authApi().get(endpoints.currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const currentUser = userResponse.data;
      console.log('Current User Data:', currentUser); // Log the current user data

      // Dispatch user login information
      dispatch({ type: 'login', payload: { name: username, userRole: userRole || role } }); 
      setError('');
      navigate('/'); // Navigate to the homepage or dashboard
    } catch (error) {
      // Handle error properly
      console.error('Login error:', error);
      setError('Invalid username, password, or role'); // Consider different messages for different errors
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>ĐĂNG NHẬP NGƯỜI DÙNG</h3>
        <div className="form-group">
          <label>Tên người dùng:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Chọn vai trò:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="ROLE_SINHVIEN">Sinh viên</option>
            <option value="ROLE_GIANGVIEN">Giảng viên</option>
            <option value="ROLE_GIAOVU">Giáo vụ</option>
          </select>
        </div>
        <div>
          <button type="submit" className="login-button">Đăng nhập</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;
