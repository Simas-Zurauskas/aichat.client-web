import React, { useRef, useEffect, useState } from 'react';

// Utility function to create a 2D array (grid) of random live/dead cells
function createRandomGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      // Randomly set cell as alive (1) or dead (0)
      row.push(Math.random() < 0.2 ? 1 : 0);
    }
    grid.push(row);
  }
  return grid;
}

// Calculate the next generation of the grid based on the Game of Life rules
function getNextGeneration(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const nextGen = [];
  for (let r = 0; r < rows; r++) {
    nextGen[r] = [];
    for (let c = 0; c < cols; c++) {
      let neighbors = 0;

      // Check all 8 neighbors around [r, c]
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!(dr === 0 && dc === 0)) {
            const nr = r + dr;
            const nc = c + dc;
            // Wrap around edges (toroidal) - optional; remove modulo for no wrap
            const wrappedR = (nr + rows) % rows;
            const wrappedC = (nc + cols) % cols;
            neighbors += grid[wrappedR][wrappedC];
          }
        }
      }

      // Game of Life rules
      const currentCell = grid[r][c];
      if (currentCell === 1 && (neighbors === 2 || neighbors === 3)) {
        nextGen[r][c] = 1; // Stay alive
      } else if (currentCell === 0 && neighbors === 3) {
        nextGen[r][c] = 1; // Become alive
      } else {
        nextGen[r][c] = 0; // Die
      }
    }
  }

  return nextGen;
}

export default function GameOfLife() {
  const canvasRef = useRef(null);

  // Track the canvas size in state to handle window resizing
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Variables for game grid
  const cellSize = 8; // Adjust cell size for visual detail
  const rows = Math.floor(canvasSize.height / cellSize);
  const cols = Math.floor(canvasSize.width / cellSize);

  // Using refs to store and mutate grid without causing re-renders
  const gridRef = useRef(createRandomGrid(rows, cols));
  const animationRef = useRef(null);

  // Update the canvas size on window resize
  useEffect(() => {
    function handleResize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main draw function: renders the current state of the grid
  const drawGrid = (ctx, grid) => {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Optional: subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvasSize.width, canvasSize.height);
    gradient.addColorStop(0, '#050505');
    gradient.addColorStop(1, '#222222');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw cells
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          // Example color variation based on row/col
          const hue = (r * 2 + c * 2) % 360;
          ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  // Animation loop: update grid & render
  const animate = () => {
    const ctx = canvasRef.current.getContext('2d');
    // Compute the next generation
    gridRef.current = getNextGeneration(gridRef.current);
    // Draw the new grid
    drawGrid(ctx, gridRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start the animation on mount, and stop on unmount
  useEffect(() => {
    // Recreate grid when canvas size changes to avoid leftover rows/cols
    gridRef.current = createRandomGrid(rows, cols);

    // Cancel previous animation frame if any
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize]); // Rerun effect whenever canvas dimensions change

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#000000',
      }}
    />
  );
}
