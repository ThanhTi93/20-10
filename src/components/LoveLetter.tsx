"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Feather } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface LoveLetterProps {
  wifeName: string;
  husbandName: string;
  letterTitle: string;
  letterMessage: string;
}

export default function LoveLetter({
  wifeName,
  husbandName,
  letterTitle,
  letterMessage,
}: LoveLetterProps) {
  const [loveCount, setLoveCount] = useState(0);

  const handleSendLove = (e: React.MouseEvent) => {
    playHeartPop();
    setLoveCount((prev) => prev + 1);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { x, y },
      colors: ["#ff4d79", "#ff758c", "#ff9bb2", "#ffffff"],
    });
  };

  return (
    <section id="love-letter-section" className="letter-section">
      <div className="section-header">
        <span className="section-tag">
          <Feather size={16} /> Bức Thư Tình Ngày 20/10
        </span>
        <h2 className="section-title">Những Lời Tận Đáy Lòng Anh</h2>
        <p className="section-desc">Viết riêng cho người phụ nữ làm ấm cả thế giới của anh</p>
      </div>

      <div className="parchment-letter">
        <div className="parchment-corner top-left" />
        <div className="parchment-corner top-right" />
        <div className="parchment-corner bottom-left" />
        <div className="parchment-corner bottom-right" />

        <div className="letter-header">
          <span className="letter-date">Ngày 20 tháng 10 năm 2026</span>
          <h3 className="letter-heading">{letterTitle}</h3>
          <p className="letter-salutation">Gửi {wifeName} yêu dấu của anh,</p>
        </div>

        <div className="letter-body">
          {letterMessage.split("\n\n").map((para, idx) => (
            <p key={idx} className="letter-para">
              {para}
            </p>
          ))}
        </div>

        <div className="letter-signature-wrap">
          <p className="sig-sub">Yêu vợ mãi mãi,</p>
          <p className="sig-name">{husbandName} ❤️</p>
          <div className="sig-seal">
            <Heart size={20} fill="#e11d48" color="#e11d48" />
          </div>
        </div>

        <div className="letter-interactive-bar">
          <button
            id="btn-like-letter"
            onClick={handleSendLove}
            className="btn-letter-love"
          >
            <Heart
              size={20}
              className="fill-current text-rose-500 animate-bounce"
            />
            <span>Thả tim cho chồng ({loveCount})</span>
          </button>
          {loveCount > 0 && (
            <span className="love-feedback-text">
              <Sparkles size={14} /> Chồng nhận được {loveCount} nụ hôn từ vợ rồi nhé! 😘
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
