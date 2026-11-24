import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export default function MusicController({ isPlaying, setIsPlaying }) {
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    soundEngine.init();
    if (!isPlaying) {
      soundEngine.startBGM();
      setIsPlaying(true);
    } else {
      const muted = soundEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <div className="relative">
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`group flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border transition-all duration-300 shadow-lg ${
            isPlaying && !isMuted
              ? 'border-romantic-pink/50 bg-burgundy/80 text-soft-pink box-glow-pink'
              : 'border-white/10 bg-darkBg/70 text-gray-400 hover:text-white hover:border-romantic-pink/30'
          }`}
          aria-label={isPlaying && !isMuted ? 'Mute romantic melody' : 'Play romantic melody'}
        >
          {isPlaying && !isMuted ? (
            <>
              {/* Animated audio visualizer bars */}
              <div className="flex items-center gap-0.5 h-3.5">
                <span className="w-0.5 h-3 bg-romantic-pink rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-0.5 h-4 bg-rose-red rounded-full animate-bounce [animation-delay:0.25s]" />
                <span className="w-0.5 h-2.5 bg-soft-pink rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-0.5 h-4 bg-romantic-pink rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <Volume2 className="w-4 h-4 text-romantic-pink" />
              <span className="text-xs font-medium tracking-wide hidden sm:inline">Melody On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-romantic-pink transition-colors" />
              <span className="text-xs font-medium tracking-wide hidden sm:inline">Melody Off</span>
            </>
          )}
        </button>

        {/* Hover hint */}
        {showTooltip && (
          <div className="absolute right-0 top-full mt-2 w-48 px-3 py-2 rounded-xl glass-panel text-xs text-soft-pink text-center shadow-xl border border-romantic-pink/30 pointer-events-none animate-fade-in">
            {isPlaying && !isMuted ? 'Tap to mute gentle melody 🎶' : 'Tap to enjoy gentle melody ✨'}
          </div>
        )}
      </div>
    </div>
  );
}
