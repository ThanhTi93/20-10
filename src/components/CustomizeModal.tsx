"use client";

import { useState } from "react";
import { Settings, X, Save, Copy, Check, Heart, Sparkles, Link as LinkIcon } from "lucide-react";
import { CoupleConfig } from "@/types";
import { playHeartPop } from "@/utils/audio";

interface CustomizeModalProps {
  config: CoupleConfig;
  onSave: (newConfig: CoupleConfig) => void;
}

export default function CustomizeModal({ config, onSave }: CustomizeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CoupleConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpen = () => {
    playHeartPop();
    setFormData(config);
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    onSave(formData);
    setIsOpen(false);
  };

  const generateShareLink = () => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams();
    if (formData.wifeName) params.set("wife", formData.wifeName);
    if (formData.husbandName) params.set("husband", formData.husbandName);
    if (formData.startDate) params.set("date", formData.startDate);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      {/* Floating customize launcher button */}
      <div className="customize-trigger-wrap">
        <button
          id="btn-open-customize"
          onClick={handleOpen}
          className="btn-customize-trigger"
          title="Tùy chỉnh tên vợ, chồng & ngày kỷ niệm"
        >
          <Settings size={18} className="animate-spin-slow" />
          <span>Tùy Chỉnh Cho Vợ</span>
        </button>
      </div>

      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Heart size={20} className="text-rose-500 fill-current" />
                <h3 className="modal-title">Tùy Chỉnh Thông Tin Gửi Vợ</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="modal-close-btn"
                title="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            <p className="modal-intro">
              💡 Bạn có thể đổi tên vợ, tên bạn và ngày kỷ niệm. Bấm &quot;Sao Chép Link&quot; để gửi đường link đã cá nhân hóa này cho vợ xem ngay trên điện thoại!
            </p>

            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group-grid">
                <div className="form-field">
                  <label htmlFor="input-wife-name">Tên gọi của Vợ:</label>
                  <input
                    id="input-wife-name"
                    type="text"
                    value={formData.wifeName}
                    onChange={(e) =>
                      setFormData({ ...formData, wifeName: e.target.value })
                    }
                    placeholder="Ví dụ: Vợ Yêu, Bé Bống, Lan..."
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="input-husband-name">Tên gọi của Chồng:</label>
                  <input
                    id="input-husband-name"
                    type="text"
                    value={formData.husbandName}
                    onChange={(e) =>
                      setFormData({ ...formData, husbandName: e.target.value })
                    }
                    placeholder="Ví dụ: Chồng Cưng, Anh Yêu, Minh..."
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="input-start-date">Ngày bắt đầu yêu hoặc ngày cưới:</label>
                <input
                  id="input-start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="input-letter-title">Tiêu đề thư tình:</label>
                <input
                  id="input-letter-title"
                  type="text"
                  value={formData.letterTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, letterTitle: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="input-letter-msg">Nội dung thư tình:</label>
                <textarea
                  id="input-letter-msg"
                  rows={4}
                  value={formData.letterMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, letterMessage: e.target.value })
                  }
                  required
                />
              </div>

              {/* Share link generation box */}
              <div className="share-link-box">
                <div className="share-link-info">
                  <LinkIcon size={16} className="text-amber-400" />
                  <span>Link cá nhân hóa để gửi cho vợ:</span>
                </div>
                <div className="share-link-input-row">
                  <input
                    type="text"
                    readOnly
                    value={generateShareLink()}
                    className="share-link-input"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="btn-copy-share-link"
                  >
                    {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedLink ? "Đã chép" : "Chép link"}</span>
                  </button>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-modal-cancel"
                >
                  Hủy
                </button>
                <button type="submit" className="btn-modal-save">
                  <Save size={16} />
                  <span>Lưu Thay Đổi</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
