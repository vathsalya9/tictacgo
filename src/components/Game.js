import React, { useState, useEffect } from 'react';
import Square from './Square';
import Board from './Board'; // Import Board component

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true = X's turn, false = O's turn
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const [isOnePlayer, setIsOnePlayer] = useState(false); // Default to Two Players
  const [aiTurn, setAiTurn] = useState(false);

  useEffect(() => {
    if (aiTurn && isOnePlayer) {
      aiMove();
    }
  }, [aiTurn, isOnePlayer]);

  useEffect(() => {
    if (isOnePlayer && xIsNext && !winner) {
      // AI makes the first move in one-player mode
      setAiTurn(true);
    }
  }, [xIsNext, isOnePlayer, winner]);

  const handleClick = (index) => {
    if (squares[index] || winner || aiTurn) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner.winner);
      setWinningSquares(currentWinner.line);
    } else if (isOnePlayer && xIsNext) {
      // Set AI turn if it's one-player mode and X just placed
      setXIsNext(false);
      setAiTurn(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const handleModeChange = (mode) => {
    setIsOnePlayer(mode === 'one');
    resetGame();
  };

  const aiMove = () => {
    const emptySquares = squares.map((val, index) => val === null ? index : null).filter(val => val !== null);
    if (emptySquares.length === 0) return; // No move possible if board is full

    const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newSquares = squares.slice();
    newSquares[randomMove] = 'X';
    setSquares(newSquares);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner.winner);
      setWinningSquares(currentWinner.line);
    } else if (emptySquares.length - 1 === 0) {
      // Check for draw
      setWinner('Draw');
    } else {
      setXIsNext(false); // After AI move, it's back to player's turn
    }

    setAiTurn(false); // AI finished move
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true); // X starts first
    setWinner(null);
    setWinningSquares([]);
    setAiTurn(false); // AI is not playing at the start
  };

  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  return (
    <div className="game">
      <h1 style={{ marginRight: '40px', fontSize: '45px' }}>Tic-Tac-Go</h1>
      <Board
        squares={squares}
        onClick={handleClick}
        winningSquares={winningSquares} // Pass winningSquares to Board
      />
      <div className="mode-selection">
        <button 
          onClick={() => handleModeChange('one')}
          style={{ fontWeight: !isOnePlayer ? 'bold' : 'normal' }}
        >
          1 Player
        </button>
        <button 
          onClick={() => handleModeChange('two')}
          style={{ fontWeight: !isOnePlayer ? 'bold' : 'normal' }}
        >
          2 Players
        </button>
      </div>
      <div className="game-info">
        <div
          style={{
            marginRight: '80px',
            fontSize: '14px',
            marginBottom: '10px',
            marginTop: '2px',
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          {winner
            ? winner === 'Draw'
              ? 'Draw Match'
              : `Winner: ${winner}`
            : isBoardFull(squares)
            ? 'Draw Match'
            : isOnePlayer
            ? xIsNext
              ? 'AI\'s Turn (X)'
              : 'Player\'s Turn (O)'
            : xIsNext
            ? 'First Player\'s Turn'
            : 'Second Player\'s Turn'}
        </div>
        <button
          style={{
            marginRight: '80px',
            marginBottom: '10px',
            color: 'white',
            fontSize: '18px',
          }}
          className="New_button"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default Game;
