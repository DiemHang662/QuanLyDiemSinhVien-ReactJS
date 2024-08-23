import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TrangChu from './components/TrangChu/TrangChu';
import DangNhap from './components/NguoiDung/DangNhap';
import MonHoc from './components/MonHoc/MonHoc';
import DiemTB from './components/Diem/DiemTB';
import Navbar from './components/Navbar/Navbar';
import './App.css';

export const MyUserContext = createContext(null);
export const MyDispatchContext = createContext(null);

const initialState = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    case 'logout':
      return { ...state, user: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Current user:', state.user);

  return (
    <MyUserContext.Provider value={state.user}>
      <MyDispatchContext.Provider value={dispatch}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<TrangChu />} />
              <Route path="/login" element={<DangNhap />} />
              <Route path="/monhoc" element={state.user ? <MonHoc /> : <Navigate to="/login" />} />
              <Route path="/diemTB" element={state.user ? <DiemTB /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
