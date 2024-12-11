import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

const CalendarView = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data } = await axiosInstance.get('/entries'); 
        setEntries(data);
      } catch (err) {
        console.error('Error fetching entries:', err);
        setError('Failed to fetch entries.');
      }
    };

    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth');
        if (!response.data.isAuthenticated) {
          navigate('/login'); 
        } else {
          fetchEntries(); 
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        navigate('/login'); 
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
      <h2>My Journal Entries</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {entries.map(entry => (
          <li key={entry._id}>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <p>Mood: {entry.mood}</p>
            <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView; 