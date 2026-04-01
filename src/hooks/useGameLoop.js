import { useEffect, useRef } from "react";

export default function useGameLoop(callback, speed) {
  const requestRef = useRef();
  const lastTimeRef = useRef(0);

  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const loop = (time) => {
      if (time - lastTimeRef.current >= speed) {
        savedCallback.current();
        lastTimeRef.current = time; // 🔥 no accumulation = no spikes
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(requestRef.current);
  }, [speed]);
}