

import React from 'react';

const Header = ({ moves, formattedTime, difficulty, setDifficulty, bestScore, onRestart, isGameActive }) => {
  return (
    <header className="header">
      <h1>Memory Match</h1>
      <div className="controls">
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="difficulty-select"
          disabled={isGameActive} // YAHAN FIX KIYA: Game chalte time dropdown lock
        >
          <option value="easy">Easy (4x4)</option>
          <option value="medium">Medium (6x4)</option>
          <option value="hard">Hard (6x6)</option>
        </select>
        <button onClick={onRestart} className="btn-restart">Restart Game</button>
      </div>
      <div className="stats">
        <div className="stat-box">Moves: <span>{moves}</span></div>
        <div className="stat-box">Time: <span>{formattedTime}</span></div>
        <div className="stat-box best-score">
          {/* YAHAN FIX KIYA: Text clean aur professional dikhane ke liye */}
          <span>{bestScore ? bestScore : 'No Best Score Yet'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;