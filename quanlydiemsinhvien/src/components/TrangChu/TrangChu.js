import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar'; 
import "./TrangChu.css";

const TrangChu = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <div className="container-home">

      <div>
        <h1 className="h1">GIỚI THIỆU</h1>
       </div>
    </div>
    </>
  );
};

export default TrangChu;
