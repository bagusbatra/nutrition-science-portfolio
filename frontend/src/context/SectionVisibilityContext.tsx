import React, { createContext, useContext, useEffect, useState } from 'react';

export interface SectionVisibility {
  skripsi: boolean;
  workbench: boolean;
  cases: boolean;
  rotations: boolean;
  media: boolean;
  skills: boolean;
}

// Fallback: everything visible, so a slow/unreachable API never hides content by accident.
const defaultVisibility: SectionVisibility = {
  skripsi: true,
  workbench: true,
  cases: true,
  rotations: true,
  media: true,
  skills: true,
};

const SectionVisibilityContext = createContext<SectionVisibility>(defaultVisibility);

export const SectionVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState<SectionVisibility>(defaultVisibility);

  useEffect(() => {
    fetch('/api/settings/sections')
      .then((res) => res.json())
      .then((data) => setVisibility({ ...defaultVisibility, ...data }))
      .catch(() => {});
  }, []);

  return <SectionVisibilityContext.Provider value={visibility}>{children}</SectionVisibilityContext.Provider>;
};

export const useSectionVisibility = () => useContext(SectionVisibilityContext);
