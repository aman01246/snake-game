# 🐍 Snake Game

A modern, fast, and interactive Snake Game built using React + Vite with smooth animations, sound effects, and dynamic difficulty.

---

## 🚀 Live Demo

👉 https://aman01246.github.io/snake-game/

---

## ✨ Features

* 🎮 Classic Snake Gameplay
* ⚡ Smooth Game Loop using `useRef` (high performance)
* 🎯 Dynamic Speed Scaling based on snake length
* 🎚️ Difficulty Levels:

  * Easy
  * Medium
  * Hard
* 🍎 Food generation system
* 💥 Collision detection (wall + self)
* 🔊 Sound effects:

  * Eat sound
  * Game over sound
  * Restart sound
* 🎨 Modern UI with:

  * Aurora background
  * Starfield animation
  * Glassmorphism game board
* 🔁 Restart functionality

---

## 🛠️ Tech Stack

* ⚛️ React
* ⚡ Vite
* 🎨 CSS (Custom styling)
* 🔊 HTML5 Audio API

---

## 📁 Project Structure

```
snake-game/
│── public/
│── src/
│   ├── assets/          # images + sounds (mp3, wav)
│   ├── components/      # UI components (Board, Canvas, Background)
│   ├── config/          # game config (initial snake, grid)
│   ├── hooks/           # custom hooks (game loop, controls, sound)
│   ├── utils/           # game logic functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
│── index.html
│── vite.config.js
│── package.json
```

---

## 🧠 Core Concepts Used

* `useRef` → Prevent unnecessary re-renders (performance boost)
* `useCallback` → Optimized game loop
* Custom Hooks:

  * `useGameLoop`
  * `useControls`
  * `useSnake`
  * `useSound`

---

## ▶️ Run Locally

```bash
git clone https://github.com/aman01246/snake-game.git
cd snake-game
npm install
npm run dev
```

---

## 🌐 Deployment (GitHub Pages)

```bash
npm run build
npm run deploy
```

Make sure in `vite.config.js`:

```js
base: '/snake-game/'
```

---

## 🎯 Future Improvements

* 🏆 High Score system (localStorage)
* 📱 Mobile touch controls
* ⏸️ Pause / Resume feature
* 🌍 Multiplayer mode (WebSockets)
* 🎨 Advanced animations & effects

---

## 👨‍💻 Author

**Aman Kumar**

* GitHub: https://github.com/aman01246

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
