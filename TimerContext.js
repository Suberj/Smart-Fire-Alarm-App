import React, { createContext, useState, useContext, useEffect } from 'react';

const TimerContext = createContext();


export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [color, setColor] = useState('#00C853'); // Green by default

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    // Update color based on timer value
    if (timer >= 30) {
      setColor('#FF3B30'); // Red
    } else if (timer >= 2) {
      setColor('#FFD700'); // Yellow
    } else {
      setColor('#00C853'); // Green
    }
  }, [timer]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
    setColor('#00C853'); // Reset to Green
  };

  return (
    <TimerContext.Provider value={{ timer, isRunning, startTimer, stopTimer, resetTimer, color }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
