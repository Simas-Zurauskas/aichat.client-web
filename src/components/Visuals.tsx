import React, { useRef, useEffect } from 'react';

const Visuals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0; // We'll increment this each frame.

    const render = () => {
      // Match canvas size to its CSS size for crisp drawing
      const width = canvas.clientWidth * 2;
      const height = canvas.clientHeight * 2;
      canvas.width = width;
      canvas.height = height;

      // Fill the background (dark or light, or use a gradient)
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);

      // Parameters for the dancing grid
      const cellSize = 50; // Distance between lines
      const amplitude = 30; // How far lines “wiggle”
      const freq = 0.12; // Wave frequency factor
      const colorSpeed = 50; // How fast colors cycle in HSL

      // Draw horizontal lines
      for (let y = 0; y < height; y += cellSize) {
        // Offset for each line using sine
        const offsetY = amplitude * Math.sin(angle + y * freq);

        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y + offsetY);

        // Hue cycles with line index + time
        const hue = (y + angle * colorSpeed) % 360;
        ctx.strokeStyle = `gray`;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = 0; x < width; x += cellSize) {
        const offsetX = amplitude * Math.sin(angle + x * freq);

        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, height);

        const hue = (x + angle * colorSpeed) % 360;
        ctx.strokeStyle = `gray`;
        ctx.stroke();
      }

      // Increase angle for the next frame
      angle += 0.01; // Adjust speed to taste

      // Schedule next frame
      animationFrameId = requestAnimationFrame(render);
    };

    render(); // Start the animation

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default Visuals;
