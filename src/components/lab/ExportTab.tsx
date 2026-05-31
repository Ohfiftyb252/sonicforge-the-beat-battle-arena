import React from 'react';
import { Download, FileAudio, Archive, Info, CheckCircle } from 'lucide-react';
import { useLab } from '@/context/LabContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AudioEngine } from '@/lib/audio-engine';
export function ExportTab() {
  const { trimmedBuffer } = useLab();
  const engine = AudioEngine.getInstance();
  const handleDownload = async () => {
    if (!trimmedBuffer) return;
    const blob = await engine.encodeWAV(trimmedBuffer);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mutant_export_${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };
  if (!trimmedBuffer) {
    return (
      <div className="py-20 text-center lab-card">
        <p className="font-retro text-xl uppercase opacity-50">Queue Empty: Nothing Processed for Export</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-3xl font-retro text-safety-yellow uppercase">Output_Queue</h2>
        <div className="space-y-3">
          <div className="lab-card p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <Checkbox id="source" defaultChecked className="border-safety-yellow data-[state=checked]:bg-safety-yellow data-[state=checked]:text-black" />
              <div className="p-2 bg-black border border-white/10">
                <FileAudio className="w-5 h-5 text-safety-yellow" />
              </div>
              <label htmlFor="source" className="space-y-1 cursor-pointer">
                <div className="font-retro text-lg uppercase leading-none">Trimmed_Source_Material.wav</div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase">PCM 16-BIT 44.1KHZ</div>
              </label>
            </div>
            <div className="text-right font-mono text-[10px] uppercase text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Working
            </div>
          </div>
          <div className="lab-card p-4 opacity-40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox disabled />
              <div className="p-2 bg-black border border-white/5">
                <Archive className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="font-retro text-lg uppercase leading-none">Processed_Chops_ZIP</div>
                <div className="font-mono text-[10px] uppercase">Waiting for chop commit...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="lab-card p-6 bg-safety-yellow/5 border-l-4 border-l-safety-yellow space-y-4">
          <div className="flex items-center gap-2 text-safety-yellow font-retro">
            <Info className="w-5 h-5" />
            <span className="uppercase">Export Specs</span>
          </div>
          <ul className="space-y-2 font-mono text-[10px] text-muted-foreground uppercase list-disc pl-4">
            <li>Sample Rate: 44.1kHz (Hardcoded)</li>
            <li>Bit Depth: 16-bit Int</li>
            <li>Channels: Preserve Source</li>
            <li>Encoding: Uncompressed WAV</li>
          </ul>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <Button className="btn-industrial h-16 text-xl tracking-widest" onClick={handleDownload}>
            <Download className="w-6 h-6 mr-3" />
            Initialize Export
          </Button>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-muted-foreground uppercase">
            <CheckCircle className="w-3 h-3 text-safety-yellow" />
            Validation Passed: Clean Buffers Detected
          </div>
        </div>
      </div>
    </div>
  );
}