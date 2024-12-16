import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null; 
  }

  const chartData = {
    labels: ['Happy', 'Sad', 'Neutral'],
    datasets: [
      {
        label: 'Mood Count',
        data: [12, 19, 3], 
        backgroundColor: ['#FF7F50', '#87CEEB', '#FFD700'],
        hoverBackgroundColor: ['#FF6347', '#4682B4', '#FFC107'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverBorderColor: '#000',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
          color: '#333',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        bodySpacing: 6,
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    cutout: '70%', 
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Mood Chart</h2>
      <div style={styles.chartContainer}>
        <Doughnut data={chartData} options={options} />
      </div>
      <div style={styles.legendInfo}>
        {chartData.labels.map((label, index) => (
          <div key={label} style={{ ...styles.legendItem, backgroundColor: chartData.datasets[0].backgroundColor[index] }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#444',
  },
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: '300px',
    margin: '0 auto',
  },
  legendInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  legendItem: {
    padding: '10px 15px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    textTransform: 'capitalize',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default MoodChart;