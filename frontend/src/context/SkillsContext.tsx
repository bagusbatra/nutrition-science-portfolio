import React, { createContext, useContext, useEffect, useState } from 'react';
import { skillsAndCompetencies as defaultSkills } from '../data/portfolioData';

export type SkillsAndCompetencies = typeof defaultSkills;

const SkillsContext = createContext<SkillsAndCompetencies>(defaultSkills);

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SkillsAndCompetencies>(defaultSkills);

  useEffect(() => {
    fetch('/api/content/kompetensi')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  return <SkillsContext.Provider value={data}>{children}</SkillsContext.Provider>;
};

export const useSkills = () => useContext(SkillsContext);
