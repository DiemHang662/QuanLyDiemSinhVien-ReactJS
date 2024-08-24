import React, { useState } from 'react';
import axios from 'axios';

const AverageScore = () => {
    const [sinhVienId, setSinhVienId] = useState('');
    const [monHocId, setMonHocId] = useState('');
    const [lopHocId, setLopHocId] = useState('');
    const [averageScore, setAverageScore] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous results and errors
        setAverageScore(null);
        setError('');

        try {
            // Replace with your API URL and JWT token
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjQ1MjA2OTQsInVzZXJuYW1lIjoic3YxIn0.engzbsIpqVUne-4fIN-cNhvvCeXLDz1Fi6-AwDpRzpk';

            // Make the API request
            const response = await axios.get(`http://localhost:8080/QuanLyDiemSinhVien/api/diem/average-score-bySV`, {
                params: {
                    sinhVienId: sinhVienId,
                    monHocId: monHocId,
                    lopHocId: lopHocId,
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // Update state with the response data
            setAverageScore(response.data);
        } catch (err) {
            // Handle any errors
            setError('Failed to fetch average score. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Điểm Trung Bình</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sinhVienId">Sinh Viên ID:</label>
                    <input
                        type="number"
                        id="sinhVienId"
                        name="sinhVienId"
                        value={sinhVienId}
                        onChange={(e) => setSinhVienId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="monHocId">Môn Học ID:</label>
                    <input
                        type="number"
                        id="monHocId"
                        name="monHocId"
                        value={monHocId}
                        onChange={(e) => setMonHocId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lopHocId">Lớp Học ID:</label>
                    <input
                        type="number"
                        id="lopHocId"
                        name="lopHocId"
                        value={lopHocId}
                        onChange={(e) => setLopHocId(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Tính Điểm Trung Bình</button>
            </form>

            {averageScore !== null && (
                <div className="mt-4">
                    <h2>Kết Quả:</h2>
                    <p>Điểm Trung Bình: {averageScore}</p>
                </div>
            )}

            {error && (
                <div className="mt-4 alert alert-danger">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default AverageScore;
