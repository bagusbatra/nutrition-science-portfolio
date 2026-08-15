import React, { createContext, useContext, useEffect, useState } from 'react';
import { clinicalCases as defaultClinicalCases } from '../data/portfolioData';
import { ClinicalCase } from '../types';

const ClinicalCasesContext = createContext<ClinicalCase[]>(defaultClinicalCases);

export const ClinicalCasesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ClinicalCase[]>(defaultClinicalCases);

  useEffect(() => {
    fetch('/api/content/kasus')
      .then((res) => res.json())
      .then((json: any[]) => setData(json.map((c) => ({ ...c, id: c._id }))))
      .catch(() => {});
  }, []);

  return <ClinicalCasesContext.Provider value={data}>{children}</ClinicalCasesContext.Provider>;
};

export const useClinicalCases = () => useContext(ClinicalCasesContext);
