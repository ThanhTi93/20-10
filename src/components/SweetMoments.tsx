"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Sparkles, Plus, Trash2 } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface SweetPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number;
}

const DEFAULT_PHOTOS: SweetPhoto[] = [
  {
    id: "default-1",
    url: "/images/bouquet.jpg?v=2",
    caption: "Bó hoa tươi thắm nhất dành tặng ngày 20/10 của vợ yêu 💐",
    date: "20/10/2026",
    rotation: -3,
  },
  {
    id: "default-2",
    url: "/images/couple.jpg?v=2",
    caption: "Bình yên nhất là được nắm tay em đi qua mọi giông bão 🌅",
    date: "Khoảnh khắc yêu thương",
    rotation: 2,
  },
  {
    id: "default-3",
    url: "/images/cake.jpg?v=2",
    caption: "Mọi sự ngọt ngào đều không sánh bằng nụ cười của em 🍰",
    date: "Ngọt ngào bên nhau",
    rotation: -2,
  },
];

export default function SweetMoments() {
  const [photos, setPhotos] = useState<SweetPhoto[]>(DEFAULT_PHOTOS);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wife_moments_photos");
      if (saved) {
        const parsed: SweetPhoto[] = JSON.parse(saved);
        const customOnly = parsed.filter((p) => p.id.startsWith("custom-"));
        if (customOnly.length > 0) {
          setPhotos([...DEFAULT_PHOTOS, ...customOnly]);
          return;
        }
      }
      setPhotos(DEFAULT_PHOTOS);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    playHeartPop();
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const newPhoto: SweetPhoto = {
          id: "custom-" + Date.now(),
          url: event.target.result,
          caption: "Khoảnh khắc đặc biệt của vợ chồng mình ❤️",
          date: new Date().toLocaleDateString("vi-VN"),
          rotation: (Math.random() - 0.5) * 6,
        };

        const updated = [...photos, newPhoto];
        setPhotos(updated);
        try {
          localStorage.setItem("wife_moments_photos", JSON.stringify(updated));
        } catch (err) {
          console.warn("Storage quota exceeded or error saving photo", err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    try {
      localStorage.setItem("wife_moments_photos", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="moments-section">
      <div className="section-header">
        <span className="section-tag">
          <Camera size={16} /> Album Khoảnh Khắc
        </span>
        <h2 className="section-title">Khoảnh Khắc Ngọt Ngào</h2>
        <p className="section-desc">
          Từng góc nhỏ lưu giữ nụ cười và hành trình hạnh phúc của chúng mình
        </p>
      </div>

      <div className="polaroid-gallery">
        {photos.map((item) => (
          <div
            key={item.id}
            className="polaroid-card"
            style={{ transform: `rotate(${item.rotation}deg)` }}
          >
            <div className="washi-tape" />

            <div className="polaroid-img-wrapper">
              <Image
                src={item.url}
                alt={item.caption}
                width={500}
                height={500}
                className="polaroid-img"
                unoptimized={true}
              />
            </div>

            <div className="polaroid-info">
              <p className="polaroid-caption">{item.caption}</p>
              <div className="polaroid-meta">
                <span className="polaroid-date">
                  <Sparkles size={12} className="inline mr-1 text-amber-400" />
                  {item.date}
                </span>

                {item.id.startsWith("custom-") && (
                  <button
                    onClick={(e) => handleDeletePhoto(item.id, e)}
                    className="btn-delete-photo"
                    title="Xóa ảnh"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload button to personalize with real photos */}
      <div className="moments-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          style={{ display: "none" }}
          onChange={handleUploadPhoto}
        />
        <button
          id="btn-upload-moment"
          onClick={() => fileInputRef.current?.click()}
          className="btn-add-moment"
        >
          <Plus size={18} />
          <span>Thêm Ảnh Kỷ Niệm Của Hai Đứa</span>
        </button>
        <p className="moments-note">
          💡 Bạn có thể bấm để tải ảnh chụp thật của hai vợ chồng lên trực tiếp!
        </p>
      </div>
    </section>
  );
}
