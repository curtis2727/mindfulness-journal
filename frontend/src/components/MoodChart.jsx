import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axiosInstance from '../utils/axiosConfig';
import './MoodChart.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const MoodChart = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const response = await axiosInstance.get('/entries');
      if (response.data) {
        setMoodData(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching mood data:', err);
      setError('Failed to fetch mood data');
      setLoading(false);
    }
  };

  const getMoodAnalytics = () => {
    const counts = {
      'Happy': 0,
      'Sad': 0,
      'Neutral': 0,
      'Excited': 0
    };
    
    moodData.forEach(entry => {
      if (counts.hasOwnProperty(entry.mood)) {
        counts[entry.mood]++;
      }
    });

    const total = Object.values(counts).reduce((acc, curr) => acc + curr, 0);
    const percentages = {};
    Object.keys(counts).forEach(mood => {
      percentages[mood] = total > 0 ? ((counts[mood] / total) * 100).toFixed(1) : 0;
    });
    
    return { counts, percentages };
  };

  if (loading) {
    return <div className="mood-chart-loading">
      <div className="loading-spinner"></div>
      <p>Loading your mood journey...</p>
    </div>;
  }

  if (error) {
    return <div className="mood-chart-error">
      <p>😕 {error}</p>
      <button onClick={fetchMoodData} className="retry-button">Try Again</button>
    </div>;
  }

  if (!moodData || moodData.length === 0) {
    return (
      <div className="mood-chart-empty">
        <h3>Start Your Mood Journey</h3>
        <p>📝 Add journal entries to see your mood patterns!</p>
      </div>
    );
  }

  const { counts, percentages } = getMoodAnalytics();

  const chartData = {
    labels: ['Happy 😊', 'Sad 😢', 'Neutral 😐', 'Excited 🎉'],
    datasets: [
      {
        data: [
          counts['Happy'],
          counts['Sad'],
          counts['Neutral'],
          counts['Excited']
        ],
        backgroundColor: [
          'rgba(255, 193, 7, 0.8)',  
          'rgba(3, 169, 244, 0.8)',   
          'rgba(156, 39, 176, 0.8)',  
          'rgba(76, 175, 80, 0.8)'    
        ],
        borderColor: [
          'rgba(255, 193, 7, 1)',
          'rgba(3, 169, 244, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(76, 175, 80, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = percentages[label.split(' ')[0]];
            return `${label}: ${value} entries (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%',
  };

  const dominantMood = Object.entries(counts)
    .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  return (
    <div className="mood-chart-container">
      <h2 className="mood-chart-title">Your Mood Journey</h2>
      <div className="mood-summary">
        <div className="mood-stat-card total">
          <h3>Total Entries</h3>
          <p>{moodData.length}</p>
        </div>
        <div className="mood-stat-card dominant">
          <h3>Most Frequent Mood</h3>
          <p>{dominantMood} {dominantMood === 'Happy' ? '😊' : 
             dominantMood === 'Sad' ? '😢' : 
             dominantMood === 'Neutral' ? '😐' : '🎉'}</p>
        </div>
      </div>
      <div className="chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mood-percentages">
        {Object.entries(percentages).map(([mood, percentage]) => (
          <div key={mood} className={`percentage-item ${mood.toLowerCase()}`}>
            <span className="mood-label">{mood}</span>
            <span className="percentage-value">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodChart;
