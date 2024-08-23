import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const MonHocList = () => {
    const [monHocs, setMonHocs] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const loadMonHocs = async () => {
            setLoading(true);
            try {
                // Hardcoded user ID and token for testing purposes
                const userId = '1'; // Replace with the hardcoded user ID
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjQ1MjA2OTQsInVzZXJuYW1lIjoic3YxIn0.engzbsIpqVUne-4fIN-cNhvvCeXLDz1Fi6-AwDpRzpk';

                const response = await fetch(`http://localhost:8080/QuanLyDiemSinhVien/api/monhoc/list?sinhVienId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token directly in the request header
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setMonHocs(data); // Update only if data is an array
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch subjects');
                console.error(error); // Log error
            } finally {
                setLoading(false);
            }
        };

        loadMonHocs();
    }, []); // No dependency on `user`, as ID and token are hardcoded

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5">
            <h1>DANH SÁCH MÔN HỌC</h1>
            <div className="row">
                {monHocs.length > 0 ? (
                    monHocs.map(monHoc => (
                        <div className="col-md-4 mb-3" key={monHoc.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{monHoc.name}</h5>
                                    <a href="/dssv" className="btn btn-info">Diễn đàn</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No subjects found.</p>
                )}
            </div>
            <button onClick={() => navigate('/dssv')} className="btn btn-primary">Trở Về</button>
        </div>
    );
};

export default MonHocList;
