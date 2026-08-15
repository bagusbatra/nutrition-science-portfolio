import React, { createContext, useContext, useEffect, useState } from 'react';
import { rotationExperiences as defaultRotations } from '../data/portfolioData';
import { RotationExperience } from '../types';

const RotationsContext = createContext<RotationExperience[]>(defaultRotations);

export const RotationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RotationExperience[]>(defaultRotations);

  useEffect(() => {
    fetch('/api/content/rotasi')
      .then((res) => res.json())
      .then((json: any[]) => setData(json.map((r) => ({ ...r, id: r._id }))))
      .catch(() => {});
  }, []);

  return <RotationsContext.Provider value={data}>{children}</RotationsContext.Provider>;
};

export const useRotations = () => useContext(RotationsContext);
