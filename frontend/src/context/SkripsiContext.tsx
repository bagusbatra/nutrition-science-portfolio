import React, { createContext, useContext, useEffect, useState } from 'react';
import { skripsiResearch as defaultSkripsiResearch } from '../data/portfolioData';

export type SkripsiResearch = typeof defaultSkripsiResearch;

const SkripsiContext = createContext<SkripsiResearch>(defaultSkripsiResearch);

export const SkripsiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SkripsiResearch>(defaultSkripsiResearch);

  useEffect(() => {
    fetch('/api/content/skripsi')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  return <SkripsiContext.Provider value={data}>{children}</SkripsiContext.Provider>;
};

export const useSkripsi = () => useContext(SkripsiContext);
