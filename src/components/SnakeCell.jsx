export default function SnakeCell({ isSnake, isFood }) {
let className = "cell";

if (isSnake) className += " snake";
else if (isFood) className += " food";

return <div className={className}></div>;
}
