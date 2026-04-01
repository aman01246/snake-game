import SnakeCanvas from "./components/SnakeCanvas";
import SnakeBoard from "./components/SnakeBoard";
import useSnake from "./hooks/useSnake";
import "./index.css";
import AuroraBackground from "./components/AuroraBackground";
import Starfield from "./components/Starfield";

function App() {
 const {  snake, food, gameOver, restartGame, level, setLevel, snakeLength } = useSnake();
  

  return (
    <div className="app">

      {/* Background (optional) */}
       <AuroraBackground />
      <Starfield /> 

      <div className="top-ui">
        <h1>🐍 Snake Game</h1>

        {/* 🎯 Level Selector */}
        <div className="level-selector">
          <button
            className={level === "EASY" ? "active" : ""}
            onClick={() => setLevel("EASY")}
          >
            Easy
          </button>

          <button
            className={level === "MEDIUM" ? "active" : ""}
            onClick={() => setLevel("MEDIUM")}
          >
            Medium
          </button>

          <button
            className={level === "HARD" ? "active" : ""}
            onClick={() => setLevel("HARD")}
          >
            Hard
          </button>
        </div>

        {/* ✅ Score */}
        <h2>Score: {snakeLength - 3}</h2>
      </div>

      {/* 🎮 BOARD */}
      <div className="game-container">
        <SnakeCanvas
          snake={snake}
          food={food}
          gameOver={gameOver}
        />

        {gameOver && (
          <div className="overlay">
            <SnakeBoard
              snake={snake} 
              gameOver={gameOver}
              restartGame={restartGame}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;