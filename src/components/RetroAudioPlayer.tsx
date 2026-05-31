import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, Loader2 } from 'lucide-react';
import { Howl } from 'howler';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Slider } from '@/components/ui/slider';
export function RetroAudioPlayer() {
  const { currentBeat, isPlaying, pauseBeat, playBeat } = useAudioPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const animationRef = useRef<number>();
  useEffect(() => {
    if (!currentBeat) return;
    if (soundRef.current) {
      soundRef.current.unload();
    }
    setIsLoading(true);
    soundRef.current = new Howl({
      src: [currentBeat.audioUrl],
      html5: true,
      onload: () => {
        setDuration(soundRef.current?.duration() || 0);
        setIsLoading(false);
      },
      onend: () => pauseBeat()
    });
    if (isPlaying) soundRef.current.play();
    return () => {
      soundRef.current?.unload();
    };
  }, [currentBeat?.id]);
  useEffect(() => {
    if (isPlaying) {
      soundRef.current?.play();
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
        {/* Track Info */}
        <div className="hidden md:flex items-center gap-4 w-64">
          <img src={currentBeat.coverArtUrl} className="w-12 h-12 border border-neon-cyan/50" alt="" />
          <div className="truncate">
            <div className="text-neon-cyan font-retro text-sm truncate">{currentBeat.title}</div>
            <div className="text-muted-foreground font-mono text-[10px] truncate uppercase">{currentBeat.producerName}</div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex items-center justify-center gap-6">
            <button className="text-muted-foreground hover:text-neon-cyan"><SkipBack className="w-5 h-5" /></button>
            <button 
              onClick={() => isPlaying ? pauseBeat() : playBeat(currentBeat)}
              className="w-10 h-10 rounded-none bg-neon-purple text-white flex items-center justify-center hover:shadow-glow"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button className="text-muted-foreground hover:text-neon-cyan"><SkipForward className="w-5 h-5" /></button>
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
        {/* Volume */}
        <div className="hidden lg:flex items-center gap-4 w-48">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider defaultValue={[80]} max={100} className="w-24" />
        </div>
      </div>
    </div>
  );
}