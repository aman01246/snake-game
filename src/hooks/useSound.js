import { useRef } from "react";

export default function useSound(src) {
  const audioRef = useRef(new Audio(src));

  const play = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; // restart sound
    audio.play();
  };

  return play;
}