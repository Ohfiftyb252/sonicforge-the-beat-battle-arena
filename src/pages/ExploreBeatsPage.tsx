import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MOCK_BEATS } from '@shared/mock-data';
import { BeatCard } from '@/components/BeatCard';
export function ExploreBeatsPage() {
  const [search, setSearch] = useState('');
  const filteredBeats = MOCK_BEATS.filter(beat => 
    beat.title.toLowerCase().includes(search.toLowerCase()) ||
    beat.producerName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-retro text-neon-cyan uppercase">Explore The Forge</h1>
          <p className="text-muted-foreground font-mono max-w-xl">
            Browse our catalog of community-submitted beats. Filter by genre, BPM, or discover trending talent.
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-cyan/50" />
            <Input 
              placeholder="SEARCH THE DATABASE..." 
              className="input-terminal pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-colors">
            <SlidersHorizontal className="w-6 h-6 text-neon-cyan" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBeats.length > 0 ? (
          filteredBeats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-neon-cyan/20">
            <p className="text-2xl font-retro text-muted-foreground uppercase">No match found in the forge archives.</p>
          </div>
        )}
      </div>
    </div>
  );
}