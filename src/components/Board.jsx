import Cell from './Cell';

export default function Board({ grid, onCellClick, onCellRightClick }) {
  const size = grid.length;

  return (
    <div
      className={`grid grid-cols-${size} gap-1 max-w-screen-sm w-full mx-auto`}
      style={{ 
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        backgroundImage: "url('idden-bg.webp')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    }}
    >
      {grid.flat().map((cell, i) => (
        <Cell
          key={i}
          value={cell.display}
          revealed={cell.revealed}
          onClick={() => onCellClick(i)}
          onRightClick={() => onCellRightClick(i)}
        />
      ))}
    </div>
    
  );
}