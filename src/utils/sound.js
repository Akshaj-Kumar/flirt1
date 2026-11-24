/**
 * Premium Web Audio API Sound Synthesizer & Sound Effects
 * Generates lush ambient romantic chords, heart pops, letter unfolding swooshes,
 * chime fanfares and celebratory sparkles without requiring external audio files.
 */

class RomanticSoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isPlayingBGM = false;
    this.isMuted = false;
    this.chordTimer = null;
    this.currentChordIndex = 0;

    // Romantic progression in C Major / A Minor: Cmaj9 -> Am9 -> Fmaj7#11 -> Gsus4/add9
    this.chords = [
      [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
      [220.0, 261.63, 329.63, 392.0, 493.88],  // Am9
      [174.61, 261.63, 329.63, 369.99, 440.0], // Fmaj7#11
      [196.0, 261.63, 293.66, 392.0, 587.33],  // Gadd9
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    if (!this.ctx) this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.5;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  startBGM() {
    this.init();
    if (this.isPlayingBGM || !this.ctx) return;
    this.isPlayingBGM = true;
    this.playNextChord();
  }

  stopBGM() {
    this.isPlayingBGM = false;
    if (this.chordTimer) {
      clearTimeout(this.chordTimer);
      this.chordTimer = null;
    }
  }

  playNextChord() {
    if (!this.isPlayingBGM || !this.ctx) return;

    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const duration = 4.2;

    chord.forEach((freq, i) => {
      // Soft electric piano / warm sine pad synthesis
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      // Filter for warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900 + i * 150, now);

      // Envelope
      const noteTime = now + i * 0.08;
      oscGain.gain.setValueAtTime(0, noteTime);
      oscGain.gain.linearRampToValueAtTime(0.045 / (i + 1), noteTime + 0.4);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + duration);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.bgmGain);

      osc.start(noteTime);
      osc.stop(noteTime + duration + 0.5);
    });

    this.chordTimer = setTimeout(() => {
      this.playNextChord();
    }, 3800);
  }

  // Play a soft cute heart pop sound
  playHeartPop() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Play soft paper unfold sound effect
  playLetterOpen() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Harmonic chime sequence (arpeggio E5 -> G#5 -> B5 -> E6)
    const notes = [659.25, 830.61, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      const startTime = now + idx * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0005, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + 0.55);
    });
  }

  // Play magical heart explosion sound / fanfare
  playExplosion() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    // Sparkling arpeggio in pentatonic scale
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      const t = now + i * 0.06;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.85);
    });
  }
}

export const soundEngine = new RomanticSoundEngine();
