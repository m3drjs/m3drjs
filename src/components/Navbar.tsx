'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMusic } from '@/context/MusicContext';
import { 
  Search, 
  Radio, 
  Menu, 
  X, 
  Sparkles,
  ShieldAlert,
  Volume2
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { listenerCount, setIsSearchOpen, isPlaying } = useMusic();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const links = [
    { href: '/', label: 'Room' },
    { href: '/songs', label: 'Songs' },
    { href: '/artists', label: 'Artists' },
    { href: '/about', label: 'About' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-desia-bg/80 backdrop-blur-md border-b border-desia-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Left: Branding & Live Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-desia-red to-desia-ochre flex items-center justify-center p-0.5 shadow-[0_0_12px_rgba(194,65,12,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-desia-bg flex items-center justify-center">
                <span className="text-desia-gold text-xs font-bold font-serif">ଢ</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-desia-sand font-serif font-bold text-sm tracking-wider group-hover:text-desia-gold transition-colors">
                DESIA DHEMSA
              </span>
              <span className="text-[9px] text-desia-clay/80 tracking-widest uppercase hidden sm:block">
                Odisha Rhythm Room
              </span>
            </div>
          </Link>

          {/* Live Listener Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-desia-surface/90 border border-desia-border/60 text-[11px] text-desia-sand/90 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-mono text-desia-gold font-medium">{listenerCount}</span>
            <span className="text-desia-clay text-[10px]">listening</span>
          </div>
        </div>

        {/* Center: Small Minimal Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-desia-surface/50 px-2 py-1 rounded-full border border-desia-border/40">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-desia-red/40 text-desia-sand border border-desia-ochre/30 shadow-sm'
                    : 'text-desia-sand/70 hover:text-desia-sand hover:bg-desia-card/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Quick actions (Search, Mobile Toggle) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full text-desia-sand/70 hover:text-desia-gold hover:bg-desia-surface/80 transition-colors border border-transparent hover:border-desia-border/50"
            title="Search Songs & Artists (Cmd+K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile listener pill */}
          <div className="flex sm:hidden items-center gap-1 px-2 py-0.5 rounded-full bg-desia-surface border border-desia-border text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-mono text-desia-gold">{listenerCount}</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 md:hidden text-desia-sand/80 hover:text-desia-gold"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileNavOpen && (
        <div className="md:hidden bg-desia-bg/95 backdrop-blur-xl border-b border-desia-border px-4 py-3 space-y-1 animate-fadeIn">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-desia-red/30 text-desia-gold border border-desia-red/40'
                    : 'text-desia-sand/80 hover:bg-desia-surface hover:text-desia-sand'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
