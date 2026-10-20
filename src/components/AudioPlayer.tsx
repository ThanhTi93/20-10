"use client";

import { useState, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import {
  toggleRomanticMelody,
  getIsPlayingMelody,
  subscribeAudioState,
  playHeartPop,
} from "@/utils/audio";

interface AudioPlayerProps {
  songUrl?: string;
}

export default function AudioPlayer({ songUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(getIsPlayingMelody());
    const unsub = subscribeAudioState((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    playHeartPop();
    toggleRomanticMelody(undefined, songUrl);
  };

  return (
    <div className="audio-widget-container">
      <button
        id="btn-toggle-music"
        onClick={handleToggle}
        className={`audio-toggle-button ${isPlaying ? "playing" : ""}`}
        title={isPlaying ? "Tắt nhạc lãng mạn" : "Bật nhạc lãng mạn"}
        aria-label="Toggle background music"
      >
        <div className="audio-disc-icon">
          <Music size={18} className={isPlaying ? "spin-music" : ""} />
        </div>
        <span className="audio-label">
          {isPlaying ? (
            <>
              <Volume2 size={16} /> Nhạc Lãng Mạn (Đang phát)
            </>
          ) : (
            <>
              <VolumeX size={16} /> Bật Nhạc
            </>
          )}
        </span>
        {isPlaying && (
          <div className="sound-waves">
            <span className="wave-bar bar-1" />
            <span className="wave-bar bar-2" />
            <span className="wave-bar bar-3" />
          </div>
        )}
      </button>
    </div>
  );
}
