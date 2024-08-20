import React from 'react';

function Square({ value, onClick, isWinningSquare }) {
  return (
    <div
      className={`square ${isWinningSquare ? 'winner' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default Square;
