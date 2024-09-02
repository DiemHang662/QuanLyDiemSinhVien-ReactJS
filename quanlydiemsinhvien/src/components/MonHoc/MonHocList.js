import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../../configs/API';
import { MyDispatchContext, MyUserContext } from '../../configs/Contexts';

const MonHocList = () => {
  const [monHocs, setMonHocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useContext(MyUserContext);  // Get user from context
  const dispatch = useContext(MyDispatchContext);  // Get dispatch from context

  useEffect(() => {
    // Retrieve user ID from context or localStorage
    const userId = user.id || localStorage.getItem('user_id');
    console.log('User ID:', userId); // Debugging line

    if (!userId) {
      console.error('User ID is not available');
      setError('User ID is not available');
      setLoading(false);
      return;
    }

    const loadMonHocs = async () => {
      setLoading(true);
      try {
        // Update the endpoint to include the user ID
        const endpoint = endpoints.monHoc(userId);
        const response = await authApi().get(endpoint);
        if (response.status === 200) {
          const data = response.data;
          if (Array.isArray(data)) {
            setMonHocs(data);
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error(`Server responded with status ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMonHocs();
  }, [user]); // Depend on user to reload when user context changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
