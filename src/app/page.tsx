"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PetalCanvas from "@/components/PetalCanvas";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import AudioPlayer from "@/components/AudioPlayer";
import HeroSection from "@/components/HeroSection";
import LoveLetter from "@/components/LoveLetter";
import HusbandCoupons from "@/components/HusbandCoupons";
import ReasonsLoveYou from "@/components/ReasonsLoveYou";
import SweetMoments from "@/components/SweetMoments";
import ComplimentGenerator from "@/components/ComplimentGenerator";
import WishBox from "@/components/WishBox";
import CustomizeModal from "@/components/CustomizeModal";
import { DEFAULT_CONFIG } from "@/utils/data";
import { CoupleConfig } from "@/types";
import { Heart, MailOpen } from "lucide-react";
import { playChime } from "@/utils/audio";

function MainContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<CoupleConfig>(DEFAULT_CONFIG);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Check URL parameters first
    const wifeParam = searchParams.get("wife");
    const husbandParam = searchParams.get("husband");
    const dateParam = searchParams.get("date");

    try {
      const savedConfig = localStorage.getItem("wife_2010_config");
      let base = DEFAULT_CONFIG;
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed.startDate === "2020-10-20") {
          parsed.startDate = DEFAULT_CONFIG.startDate;
        }
        base = { ...base, ...parsed };
      }

      const merged: CoupleConfig = {
        ...base,
        wifeName: wifeParam || base.wifeName,
        husbandName: husbandParam || base.husbandName,
        startDate: dateParam || (base.startDate === "2020-10-20" ? DEFAULT_CONFIG.startDate : base.startDate),
      };

      setConfig(merged);
    } catch (e) {
      console.error(e);
    }
  }, [searchParams]);

  const handleSaveConfig = (newConfig: CoupleConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("wife_2010_config", JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToLetter = () => {
    document.getElementById("love-letter-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCoupons = () => {
    document.getElementById("coupons-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReopenEnvelope = () => {
    playChime();
    setIsOpened(false);
  };

  return (
    <div className="app-container">
      {/* Background Animated Rose Petals & Floating Hearts */}
      <PetalCanvas />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Opening Envelope Experience */}
      {!isOpened && (
        <EnvelopeIntro
          wifeName={config.wifeName}
          onOpen={() => setIsOpened(true)}
        />
      )}

      {/* Main Romantic Content Page */}
      <main className={`main-romantic-content ${isOpened ? "visible" : "hidden"}`}>
        <div className="content-max-width">
          {/* 1. Hero Section */}
          <HeroSection
            wifeName={config.wifeName}
            husbandName={config.husbandName}
            startDate={config.startDate}
            onScrollToLetter={scrollToLetter}
            onScrollToCoupons={scrollToCoupons}
          />

          {/* 2. Heartfelt Love Letter */}
          <LoveLetter
            wifeName={config.wifeName}
            husbandName={config.husbandName}
            letterTitle={config.letterTitle}
            letterMessage={config.letterMessage}
          />

          {/* 3. Exclusive Husband Gift Vouchers */}
          <HusbandCoupons wifeName={config.wifeName} />

          {/* 4. Reasons Why I Love You */}
          <ReasonsLoveYou wifeName={config.wifeName} />

          {/* 5. Sweet Photo Moments */}
          <SweetMoments />

          {/* 6. Compliment & Sweet Candy Jar */}
          <ComplimentGenerator wifeName={config.wifeName} />

          {/* 7. Wife's 20/10 Wish Box */}
          <WishBox
            wifeName={config.wifeName}
            husbandName={config.husbandName}
          />

          {/* Footer */}
          <footer className="romantic-footer">
            <div className="footer-heart-anim">
              <Heart size={28} className="fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <p className="footer-title">
              Trang web được làm riêng với trọn vẹn tình yêu từ{" "}
              <span className="font-semibold text-rose-300">{config.husbandName}</span> gửi tới{" "}
              <span className="font-semibold text-rose-300">{config.wifeName}</span>
            </p>
            <p className="footer-sub">Chúc Vợ Yêu 20/10 Ngập Tràn Hạnh Phúc & Nụ Cười! 🌹✨</p>

            <button
              id="btn-reopen-envelope"
              onClick={handleReopenEnvelope}
              className="btn-reopen-envelope"
            >
              <MailOpen size={16} /> Mở lại phong thư ban đầu
            </button>
          </footer>
        </div>
      </main>

      {/* Husband Customization Modal */}
      <CustomizeModal config={config} onSave={handleSaveConfig} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="loading-screen">Đang chuẩn bị quà 20/10 cho vợ yêu... ❤️</div>}>
      <MainContent />
    </Suspense>
  );
}
