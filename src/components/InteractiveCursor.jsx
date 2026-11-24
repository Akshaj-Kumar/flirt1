import React, { useEffect, useState } from 'react';

/**
 * Smooth glowing cursor trail with mini floating hearts on desktop.
 * Automatically disables on touch screens for optimal mobile experience.
 */
export default function InteractiveCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let heartCounter = 0;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Spawn a sparkling mini-heart every few cursor movements
      heartCounter++;
      if (heartCounter % 4 === 0) {
        const id = Date.now() + Math.random();
        const newSparkle = {
          id,
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 8 + 8,
          rotation: (Math.random() - 0.5) * 40,
        };

        setTrail((prev) => [...prev.slice(-12), newSparkle]);

        setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== id));
        }, 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Soft pink cursor glow light */}
      <div
        className="fixed w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out blur-xl pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: 'radial-gradient(circle, rgba(255, 79, 163, 0.22) 0%, rgba(255, 49, 93, 0) 70%)',
        }}
      />

      {/* Sparkling mini heart trail */}
      {trail.map((sparkle) => (
        <span
          key={sparkle.id}
          className="fixed text-romantic-pink font-bold select-none animate-ping pointer-events-none opacity-80"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            fontSize: `${sparkle.size}px`,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            textShadow: '0 0 8px rgba(255, 79, 163, 0.8)',
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
