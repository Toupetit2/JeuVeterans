import { useEffect, useState } from 'react';
import Board from './components/Board';
import EndGameUI from './components/EndGameUI';
import Header from './components/Header';
import Timer from "./components/timer";

export default function App() {
  const size = 9;
  const mineNumber = 10;
  const [grid, setGrid] = useState([]);
  const [status, setStatus] = useState("playing"); // "won", "lost", "playing"
  const [revealedCount, setRevealedCount] = useState(0);
  const [showEndMenu, setShowEndMenu] = useState(true);

  // --- Génère une grille vide (chaque cellule indépendante)
  function generateEmptyGrid(size) {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        display: '',
        revealed: false,
        visible: true,
        hasMine: false,
        flag: false,
      }))
    );
  }

  // --- Place les mines aléatoirement
  function generateMines(size, baseGrid) {
    const newGrid = baseGrid.map(row => row.map(cell => ({ ...cell })));
    let placed = 0;

    while (placed < mineNumber) {
      const randomPos = Math.floor(Math.random() * size * size);
      const x = Math.floor(randomPos / size);
      const y = randomPos % size;

      if (!newGrid[x][y].hasMine) {
        newGrid[x][y].hasMine = true;
        placed++;
      }
    }

    return newGrid;
  }

  // --- Initialisation du jeu
  useEffect(() => {
    const empty = generateEmptyGrid(size);
    const withMines = generateMines(size, empty);
    setGrid(withMines);
  }, []);

  // --- Animation de victoire
  useEffect(() => {
    if (status === 'won') {
      animateVictory();
    }
  }, [status]);

  const animateVictory = async () => {
    setShowEndMenu(false);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const copyGrid = grid.map(row => row.map(cell => ({ ...cell })));

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        copyGrid[row][col].visible = false;
        copyGrid[row][col].revealed = true;
      }
      const newGrid = copyGrid.map(r => r.map(c => ({ ...c })));
      setGrid(newGrid);
      await delay(800);
    }

    setShowEndMenu(true);
  };

  // --- Compte les mines autour d'une cellule
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

  // --- Révèle une cellule (et les cases vides adjacentes)
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

  // --- Clique gauche
  const handleCellClick = (i) => {
    if (status !== "playing") return;

    const x = Math.floor(i / size);
    const y = i % size;
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));

    if (newGrid[x][y].hasMine) {
      setStatus("lost");
      return;
    }

    if (!newGrid[x][y].revealed) {
      const updatedGrid = revealCase(x, y, newGrid);
      setGrid(updatedGrid);
    }
  };

  // --- Clique droit (drapeau)
  const handleCellRightClick = (i) => {
    if (status !== "playing") return;

    const x = Math.floor(i / size);
    const y = i % size;

    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    if (!newGrid[x][y].revealed) {
      newGrid[x][y].flag = !newGrid[x][y].flag;
      setGrid(newGrid);
    }
  };

  // --- Vérifie la victoire à chaque mise à jour du nombre de cases révélées
  useEffect(() => {
    if (grid.length > 0 && revealedCount === size * size - mineNumber) {
      setStatus("won");
    }
  }, [revealedCount, grid]);

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-col">
      <Header />
      <Timer running={status==="playing"}/>
      <Board
        grid={grid}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />
      <EndGameUI status={status} visible={showEndMenu} />
      
    </div>
  );
}
