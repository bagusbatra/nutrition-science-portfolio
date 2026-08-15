import React, { createContext, useContext, useEffect, useState } from 'react';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';

export type PersonalInfo = typeof defaultPersonalInfo;

const PersonalInfoContext = createContext<PersonalInfo>(defaultPersonalInfo);

export const PersonalInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PersonalInfo>(defaultPersonalInfo);

  useEffect(() => {
    fetch('/api/content/identitas')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  return <PersonalInfoContext.Provider value={data}>{children}</PersonalInfoContext.Provider>;
};

export const usePersonalInfo = () => useContext(PersonalInfoContext);
