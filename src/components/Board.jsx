import React, { useEffect, useState} from 'react';
import Cell from './Cell';

function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [player, setPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  function handleClick(i) {
    if (cells[i] || calculateWinner(cells) || gameOver || xIsNext !== (player === "x")) {
      return;
    }
  
    const newCells = cells.slice();
    newCells[i] = player;
    setCells(newCells);
    setXIsNext(!xIsNext);
  
    const humanWinner = calculateWinner(newCells);
    if (humanWinner || newCells.every(cell => cell !== null)) {
      setGameOver(true);
      setTimeout(() => resetGame(), 4000);
    }
  }
  
  function computerMove() {
    const availableMoves = cells.map((cell, i) => (cell === null ? i : null)).filter(i => i !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  function handleChoice(choice) {
    setPlayer(choice);
    if (choice === "o") {
      setXIsNext(false);
    }
  }

  function resetGame() {
    setCells(Array(9).fill(null));
    setGameOver(false);
    setPlayer(null);
  }

  const winner = calculateWinner(cells);
  const status = winner ? `Ganador: ${winner}` : `Siguiente jugador: ${xIsNext ? "x" : "o"}`;

  useEffect(() => {
    if (player && xIsNext !== (player === "x") && !gameOver) {
      const timeoutId = setTimeout(() => {
        const move = computerMove();
        if (move !== undefined) {
          const newCells = cells.slice();
          newCells[move] = player === "x" ? "o" : "x";
          setCells(newCells);
          setXIsNext(!xIsNext);
  
          const computerWinner = calculateWinner(newCells);
          if (computerWinner || newCells.every(cell => cell !== null)) {
            setGameOver(true);
            setTimeout(() => resetGame(), 2000);
          }
        }
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [cells, xIsNext, player, gameOver]);

  return (
    <div>
      {!player && (
        <div className="choice-container">
          <button className="choice-button" onClick={() => handleChoice("x")}>
            Jugar como X
          </button>
          <button className="choice-button" onClick={() => handleChoice("o")}>
            Jugar como O
          </button>
        </div>
      )}
      <div className="status">{status}</div>
      <div className="board">
        {cells.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default Board;

function calculateWinner(cells) {
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
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return null;
}