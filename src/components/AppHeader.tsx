import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function AppHeader() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'EXPLORE', path: '/explore' },
    { name: 'BATTLES', path: '/battles' },
    { name: 'SUBMIT', path: '/submit' },
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark-bg/80 backdrop-blur-md border-b border-neon-cyan/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-retro text-neon-cyan tracking-tighter hover:text-white transition-colors">
          SONIC<span className="text-neon-purple">FORGE</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-mono tracking-widest hover:text-neon-cyan transition-colors relative group",
                location.pathname === link.path ? "text-neon-cyan" : "text-muted-foreground"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-full h-[1px] bg-neon-cyan transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                location.pathname === link.path && "scale-x-100"
              )} />
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="font-mono text-xs text-muted-foreground hover:text-neon-cyan">
            SIGN IN
          </Button>
          <Button className="btn-retro-primary font-mono text-xs h-10 px-6">
            SIGN UP
          </Button>
        </div>
        {/* Mobile Toggle */}
        <button className="md:hidden text-neon-cyan" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-dark-bg border-b border-neon-cyan/20 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-xl font-retro text-neon-cyan"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-neon-cyan/10">
            <Button variant="outline" className="border-neon-cyan text-neon-cyan">SIGN IN</Button>
            <Button className="btn-retro-primary">SIGN UP</Button>
          </div>
        </div>
      )}
    </header>
  );
}