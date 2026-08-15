import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import {AdminAuthGuard} from './admin/AdminAuthGuard';
import {AdminLayout} from './admin/AdminLayout';
import {AdminPlaceholderPage} from './admin/AdminPlaceholderPage';
import {adminSections} from './admin/adminNav';
import {LoginPage} from './admin/LoginPage';
import {PersonalInfoAdmin} from './admin/sections/PersonalInfoAdmin';
import {SkripsiAdmin} from './admin/sections/SkripsiAdmin';
import {ClinicalCasesAdmin} from './admin/sections/ClinicalCasesAdmin';
import {RotationsAdmin} from './admin/sections/RotationsAdmin';
import {MediaAdmin} from './admin/sections/MediaAdmin';
import {PublicDataProviders} from './context/PublicDataProviders';

// Each iteration adds its finished admin page here; sections not yet listed
// fall back to the "belum dikerjakan" placeholder.
const implementedAdminPages: Partial<Record<string, React.ComponentType>> = {
  identitas: PersonalInfoAdmin,
  skripsi: SkripsiAdmin,
  kasus: ClinicalCasesAdmin,
  rotasi: RotationsAdmin,
  galeri: MediaAdmin,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicDataProviders>
              <App />
            </PublicDataProviders>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminAuthGuard />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="identitas" replace />} />
            {adminSections.map((section) => {
              const SectionComponent = implementedAdminPages[section.path];
              return (
                <Route
                  key={section.path}
                  path={section.path}
                  element={
                    SectionComponent ? (
                      <SectionComponent />
                    ) : (
                      <AdminPlaceholderPage title={section.label} iterationLabel={section.iterationLabel} />
                    )
                  }
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
