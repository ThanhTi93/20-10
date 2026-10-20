"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, Mail, Clock } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface HeroSectionProps {
  wifeName: string;
  husbandName: string;
  startDate: string;
  onScrollToLetter: () => void;
  onScrollToCoupons: () => void;
}

export default function HeroSection({
  wifeName,
  startDate,
  onScrollToLetter,
  onScrollToCoupons,
}: HeroSectionProps) {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const handleBurstHearts = (e: React.MouseEvent) => {
    playHeartPop();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ["#ff4d79", "#ff758c", "#ffccd5", "#ffd700"],
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-badge-wrap">
        <span className="hero-badge">
          <Sparkles size={16} className="text-rose-300 animate-spin-slow" />
          Ngày Phụ Nữ Việt Nam 20/10
          <Sparkles size={16} className="text-rose-300 animate-spin-slow" />
        </span>
      </div>

      <h1 className="hero-title">
        Gửi <span className="highlight-wife-name">{wifeName}</span>, Bông Hoa Rạng Rỡ Nhất Của Anh 🌹
      </h1>

      <p className="hero-subtitle">
        Cảm ơn em vì đã đến, đã luôn bên cạnh và mang lại muôn vàn ấm áp cho cuộc đời anh.
        Chúc vợ yêu một ngày 20/10 ngập tràn nụ cười, hạnh phúc và yêu thương bất tận!
      </p>

      {/* Love Duration Clock */}
      <div className="love-clock-card">
        <div className="clock-header">
          <Clock size={18} className="text-rose-400" />
          <span>Hành Trình Tình Yêu Của Chúng Mình</span>
          <Heart size={16} className="text-rose-400" fill="currentColor" />
        </div>

        <div className="clock-grid">
          <div className="clock-box">
            <span className="clock-val">{timeTogether.days.toLocaleString()}</span>
            <span className="clock-unit">Ngày</span>
          </div>
          <span className="clock-divider">:</span>
          <div className="clock-box">
            <span className="clock-val">
              {String(timeTogether.hours).padStart(2, "0")}
            </span>
            <span className="clock-unit">Giờ</span>
          </div>
          <span className="clock-divider">:</span>
          <div className="clock-box">
            <span className="clock-val">
              {String(timeTogether.minutes).padStart(2, "0")}
            </span>
            <span className="clock-unit">Phút</span>
          </div>
          <span className="clock-divider">:</span>
          <div className="clock-box">
            <span className="clock-val accent-seconds">
              {String(timeTogether.seconds).padStart(2, "0")}
            </span>
            <span className="clock-unit">Giây</span>
          </div>
        </div>

        <p className="clock-sub">
          Mỗi một giây trôi qua, anh lại thấy mình may mắn hơn ngày hôm qua vì có em ❤️
        </p>
      </div>

      {/* CTA action buttons */}
      <div className="hero-ctas">
        <button
          id="btn-scroll-letter"
          onClick={onScrollToLetter}
          className="btn-primary-hero"
        >
          <Mail size={18} />
          <span>Đọc Thư Tình Gửi Vợ</span>
        </button>

        <button
          id="btn-scroll-coupons"
          onClick={onScrollToCoupons}
          className="btn-secondary-hero"
        >
          <Gift size={18} />
          <span>Nhận Voucher Quà 20/10</span>
        </button>

        <button
          id="btn-burst-love"
          onClick={handleBurstHearts}
          className="btn-heart-burst"
          title="Thả ngàn trái tim cho vợ!"
        >
          <Heart size={20} fill="#ff4d79" color="#ff4d79" />
          <span>Thả Tim</span>
        </button>
      </div>
    </section>
  );
}
