import React, { useState, useContext } from 'react';
import { authApi, endpoints } from '../../configs/API';
import { useNavigate } from 'react-router-dom'; 
import { MyDispatchContext } from '../../App'; 
import './DangNhap.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const dispatch = useContext(MyDispatchContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authResponse = await authApi().post(endpoints.dangNhap, {
        username,
        password
      });
  
      const { token } = authResponse.data;
      localStorage.setItem('access_token', token);
  
      const userResponse = await authApi().get(endpoints.currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const currentUser = userResponse.data;
      console.log('Current User Data:', currentUser); // Log the current user data
  
      const { userRole } = currentUser;
      dispatch({ type: 'login', payload: { name: username, userRole } }); 
      setError('');
      navigate('/'); 
    } catch (error) {
      setError('Invalid username or password');
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
        <div>
          <button type="submit" className="login-button">Đăng nhập</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;
