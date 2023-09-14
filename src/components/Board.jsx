/* eslint-disable react/prop-types */

function Cell({ cells, onCellClick, winLine, xIsNext, gameOver }) {
  const buttons = cells.map((cell, index) => {
    const winningClass = winLine.includes(index) ? 'winningCell' : '';
    const whoIsNext = !gameOver && cell === null ? (xIsNext ? 'xIsNext' : 'oIsNext') : '';
    const cellColor = cell === 'X' ? 'blue' : 'red';
    return (
      <button className={`board__cell ${winningClass} ${whoIsNext} ${cellColor}`} onClick={() => onCellClick(index)} key={index}>
        {cell}
      </button>
    );
  });
  return <div className="board">{buttons}</div>;
}

export default Cell;
