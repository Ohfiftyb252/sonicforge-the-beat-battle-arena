import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { User, Beat } from '@shared/types';
import { Trophy, Music, Award, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BeatCard } from '@/components/BeatCard';
export function ProducerProfilePage() {
  const { id } = useParams();
  const { data: producer, isLoading: loadingProducer } = useQuery<User>({
    queryKey: ['producer', id],
    queryFn: () => api<User>(`/api/users/${id}`)
  });
  const { data: beatsData, isLoading: loadingBeats } = useQuery<{ items: Beat[] }>({
    queryKey: ['producer-beats', id],
    queryFn: () => api<{ items: Beat[] }>(`/api/beats`) // Filtering would happen in a real backend
  });
  const beats = beatsData?.items?.filter(b => b.producerId === id) || [];
  if (loadingProducer) return <div className="p-20 text-center font-retro text-2xl animate-pulse">RETRIEVING PROFILE...</div>;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Profile Header */}
      <div className="relative border-4 border-neon-cyan p-8 bg-black/40 shadow-neon-glow flex flex-col md:flex-row items-center gap-10">
        <div className="w-32 h-32 bg-neon-purple border-2 border-white/20 flex items-center justify-center">
          <User className="w-16 h-16 text-black" />
        </div>
        <div className="flex-grow space-y-2 text-center md:text-left">
          <h1 className="text-5xl font-retro text-white uppercase tracking-tighter">{producer?.name || 'UNKNOWN_ENTITY'}</h1>
          <p className="text-muted-foreground font-mono max-w-xl">
            {producer?.bio || "Senior sonic architect specialized in algorithmic rhythm construction and high-fidelity transients."}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
            <div className="text-center">
              <div className="text-xs font-mono text-muted-foreground uppercase">Beats</div>
              <div className="text-xl font-retro text-neon-cyan">{beats.length}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-mono text-muted-foreground uppercase">Victories</div>
              <div className="text-xl font-retro text-neon-purple">12</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-mono text-muted-foreground uppercase">Reputation</div>
              <div className="text-xl font-retro text-electric-orange">4.8k</div>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="beats" className="w-full">
        <TabsList className="bg-transparent border-b border-white/10 w-full justify-start rounded-none h-14 gap-8">
          <TabsTrigger value="beats" className="rounded-none border-b-2 border-transparent data-[state=active]:border-neon-cyan data-[state=active]:bg-transparent font-retro text-xl uppercase tracking-widest text-muted-foreground data-[state=active]:text-neon-cyan">
            <Music className="w-5 h-5 mr-2" /> DISCOGRAPHY
          </TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-neon-purple data-[state=active]:bg-transparent font-retro text-xl uppercase tracking-widest text-muted-foreground data-[state=active]:text-neon-purple">
            <Award className="w-5 h-5 mr-2" /> BADGES
          </TabsTrigger>
        </TabsList>
        <TabsContent value="beats" className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beats.map(beat => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="achievements" className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square border border-neon-purple/20 bg-muted/20 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <Trophy className="w-8 h-8 text-neon-purple" />
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">BATTLE_WINNER_V{i}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}