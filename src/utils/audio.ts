// Web Audio API Synthesizer & Sound Effects
// Works 100% reliably in any modern browser without external audio files

let audioCtx: AudioContext | null = null;
let bgMusicInterval: NodeJS.Timeout | null = null;
let isPlayingMelody = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Delicate, sparkling bell chime (for envelope open / success)
export function playChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + index * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.1);
      osc.stop(ctx.currentTime + index * 0.1 + 1.3);
    });
  } catch (e) {
    console.error("Audio chime error:", e);
  }
}

// Cute popping heart chime
export function playHeartPop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.error("Heart pop audio error:", e);
  }
}

// Soft romantic melody arpeggio (Music Box style)
const romanticMelodyNotes = [
  // C major - G - Am - F progression (warm, emotional, gentle)
  261.63, 329.63, 392.00, 523.25, // C - E - G - C
  196.00, 293.66, 392.00, 493.88, // G - D - G - B
  220.00, 261.63, 329.63, 440.00, // A - C - E - A
  174.61, 261.63, 349.23, 440.00, // F - C - F - A
  261.63, 329.63, 392.00, 523.25, // C - E - G - C
  196.00, 293.66, 392.00, 587.33, // G - D - G - D
  220.00, 329.63, 440.00, 523.25, // A - E - A - C
  174.61, 261.63, 349.23, 523.25  // F - C - F - C
];

let noteIdx = 0;

export function startRomanticMelody(onStateChange?: (playing: boolean) => void) {
  if (isPlayingMelody) return;
  try {
    const ctx = getAudioContext();
    isPlayingMelody = true;
    if (onStateChange) onStateChange(true);

    const step = () => {
      if (!isPlayingMelody) return;
      const freq = romanticMelodyNotes[noteIdx % romanticMelodyNotes.length];
      noteIdx++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm celesta/rhodes piano tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    };

    step();
    bgMusicInterval = setInterval(step, 400);
  } catch (e) {
    console.error("Melody error:", e);
    isPlayingMelody = false;
    if (onStateChange) onStateChange(false);
  }
}

export function stopRomanticMelody(onStateChange?: (playing: boolean) => void) {
  isPlayingMelody = false;
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
  if (onStateChange) onStateChange(false);
}

export function toggleRomanticMelody(onStateChange?: (playing: boolean) => void): boolean {
  if (isPlayingMelody) {
    stopRomanticMelody(onStateChange);
    return false;
  } else {
    startRomanticMelody(onStateChange);
    return true;
  }
}

export function getIsPlayingMelody(): boolean {
  return isPlayingMelody;
}
