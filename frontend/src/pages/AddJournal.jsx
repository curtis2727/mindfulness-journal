import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './AddJournal.css'; 

const AddJournal = () => {
  const [formData, setFormData] = useState({ 
    title: '', 
    content: '', 
    mood: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.title.trim() || !formData.content.trim() || !formData.mood) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await axiosInstance.post('/entries', formData);
      if (response.data) {
        setSuccessMessage('Journal entry added successfully!');
        setFormData({ title: '', content: '', mood: '' });
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (err) {
      console.error('Error saving entry:', err);
      setErrorMessage(err.response?.data?.message || 'Error adding journal entry.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="add-journal-container">
      <button className="close-button" onClick={handleClose}>×</button>
      
      <div className="journal-header">
        <h1>Create New Journal Entry</h1>
        <p>Express your thoughts and feelings...</p>
      </div>

      <form onSubmit={handleSubmit} className="journal-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Give your entry a title..."
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mood">How are you feeling?</label>
          <select 
            id="mood"
            name="mood" 
            value={formData.mood}
            onChange={handleChange}
            required 
            className="form-select"
          >
            <option value="">Select Mood</option>
            <option value="Happy">😊 Happy</option>
            <option value="Sad">😢 Sad</option>
            <option value="Neutral">😐 Neutral</option>
            <option value="Excited">🎉 Excited</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Thoughts</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your thoughts here..."
            required
            className="form-textarea"
            rows="6"
          />
        </div>

        <button type="submit" className="submit-button">
          Save Entry
        </button>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default AddJournal; 
