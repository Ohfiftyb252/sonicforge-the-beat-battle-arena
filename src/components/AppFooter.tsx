import React from 'react';
export function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-dark-bg/80 border-t border-neon-cyan/10 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-retro text-muted-foreground">
          SONIC<span className="text-neon-cyan/50">FORGE</span>
        </div>
        <div className="text-xs font-mono text-muted-foreground/60 uppercase tracking-tighter">
          © {currentYear} SONICFORGE ARCHIVES. ALL SYSTEMS OPERATIONAL.
        </div>
        <div className="flex gap-6 text-xs font-mono text-muted-foreground/60">
          <a href="#" className="hover:text-neon-cyan transition-colors">TERMS_OF_SERVICE</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">PRIVACY_POLICY</a>
          <a href="#" className="hover:text-neon-cyan transition-colors">SYSTEM_STATUS</a>
        </div>
      </div>
    </footer>
  );
}