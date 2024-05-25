import React, { useState } from 'react';

const GameBoard = ({ teams, maxScore, evilMode, onAction, onReset }) => {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [score, setScore] = useState(teams.map(() => 0));
  const [ballsIn, setBallsIn] = useState([]);
  const [currentBall, setCurrentBall] = useState(null);
  const [winner, setWinner] = useState(null);

  const generateRandomNumber = () => {
    // Generate a random number between 1 and 15
    return Math.floor(Math.random() * 15) + 1;
  };

  const handleAction = (action) => {
    if (action === 'pocketed') {
      const updatedScore = [...score];
      updatedScore[currentTeamIndex]++;
      setScore(updatedScore);

      // Check if the current team wins
      if (updatedScore[currentTeamIndex] === maxScore) {
        setWinner(teams[currentTeamIndex]);
        return;
      }
    } else if (action === 'scratch' && evilMode) {
      const updatedScore = [...score];
      updatedScore[currentTeamIndex]--;
      setScore(updatedScore);
    } else if (action === 'miss' || (action === 'scratch' && !evilMode)) {
      setCurrentTeamIndex((currentTeamIndex + 1) % teams.length);
    }

    const randomNumber = generateRandomNumber();
    setCurrentBall(randomNumber);
    const updatedBallsIn = ballsIn.filter(ball => ball !== randomNumber);
    setBallsIn(updatedBallsIn);

    onAction(action);
  };

  const handleReset = () => {
    setCurrentTeamIndex(0);
    setScore(teams.map(() => 0));
    setBallsIn([]);
    setCurrentBall(null);
    setWinner(null);
    onReset();
  };

  return (
    <div className="game-board">
      {winner ? (
        <div className="winner">Team {winner} wins!</div>
      ) : (
        <div>
          <div className="team-turn">Turn: Team {teams[currentTeamIndex]}</div>
          <div className="scoreboard">
            {teams.map((team, index) => (
              <div key={index} className="team-score">
                Team {team}: {score[index]} points
              </div>
            ))}
          </div>
          <div className="current-ball">Current Ball: {currentBall}</div>
          <div className="buttons">
            <button onClick={() => handleAction('pocketed')}>Pocketed</button>
            <button onClick={() => handleAction('miss')}>Miss</button>
            <button onClick={() => handleAction('scratch')}>Scratch</button>
          </div>
        </div>
      )}
      {winner && <button onClick={handleReset}>Reset</button>}
    </div>
  );
};

export default GameBoard;
