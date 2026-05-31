import React, { useState } from 'react';
import { Grid, Scissors, Play, Layers } from 'lucide-react';
import { useLab } from '@/context/LabContext';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
export function ChopTab() {
  const { trimmedBuffer } = useLab();
  const [mode, setMode] = useState('grid');
  const [gridSize, setGridSize] = useState('16');
  if (!trimmedBuffer) {
    return (
      <div className="py-20 text-center lab-card">
        <p className="font-retro text-xl uppercase opacity-50">Locked: No Source Available for Chopping</p>
      </div>
    );
  }
  const pads = Array.from({ length: parseInt(gridSize) }, (_, i) => i + 1);
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="lab-card p-6 md:w-80 space-y-6">
          <div className="text-warning text-sm">CHOP_CONFIGURATION</div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Detection Mode</div>
              <ToggleGroup type="single" value={mode} onValueChange={v => v && setMode(v)} className="justify-start">
                <ToggleGroupItem value="transient" className="font-retro border border-safety-yellow/20 rounded-none h-10 px-4 data-[state=on]:bg-safety-yellow data-[state=on]:text-black">
                  TRANSIENT
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" className="font-retro border border-safety-yellow/20 rounded-none h-10 px-4 data-[state=on]:bg-safety-yellow data-[state=on]:text-black">
                  GRID
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Grid Resolution</div>
              <select 
                value={gridSize} 
                onChange={e => setGridSize(e.target.value)}
                className="w-full bg-black border border-safety-yellow/20 text-safety-yellow font-retro p-2 h-10"
              >
                <option value="4">4 CHOP_BLOCKS</option>
                <option value="8">8 CHOP_BLOCKS</option>
                <option value="16">16 CHOP_BLOCKS</option>
                <option value="32">32 CHOP_BLOCKS</option>
              </select>
            </div>
          </div>
          <Button className="btn-industrial w-full h-12">
            <Scissors className="w-4 h-4 mr-2" />
            Recalculate Slices
          </Button>
        </div>
        <div className="flex-grow space-y-6">
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {pads.map((p) => (
              <button
                key={p}
                className="aspect-square lab-card flex flex-col items-center justify-center gap-2 hover:bg-safety-yellow group transition-all relative overflow-hidden"
              >
                <span className="font-retro text-2xl group-hover:text-black">{p.toString().padStart(2, '0')}</span>
                <Play className="w-4 h-4 opacity-0 group-hover:opacity-100 text-black transition-opacity" />
                <div className="absolute bottom-1 right-1 font-mono text-[8px] text-muted-foreground group-hover:text-black">READY</div>
              </button>
            ))}
          </div>
          <div className="lab-card p-4 border-l-4 border-l-safety-yellow flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers className="text-safety-yellow w-5 h-5" />
              <div className="font-retro uppercase text-sm">Active Slice: 00 / 16</div>
            </div>
            <div className="font-mono text-[10px] opacity-50 uppercase">Transient_Sensitivity: 84%</div>
          </div>
        </div>
      </div>
    </div>
  );
}