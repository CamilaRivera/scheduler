import { useState } from "react";

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode, replace = false) {
    if(!replace){
      setHistory(prev => prev.concat(newMode));
    }
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = prev.slice(0, -1);
        setMode(newHistory[newHistory.length-1]);
        return newHistory;
      });
    } 
  }

  return { mode, transition, back };
}
