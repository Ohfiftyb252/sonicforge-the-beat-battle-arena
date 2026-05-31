import React, { useState } from 'react';
import { Zap, Ghost, Waves, ArrowRightLeft, Play } from 'lucide-react';
import { useLab } from '@/context/LabContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
const MUTATIONS = [
  { id: 'vocal-grain', title: 'Vocal Grain Lead', icon: Zap, color: 'text-safety-yellow', desc: 'Granular synthesis engine for texture.' },
  { id: 'reverse-rise', title: 'Reverse Stretch Riser', icon: ArrowRightLeft, color: 'text-mutant-red', desc: 'Spectral time-stretch with feedback.' },
  { id: 'break-tighten', title: 'Break Tightener', icon: Waves, color: 'text-white', desc: 'Multiband transient shaping for drums.' },
  { id: 'ghost-tex', title: 'Ghost Texture', icon: Ghost, color: 'text-muted-foreground', desc: 'Diffused reverb wash with pitch wobble.' }
];
export function MutateTab() {
  const { trimmedBuffer } = useLab();
  const [params, setParams] = useState<Record<string, number>>({ grain: 50, feedback: 30 });
  if (!trimmedBuffer) {
    return (
      <div className="py-20 text-center lab-card">
        <p className="font-retro text-xl uppercase opacity-50">Locked: No Committed Source Material</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {MUTATIONS.map((m) => {
        const Icon = m.icon;
        return (
          <Card key={m.id} className="lab-card rounded-none group hover:border-safety-yellow/50 overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 border-b border-safety-yellow/10">
              <div className={`p-3 bg-black border border-safety-yellow/20 ${m.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="font-retro text-2xl uppercase tracking-tighter">{m.title}</CardTitle>
                <div className="text-[10px] font-mono text-muted-foreground uppercase">Module_Type: Working</div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="font-mono text-xs text-muted-foreground">{m.desc}</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span>Intensity</span>
                    <span>{params.grain}%</span>
                  </div>
                  <Slider value={[params.grain]} onValueChange={v => setParams({...params, grain: v[0]})} max={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span>Flux Rate</span>
                    <span>BASIC_PLACEHOLDER</span>
                  </div>
                  <Slider defaultValue={[50]} disabled max={100} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex gap-4">
              <Button className="btn-industrial flex-1 h-12">
                <Play className="w-4 h-4 mr-2" />
                Preview Effect
              </Button>
              <Button variant="ghost" className="h-12 border border-white/5 font-retro text-xs uppercase">
                Render To Lab
              </Button>
            </CardFooter>
            <div className="h-1 border-safety w-full" />
          </Card>
        );
      })}
    </div>
  );
}