import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Send, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surpriseConfig } from '../config';
import { soundEngine } from '../utils/sound';

export default function FinalSurprise({ onReplay }) {
  const [loveSent, setLoveSent] = useState(false);
  const [loveCounter, setLoveCounter] = useState(0);

  const triggerMassiveExplosion = () => {
    soundEngine.playExplosion();

    // Multi-stage fireworks & heart barrage
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9', '#FFFFFF', '#F9C7DF'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      scalar: 1.2,
    });
    fire(0.2, {
      spread: 60,
      scalar: 1.4,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.1,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.5,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSendLove = () => {
    setLoveSent(true);
    setLoveCounter((prev) => prev + 1);
    triggerMassiveExplosion();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-burgundy/50 blur-3xl pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-romantic-pink/20 blur-3xl pointer-events-none -top-10" />

      {/* Cute Romantic Couple / Heart Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-6 flex flex-col items-center"
      >
        {/* Animated Couple Vector Illustration */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-romantic-pink/30 to-rose-red/30 blur-xl animate-pulse" />

          {/* SVG Cute Couple Illustration */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,79,163,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft pink moon backdrop */}
            <circle cx="100" cy="100" r="82" fill="url(#moonGlow)" opacity="0.35" />

            {/* Floating Heart Balloon held by couple */}
            <g className="animate-float-slow">
              <path
                d="M100 35 C100 20 80 10 70 25 C60 40 85 60 100 75 C115 60 140 40 130 25 C120 10 100 20 100 35 Z"
                fill="#FF315D"
              />
              <path d="M100 75 Q98 95 95 115" stroke="#FFB6D9" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>

            {/* Character 1 (Left - gentle lean) */}
            <g transform="translate(68, 88)">
              {/* Head */}
              <circle cx="16" cy="18" r="14" fill="#F9C7DF" />
              {/* Hair */}
              <path d="M4 16 C4 4 28 4 28 16 C28 10 24 6 16 6 C8 6 4 10 4 16 Z" fill="#270819" />
              {/* Cute blush */}
              <circle cx="11" cy="22" r="2.5" fill="#FF4FA3" opacity="0.6" />
              <circle cx="21" cy="22" r="2.5" fill="#FF4FA3" opacity="0.6" />
              {/* Body / Sweater */}
              <path d="M6 34 C6 28 26 28 26 34 L28 62 C28 64 4 64 4 62 Z" fill="#FF4FA3" />
            </g>

            {/* Character 2 (Right - gentle hug) */}
            <g transform="translate(98, 86)">
              {/* Head */}
              <circle cx="16" cy="18" r="14" fill="#F9C7DF" />
              {/* Hair */}
              <path d="M2 14 C4 2 28 2 30 14 C28 7 24 5 16 5 C8 5 4 7 2 14 Z" fill="#1A0410" />
              {/* Cute blush */}
              <circle cx="11" cy="22" r="2.5" fill="#FF315D" opacity="0.6" />
              <circle cx="21" cy="22" r="2.5" fill="#FF315D" opacity="0.6" />
              {/* Body / Coat */}
              <path d="M6 34 C6 28 26 28 26 34 L28 64 C28 66 4 66 4 64 Z" fill="#FF315D" />
            </g>

            {/* Little heart between them */}
            <path
              d="M100 115 C100 110 94 106 90 110 C86 114 96 122 100 126 C104 122 114 114 110 110 C106 106 100 110 100 115 Z"
              fill="#FFB6D9"
              className="animate-pulse"
            />

            <defs>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4FA3" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#270819" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Glowing mini sparkles */}
          <Sparkles className="absolute top-2 right-4 w-6 h-6 text-soft-pink animate-pulse" />
          <Stars className="absolute bottom-6 left-2 w-5 h-5 text-romantic-pink animate-spin [animation-duration:12s]" />
        </div>
      </motion.div>

      {/* Romantic Headings */}
      <div className="text-center max-w-xl mx-auto space-y-4 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-dancing text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-white to-romantic-pink text-glow-pink"
        >
          {surpriseConfig.finalSurprise.mainHeading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-poppins text-base sm:text-xl text-soft-pink/90 font-light max-w-md mx-auto leading-relaxed"
        >
          {surpriseConfig.finalSurprise.subheading}
        </motion.p>
      </div>

      {/* Action / Celebration Buttons */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendLove}
          className="relative group w-full sm:w-auto px-10 py-4 rounded-full font-poppins font-semibold text-lg text-white overflow-hidden transition-all duration-300 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-red via-romantic-pink to-rose-red bg-[length:200%_auto] transition-all duration-500 group-hover:bg-right" />
          <div className="absolute inset-0 rounded-full box-glow-pink opacity-80 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex items-center justify-center gap-3">
            <span>{surpriseConfig.finalSurprise.actionButton}</span>
            <Heart className="w-5 h-5 text-white fill-white animate-bounce" />
          </div>
        </motion.button>

        {/* Replay Entire Surprise Button */}
        <button
          onClick={onReplay}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full glass-panel text-soft-pink/80 hover:text-white text-sm font-medium transition-colors hover:border-romantic-pink/40"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{surpriseConfig.finalSurprise.replayButton}</span>
        </button>
      </div>

      {/* Celebratory I LOVE YOU Banner overlay when Send Some Love is clicked */}
      <AnimatePresence>
        {loveSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="mt-10 p-6 sm:p-8 rounded-3xl bg-burgundy/90 border-2 border-romantic-pink/70 box-glow-lg text-center max-w-lg mx-auto backdrop-blur-xl relative"
          >
            {/* Sparkling corner icons */}
            <Sparkles className="absolute -top-3 -left-3 w-8 h-8 text-soft-pink animate-spin [animation-duration:6s]" />
            <Sparkles className="absolute -bottom-3 -right-3 w-8 h-8 text-romantic-pink animate-pulse" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-red/30 border border-romantic-pink/50 mb-3 animate-heartbeat">
              <Heart className="w-8 h-8 text-rose-red fill-rose-red filter drop-shadow-[0_0_12px_rgba(255,49,93,0.9)]" />
            </div>

            <h3 className="font-dancing text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-white to-rose-red text-glow-rose tracking-wider mb-2">
              {surpriseConfig.finalSurprise.grandMessage}
            </h3>

            <p className="font-poppins text-soft-pink text-sm sm:text-base font-light mb-4">
              {surpriseConfig.finalSurprise.grandSubmessage}
            </p>

            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-soft-pink/70 font-mono">
                Hearts sent: {loveCounter} 💖
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
