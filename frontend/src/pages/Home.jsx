import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import MoodChart from '../components/MoodChart';
import CalendarView from '../components/CalendarView';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
  
        const { data } = await axiosInstance.get('/entries');
        setEntries(data);
      } catch (err) {
        console.error('Error fetching entries:', err);

        if (err.response) {
          
          if (err.response.status === 401) {
            setError('Unauthorized access. Please log in to view your entries.');
          } else {
            setError(`Failed to fetch entries: ${err.response.statusText}`);
          }
        } else if (err.request) {
          
          setError('Server is not responding. Please check if the backend is running.');
        } else {
        
          setError(`Error: ${err.message}`);
        }
      }
    };

    fetchEntries();
  }, []);

  const moods = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodData = ['Happy', 'Sad', 'Neutral', 'Excited'].map(
    (mood) => moods[mood] || 0
  );

  return (
    <div className="home">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MoodChart data={moodData} />
      <CalendarView entries={entries} />
    </div>
  );
};

export default Home;