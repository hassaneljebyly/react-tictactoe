import { useState } from 'react';
import Board from './Board';

function checkWinner(arr) {
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
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      console.log([true, arr[a]]);
      return [true, arr[a], [a, b, c]];
    }
  }
}

function Game() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isWinner, setIsWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const [score, setScore] = useState({
    xScore: 0,
    oScore: 0,
  });
  function handleRestartGame() {
    setCells(Array(9).fill(null));
    setXIsNext(true);
    setIsWinner(null);
    setGameOver(false);
    setWinningLine([]);
  }

  function handleCellClick(index) {
    if (cells[index] || gameOver) {
      return;
    }
    const newCellArr = [...cells];
    newCellArr[index] = xIsNext ? 'X' : 'O';
    const [winnerFound, winner, winLine] = checkWinner(newCellArr) || [false, null, null];
    if (winnerFound) {
      let newScore = winner === 'X' ? { ...score, xScore: score.xScore + 3 } : { ...score, oScore: score.oScore + 3 };
      setScore(newScore);
      setGameOver(true);
      setIsWinner(winner);
      setWinningLine(winLine);
    }
    setXIsNext(!xIsNext);
    setCells(newCellArr);
  }
  return (
    <>
      <div className="scoreTable">
        <p className="scoreSide"> X</p>
        <p className="score">
          <span className="xScore">{score.xScore}</span>:<span className="oScore">{score.oScore}</span>
        </p>
        <p className="scoreSide"> O</p>
      </div>
      <p>{gameOver ? 'winner is: ' + isWinner : xIsNext ? "it's X turn" : "it's O turn"}</p>
      <Board cells={cells} onCellClick={handleCellClick} winLine={winningLine} xIsNext={xIsNext} gameOver={gameOver} />
      <button className="tictac_restart-btn" onClick={handleRestartGame}>
        restart
      </button>
    </>
  );
}

export default Game;
