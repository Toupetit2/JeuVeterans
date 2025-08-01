import { useEffect, useState } from 'react';
import Board from './components/Board';
import EndGameUI from './components/EndGameUI';

export default function App() {
  const size = 9;
  const mineNumber = 10;
  const [grid, setGrid] = useState(generateEmptyGrid(size));
  const [status, setStatus] = useState("playing"); // "won", "lost", "playing"
  const [revealedCount, setRevealedCount] = useState(0);


  useEffect(() => {
    setGrid(generateMines(size, grid));
  }, []);

  function generateEmptyGrid(size) {
    return Array(size)
      .fill(null)
      .map(() =>
        Array(size).fill({
          display: '',
          revealed: false,
          hasMine: false,
        })
      );
  }

  

  function generateMines(size, baseGrid) {
    const newGrid = baseGrid.map(row => row.map(cell => ({ ...cell })));
    
    let randomPos = Math.floor(Math.random() * size * size);
    let x = Math.floor(randomPos / size);
    let y = randomPos % size;
    
    for (let i = 0; i < mineNumber; i++) {
      
      while (newGrid[x][y].hasMine === true){
        
        randomPos = Math.floor(Math.random() * size * size);
        x = Math.floor(randomPos / size);
        y = randomPos % size;
      }

      newGrid[x][y].hasMine = true;
    }

    return newGrid;
  }

  function countMinesAround(x, y, grid) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
        if (
          newX >= 0 && newX < size &&
          newY >= 0 && newY < size &&
          grid[newX][newY].hasMine
        ) {
          count++;
        }
      }
    }
    return count;
  }

  const revealCase = (x, y, newGrid) => {
    if (
      x < 0 || x >= size ||
      y < 0 || y >= size ||
      newGrid[x][y].revealed
    ) return newGrid;

    newGrid[x][y].revealed = true;
    setRevealedCount(prev => prev + 1);

    const minesCount = countMinesAround(x, y, newGrid);
    newGrid[x][y].display = minesCount > 0 ? minesCount.toString() : '';

    if (minesCount === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            newGrid = revealCase(x + i, y + j, newGrid);
          }
        }
      }
    }

    return newGrid;
  };

  const handleCellClick = (i) => {
    console.log(status)
    const x = Math.floor(i / size);
    const y = i % size;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    if (newGrid[x][y].hasMine)
      { setStatus("lost"); }

    if (!newGrid[x][y].revealed) {
      const updatedGrid = revealCase(x, y, newGrid);
      setGrid(updatedGrid);
      console.log(revealedCount);
      if (revealedCount == (size*size)-mineNumber-1)
        { setStatus("won"); }
    }
  };

  const handleCellRightClick = (i) => {
    const x = Math.floor(i / size);
    const y = i % size;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    newGrid[x][y].display = newGrid[x][y].display === '🚩' ? '' : '🚩';

    setGrid(newGrid);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <Board grid={grid} onCellClick={handleCellClick} onCellRightClick={handleCellRightClick} />
      <EndGameUI status={status}></EndGameUI>
    </div>
  );
}
