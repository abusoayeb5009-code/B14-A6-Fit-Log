import React, { createContext } from 'react';

export const FitlogContext = createContext(null);

export const FitlogProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FitlogContext.Provider value={null}>
      {children}
    </FitlogContext.Provider>
  );
};