import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import InteractiveCursor from './components/InteractiveCursor';
import MusicController from './components/MusicController';
import IntroScreen from './components/IntroScreen';
import LoveMessages from './components/LoveMessages';
import LoveLetter from './components/LoveLetter';
import FinalSurprise from './components/FinalSurprise';
import { soundEngine } from './utils/sound';

export default function App() {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro' | 'messages' | 'letter' | 'final'
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Helper to ensure gentle romantic sound begins on first click if desired
  const ensureAudioStarted = () => {
    if (!isAudioPlaying) {
      soundEngine.startBGM();
      setIsAudioPlaying(true);
    }
  };

  const goToMessages = () => {
    ensureAudioStarted();
    setCurrentStep('messages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLetter = () => {
    ensureAudioStarted();
    setCurrentStep('letter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToFinal = () => {
    ensureAudioStarted();
    setCurrentStep('final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setCurrentStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Steps definition for top navigation pill
  const steps = [
    { key: 'intro', label: 'Surprise' },
    { key: 'messages', label: 'Just For You' },
    { key: 'letter', label: 'Love Letter' },
    { key: 'final', label: 'Forever' },
  ];

  return (
    <div className="relative min-h-screen bg-[#08050A] text-white overflow-hidden selection:bg-romantic-pink selection:text-white">
      {/* Background Particles & Ambient Glow */}
      <ParticleBackground />

      {/* Interactive Cursor Trail on Desktop */}
      <InteractiveCursor />

      {/* Floating Music Controller */}
      <MusicController
        isPlaying={isAudioPlaying}
        setIsPlaying={setIsAudioPlaying}
      />

      {/* Top subtle stage navigation indicator (when past intro) */}
      {currentStep !== 'intro' && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-romantic-pink/30 shadow-lg">
          {steps.map((s, idx) => (
            <button
              key={s.key}
              onClick={() => {
                // Only allow navigating to steps already unlocked or visited
                const stepOrder = ['intro', 'messages', 'letter', 'final'];
                const currentIndex = stepOrder.indexOf(currentStep);
                const targetIndex = stepOrder.indexOf(s.key);
                if (targetIndex <= currentIndex || targetIndex === currentIndex + 1) {
                  setCurrentStep(s.key);
                }
              }}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${
                currentStep === s.key
                  ? 'bg-gradient-to-r from-romantic-pink to-rose-red text-white box-glow-pink'
                  : 'text-soft-pink/60 hover:text-white'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Screen Transition Manager */}
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <IntroScreen onOpenSurprise={goToMessages} />
            </motion.div>
          )}

          {currentStep === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <LoveMessages onProceedToLetter={goToLetter} />
            </motion.div>
          )}

          {currentStep === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <LoveLetter onProceedToFinal={goToFinal} />
            </motion.div>
          )}

          {currentStep === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <FinalSurprise onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 pb-4 text-center text-xs text-soft-pink/40 font-mono tracking-wider pointer-events-none">
        Crafted with all my heart ❤️
      </footer>
    </div>
  );
}
