import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surpriseConfig } from '../config';
import { soundEngine } from '../utils/sound';

export default function IntroScreen({ onOpenSurprise }) {
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [displayedSubheading, setDisplayedSubheading] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  const fullGreeting = surpriseConfig.intro.greeting;
  const fullSubheading = surpriseConfig.intro.subheading;

  // Typewriter effect for heading and subheading
  useEffect(() => {
    let greetingIndex = 0;
    const greetingTimer = setInterval(() => {
      if (greetingIndex <= fullGreeting.length) {
        setDisplayedGreeting(fullGreeting.slice(0, greetingIndex));
        greetingIndex++;
      } else {
        clearInterval(greetingTimer);

        // Start typing subheading
        let subIndex = 0;
        const subTimer = setInterval(() => {
          if (subIndex <= fullSubheading.length) {
            setDisplayedSubheading(fullSubheading.slice(0, subIndex));
            subIndex++;
          } else {
            clearInterval(subTimer);
            setTypingDone(true);
          }
        }, 45);
      }
    }, 60);

    return () => {
      clearInterval(greetingTimer);
    };
  }, [fullGreeting, fullSubheading]);

  const handleOpen = () => {
    // Sound FX
    soundEngine.playExplosion();

    // Canvas confetti heart burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9', '#FFFFFF'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Slight delay for smooth visual transition
    setTimeout(() => {
      onOpenSurprise();
    }, 350);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 z-10 overflow-hidden">
      {/* Soft pink radiant halo behind central heart */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-romantic-pink/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-56 h-56 rounded-full bg-rose-red/25 blur-2xl pointer-events-none -translate-y-4" />

      {/* Center glowing animated heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8 cursor-pointer group"
        onClick={handleOpen}
      >
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Pulsing ring aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-pink via-rose-red to-soft-pink opacity-30 blur-md animate-ping [animation-duration:3s]" />
          
          {/* Main 3D Glowing Heart */}
          <div className="relative p-6 rounded-full bg-burgundy/60 border border-romantic-pink/40 box-glow-pink animate-heartbeat backdrop-blur-md">
            <Heart
              className="w-16 h-16 sm:w-20 sm:h-20 text-romantic-pink fill-rose-red/80 filter drop-shadow-[0_0_18px_rgba(255,79,163,0.9)] transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </div>

          {/* Tiny sparkling star decorations */}
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-soft-pink animate-spin [animation-duration:8s]" />
          <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-romantic-pink animate-pulse" />
        </div>
      </motion.div>

      {/* Typewriter Text Container */}
      <div className="text-center max-w-xl mx-auto space-y-4 mb-10 min-h-[140px]">
        {/* Main Heading */}
        <h1 className="font-dancing text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-white to-romantic-pink text-glow-pink">
          {displayedGreeting}
          {!typingDone && displayedGreeting.length < fullGreeting.length && (
            <span className="inline-block w-1.5 h-8 sm:h-10 bg-romantic-pink ml-1 animate-pulse align-middle" />
          )}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-poppins text-lg sm:text-2xl text-soft-pink/90 font-light tracking-wide px-2 min-h-[36px]"
        >
          {displayedSubheading}
          {!typingDone && displayedGreeting.length >= fullGreeting.length && (
            <span className="inline-block w-1 h-5 bg-soft-pink ml-1 animate-pulse align-middle" />
          )}
        </motion.p>

        {/* Subtle romantic tagline */}
        {typingDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-soft-pink/60 uppercase tracking-widest pt-1 font-medium"
          >
            <span className="w-6 h-[1px] bg-romantic-pink/40" />
            <span>{surpriseConfig.intro.heartHint}</span>
            <span className="w-6 h-[1px] bg-romantic-pink/40" />
          </motion.div>
        )}
      </div>

      {/* Glowing CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{
          opacity: typingDone ? 1 : 0.85,
          scale: 1,
          y: 0,
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <button
          onClick={handleOpen}
          className="relative group px-8 sm:px-12 py-4 rounded-full font-poppins font-semibold text-base sm:text-lg text-white overflow-hidden transition-all duration-300 transform active:scale-95 hover:scale-105"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-red via-romantic-pink to-rose-red bg-[length:200%_auto] transition-all duration-500 group-hover:bg-right" />
          
          {/* Glowing border and backdrop aura */}
          <div className="absolute inset-0 rounded-full box-glow-pink opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-romantic-pink to-rose-red blur-md opacity-40 group-hover:opacity-80 transition-opacity" />

          {/* Button Text & Icon */}
          <div className="relative flex items-center justify-center gap-3">
            <span className="tracking-wide">{surpriseConfig.intro.buttonText}</span>
            <Heart className="w-5 h-5 text-white fill-white transition-transform group-hover:scale-125" />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
