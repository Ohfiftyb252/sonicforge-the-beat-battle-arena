import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
export interface ChopRegion {
  id: string;
  name: string;
  start: number;
  end: number;
}
interface LabContextType {
  sourceBuffer: AudioBuffer | null;
  trimmedBuffer: AudioBuffer | null;
  chops: ChopRegion[];
  isLoading: boolean;
  setSourceBuffer: (buffer: AudioBuffer | null) => void;
  setTrimmedBuffer: (buffer: AudioBuffer | null) => void;
  addChop: (chop: ChopRegion) => void;
  removeChop: (id: string) => void;
  setLoading: (loading: boolean) => void;
}
const LabContext = createContext<LabContextType | undefined>(undefined);
export function LabProvider({ children }: { children: ReactNode }) {
  const [sourceBuffer, setSourceBuffer] = useState<AudioBuffer | null>(null);
  const [trimmedBuffer, setTrimmedBuffer] = useState<AudioBuffer | null>(null);
  const [chops, setChops] = useState<ChopRegion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const addChop = useCallback((chop: ChopRegion) => {
    setChops(prev => [...prev, chop]);
  }, []);
  const removeChop = useCallback((id: string) => {
    setChops(prev => prev.filter(c => c.id !== id));
  }, []);
  const value = {
    sourceBuffer,
    trimmedBuffer,
    chops,
    isLoading,
    setSourceBuffer,
    setTrimmedBuffer,
    addChop,
    removeChop,
    setLoading: setIsLoading
  };
  return <LabContext.Provider value={value}>{children}</LabContext.Provider>;
}
export function useLab() {
  const context = useContext(LabContext);
  if (context === undefined) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
}