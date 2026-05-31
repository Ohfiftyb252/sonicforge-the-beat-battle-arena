import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { Beat } from '@shared/types';
interface AudioPlayerContextType {
  currentBeat: Beat | null;
  isPlaying: boolean;
  playBeat: (beat: Beat) => void;
  pauseBeat: () => void;
}
export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);
export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playBeat = useCallback((beat: Beat) => {
    setCurrentBeat(beat);
    setIsPlaying(true);
  }, []);
  const pauseBeat = useCallback(() => {
    setIsPlaying(false);
  }, []);
  return (
    <AudioPlayerContext.Provider value={{ currentBeat, isPlaying, playBeat, pauseBeat }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}