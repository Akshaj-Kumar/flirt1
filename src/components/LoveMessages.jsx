import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, X, ArrowRight, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surpriseConfig } from '../config';
import { soundEngine } from '../utils/sound';

export default function LoveMessages({ onProceedToLetter }) {
  const [openedIds, setOpenedIds] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [floatingHeartSpawns, setFloatingHeartSpawns] = useState({});

  const messages = surpriseConfig.justForYou.messages;
  const allOpened = openedIds.length === messages.length;

  const handleCardClick = (msg, e) => {
    soundEngine.playHeartPop();

    // Spawn mini floating heart burst at button position
    const rect = e.currentTarget.getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;

    confetti({
      particleCount: 15,
      spread: 45,
      origin: {
        x: burstX / window.innerWidth,
        y: burstY / window.innerHeight,
      },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9'],
      scalar: 0.9,
    });

    if (!openedIds.includes(msg.id)) {
      setOpenedIds((prev) => [...prev, msg.id]);
    }

    setActiveMessage(msg);
  };

  const handleNextSection = () => {
    soundEngine.playExplosion();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF4FA3', '#FF315D', '#FFB6D9'],
    });
    setTimeout(() => {
      onProceedToLetter();
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10">
      {/* Background radial accent glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-burgundy/30 blur-3xl pointer-events-none -top-20" />
      <div className="absolute w-80 h-80 rounded-full bg-romantic-pink/15 blur-3xl pointer-events-none" />

      {/* Central pulsing glowing heart */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-4 flex items-center justify-center"
      >
        <div className="relative p-5 rounded-full bg-burgundy/70 border border-romantic-pink/30 box-glow-pink animate-heartbeat backdrop-blur-md">
          <Heart
            className="w-12 h-12 text-romantic-pink fill-rose-red/70 filter drop-shadow-[0_0_12px_rgba(255,79,163,0.8)]"
            strokeWidth={1.8}
          />
        </div>
        <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-soft-pink animate-spin [animation-duration:10s]" />
      </motion.div>

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-soft-pink via-white to-romantic-pink text-glow-pink"
        >
          {surpriseConfig.justForYou.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-poppins text-sm sm:text-base text-soft-pink/80 font-light"
        >
          {surpriseConfig.justForYou.subtitle}
        </motion.p>

        {/* Progress indicator */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className="flex gap-1.5">
            {messages.map((m) => (
              <span
                key={m.id}
                className={`h-2 rounded-full transition-all duration-300 ${
                  openedIds.includes(m.id)
                    ? 'w-6 bg-gradient-to-r from-romantic-pink to-rose-red'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-soft-pink/60 font-mono ml-2">
            {openedIds.length} / {messages.length} revealed
          </span>
        </div>
      </div>

      {/* 5 Interactive Compliment Buttons */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-3.5 mb-8">
        {messages.map((msg, index) => {
          const isOpened = openedIds.includes(msg.id);

          return (
            <motion.button
              key={msg.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onClick={(e) => handleCardClick(msg, e)}
              className={`relative group w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md border overflow-hidden ${
                isOpened
                  ? 'bg-burgundy/80 border-romantic-pink/60 box-glow-card shadow-lg'
                  : 'bg-darkBg/80 border-romantic-pink/20 hover:border-romantic-pink/50 hover:bg-burgundy/40 hover:scale-[1.01]'
              }`}
            >
              {/* Background gentle gradient shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-romantic-pink/0 via-romantic-pink/10 to-romantic-pink/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 ${
                      isOpened
                        ? 'bg-rose-red/20 text-romantic-pink border border-romantic-pink/40'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {msg.emoji}
                  </div>
                  <div>
                    <h3
                      className={`font-poppins font-medium text-base sm:text-lg transition-colors ${
                        isOpened ? 'text-white' : 'text-gray-200 group-hover:text-soft-pink'
                      }`}
                    >
                      {msg.title}
                    </h3>
                    <span className="text-xs text-soft-pink/60 block font-light">
                      {isOpened ? 'Tap to view note again ✨' : 'Tap to reveal secret 💌'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isOpened ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-romantic-pink/20 border border-romantic-pink/40 text-xs text-soft-pink font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-romantic-pink" />
                      <span>Revealed</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-romantic-pink/40 group-hover:bg-romantic-pink/20 transition-all">
                      <Heart className="w-4 h-4 text-soft-pink/70 group-hover:text-romantic-pink group-hover:fill-romantic-pink transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Unlock Next Section Button when all 5 are opened */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-2"
          >
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-romantic-pink via-rose-red to-romantic-pink animate-pulse">
              <button
                onClick={handleNextSection}
                className="px-8 sm:px-10 py-3.5 rounded-full bg-burgundy hover:bg-burgundy/90 text-white font-poppins font-semibold text-base sm:text-lg flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl box-glow-pink"
              >
                <span>{surpriseConfig.justForYou.nextButtonText}</span>
                <ArrowRight className="w-5 h-5 text-romantic-pink animate-pulse" />
              </button>
            </div>
            <p className="text-xs text-soft-pink/70 mt-2 font-light">
              All 5 secrets unlocked! A special handwritten note awaits you 💌
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Romantic Message Reveal Modal */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMessage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 25 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#270819] to-[#14040D] border border-romantic-pink/50 box-glow-card shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-soft-pink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag / Icon Header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{activeMessage.emoji}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-romantic-pink/20 border border-romantic-pink/40 text-soft-pink">
                  {activeMessage.shortTag}
                </span>
              </div>

              {/* Message Heading */}
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-3">
                "{activeMessage.title}"
              </h3>

              {/* Detailed Romantic Text */}
              <p className="font-poppins text-soft-pink/90 text-base sm:text-lg leading-relaxed mb-6 font-light">
                {activeMessage.revealedText}
              </p>

              {/* Playful Flirty Callout Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-romantic-pink/20 mb-6">
                <p className="font-dancing text-xl sm:text-2xl text-romantic-pink text-center">
                  {activeMessage.flirtQuote}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setActiveMessage(null)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-romantic-pink to-rose-red text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 box-glow-pink"
                >
                  <span>Hold this in your heart ❤️</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
