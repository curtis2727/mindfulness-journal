import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MoodGame.css";

const MoodGame = () => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const moods = [
    { emoji: "😊", mood: "Happy" },
    { emoji: "😢", mood: "Sad" },
    { emoji: "😡", mood: "Angry" },
    { emoji: "😴", mood: "Sleepy" },
  ];

  const handleDrop = (e, mood) => {
    e.preventDefault();
    const draggedEmoji = e.dataTransfer.getData("emoji");
    const match = moods.find((item) => item.emoji === draggedEmoji);

    if (match && match.mood === mood) {
      setScore((prev) => prev + 1);
      setFeedback("🎉 Correct!");
    } else {
      setFeedback("❌ Try again!");
    }

    setTimeout(() => setFeedback(""), 1500);
  };

  const handleDragStart = (e, emoji) => {
    e.dataTransfer.setData("emoji", emoji);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mood-game-container">
      <button className="close-button" onClick={handleClose}>×</button>
      <h1 className="game-title">Mood Game 🎮</h1>
      <p className="instructions">Drag the emoji to its matching mood!</p>
      <div className="scoreboard">Score: {score}</div>
      <div className="feedback">{feedback}</div>

      <div className="emoji-row">
        {moods.map((item, index) => (
          <div
            key={index}
            className="emoji"
            draggable
            onDragStart={(e) => handleDragStart(e, item.emoji)}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="mood-row">
        {moods.map((item, index) => (
          <div
            key={index}
            className="mood-box"
            onDrop={(e) => handleDrop(e, item.mood)}
            onDragOver={allowDrop}
          >
            {item.mood}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodGame;