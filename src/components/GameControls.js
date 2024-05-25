import React from 'react';

const GameControls = ({ onNextTurn, onToggleEvilMode, onReset }) => {
  return (
    <div className="game-controls">
      <button onClick={onNextTurn}>Next Turn</button>
      <button onClick={onReset}>Reset</button>
      <label>
        <input type="checkbox" onChange={onToggleEvilMode} />
        Evil Mode
      </label>
    </div>
  );
};

export default GameControls;
