import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../../configs/API'; // Import endpoints and authApi from API config

const MonHocList = () => {
    const [monHocs, setMonHocs] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null); // State to store user ID
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const loadMonHocs = async () => {
            setLoading(true);
            try {
                // Fetch current user details
                const currentUserResponse = await authApi().get(endpoints.currentUser);
                if (currentUserResponse.status === 200) {
                    const currentUser = currentUserResponse.data;
                    setUserId(currentUser.id); // Set the user ID from current user response

                    // Fetch subjects using user ID
                    const monHocResponse = await authApi().get(`${endpoints.monHoc}?sinhVienId=${currentUser.id}`);

                    if (monHocResponse.status === 200) {
                        const data = monHocResponse.data;
                        if (Array.isArray(data)) {
                            setMonHocs(data); // Update only if data is an array
                        } else {
                            throw new Error('Invalid data format');
                        }
                    } else {
                        throw new Error(`Server responded with status ${monHocResponse.status}`);
                    }
                } else {
                    throw new Error('Failed to fetch current user details');
                }
            } catch (error) {
                setError(error.message || 'Failed to fetch subjects');
                console.error(error); // Log error
            } finally {
                setLoading(false);
            }
        };

        loadMonHocs();
    }, []); // No dependencies, runs once on component mount

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
            <button onClick={() => navigate('/')} className="btn btn-primary">Trở Về</button>
        </div>
    );
};

export default MonHocList;
