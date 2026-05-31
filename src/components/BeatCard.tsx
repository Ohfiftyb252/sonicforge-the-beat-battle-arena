import React from 'react';
import { Play, Pause, Disc } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beat } from '@shared/types';
import { useAudioPlayer } from '@/hooks/use-audio-player';
interface BeatCardProps {
  beat: Beat;
}
export function BeatCard({ beat }: BeatCardProps) {
  const { currentBeat, isPlaying, playBeat, pauseBeat } = useAudioPlayer();
  const isThisPlaying = currentBeat?.id === beat.id && isPlaying;
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isThisPlaying) {
      pauseBeat();
    } else {
      playBeat(beat);
    }
  };
  return (
    <Card className="card-retro group overflow-hidden flex flex-col h-full rounded-none">
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src={beat.coverArtUrl} 
          alt={beat.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            onClick={handleToggle}
            className="w-16 h-16 rounded-none bg-neon-cyan text-black hover:bg-white hover:shadow-neon-glow"
          >
            {isThisPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
          </Button>
        </div>
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-neon-cyan/30 text-[10px] font-mono text-neon-cyan">
          {beat.bpm} BPM
        </div>
      </div>
      <CardContent className="p-4 flex-grow space-y-1">
        <h3 className="text-lg font-retro text-neon-cyan truncate">{beat.title}</h3>
        <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
          <Disc className="w-3 h-3" /> {beat.producerName}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-[10px] font-mono text-neon-purple border border-neon-purple/30 px-2 py-0.5 uppercase">
          {beat.genre}
        </span>
        <button className="text-[10px] font-mono text-muted-foreground hover:text-white uppercase transition-colors">
          View Detail
        </button>
      </CardFooter>
    </Card>
  );
}