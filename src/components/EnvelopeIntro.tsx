"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { playChime, startRomanticMelody } from "@/utils/audio";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeIntroProps {
  wifeName: string;
  onOpen: () => void;
}

export default function EnvelopeIntro({ wifeName, onOpen }: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio effects
    playChime();
    startRomanticMelody();

    // Multistage Confetti explosion
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4d79", "#ff758c", "#ffd700", "#ffffff", "#ff80bf"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#ff4d79", "#ff758c", "#ffd700", "#ffffff"],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#ff4d79", "#ff758c", "#ffd700", "#ffffff"],
      });
    }, 300);

    // Trigger reveal after animation finishes
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`envelope-overlay ${isOpening ? "opening" : ""}`}>
      <div className="envelope-wrapper">
        <div className="envelope-glow" />

        <div className="envelope-card-preview">
          <div className="envelope-box" onClick={handleOpenEnvelope}>
            <div className="envelope-flap" />
            <div className="envelope-pocket" />

            <div className="wax-seal">
              <Heart className="wax-heart-icon" fill="currentColor" />
              <span>20/10</span>
            </div>

            <div className="letter-peek">
              <Sparkles size={16} className="text-amber-300" />
              <span>Thư gửi {wifeName} ❤️</span>
            </div>
          </div>
        </div>

        <div className="envelope-instruction">
          <p className="instruction-badge">
            <Sparkles size={16} /> Món Quà Bí Mật 20/10
          </p>
          <h1 className="instruction-title">Gửi Người Phụ Nữ Anh Yêu Nhất</h1>
          <p className="instruction-sub">
            Chạm vào phong thư để mở món quà đặc biệt anh dành riêng cho {wifeName} nhé! ✨
          </p>
          <button
            id="btn-open-envelope"
            onClick={handleOpenEnvelope}
            className="envelope-open-btn"
          >
            <span>Mở Quà Ngay</span>
            <Heart size={20} className="pulse-heart" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
