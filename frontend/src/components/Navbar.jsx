import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-title">Mindfulness Journal</h1>
      <div className="navbox">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
        <Link className="nav-link" to="/moodgame">Mood Game</Link>
      </div>
    </nav>
  );
};

export default Navbar;