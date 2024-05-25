import React, { useState } from 'react';

const TeamNamesSetup = ({ onSubmit, onToggleEvilMode }) => {
  const [numTeams, setNumTeams] = useState(2);
  const [teamNames, setTeamNames] = useState(Array(2).fill(''));

  const handleNumTeamsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumTeams(num);
    setTeamNames(Array(num).fill(''));
  };

  const handleTeamNameChange = (e, index) => {
    const updatedTeamNames = [...teamNames];
    updatedTeamNames[index] = e.target.value;
    setTeamNames(updatedTeamNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(teamNames.filter(name => name.trim() !== ''));
  };

  return (
    <div className="team-names-setup">
      <h2>Setup Teams</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Teams:
          <select value={numTeams} onChange={handleNumTeamsChange}>
            {[2, 3].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <div>
          {teamNames.map((name, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Team ${index + 1}`}
              value={name}
              onChange={(e) => handleTeamNameChange(e, index)}
            />
          ))}
        </div>
        <label>
          <input type="checkbox" onChange={onToggleEvilMode} />
          Evil Mode
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default TeamNamesSetup;
