import React from 'react';

const ScoreDisplay = ({ teams, score }) => {
  return (
    <div className="score-display">
      <h2>Score</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            Team {team}: {score[index]} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreDisplay;
