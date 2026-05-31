import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Terminal, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
export function SubmitBeatPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [formData, setFormData] = useState({ title: '', genre: '', bpm: '120', description: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('uploading');
    // Mock simulation
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => navigate('/explore'), 2000);
    }, 3000);
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-black border-2 border-neon-cyan shadow-neon-glow p-1 flex items-center gap-3 mb-10">
        <div className="bg-neon-cyan p-2">
          <Terminal className="text-black w-6 h-6" />
        </div>
        <span className="font-retro text-neon-cyan uppercase tracking-widest text-lg">System.Forge_Upload_Interface</span>
      </div>
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.form 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onSubmit={handleSubmit} className="space-y-8 font-mono"
          >
            <div className="space-y-2">
              <Label htmlFor="title" className="text-neon-cyan text-xs uppercase">Project Title</Label>
              <Input 
                id="title" className="input-terminal h-12 text-lg" placeholder="SECURE_TRANSMISSION_NAME..." 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-neon-cyan text-xs uppercase">Genre Tag</Label>
                <Input 
                  id="genre" className="input-terminal h-12" placeholder="SYNTHWAVE, PHONK..."
                  value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bpm" className="text-neon-cyan text-xs uppercase">Frequency (BPM)</Label>
                <Input 
                  id="bpm" type="number" className="input-terminal h-12" placeholder="120"
                  value={formData.bpm} onChange={e => setFormData({...formData, bpm: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc" className="text-neon-cyan text-xs uppercase">Encryption Logs (Description)</Label>
              <Textarea 
                id="desc" className="input-terminal min-h-[120px]" placeholder="SYSTEM_DETAILS..."
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="border-2 border-dashed border-neon-purple/30 p-12 text-center hover:bg-neon-purple/5 transition-colors group cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-neon-purple group-hover:scale-110 transition-transform" />
              <p className="text-sm text-muted-foreground uppercase">Drag and drop audio source or click to browse</p>
              <p className="text-[10px] text-muted-foreground/50 mt-2">WAV, MP3, FLAC (MAX 50MB)</p>
            </div>
            <Button type="submit" className="w-full btn-retro-primary h-14 text-xl tracking-widest font-retro">
              INITIALIZE FORGE
            </Button>
          </motion.form>
        )}
        {status === 'uploading' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-32 text-center space-y-6"
          >
            <Loader2 className="w-16 h-16 mx-auto text-neon-cyan animate-spin" />
            <div className="space-y-2">
              <p className="text-2xl font-retro text-neon-cyan uppercase animate-pulse">Transmitting Data...</p>
              <div className="w-64 h-1 bg-muted mx-auto relative overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-neon-cyan"
                />
              </div>
            </div>
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="py-32 text-center space-y-6"
          >
            <CheckCircle2 className="w-24 h-24 mx-auto text-neon-purple" />
            <h2 className="text-4xl font-retro text-white uppercase tracking-tighter">Forge Entry Successful</h2>
            <p className="text-muted-foreground font-mono">RETURNING TO ARCHIVES...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}