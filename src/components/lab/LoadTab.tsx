import React, { useRef, useState, useEffect } from 'react';
import { Upload, Play, Square, Scissors, CheckCircle2 } from 'lucide-react';
import { useLab } from '@/context/LabContext';
import { AudioEngine } from '@/lib/audio-engine';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
export function LoadTab() {
  const { setSourceBuffer, sourceBuffer, setTrimmedBuffer, setLoading, isLoading } = useLab();
  const [trimRange, setTrimRange] = useState([0, 100]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = AudioEngine.getInstance();
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const decoded = await engine.decode(arrayBuffer);
      setSourceBuffer(decoded);
      setTrimRange([0, 100]);
    } catch (err) {
      console.error('Decoding failed', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!sourceBuffer || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = sourceBuffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#F9D71C';
    ctx.beginPath();
    ctx.moveTo(0, amp);
    for (let i = 0; i < canvas.width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.lineTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }
    ctx.stroke();
  }, [sourceBuffer]);
  const commitTrim = () => {
    if (!sourceBuffer) return;
    const duration = sourceBuffer.duration;
    const start = (trimRange[0] / 100) * duration;
    const end = (trimRange[1] / 100) * duration;
    const trimmed = engine.trimBuffer(sourceBuffer, start, end);
    setTrimmedBuffer(trimmed);
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {!sourceBuffer ? (
        <div className="border-4 border-dashed border-safety-yellow/20 p-20 text-center space-y-6 hover:border-safety-yellow/50 transition-all cursor-pointer relative">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} accept="audio/*" />
          <Upload className="w-16 h-16 mx-auto text-safety-yellow/40" />
          <div className="space-y-2">
            <p className="text-2xl font-retro text-safety-yellow uppercase">Inject Source Material</p>
            <p className="font-mono text-xs text-muted-foreground">WAV, MP3, OGG, M4A UP TO 100MB</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="lab-card p-6 space-y-6">
            <div className="flex justify-between items-center font-retro text-sm text-safety-yellow">
              <span>WAVEFORM_PREVIEW</span>
              <span>{sourceBuffer.duration.toFixed(2)}s @ {sourceBuffer.sampleRate}Hz</span>
            </div>
            <div className="bg-black/80 h-48 border border-safety-yellow/10 relative overflow-hidden">
              <canvas ref={canvasRef} width={1024} height={192} className="w-full h-full" />
              {/* Overlay for trim range */}
              <div 
                className="absolute inset-y-0 bg-safety-yellow/10 border-x border-safety-yellow/40 pointer-events-none"
                style={{ 
                  left: `${trimRange[0]}%`, 
                  right: `${100 - trimRange[1]}%` 
                }}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground">
                <span>Start Offset</span>
                <span>End Offset</span>
              </div>
              <Slider value={trimRange} onValueChange={setTrimRange} max={100} step={0.1} />
            </div>
            <div className="flex gap-4">
              <Button className="btn-industrial flex-1 h-12" onClick={commitTrim}>
                <Scissors className="w-4 h-4 mr-2" />
                Commit Trim Region
              </Button>
              <Button variant="outline" className="border-safety-yellow text-safety-yellow hover:bg-safety-yellow/10" onClick={() => setSourceBuffer(null)}>
                Clear Source
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="lab-card p-4 border-l-4 border-l-safety-yellow flex items-center gap-4">
              <CheckCircle2 className="text-safety-yellow w-6 h-6" />
              <div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Status</div>
                <div className="font-retro uppercase">System Ready</div>
              </div>
            </div>
            <div className="lab-card p-4 border-l-4 border-l-white/10 flex items-center gap-4">
              <Square className="text-white w-6 h-6" />
              <div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Process</div>
                <div className="font-retro uppercase">Pending Mutation</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}