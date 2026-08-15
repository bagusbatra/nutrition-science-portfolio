import React, { createContext, useContext, useEffect, useState } from 'react';
import { mediaInfographics as defaultMedia } from '../data/portfolioData';
import { MediaInfographic } from '../types';

const MediaContext = createContext<MediaInfographic[]>(defaultMedia);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MediaInfographic[]>(defaultMedia);

  useEffect(() => {
    fetch('/api/content/galeri')
      .then((res) => res.json())
      .then((json: any[]) => setData(json.map((m) => ({ ...m, id: m._id }))))
      .catch(() => {});
  }, []);

  return <MediaContext.Provider value={data}>{children}</MediaContext.Provider>;
};

export const useMedia = () => useContext(MediaContext);
