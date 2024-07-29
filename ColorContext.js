import React, { createContext, useState, useContext } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [safetyVariable, setSafetyVariable] = useState(1); // Example value

  const getColor = () => {
    if (safetyVariable < 2) {
      return '#00C853'; // Green
    } else if (safetyVariable >= 2 && safetyVariable <= 30) {
      return '#FFD700'; // Yellow
    } else {
      return '#FF3B30'; // Red
    }
  };

  return (
    <ColorContext.Provider value={{ getColor, safetyVariable, setSafetyVariable }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);
