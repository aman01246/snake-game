import "./Snake.css";

export default function SnakeBoard({ gameOver, restartGame }) {
  return (
    <>
      {gameOver && (
        <div className="game-over">
          <h1>Game Over 💀</h1>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </>
  );
}
