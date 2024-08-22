import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { MyDispatchContext, MyUserContext } from '../../App'; // Adjusted path
import { authApi, endpoints } from '../../configs/API';
import './DangNhap.css';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await authApi().post(endpoints.dangNhap, {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { token } = response.data;
      localStorage.setItem('access_token', token); // Store token in localStorage

      // Fetch the current user details
      const authenticatedApi = authApi(); // Create an authenticated API instance
      const userResponse = await authenticatedApi.get(endpoints.currentUser);

      dispatch({ type: 'login', payload: userResponse.data });

      // Redirect to home page after successful login
      navigate('/'); // Use navigate for redirection
    } catch (error) {
      console.error('Login failed:', error);
      setError('Tên tài khoản hoặc mật khẩu không đúng!');
    }
  };

  if (user !== null) {
    // If the user is already logged in, redirect to home page
    navigate('/'); // Redirect to home page if user is logged in
    return null;
  }

  return (
    <div className="body-login">
      <div className="login-container">
        <h2 className="text-center text-info">ĐĂNG NHẬP</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Tên tài khoản</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên tài khoản..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button type="submit" variant="success">Đăng nhập</Button>
          </Form.Group>
          <div className="mb-4">
            <a href="#" onClick={() => navigate('/dangki')}>Chưa có tài khoản? Đăng ký...</a>
          </div>
          {error && <p className="error">{error}</p>}
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;
