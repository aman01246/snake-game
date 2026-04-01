import { useState, useCallback, useEffect, useRef } from "react";
import { INITIAL_SNAKE } from "../config/snakeConfig";
import useGameLoop from "./useGameLoop";
import useControls from "./useControls";

import eatSoundFile from "../assets/eat.mp3";
import gameOverSoundFile from "../assets/gameover.mp3";
import restartFile from "../assets/restart.wav";
import useSound from "./useSound";

import {
  getNextHead,
  isWallCollision,
  isSelfCollision,
  isFoodEaten,
  generateFood,
} from "../utils/gameLogic";

// ✅ LEVEL CONFIG
const LEVELS = {
  EASY: 220,
  MEDIUM: 150,
  HARD: 110,
};

const MIN_SPEED = 95;

export default function useSnake() {
  // 🐍 Fast game state (no re-render)
  const snakeRef = useRef(INITIAL_SNAKE);

  // 🎨 UI state (safe for rendering)
  const [snake, setSnake] = useState(INITIAL_SNAKE);

  // 🔄 Force UI updates (score)
  const [, forceRender] = useState(0);

  // 📏 Length for speed
  const [snakeLength, setSnakeLength] = useState(INITIAL_SNAKE.length);

  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState("MEDIUM");

  // 🎮 Controls
  useControls(setDirection);

  // 🧠 Direction ref (no lag)
  const directionRef = useRef(direction);
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // 🔊 Sounds
  const playEat = useSound(eatSoundFile);
  const playGameOver = useSound(gameOverSoundFile);
  const playRestart = useSound(restartFile);

  const playEatRef = useRef(playEat);
  const playGameOverRef = useRef(playGameOver);

  useEffect(() => {
    playEatRef.current = playEat;
    playGameOverRef.current = playGameOver;
  }, [playEat, playGameOver]);

  // ✅ SPEED SYSTEM (no ref access here)
  const baseSpeed = LEVELS[level];

  let speed;
  if (level === "HARD") {
    speed = baseSpeed - (snakeLength - 1) * 1.5;
  } else {
    speed = baseSpeed - (snakeLength - 1) * 3;
  }

  speed = Math.max(MIN_SPEED, speed);

  // 🧠 GAME LOOP
  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const prevSnake = snakeRef.current;
    const head = getNextHead(prevSnake[0], directionRef.current);

    // 💀 Collision
    if (isWallCollision(head) || isSelfCollision(head, prevSnake)) {
      setGameOver(true);
      playGameOverRef.current();
      return;
    }

    const newSnake = [head, ...prevSnake];

    // 🍎 Food logic
    if (isFoodEaten(head, food)) {
      setFood(generateFood(newSnake));
      playEatRef.current();

      setSnakeLength(newSnake.length); // speed control
      forceRender((v) => v + 1); // score update
    } else {
      newSnake.pop();
    }

    // ✅ update both ref + UI
    snakeRef.current = newSnake;
    setSnake(newSnake); // safe render state
  }, [food, gameOver]);

  // 🔁 Game loop
  useGameLoop(moveSnake, speed);

  // 🔄 Restart
  const restartGame = () => {
    playRestart();
    snakeRef.current = INITIAL_SNAKE;
    setSnake(INITIAL_SNAKE);
    setDirection("RIGHT");
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setSnakeLength(INITIAL_SNAKE.length);
    forceRender((v) => v + 1);
  };

  // 📦 Expose
  return {
    snakeRef, // for Canvas (fast)
    snake,    // for UI (safe)
    food,
    gameOver,
    restartGame,
    level,
    setLevel,
    snakeLength,
  };
}