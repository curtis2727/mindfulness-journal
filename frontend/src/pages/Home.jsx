import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import MoodChart from '../components/MoodChart';
import CalendarView from '../components/CalendarView';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [entries, setEntries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);
        
        if (response.data.isAuthenticated) {
          const { data } = await axiosInstance.get('/entries');
          setEntries(data);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="welcome-container">
        <h1>Welcome to Whispers of the Mind</h1>
        <p>Your personal space for mindfulness and reflection</p>
        <div className="auth-prompt">
          <p>Please log in to view your journal entries</p>
          <button onClick={handleLoginClick} className="login-button">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <MoodChart data={entries} />
      <CalendarView entries={entries} />
    </div>
  );
};

export default Home;