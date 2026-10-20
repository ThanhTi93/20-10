// Web Audio API Synthesizer & MP3 Player Support

type AudioListener = (playing: boolean) => void;
const stateListeners: Set<AudioListener> = new Set();

let audioCtx: AudioContext | null = null;
let bgMusicInterval: NodeJS.Timeout | null = null;
let isPlaying = false;
let customAudioEl: HTMLAudioElement | null = null;
let currentSongUrl: string = "/music.mp3";

function notifyListeners(playing: boolean) {
  stateListeners.forEach((fn) => {
    try {
      fn(playing);
    } catch (e) {
      console.error(e);
    }
  });
}

export function subscribeAudioState(fn: AudioListener) {
  stateListeners.add(fn);
  fn(isPlaying);
  return () => {
    stateListeners.delete(fn);
  };
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Delicate, sparkling bell chime (for envelope open / success)
export function playChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
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

    osc.type = "sine";
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

// Romantic melody notes for synthesized fallback
const romanticMelodyNotes = [
  261.63, 329.63, 392.0, 523.25,
  196.0, 293.66, 392.0, 493.88,
  220.0, 261.63, 329.63, 440.0,
  174.61, 261.63, 349.23, 440.0,
  261.63, 329.63, 392.0, 523.25,
  196.0, 293.66, 392.0, 587.33,
  220.0, 329.63, 440.0, 523.25,
  174.61, 261.63, 349.23, 523.25,
];

let noteIdx = 0;

function startSynthMelody() {
  try {
    const ctx = getAudioContext();
    isPlaying = true;
    notifyListeners(true);

    const step = () => {
      if (!isPlaying) return;
      const freq = romanticMelodyNotes[noteIdx % romanticMelodyNotes.length];
      noteIdx++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
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
    console.error("Synth melody error:", e);
    isPlaying = false;
    notifyListeners(false);
  }
}

function stopSynthMelody() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}

export function setCustomSongUrl(url: string) {
  if (url !== currentSongUrl) {
    currentSongUrl = url;
    if (customAudioEl) {
      customAudioEl.pause();
      customAudioEl = null;
    }
  }
}

export function startRomanticMelody(onStateChange?: (playing: boolean) => void, songUrl?: string) {
  const targetUrl = songUrl || currentSongUrl;

  if (targetUrl) {
    if (!customAudioEl || customAudioEl.src !== targetUrl) {
      customAudioEl = new Audio(targetUrl);
      customAudioEl.loop = true;
      customAudioEl.volume = 0.6;
      customAudioEl.onplay = () => {
        isPlaying = true;
        notifyListeners(true);
        if (onStateChange) onStateChange(true);
      };
      customAudioEl.onpause = () => {
        isPlaying = false;
        notifyListeners(false);
        if (onStateChange) onStateChange(false);
      };
    }

    customAudioEl
      .play()
      .then(() => {
        isPlaying = true;
        stopSynthMelody();
        notifyListeners(true);
        if (onStateChange) onStateChange(true);
      })
      .catch((err) => {
        console.warn("Could not play custom audio file, falling back to romantic piano synthesizer:", err);
        startSynthMelody();
        if (onStateChange) onStateChange(true);
      });
  } else {
    startSynthMelody();
    if (onStateChange) onStateChange(true);
  }
}

export function stopRomanticMelody(onStateChange?: (playing: boolean) => void) {
  isPlaying = false;
  stopSynthMelody();
  if (customAudioEl) {
    customAudioEl.pause();
  }
  notifyListeners(false);
  if (onStateChange) onStateChange(false);
}

export function toggleRomanticMelody(onStateChange?: (playing: boolean) => void, songUrl?: string): boolean {
  if (isPlaying) {
    stopRomanticMelody(onStateChange);
    return false;
  } else {
    startRomanticMelody(onStateChange, songUrl);
    return true;
  }
}

export function getIsPlayingMelody(): boolean {
  return isPlaying;
}
