import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surpriseConfig } from '../config';
import { soundEngine } from '../utils/sound';

export default function LoveLetter({ onProceedToFinal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    soundEngine.playLetterOpen();
    setIsOpen(true);

    // Confetti and floating hearts burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9', '#FFFFFF'],
      scalar: 1.1,
    });

    // Generate ascending floating heart elements
    const hearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: -(Math.random() * 150 + 100),
      size: Math.random() * 14 + 12,
      duration: Math.random() * 1.5 + 1.8,
    }));
    setFloatingHearts(hearts);
  };

  const handleNext = () => {
    soundEngine.playExplosion();
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9'],
    });
    setTimeout(() => {
      onProceedToFinal();
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 rounded-full bg-romantic-pink/15 blur-3xl pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-burgundy/40 blur-3xl pointer-events-none -bottom-20" />

      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-romantic-pink/20 border border-romantic-pink/30 text-soft-pink text-xs uppercase tracking-widest mb-2 font-medium"
        >
          <Mail className="w-3.5 h-3.5 text-romantic-pink" />
          <span>Handwritten Digital Note</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-white to-romantic-pink text-glow-pink"
        >
          {surpriseConfig.letter.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-poppins text-sm sm:text-base text-soft-pink/80 font-light"
        >
          {isOpen ? 'Scroll down to read your message ❤️' : 'Tap the envelope to unseal it ✨'}
        </motion.p>
      </div>

      {/* Interactive 3D Envelope & Letter Card Container */}
      <div className="relative w-full max-w-md mx-auto perspective-1000 min-h-[460px] flex items-center justify-center">
        {/* Floating Heart Burst on Open */}
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
            animate={{
              opacity: 0,
              x: h.x,
              y: h.y,
              scale: 1.3,
            }}
            transition={{ duration: h.duration, ease: 'easeOut' }}
            className="absolute z-40 pointer-events-none text-rose-red filter drop-shadow-[0_0_8px_rgba(255,49,93,0.8)]"
            style={{ fontSize: `${h.size}px` }}
          >
            ❤️
          </motion.div>
        ))}

        {!isOpen ? (
          /* CLOSED ENVELOPE STATE */
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleOpenEnvelope}
            className="cursor-pointer relative w-full aspect-[4/3] rounded-3xl p-1 bg-gradient-to-tr from-romantic-pink via-card-pink to-soft-pink box-glow-card shadow-2xl transition-all group"
          >
            {/* Outer envelope body */}
            <div className="relative w-full h-full rounded-[22px] bg-gradient-to-br from-[#2D0A1D] via-[#1E0613] to-[#12030B] border border-romantic-pink/40 p-6 flex flex-col items-center justify-between overflow-hidden">
              {/* Envelope flap visual lines */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-romantic-pink/20 bg-white/[0.02]" />

              {/* Decorative stamp top-right */}
              <div className="absolute top-4 right-4 w-12 h-14 border border-dashed border-romantic-pink/40 rounded-lg flex flex-col items-center justify-center p-1 bg-romantic-pink/10">
                <Heart className="w-4 h-4 text-romantic-pink fill-rose-red" />
                <span className="text-[9px] text-soft-pink/80 font-mono mt-0.5">LOVE</span>
              </div>

              <div className="w-full flex items-center gap-2 text-soft-pink/60 text-xs font-mono">
                <span>SEALED WITH AFFECTION</span>
              </div>

              {/* Central Wax Heart Seal */}
              <div className="relative flex flex-col items-center justify-center my-auto">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-red via-romantic-pink to-soft-pink p-0.5 box-glow-pink animate-pulse">
                  <div className="w-full h-full rounded-full bg-burgundy flex items-center justify-center shadow-inner">
                    <Heart className="w-9 h-9 text-romantic-pink fill-romantic-pink filter drop-shadow-[0_0_10px_rgba(255,79,163,0.9)] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-soft-pink animate-spin [animation-duration:6s]" />
              </div>

              {/* Tap to open hint */}
              <div className="text-center w-full">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-romantic-pink/20 text-soft-pink text-sm font-medium tracking-wide group-hover:bg-romantic-pink group-hover:text-white transition-all shadow-md">
                  <span>{surpriseConfig.letter.envelopeLabel}</span>
                  <Heart className="w-4 h-4 fill-current" />
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* OPENED UNFOLDED LETTER STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Letter Paper Card */}
            <div className="relative w-full rounded-3xl p-6 sm:p-9 bg-gradient-to-b from-[#FFF0F6] via-[#FCE4EC] to-[#F8BBD0] text-gray-900 shadow-2xl border-2 border-romantic-pink/40 box-glow-card">
              {/* Soft decorative background stamp */}
              <div className="absolute top-4 right-4 text-romantic-pink/20 select-none pointer-events-none">
                <Heart className="w-24 h-24 fill-current" />
              </div>

              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-romantic-pink/30 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-red fill-rose-red" />
                  <span className="font-dancing text-xl text-rose-red font-bold">
                    For {surpriseConfig.recipientName}
                  </span>
                </div>
                <span className="font-mono text-xs text-rose-red/70 tracking-wider">
                  CONFIDENTIAL 💌
                </span>
              </div>

              {/* Letter Main Content */}
              <div className="font-playfair text-base sm:text-lg leading-relaxed text-gray-800 space-y-4 whitespace-pre-line">
                {surpriseConfig.letter.content}
              </div>

              {/* Letter Postscript */}
              <div className="mt-6 pt-4 border-t border-romantic-pink/30 font-dancing text-lg sm:text-xl text-rose-red/90 italic font-semibold">
                {surpriseConfig.letter.postscript}
              </div>

              {/* Signature */}
              <div className="mt-4 text-right">
                <p className="font-dancing text-xl text-gray-700">Forever with warmth,</p>
                <p className="font-dancing text-2xl font-bold text-rose-red">
                  {surpriseConfig.senderName} ❤️
                </p>
              </div>

              {/* Next Button */}
              <div className="mt-8 pt-4 flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-red via-romantic-pink to-rose-red text-white font-poppins font-semibold text-base sm:text-lg flex items-center gap-2 hover:opacity-95 transition-all transform hover:scale-105 active:scale-95 shadow-xl box-glow-pink"
                >
                  <span>{surpriseConfig.letter.nextButtonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
