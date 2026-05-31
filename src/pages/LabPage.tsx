import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadTab } from '@/components/lab/LoadTab';
import { MutateTab } from '@/components/lab/MutateTab';
import { ChopTab } from '@/components/lab/ChopTab';
import { ExportTab } from '@/components/lab/ExportTab';
import { AlertTriangle, Activity } from 'lucide-react';
export function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-safety-yellow/40 pb-6 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-warning animate-strobe">
              <AlertTriangle className="w-5 h-5" />
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-retro text-white tracking-tighter leading-none">
              MUTANT MASTER <span className="text-safety-yellow">SOURCE LAB</span>
            </h1>
          </div>
          <div className="font-mono text-xs text-muted-foreground bg-black px-4 py-2 border border-safety-yellow/20">
            BUILD_VER: 2025.04.24_BETA
          </div>
        </header>
        <Tabs defaultValue="load" className="w-full space-y-8">
          <TabsList className="grid grid-cols-4 h-16 bg-muted/20 border-2 border-safety-yellow/10 p-1">
            <TabsTrigger value="load" className="font-retro text-lg data-[state=active]:bg-safety-yellow data-[state=active]:text-black uppercase">01_LOAD</TabsTrigger>
            <TabsTrigger value="mutate" className="font-retro text-lg data-[state=active]:bg-safety-yellow data-[state=active]:text-black uppercase">02_MUTATE</TabsTrigger>
            <TabsTrigger value="chop" className="font-retro text-lg data-[state=active]:bg-safety-yellow data-[state=active]:text-black uppercase">03_CHOP</TabsTrigger>
            <TabsTrigger value="export" className="font-retro text-lg data-[state=active]:bg-safety-yellow data-[state=active]:text-black uppercase">04_EXPORT</TabsTrigger>
          </TabsList>
          <TabsContent value="load" className="focus-visible:ring-0">
            <LoadTab />
          </TabsContent>
          <TabsContent value="mutate" className="focus-visible:ring-0">
            <MutateTab />
          </TabsContent>
          <TabsContent value="chop" className="focus-visible:ring-0">
            <ChopTab />
          </TabsContent>
          <TabsContent value="export" className="focus-visible:ring-0">
            <ExportTab />
          </TabsContent>
        </Tabs>
        <footer className="pt-12 border-t border-safety-yellow/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
            <div className="flex items-center gap-4 font-retro text-sm">
              <Activity className="w-4 h-4" />
              <span>CLIENT_SIDE_ONLY :: NO_SERVER_UPLOADS</span>
            </div>
            <p className="font-mono text-[10px] text-center max-w-md">
              THIS IS A BROWSER-BASED AUDIO LABORATORY. PERFORMANCE MAY VARY BASED ON HARDWARE ACCELERATION. ALL PROCESSING OCCURS ON-DEVICE.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}