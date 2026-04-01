import { GRID_SIZE } from "../config/snakeConfig";

// 👉 move head based on direction
export function getNextHead(head, direction) {
  switch (direction) {
    case "UP":
      return { x: head.x, y: head.y - 1 };
    case "DOWN":
      return { x: head.x, y: head.y + 1 };
    case "LEFT":
      return { x: head.x - 1, y: head.y };
    case "RIGHT":
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

// 👉 wall collision
export function isWallCollision(head) {
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= GRID_SIZE ||
    head.y >= GRID_SIZE
  );
}

// 👉 self collision
export function isSelfCollision(head, snake) {
  return snake.some(
    (seg) => seg.x === head.x && seg.y === head.y
  );
}

// 👉 food eaten
export function isFoodEaten(head, food) {
  return head.x === food.x && head.y === food.y;
}

// 👉 generate food
export function generateFood(snake) {
  let newFood;

  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    snake.some(
      (seg) => seg.x === newFood.x && seg.y === newFood.y
    )
  );

  return newFood;
}