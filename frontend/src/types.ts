export interface SkripsiData {
  title: string;
  subTitle: string;
  advisor: string[];
  status: string;
  completionDate: string;
  abstract: string;
  hypotheses: string[];
  formulations: {
    code: string;
    ratio: string;
    kelorPercent: number;
    bekatulPercent: number;
    mocafPercent: number;
    organolepticScore: {
      warna: number;
      aroma: number;
      rasa: number;
      tekstur: number;
      overall: number;
    };
    proximate: {
      fe: number; // mg per 100g
      protein: number; // g
      serat: number; // g
      lemak: number; // g
      energi: number; // kkal
    };
    isBestChoice?: boolean;
  }[];
  keyTakeaways: string[];
}

export interface ClinicalCase {
  id: string;
  code: string;
  title: string;
  patientProfile: {
    initial: string;
    age: number;
    gender: 'Laki-laki' | 'Perempuan';
    room: string;
    medicalDiagnosis: string;
    dietOrder: string;
  };
  adime: {
    assessment: {
      antropometri: string;
      biokimia: { test: string; result: string; normal: string; status: 'normal' | 'high' | 'low' }[];
      fisikKlinis: string;
      dietaryHistory: string;
    };
    diagnosisPES: {
      problem: string;
      etiology: string;
      signsSymptoms: string;
      formattedPES: string;
    };
    intervention: {
      tujuanDiet: string[];
      prinsipSyaratDiet: string[];
      perhitunganKebutuhan: {
        energi: string;
        protein: string;
        lemak: string;
        karbohidrat: string;
        cairan: string;
      };
      menuContoh: {
        waktu: string;
        menu: string;
        komposisi: string;
      }[];
    };
    monitoringEvaluasi: string[];
    keyLearning?: string;
  };
  keyLearning?: string;
}

export interface RotationExperience {
  id: string;
  category: 'Klinis (Dietetik RS)' | 'MSPM (Food Service)' | 'Gizi Masyarakat (Puskesmas)' | 'Akademik & Riset';
  institution: string;
  period: string;
  role: string;
  location: string;
  badges: string[];
  achievements: string[];
  highlightMetric: string;
  iconName: string;
}

export interface MediaInfographic {
  id: string;
  title: string;
  category: 'Leaflet Pasien' | 'Poster Edukasi' | 'Formulasi Pangan' | 'Media Digital';
  targetAudience: string;
  description: string;
  keyPoints: string[];
  thumbnailBg: string;
  accentColor: string;
  dimensions: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string; // e.g. "Teman Angkatan", "Dosen / Penguji", "Junior Gizi", "Keluarga"
  message: string;
  timestamp: string;
  emoji: string;
}
