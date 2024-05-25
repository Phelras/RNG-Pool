import React, { useState } from 'react';
import './App.css';
import TeamNamesSetup from './components/TeamNamesSetup';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import GameControls from './components/GameControls';

function App() {
  const [teams, setTeams] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [evilMode, setEvilMode] = useState(false);
  const [initialBall, setInitialBall] = useState(null); // State to store initial ball number

  const handleStartGame = (teamNames) => {
    setTeams(teamNames);
    setGameStarted(true);
    const randomNumber = generateRandomNumber();
    setInitialBall(randomNumber);
  };

  const generateRandomNumber = () => {
    // Generate a random number between 1 and 15
    return Math.floor(Math.random() * 15) + 1;
  };

  const handleResetGame = () => {
    setTeams([]);
    setGameStarted(false);
    setInitialBall(null);
  };

  const handleToggleEvilMode = (mode) => {
    setEvilMode(mode);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pool Game</h1>
      </header>
      {!gameStarted ? (
        <TeamNamesSetup onSubmit={handleStartGame} onToggleEvilMode={handleToggleEvilMode} />
      ) : (
        <div>
          <ScoreDisplay teams={teams} score={Array(teams.length).fill(0)} />
          <GameBoard teams={teams} maxScore={teams.length === 2 ? 8 : 5} evilMode={evilMode} initialBall={initialBall} onAction={() => {}} onReset={handleResetGame} />
          <GameControls 
            onNextTurn={() => console.log("Next Turn")} 
            onToggleEvilMode={() => console.log("Toggle Evil Mode")} 
            onReset={handleResetGame}
          />
        </div>
      )}
    </div>
  );
}

export default App;
