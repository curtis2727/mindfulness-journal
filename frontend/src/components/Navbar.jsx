import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="nav-title">Mindfulness Journal</h1>
      <div className="navbox">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/add-journal">Add Journal</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
        <Link className="nav-link" to="/moodgame">Mood Game</Link>
        <button className="nav-link" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;