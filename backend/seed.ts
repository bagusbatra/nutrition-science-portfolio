import {
  personalInfo,
  skripsiResearch,
  clinicalCases,
  rotationExperiences,
  mediaInfographics,
  skillsAndCompetencies,
} from '../frontend/src/data/portfolioData';
import { PersonalInfoModel } from './models/PersonalInfo';
import { SkripsiResearchModel } from './models/SkripsiResearch';
import { ClinicalCaseModel } from './models/ClinicalCase';
import { RotationExperienceModel } from './models/RotationExperience';
import { MediaInfographicModel } from './models/MediaInfographic';
import { SkillsAndCompetenciesModel } from './models/SkillsAndCompetencies';
import { SectionVisibilityModel } from './models/SectionVisibility';

// Seeds each content collection from the original static portfolioData.ts values,
// but only the first time (collection empty) so admin edits are never overwritten.
export async function seedIfEmpty() {
  const personalInfoCount = await PersonalInfoModel.countDocuments();
  if (personalInfoCount === 0) {
    await PersonalInfoModel.create(personalInfo);
    console.log('[seed] PersonalInfo seeded from portfolioData.ts');
  }

  const skripsiCount = await SkripsiResearchModel.countDocuments();
  if (skripsiCount === 0) {
    await SkripsiResearchModel.create(skripsiResearch);
    console.log('[seed] SkripsiResearch seeded from portfolioData.ts');
  }

  const clinicalCaseCount = await ClinicalCaseModel.countDocuments();
  if (clinicalCaseCount === 0) {
    // Mongo generates its own _id, so drop the static "id" field before inserting.
    await ClinicalCaseModel.insertMany(clinicalCases.map(({ id, ...rest }) => rest));
    console.log('[seed] ClinicalCase seeded from portfolioData.ts');
  }

  const rotationCount = await RotationExperienceModel.countDocuments();
  if (rotationCount === 0) {
    await RotationExperienceModel.insertMany(rotationExperiences.map(({ id, ...rest }) => rest));
    console.log('[seed] RotationExperience seeded from portfolioData.ts');
  }

  const mediaCount = await MediaInfographicModel.countDocuments();
  if (mediaCount === 0) {
    await MediaInfographicModel.insertMany(mediaInfographics.map(({ id, ...rest }) => rest));
    console.log('[seed] MediaInfographic seeded from portfolioData.ts');
  }

  const skillsCount = await SkillsAndCompetenciesModel.countDocuments();
  if (skillsCount === 0) {
    await SkillsAndCompetenciesModel.create(skillsAndCompetencies);
    console.log('[seed] SkillsAndCompetencies seeded from portfolioData.ts');
  }

  const sectionVisibilityCount = await SectionVisibilityModel.countDocuments();
  if (sectionVisibilityCount === 0) {
    // Not derived from portfolioData.ts — this is admin-only settings state, not narrative
    // content, so it seeds with everything visible by default rather than a static source.
    await SectionVisibilityModel.create({
      skripsi: true, workbench: true, cases: true, rotations: true, media: true, skills: true,
    });
    console.log('[seed] SectionVisibility seeded (all sections visible by default)');
  }
}
