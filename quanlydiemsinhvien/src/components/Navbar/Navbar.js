import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MyDispatchContext, MyUserContext } from '../../App'; // Adjusted path
import './Navbar.css'; // Ensure this file exists and contains necessary styles

const NavbarComponent = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove token from localStorage
    dispatch({ type: 'logout' }); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar className="navbar-custom navbar-expand-lg bg-primary">
      <Container fluid>
        <Navbar.Brand className="title" as={Link} to="/">QUẢN LÝ ĐIỂM SINH VIÊN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
            {/* <Nav.Link as={Link} to="/sinhvien">Sinh viên</Nav.Link>
            <Nav.Link as={Link} to="/lophoc">Lớp học</Nav.Link> */}
            <Nav.Link as={Link} to="/monhoc">Môn học</Nav.Link>
            <NavDropdown title="Điểm" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/diemGK-CK">Xem điểm giữa kỳ</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/diemGK-CK">Xem điểm cuối kỳ</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/diemTB">Xem điểm trung bình</NavDropdown.Item>
            </NavDropdown>
            {user ? (
              <>
                <Nav.Link as={Button} variant="link" onClick={handleLogout}>Đăng xuất</Nav.Link>
                <span className="navbar-text text-white ms-2"style={{ fontWeight: 'bold' }}>Xin chào, {user.name}</span>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
