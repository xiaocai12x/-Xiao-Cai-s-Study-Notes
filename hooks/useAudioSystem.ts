
import { useCallback, useRef } from 'react';
import { SoundType } from '../types';

export const useAudioSystem = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
  }, []);

  const playSound = useCallback((type: SoundType) => {
    // Attempt to init context on user gesture
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case SoundType.HOVER:
        // Mechanical Tick: High freq square wave, super short
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.04);
        gain.gain.setValueAtTime(0.02, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        osc.start(t);
        osc.stop(t + 0.05);
        break;

      case SoundType.CLICK:
        // Heavy Latch: Low freq sawtooth, punchy
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
        break;

      case SoundType.SWITCH:
        // Toggle Click: Higher metallic click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.05);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.05);
        osc.start(t);
        osc.stop(t + 0.05);
        break;

      case SoundType.TYPE:
        // Teletype Key: Short, dry noise-like blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(400 + Math.random() * 100, t);
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
        osc.start(t);
        osc.stop(t + 0.06);
        break;

      case SoundType.OPEN:
        // File Open: Whoosh/Slide feel (Low sine sweep)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.linearRampToValueAtTime(300, t + 0.2);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.2);
        osc.start(t);
        osc.stop(t + 0.2);
        break;

      case SoundType.ERROR:
        // Buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.linearRampToValueAtTime(80, t + 0.3);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
        break;

      case SoundType.SUCCESS:
        // Chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, t);
        osc.frequency.setValueAtTime(554, t + 0.1); // C#
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
        break;

      case SoundType.TRANSMIT:
        // Modem Handshake: Sequence of beeps
        osc.type = 'square';
        
        // Beep 1
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.setValueAtTime(2400, t + 0.1);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.setValueAtTime(0.05, t + 0.1);
        
        // Noise Burst (simulated by rapid freq modulation)
        osc.frequency.setValueAtTime(400, t + 0.2);
        osc.frequency.linearRampToValueAtTime(3000, t + 0.4);
        
        gain.gain.linearRampToValueAtTime(0.001, t + 0.5);
        
        osc.start(t);
        osc.stop(t + 0.5);
        break;
    }
  }, [initAudio]);

  return { playSound };
};
