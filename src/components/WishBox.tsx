"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Send, Heart, Sparkles, Check, Copy, MessageSquare } from "lucide-react";
import { playChime, playHeartPop } from "@/utils/audio";

interface WishBoxProps {
  wifeName: string;
  husbandName: string;
}

export default function WishBox({ wifeName, husbandName }: WishBoxProps) {
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    playChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ff4d79", "#ffd700", "#ffffff"],
    });

    setSubmitted(true);
  };

  const shareText = `Anh ${husbandName} ơi, điều ước 20/10 của em (${wifeName}) là: "${wish}". Chồng mau duyệt nha! ❤️`;

  const handleCopy = () => {
    playHeartPop();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSMS = () => {
    window.location.href = `sms:?body=${encodeURIComponent(shareText)}`;
  };

  return (
    <section className="wishbox-section">
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={16} /> Hộp Điều Ước
        </span>
        <h2 className="section-title">Hôm Nay {wifeName} Muốn Gì Nào?</h2>
        <p className="section-desc">
          Mọi điều ước của vợ trong ngày 20/10 đều là mệnh lệnh tối cao đối với chồng!
        </p>
      </div>

      <div className="wishbox-card">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="wish-form">
            <div className="wish-input-wrapper">
              <textarea
                id="wife-wish-input"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Ví dụ: Tối nay chồng đưa em đi ăn lẩu nướng nha, hoặc chồng mua tặng em món quà em thích..."
                rows={3}
                className="wish-textarea"
                required
              />
            </div>

            <button
              id="btn-submit-wish"
              type="submit"
              className="btn-submit-wish"
              disabled={!wish.trim()}
            >
              <Send size={18} />
              <span>Gửi Điều Ước Cho {husbandName}</span>
              <Heart size={16} fill="currentColor" />
            </button>
          </form>
        ) : (
          <div className="wish-success-box">
            <div className="success-icon-wrap">
              <Heart size={36} fill="#ff4d79" color="#ff4d79" className="animate-bounce" />
            </div>
            <h3 className="success-title">Điều Ước Của Vợ Đã Được Ghi Nhận!</h3>
            <p className="success-quote">“{wish}”</p>
            <p className="success-desc">
              Chồng {husbandName} đã nhận lệnh và đang chuẩn bị thực hiện 100%! Hãy bấm gửi ngay tin nhắn cho chồng để nhắc nhở nhé:
            </p>

            <div className="wish-share-buttons">
              <button
                id="btn-sms-wish"
                onClick={handleSendSMS}
                className="btn-share-sms"
              >
                <MessageSquare size={16} /> Gửi Tin Nhắn / SMS
              </button>

              <button
                id="btn-copy-wish"
                onClick={handleCopy}
                className="btn-share-copy"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Đã Sao Chép!" : "Sao Chép Lời Nhắn"}</span>
              </button>

              <button
                id="btn-another-wish"
                onClick={() => {
                  setSubmitted(false);
                  setWish("");
                }}
                className="btn-another-wish"
              >
                Gửi Thêm Điều Ước Khác ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
