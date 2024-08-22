import React, { useEffect, useState } from 'react';
import { authApi, endpoints } from '../../configs/API'; // Ensure correct import
import { Link } from 'react-router-dom';

const SinhVienList = () => {
    const [sinhVienList, setSinhVienList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [error, setError] = useState(null); // State to store errors

    useEffect(() => {
        const fetchSinhVienList = async () => {
            try {
                const api = authApi();
                const response = await api.get(`${endpoints.sinhVienList}?page=${currentPage}&size=${pageSize}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data); // Log data to verify structure

                if (response.data) {
                    const sinhVienContent = Array.isArray(response.data.content) ? response.data.content : [];
                    
                    setSinhVienList(sinhVienContent);
                    setCurrentPage(response.data.currentPage || 1);
                    setTotalPages(response.data.totalPages || 1);
                    setPageSize(response.data.pageSize || 10);
                } else {
                    setError('No data returned from server');
                }
                
                setError(null); // Reset error on success
            } catch (error) {
                console.error("Failed to fetch data", error);

                if (error.response) {
                    if (error.response.status === 401) {
                        setError("Unauthorized access. Please log in again.");
                    } else if (error.response.status === 400) {
                        setError("Bad request. Please check the request parameters.");
                    } else {
                        setError(`An error occurred: ${error.response.data.message || error.message}`);
                    }
                } else {
                    setError("Network error or server not reachable.");
                }

                setSinhVienList([]); // Ensure sinhVienList is not undefined
            }
        };

        fetchSinhVienList();
    }, [currentPage, pageSize]);

    const handleDelete = async (id) => {
        try {
            const api = authApi();
            await api.delete(endpoints.sinhVienDelete(id), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Refresh list after deletion
            const updatedList = sinhVienList.filter(sv => sv.id !== id);
            setSinhVienList(updatedList);
        } catch (error) {
            console.error("Failed to delete", error);

            if (error.response) {
                if (error.response.status === 401) {
                    setError("Unauthorized access. Please log in again.");
                } else if (error.response.status === 400) {
                    setError("Bad request. Please check the request parameters.");
                } else {
                    setError(`An error occurred: ${error.response.data.message || error.message}`);
                }
            } else {
                setError("Network error or server not reachable.");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">DANH SÁCH SINH VIÊN</h1>
            
            {error && (
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Ngày Sinh</th>
                        <th>Giới tính</th>
                        <th>Quê quán</th>
                        <th>Khoa</th>
                        <th>Ngành Đào Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {sinhVienList.length > 0 ? (
                        sinhVienList.map(sinhVien => (
                            <tr key={sinhVien.id}>
                                <td>{sinhVien.id}</td>
                                <td>{sinhVien.name}</td>
                                <td>{sinhVien.ngaySinh}</td>
                                <td>{sinhVien.gioiTinh}</td>
                                <td>{sinhVien.queQuan}</td>
                                <td>{sinhVien.khoa ? sinhVien.khoa.name : 'N/A'}</td>
                                <td>{sinhVien.nganhDaoTao ? sinhVien.nganhDaoTao.name : 'N/A'}</td>
                                <td>
                                    <Link to={`/chitietsinhvien?id=${sinhVien.id}`} className="btn btn-primary btn-sm">Chi tiết</Link>
                                    <button onClick={() => handleDelete(sinhVien.id)} className="btn btn-danger btn-sm ml-2">Xóa</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                    )}
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="btn-group" role="group">
                <Link to="/" className="btn btn-success btn-sm">Quay về trang chủ</Link>
                <Link to="/sinhvien/form" className="btn btn-success btn-sm">Thêm</Link>
            </div>
        </div>
    );
};

export default SinhVienList;
