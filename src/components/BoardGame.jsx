import React, { useState } from "react";
import Square from "./Square";

export default function Board({ rows = 3, cols = 3 }) {
  const [history, setHistory] = useState([
    { squares: Array(rows * cols).fill(null), position: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const currentSquares = history[currentMove].squares;
  const { winner, line } = calculateWinner(currentSquares, rows, cols);

  const handleClick = (index) => {
    if (currentSquares[index] || winner) return;

    const newSquares = currentSquares.slice();
    newSquares[index] = xIsNext ? "X" : "O";

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: newSquares, position: index },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const handleReset = () => {
    setHistory([{ squares: Array(rows * cols).fill(null), position: null }]);
    setCurrentMove(0);
    setXIsNext(true);
  };

  const board = [];
  for (let i = 0; i < rows; i++) {
    const rowSquares = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      const isWinning = line.includes(index);
      rowSquares.push(
        <Square
          key={`${i}-${j}`}
          value={currentSquares[index]}
          onClick={() => handleClick(index)}
          highlight={isWinning}
        />
      );
    }
    board.push(
      <div key={i} style={{ display: "flex", justifyContent: "center" }}>
        {rowSquares}
      </div>
    );
  }

  const moves = history.map((step, move) => {
    const location = step.position != null ? getLocation(step.position, cols) : "";
    const desc = move === 0 ? "Go to game start" : `Go to move #${move} (${location})`;

    return (
      <li key={move}>
        {move === currentMove ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="board">
      <div>
        <div>{board}</div>
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}
        >
          <div className="toast">
            {winner
              ? `Winner: ${winner}`
              : currentSquares.every(Boolean)
              ? "Draw!"
              : `Next: ${xIsNext ? "X" : "O"}`}
          </div>

          <button onClick={handleReset} className="reset-button">
            Restart
          </button>
        </div>
      </div>

      <div>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setIsAscending(!isAscending)}>
            Sort: {isAscending ? "Ascending" : "Descending"}
          </button>
        </div>

        <div style={{ marginTop: 10 }}>
          <div>Move history</div>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(sq, rows, cols) {
  if (rows !== cols) return { winner: null, line: [] };
  const size = rows;

  for (let r = 0; r < size; r++) {
    const start = r * size;
    const row = sq.slice(start, start + size);
    if (row.every((v) => v && v === row[0])) {
      return { winner: row[0], line: Array.from({ length: size }, (_, i) => start + i) };
    }
  }

  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) col.push(sq[r * size + c]);
    if (col.every((v) => v && v === col[0])) {
      return { winner: col[0], line: Array.from({ length: size }, (_, i) => i * size + c) };
    }
  }

  const diag1 = [];
  for (let i = 0; i < size; i++) diag1.push(sq[i * size + i]);
  if (diag1.every((v) => v && v === diag1[0])) {
    return { winner: diag1[0], line: Array.from({ length: size }, (_, i) => i * size + i) };
  }

  const diag2 = [];
  for (let i = 0; i < size; i++) diag2.push(sq[i * size + (size - 1 - i)]);
  if (diag2.every((v) => v && v === diag2[0])) {
    return {
      winner: diag2[0],
      line: Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)),
    };
  }

  return { winner: null, line: [] };
}

function getLocation(index, cols) {
  const row = Math.floor(index / cols) + 1;
  const col = (index % cols) + 1;
  return `${row}, ${col}`;
}
