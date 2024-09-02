import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TrangChu from './components/TrangChu/TrangChu';
import DangNhap from './components/NguoiDung/DangNhap';
import MonHocList from './components/MonHoc/MonHocList';
import DiemTB from './components/Diem/DiemTB';
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';
import { MyUserContext } from './configs/Contexts';
import './App.css';

function App() {
  const user = useContext(MyUserContext);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/login" element={<DangNhap />} />
          <Route path="/monhoc" element={user ? <MonHocList /> : <Navigate to="/login" />} />
          <Route path="/diemTB" element={user ? <DiemTB /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
