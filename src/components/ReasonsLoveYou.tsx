"use client";

import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { REASONS_LIST } from "@/utils/data";
import { playHeartPop } from "@/utils/audio";

interface ReasonsLoveYouProps {
  wifeName: string;
}

export default function ReasonsLoveYou({ wifeName }: ReasonsLoveYouProps) {
  const [activeIds, setActiveIds] = useState<number[]>([1]); // First one open by default

  const toggleReason = (id: number) => {
    playHeartPop();
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="reasons-section">
      <div className="section-header">
        <span className="section-tag">
          <Heart size={16} fill="currentColor" /> Lý Do Anh Yêu Em
        </span>
        <h2 className="section-title">Vì Sao {wifeName} Là Duy Nhất?</h2>
        <p className="section-desc">
          Có hàng triệu lý do để yêu em, nhưng đây là 6 điều khiến trái tim anh rung động mỗi ngày
        </p>
      </div>

      <div className="reasons-grid">
        {REASONS_LIST.map((reason) => {
          const isOpen = activeIds.includes(reason.id);
          return (
            <div
              key={reason.id}
              onClick={() => toggleReason(reason.id)}
              className={`reason-card ${isOpen ? "active" : ""}`}
            >
              <div className="reason-header">
                <span className="reason-emoji">{reason.emoji}</span>
                <span className="reason-num">#{reason.id}</span>
              </div>
              <h4 className="reason-title">{reason.title}</h4>
              <p className="reason-content">{reason.content}</p>
              <div className="reason-footer">
                <span className="reason-prompt">
                  {isOpen ? (
                    <span className="text-rose-300">
                      <Sparkles size={14} className="inline mr-1" /> Chạm để thu gọn
                    </span>
                  ) : (
                    <span>Chạm để xem bí mật...</span>
                  )}
                </span>
                <Heart
                  size={16}
                  className={`reason-heart ${isOpen ? "fill-rose-500 text-rose-500" : ""}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
