import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useStateSelector } from '@/state';
import RevealFx from '@/components/RevealFX';

const Div = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-height: 50px;

  .image-container {
    position: relative;
    width: auto;
    height: auto;

    &__main {
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;

      &__text {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px;
        grid-gap: 20px;
        opacity: 0.9;
        * {
          max-width: 500px;
          text-align: center;
        }
      }
    }

    &__canvas {
      width: 100%;
      height: auto;
      /* inear-gradient(180deg, #2b4a76 0%, #1f2937 100%); */
      /* background: linear-gradient(180deg, #2b4a76 0%, #1f2937 100%); */
      /* background-color: ${({ theme }) => theme.colors.text}; */
      background-color: rgba(250, 250, 250, 0.05);
      border-radius: 16px;
    }

    &__sub {
      position: absolute;
      bottom: -40px;
      right: -40px;
      width: 70%;
      filter: drop-shadow(-4px -4px 10px rgba(0, 0, 50, 0.15));
    }
  }

  .text-container {
    padding-top: 70px;
    align-self: flex-start;

    &__value {
      max-width: 600px !important;
      color: ${({ theme }) => theme.colors.textWhite};
    }
  }
`;

interface SlideBProps {
  isActive: boolean;
}

const GameOfLifeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colors = useStateSelector(({ theme }) => theme.colors);

  const cols = 140;
  const rows = 90;
  const cellSize = 5;

  const createEmptyGrid = (): number[][] => {
    return new Array(rows).fill(null).map(() => new Array(cols).fill(0));
  };

  const randomizeGrid = (grid: number[][]): number[][] => {
    return grid.map((row) => row.map(() => (Math.random() > 0.7 ? 1 : 0)));
  };

  const getNextGeneration = (grid: number[][]): number[][] => {
    const newGrid = createEmptyGrid();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];
        let neighbors = 0;

        for (let rr = -1; rr <= 1; rr++) {
          for (let cc = -1; cc <= 1; cc++) {
            if (rr === 0 && cc === 0) continue;
            const rowIndex = (r + rr + rows) % rows;
            const colIndex = (c + cc + cols) % cols;
            neighbors += grid[rowIndex][colIndex];
          }
        }

        // Apply Conway's rules
        if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
          newGrid[r][c] = 1;
        } else if (cell === 0 && neighbors === 3) {
          newGrid[r][c] = 1;
        } else {
          newGrid[r][c] = 0;
        }
      }
    }
    return newGrid;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    let grid = createEmptyGrid();
    grid = randomizeGrid(grid);

    // Update the Game of Life at an interval
    const updateInterval = 30; // in ms (lower = faster)
    const intervalId = setInterval(() => {
      grid = getNextGeneration(grid);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.card;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] === 1) {
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }
    }, updateInterval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return <canvas ref={canvasRef} className="image-container__canvas" />;
};

export const SlideB: React.FC<SlideBProps> = ({ isActive }) => {
  return (
    <Div>
      <div className="image-container">
        <div className="image-container__main">
          {isActive && (
            <>
              <div className="image-container__main__text">
                <RevealFx trigger delay={0.01}>
                  <Typography variant="h2" fontWeight={600} style={{ color: '#fff' }}>
                    Evolve Your AI Potential
                  </Typography>
                  <Box mb={4} />
                  <Typography variant="h6" fontWeight={500} style={{ color: '#fff' }}>
                    Like cellular automata, intelligence emerges from simplicity. ProMax.AI transforms your documents
                    into dynamic, context-aware conversations. Adapt. Experiment. Create – with precision or boundless
                    creativity.
                  </Typography>
                </RevealFx>
              </div>

              <GameOfLifeCanvas />
            </>
          )}
        </div>
      </div>
      <Box mb={4} />
    </Div>
  );
};
