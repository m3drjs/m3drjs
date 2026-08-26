'use client';

import React from 'react';
import { useMusic } from '@/context/MusicContext';

export function FloatingReactions() {
  const { reactions } = useMusic();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {reactions.map((rx) => (
        <div
          key={rx.id}
          className="absolute bottom-24 right-12 animate-float-up text-3xl select-none"
          style={{
            right: `${Math.max(10, Math.min(85, 30 + ((rx.timestamp % 50) - 25)))}%`,
            animation: 'reactionRise 3s cubic-bezier(0.2, 0.8, 0.3, 1) forwards'
          }}
        >
          <div className="flex flex-col items-center">
            <span className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">{rx.emoji}</span>
            <span className="text-[10px] font-medium text-amber-200/80 bg-black/60 px-1.5 py-0.5 rounded-full backdrop-blur-sm mt-0.5">
              {rx.label}
            </span>
          </div>
        </div>
      ))}
      <style jsx global>{`
        @keyframes reactionRise {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.6);
          }
          15% {
            opacity: 1;
            transform: translateY(0px) scale(1.2);
          }
          40% {
            transform: translateY(-80px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-260px) scale(0.85);
          }
        }
      `}</style>
    </div>
  );
}
