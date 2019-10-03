import { useState } from "react";

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if(!replace){
      history.push(newMode);
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      history.pop(history[history.length - 1]);
    }
    setMode(history[history.length-1]);
  }

  return { mode, transition, back };
}
