import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Beat } from '@shared/types';
import { Play, Calendar, User, Hash, MessageSquare } from 'lucide-react';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
export function BeatDetailPage() {
  const { id } = useParams();
  const { playBeat, currentBeat, isPlaying } = useAudioPlayer();
  const { data: beat, isLoading } = useQuery<Beat>({
    queryKey: ['beat', id],
    queryFn: () => api<Beat>(`/api/beats/${id}`)
  });
  if (isLoading) return <div className="max-w-7xl mx-auto p-12 text-center font-retro text-2xl animate-pulse">ACCESSING FORGE DATA...</div>;
  if (!beat) return <div className="max-w-7xl mx-auto p-12 text-center font-retro text-2xl">BEAT_NOT_FOUND</div>;
  const isThisPlaying = currentBeat?.id === beat.id && isPlaying;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visuals & Stats */}
        <div className="lg:col-span-5 space-y-8">
          <div className="relative aspect-square border-4 border-neon-cyan shadow-neon-glow overflow-hidden">
            <img src={beat.coverArtUrl} className="w-full h-full object-cover" alt={beat.title} />
            <Button 
              onClick={() => playBeat(beat)}
              className="absolute bottom-6 right-6 w-16 h-16 rounded-none bg-neon-purple text-white hover:scale-110 transition-transform"
            >
              <Play className="fill-current w-8 h-8" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 border border-white/5">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">BPM</div>
              <div className="text-2xl font-retro text-neon-cyan">{beat.bpm}</div>
            </div>
            <div className="bg-muted/50 p-4 border border-white/5">
              <div className="text-[10px] font-mono text-muted-foreground uppercase">GENRE</div>
              <div className="text-xl font-retro text-neon-purple uppercase">{beat.genre}</div>
            </div>
          </div>
        </div>
        {/* Right Column: Details & Comments */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <h1 className="text-6xl font-retro text-white tracking-tighter uppercase leading-none">{beat.title}</h1>
            <div className="flex items-center gap-6 text-muted-foreground font-mono text-sm">
              <Link to={`/profile/${beat.producerId}`} className="flex items-center gap-2 hover:text-neon-cyan transition-colors">
                <User className="w-4 h-4" /> {beat.producerName.toUpperCase()}
              </Link>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(beat.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
              {beat.description || "Experimental sonic profile forged in the deep archives. Optimized for high-fidelity playback systems."}
            </p>
          </div>
          <Separator className="bg-neon-cyan/10" />
          <div className="space-y-6">
            <h3 className="text-2xl font-retro text-neon-cyan flex items-center gap-3 uppercase">
              <MessageSquare className="w-6 h-6" /> Transmission Logs
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
              {(beat.comments || []).length > 0 ? (
                beat.comments?.map(c => (
                  <div key={c.id} className="bg-black/40 border border-white/5 p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neon-purple font-mono text-xs uppercase">{c.userName}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{new Date(c.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">{c.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border border-dashed border-white/10 opacity-40 font-mono text-sm">
                  NO TRANSMISSIONS RECORDED YET.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}