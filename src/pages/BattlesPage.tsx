import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Clock, Users, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Battle } from '@shared/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export function BattlesPage() {
  const { data: battles, isLoading } = useQuery<Battle[]>({
    queryKey: ['battles'],
    queryFn: () => api<Battle[]>('/api/battles').then(res => (res as any).items || res)
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      <div className="border-l-4 border-neon-purple pl-6 py-2">
        <h1 className="text-5xl font-retro text-neon-purple uppercase tracking-tighter">Battle Arena</h1>
        <p className="text-muted-foreground font-mono mt-2">Enter themed competitions. Prove your skill. Win the prize.</p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => <div key={i} className="h-64 bg-muted animate-pulse border border-neon-cyan/20" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {battles?.map((battle) => (
            <Card key={battle.id} className="card-retro group rounded-none border-2">
              <div className="relative h-48 overflow-hidden bg-black">
                <img src={battle.coverUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt={battle.title} />
                <div className="absolute top-4 left-4">
                  <Badge variant={battle.status === 'active' ? 'default' : 'secondary'} className={battle.status === 'active' ? 'bg-neon-cyan text-black' : 'bg-muted'}>
                    {battle.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-3xl font-retro text-neon-cyan uppercase">{battle.title}</h2>
                <p className="text-muted-foreground font-mono text-sm line-clamp-2">{battle.description}</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-neon-purple">
                    <Clock className="w-4 h-4" /> 
                    {battle.status === 'active' ? 'ENDS IN 2 DAYS' : 'COMPLETED'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Trophy className="w-4 h-4" /> {battle.prize || 'REPUTATION'}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link 
                  to={`/battles/${battle.id}`}
                  className="w-full py-3 border-2 border-neon-cyan text-neon-cyan font-retro text-center hover:bg-neon-cyan hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  VIEW BATTLE ARCHIVE <ExternalLink className="w-4 h-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}