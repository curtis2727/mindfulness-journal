import React, { useState } from 'react';

const CalendarView = ({ entries = [] }) => {
  const today = new Date().toISOString().slice(0, 10); 
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredEntries = Array.isArray(entries)
    ? entries.filter((entry) => entry.date === selectedDate)
    : [];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📝 My Journal</h2>
      <div style={styles.datePickerContainer}>
        <label htmlFor="datePicker" style={styles.datePickerLabel}>
          Select a Date:
        </label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      </div>
      <div style={styles.entryList}>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div key={entry.id} style={styles.entry}>
              <h3 style={styles.entryTitle}>{entry.title}</h3>
              <p style={styles.entryContent}>{entry.content}</p>
            </div>
          ))
        ) : (
          <p style={styles.noEntries}>
            No entries found for this date. Add some thoughts and reflections!
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    background: 'linear-gradient(135deg, #e3f2fd, #90caf9)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1e88e5',
  },
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  datePickerLabel: {
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '10px',
  },
  datePicker: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #90caf9',
    outline: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease',
  },
  entryList: {
    marginTop: '20px',
  },
  entry: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  entryTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1565c0',
    marginBottom: '10px',
  },
  entryContent: {
    fontSize: '1rem',
    color: '#555',
  },
  noEntries: {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#757575',
    fontStyle: 'italic',
  },
  entryHover: {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
};

export default CalendarView; 