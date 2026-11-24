import React, { useEffect, useRef } from 'react';

/**
 * High performance romantic background with floating glowing hearts,
 * soft bokeh orbs, and drifting rose petals.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array: mixture of hearts, petals, and glowing orbs
    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 45);

    class HeartParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 0.8 + 0.35;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.oscillation = Math.random() * Math.PI * 2;
        this.oscSpeed = Math.random() * 0.02 + 0.01;
        this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'petal' : 'orb';
        
        // Colors: romantic pink, rose red, soft blush
        const colors = [
          'rgba(255, 79, 163, ',
          'rgba(255, 49, 93, ',
          'rgba(255, 182, 217, ',
          'rgba(249, 199, 223, ',
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.oscillation += this.oscSpeed;
        this.x += Math.sin(this.oscillation) * 0.6 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `${this.baseColor}${this.opacity})`;
        ctx.shadowColor = 'rgba(255, 79, 163, 0.4)';
        ctx.shadowBlur = this.size * 0.8;

        if (this.type === 'heart') {
          // Draw heart path
          const s = this.size / 15;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-5 * s, -8 * s, -12 * s, -3 * s, -12 * s, 4 * s);
          ctx.bezierCurveTo(-12 * s, 10 * s, -3 * s, 16 * s, 0, 20 * s);
          ctx.bezierCurveTo(3 * s, 16 * s, 12 * s, 10 * s, 12 * s, 4 * s);
          ctx.bezierCurveTo(12 * s, -3 * s, 5 * s, -8 * s, 0, 0);
          ctx.fill();
        } else if (this.type === 'petal') {
          // Draw rose petal
          const s = this.size / 14;
          ctx.beginPath();
          ctx.ellipse(0, 0, 6 * s, 12 * s, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw soft glowing bokeh orb
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new HeartParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient burgundy radial glow in center/background
      const bgGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.1,
        width / 2,
        height / 2,
        width * 0.7
      );
      bgGlow.addColorStop(0, 'rgba(39, 8, 25, 0.35)');
      bgGlow.addColorStop(1, 'rgba(8, 5, 10, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
