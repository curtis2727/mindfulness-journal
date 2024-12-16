import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import './CalendarView.css';

const CalendarView = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data } = await axiosInstance.get('/entries');
      setEntries(data);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError('Failed to fetch entries');
      
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this journal entry?');
    
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/entries/${entryId}`);
        // Update the entries state by filtering out the deleted entry
        setEntries(prevEntries => prevEntries.filter(entry => entry._id !== entryId));
      } catch (err) {
        console.error('Error deleting entry:', err);
        setError('Failed to delete entry');
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    }
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      'Happy': '😊',
      'Sad': '😢',
      'Neutral': '😐',
      'Excited': '🎉'
    };
    return moodEmojis[mood] || '😶';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!entries || entries.length === 0) {
    return (
      <div className="calendar-view">
        <h2 className="calendar-title">My Journal Journey</h2>
        <p className="no-entries">No journal entries yet. Start writing your journey!</p>
      </div>
    );
  }

  return (
    <div className="calendar-view">
      <h2 className="calendar-title">My Journal Journey</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-header">
              <span className="entry-mood">{getMoodEmoji(entry.mood)}</span>
              <span className="entry-date">{formatDate(entry.date)}</span>
            </div>
            <h3 className="entry-title">{entry.title}</h3>
            <div className="entry-content-wrapper">
              <p className="entry-content">{entry.content}</p>
            </div>
            <div className="entry-footer">
              <button 
                onClick={() => handleDeleteEntry(entry._id)}
                className="delete-entry-btn"
              >
                Delete Entry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView; 