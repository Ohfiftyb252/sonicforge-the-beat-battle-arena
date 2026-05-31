import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, Zap, Trophy, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_BEATS } from '@shared/mock-data';
import { BeatCard } from '@/components/BeatCard';
export function HomePage() {
  const featuredBeats = MOCK_BEATS.slice(0, 4);
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
        <div className="text-center space-y-8 z-10">
          <h1 className="text-6xl md:text-8xl font-retro text-neon-purple tracking-tighter animate-pulse">
            SONIC FORGE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl mx-auto uppercase tracking-widest">
            Enter the arena. Forge your sound. Dominate the battle.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="btn-retro-primary text-xl px-10 h-16">
              <Link to="/explore">EXPLORE BEATS</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 text-xl px-10 h-16">
              <Link to="/battles">JOIN BATTLE</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="flex items-center justify-between border-b border-neon-purple/30 pb-4">
          <h2 className="text-3xl font-retro text-neon-purple flex items-center gap-3 uppercase">
            <Music className="w-8 h-8" /> Trending Beats
          </h2>
          <Link to="/explore" className="text-neon-cyan hover:underline font-mono text-sm uppercase">View All -{'>'}</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      </section>
      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20 bg-muted/30 border-y border-neon-cyan/20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neon-purple/20 border border-neon-purple rounded-none mx-auto flex items-center justify-center">
              <Zap className="text-neon-purple w-8 h-8" />
            </div>
            <h3 className="text-xl font-retro uppercase">High Fidelity</h3>
            <p className="text-muted-foreground font-mono text-sm">Lossless audio processing at the edge. Experience every transient.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-neon-cyan/20 border border-neon-cyan rounded-none mx-auto flex items-center justify-center">
              <Trophy className="text-neon-cyan w-8 h-8" />
            </div>
            <h3 className="text-xl font-retro uppercase">Global Battles</h3>
            <p className="text-muted-foreground font-mono text-sm">Compete against the world's best producers in themed arenas.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-electric-orange/20 border border-electric-orange rounded-none mx-auto flex items-center justify-center">
              <User className="text-electric-orange w-8 h-8" />
            </div>
            <h3 className="text-xl font-retro uppercase">Forge Identity</h3>
            <p className="text-muted-foreground font-mono text-sm">Build your profile, gain followers, and sell your signature kits.</p>
          </div>
        </div>
      </section>
    </div>
  );
}