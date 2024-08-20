import React from 'react';
import Square from './Square';

function Board({ squares, onClick, winningSquares }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
          isWinningSquare={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;
