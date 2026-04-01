import { useEffect, useRef } from "react";

export default function useControls(setDirection) {
     const hasInteractedRef = useRef(false);
  useEffect(() => {
   
    const handleKey = (e) => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        // now allow sound
      }
      setDirection((prev) => {
        switch (e.key) {
          case "ArrowUp":
            return prev !== "DOWN" ? "UP" : prev;
          case "ArrowDown":
            return prev !== "UP" ? "DOWN" : prev;
          case "ArrowLeft":
            return prev !== "RIGHT" ? "LEFT" : prev;
          case "ArrowRight":
            return prev !== "LEFT" ? "RIGHT" : prev;
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setDirection]);

  window.addEventListener("keydown", () => {
    new Audio().play().catch(() => {});
  });
}
