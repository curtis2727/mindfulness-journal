import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import './AddJournal.css'; 

const AddJournal = () => {
  const [formData, setFormData] = useState({ title: '', content: '', mood: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axiosInstance.post('/entries', formData);
      setSuccessMessage('Journal entry added successfully!');
      setFormData({ title: '', content: '', mood: '' }); 
    } catch (err) {
      setErrorMessage('Error adding journal entry.');
    }
  };

  return (
    <div className="add-journal-container">
      <h2>Add Your Journal Entry</h2>
      <form onSubmit={handleSubmit} className="journal-form">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="content"
          placeholder="Content"
          onChange={handleChange}
          required
          className="form-textarea"
        />
        <select name="mood" onChange={handleChange} required className="form-select">
          <option value="">Select Mood</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Calm">Calm</option>
          <option value="Neutral">Neutral</option>
        </select>
        <button type="submit" className="form-button">Add Journal Entry</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddJournal; 