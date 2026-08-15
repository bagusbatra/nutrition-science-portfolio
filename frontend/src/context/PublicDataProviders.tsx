import React from 'react';
import { PersonalInfoProvider } from './PersonalInfoContext';
import { SkripsiProvider } from './SkripsiContext';
import { ClinicalCasesProvider } from './ClinicalCasesContext';
import { RotationsProvider } from './RotationsContext';
import { MediaProvider } from './MediaContext';
import { SkillsProvider } from './SkillsContext';

// Composes every public-site data provider in one place so main.tsx doesn't have to
// grow a new level of nesting each iteration — add new providers here instead.
export const PublicDataProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PersonalInfoProvider>
    <SkripsiProvider>
      <ClinicalCasesProvider>
        <RotationsProvider>
          <MediaProvider>
            <SkillsProvider>{children}</SkillsProvider>
          </MediaProvider>
        </RotationsProvider>
      </ClinicalCasesProvider>
    </SkripsiProvider>
  </PersonalInfoProvider>
);
