import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoodGame from "./components/MoodGame";
import CalendarView from "./components/CalendarView"; 
import AddJournal from './pages/AddJournal';
import "./App.css";

const App = () => {

  const sampleEntries = [
    { id: 1, date: "2024-11-26", title: "Gratitude Log", content: "I am thankful for a productive day." },
    { id: 2, date: "2024-11-26", title: "Workout", content: "Completed a 5km run." },
    { id: 3, date: "2024-11-25", title: "Reflection", content: "Learned new things today." },
  ];

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/moodgame" element={<MoodGame />} />
           
            <Route path="/calendar" element={<CalendarView entries={sampleEntries} />} />
            <Route path="/add-journal" element={<AddJournal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;