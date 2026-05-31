import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, Loader2, AlertCircle } from 'lucide-react';
import { Howl } from 'howler';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Slider } from '@/components/ui/slider';
export function RetroAudioPlayer() {
  const { currentBeat, isPlaying, pauseBeat, playBeat } = useAudioPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const soundRef = useRef<Howl | null>(null);
  const animationRef = useRef<number>();
  const cleanup = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.unload();
      soundRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);
  useEffect(() => {
    if (!currentBeat) return;
    cleanup();
    setIsLoading(true);
    setError(null);
    soundRef.current = new Howl({
      src: [currentBeat.audioUrl],
      html5: true,
      onload: () => {
        setDuration(soundRef.current?.duration() || 0);
        setIsLoading(false);
      },
      onloaderror: () => {
        setIsLoading(false);
        setError("SOURCE_LINK_FAILURE");
        pauseBeat();
      },
      onend: () => pauseBeat()
    });
    if (isPlaying) {
      soundRef.current.play();
    }
    return cleanup;
  }, [currentBeat?.id, cleanup, pauseBeat, isPlaying]);
  useEffect(() => {
    if (isPlaying && soundRef.current) {
      soundRef.current.play();
      const updateProgress = () => {
        const seek = soundRef.current?.seek() as number;
        setProgress(seek || 0);
        animationRef.current = requestAnimationFrame(updateProgress);
      };
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      soundRef.current?.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);
  const handleSeek = (val: number[]) => {
    const newSeek = val[0];
    soundRef.current?.seek(newSeek);
    setProgress(newSeek);
  };
  if (!currentBeat) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full z-[60] bg-dark-bg/95 backdrop-blur-xl border-t border-neon-purple/40 p-4">
      <div className="max-w-7xl mx-auto flex items-center gap-8">
        <div className="hidden md:flex items-center gap-4 w-64">
          <div className="relative w-12 h-12 border border-neon-cyan/50">
            <img src={currentBeat.coverArtUrl} className="w-full h-full object-cover" alt="" />
            {error && <div className="absolute inset-0 bg-red-950/80 flex items-center justify-center"><AlertCircle className="w-4 h-4 text-red-500" /></div>}
          </div>
          <div className="truncate">
            <div className="text-neon-cyan font-retro text-sm truncate uppercase">{currentBeat.title}</div>
            <div className="text-muted-foreground font-mono text-[10px] truncate uppercase">{currentBeat.producerName}</div>
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex items-center justify-center gap-6">
            <button className="text-muted-foreground hover:text-neon-cyan transition-colors"><SkipBack className="w-5 h-5" /></button>
            <button 
              onClick={() => isPlaying ? pauseBeat() : playBeat(currentBeat)}
              className="w-10 h-10 rounded-none bg-neon-purple text-white flex items-center justify-center hover:shadow-glow transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button className="text-muted-foreground hover:text-neon-cyan transition-colors"><SkipForward className="w-5 h-5" /></button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-neon-cyan w-10 text-right">
              {Math.floor(progress / 60)}:{(Math.floor(progress % 60)).toString().padStart(2, '0')}
            </span>
            <Slider 
              value={[progress]} 
              max={duration || 100} 
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <span className="text-[10px] font-mono text-muted-foreground w-10">
              {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-4 w-48">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider defaultValue={[80]} max={100} className="w-24" />
        </div>
      </div>
    </div>
  );
}