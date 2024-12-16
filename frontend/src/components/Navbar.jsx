import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar-wrapper">
      <h1 style={{ 
        textAlign: 'center', 
        margin: '1rem 0', 
        color: 'purple', 
        fontFamily: 'Dancing Script, cursive' 
      }}>Whispers Of the Mind</h1>
      <nav className="navbar-container">
        <div className="navbar-minimal">
          <div className="navbar-buttons">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/add-journal">Add Journal</Link>
            <Link className="nav-link" to="/moodgame">Mood Game</Link>
            <Link className="nav-link" to="/calendar">View Journal</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;