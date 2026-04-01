import { useRef, useEffect } from "react";
import useGameLoop from "../hooks/useGameLoop";

const CELL_SIZE = 24;
const WIDTH = 480;
const HEIGHT = 480;

function SnakeCanvas({ snake, food }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const snakeRef = useRef(snake);
  const foodRef = useRef(food);

  // 🧠 Smooth render positions
  const renderSnakeRef = useRef([]);

  // ✅ init canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
  }, []);

  // ✅ keep latest state
  useEffect(() => {
    snakeRef.current = snake;
    foodRef.current = food;
  }, [snake, food]);

  // ✅ initialize ONLY once (no reset lag)
  useEffect(() => {
    if (renderSnakeRef.current.length === 0) {
      renderSnakeRef.current = snake.map((seg) => ({
        x: seg.x * CELL_SIZE,
        y: seg.y * CELL_SIZE,
      }));
    }
  }, [snake]);

  // 🎮 render loop
  useGameLoop(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const snake = snakeRef.current;
    const food = foodRef.current;
    const renderSnake = renderSnakeRef.current;

    // 🧹 clear
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 🔄 sync length
    renderSnake.length = snake.length;

    const SMOOTHING = 0.15;

    // 🐍 smooth movement
    snake.forEach((seg, index) => {
      const targetX = seg.x * CELL_SIZE;
      const targetY = seg.y * CELL_SIZE;

      if (!renderSnake[index]) {
        renderSnake[index] = { x: targetX, y: targetY };
      }

      // interpolation
      renderSnake[index].x += (targetX - renderSnake[index].x) * SMOOTHING;
      renderSnake[index].y += (targetY - renderSnake[index].y) * SMOOTHING;

      // ✅ snap fix (INSIDE LOOP)
      if (Math.abs(renderSnake[index].x - targetX) < 0.5) {
        renderSnake[index].x = targetX;
      }
      if (Math.abs(renderSnake[index].y - targetY) < 0.5) {
        renderSnake[index].y = targetY;
      }
    });

    // 🍎 food
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(
      food.x * CELL_SIZE,
      food.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    // 🐍 snake
    renderSnake.forEach((seg, index) => {
      const alpha = (renderSnake.length - index) / renderSnake.length;
      ctx.fillStyle = `rgba(0,255,200,${alpha})`;
      ctx.fillRect(seg.x, seg.y, CELL_SIZE, CELL_SIZE);
    });

  }, 16); // 60 FPS

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{ background: "#111", borderRadius: "12px" }}
    />
  );
}

export default SnakeCanvas;