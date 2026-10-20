# 🌹 Trang Web Chúc Mừng 20/10 Dành Tặng Vợ Yêu

Dự án Next.js (App Router, TypeScript) được thiết kế đặc biệt, sang trọng và lãng mạn nhân dịp **Ngày Phụ Nữ Việt Nam 20/10**. Sẵn sàng để deploy trực tiếp lên **Vercel** hoàn toàn miễn phí chỉ trong 2 phút!

---

## ✨ Điểm Nổi Bật & Tính Năng
1. **Phong Bì 3D Mở Quà Bí Mật**: Khi vợ bấm vào liên kết, phong bì niêm phong sáp đỏ "20/10" sẽ bung mở cùng tiếng chuông ngân vang và pháo hoa rực rỡ (`canvas-confetti`).
2. **Hiệu Ứng Cánh Hoa Hồng & Trái Tim Rơi**: Render mượt mà 60fps qua HTML5 Canvas với hiệu ứng gió nhẹ.
3. **Đồng Hồ Đếm Thời Gian Bên Nhau**: Tự động tính số ngày, giờ, phút, giây hai vợ chồng đã đồng hành.
4. **Phát Nhạc Lãng Mạn (Web Audio API)**: Bản hòa tấu piano/music box nhẹ nhàng tích hợp sẵn, không lo lỗi bản quyền hay link nhạc bị die, hỗ trợ bật/tắt tiện lợi.
5. **Bức Thư Tình Giấy Da Cổ Điển**: Lời chúc chân thành, sâu lắng từ tận đáy lòng kèm nút thả tim tương tác.
6. **Voucher Đặc Quyền Cho Vợ**: 6 chiếc vé quyền lực (*Massage VIP 24/7, Miễn rửa bát 1 tuần, Shopping không cằn nhằn, Chồng nhận sai trước...*) có thể bấm "Đổi Ngay" để đóng dấu đỏ duyệt phạt.
7. **Album Ảnh Kỷ Niệm Polaroid**: Đính kèm ảnh chất lượng cao và cho phép tải ảnh chụp thật của hai vợ chồng lên trực tiếp ngay trên trình duyệt.
8. **Hũ Kẹo Lời Chúc Ngọt Ngào**: Rút ngẫu nhiên các câu khen ngợi ngọt ngào mỗi ngày.
9. **Hộp Điều Ước 20/10 Của Vợ**: Vợ có thể gõ điều ước và bấm gửi ngay qua SMS / Zalo cho Chồng.
10. **Tùy Chỉnh Tên & Link Chia Sẻ**: Có nút cài đặt ở góc dưới để đổi tên vợ, tên chồng, ngày cưới/yêu và sao chép link cá nhân hóa.

---

## 🚀 Hướng Dẫn Deploy Lên Vercel (Trong 2 Phút)

### Cách 1: Đẩy lên GitHub rồi import vào Vercel (Khuyên dùng)
1. **Khởi tạo và đẩy mã nguồn lên GitHub**:
   ```bash
   git add .
   git commit -m "feat: website chuc mung vo 20-10"
   git branch -M main
   git remote add origin https://github.com/TÊN_GITHUB_CỦA_BẠN/vo-yeu-20-10.git
   git push -u origin main
   ```
2. **Deploy trên Vercel**:
   - Truy cập: [https://vercel.com/new](https://vercel.com/new)
   - Đăng nhập bằng tài khoản GitHub.
   - Chọn repository `vo-yeu-20-10` và bấm **Deploy**.
   - Chờ khoảng 1 phút, Vercel sẽ cung cấp cho bạn một link miễn phí dạng: `https://vo-yeu-20-10.vercel.app`.

### Cách 2: Deploy trực tiếp bằng Vercel CLI (Siêu nhanh không cần GitHub)
1. Trong thư mục dự án, chạy lệnh:
   ```bash
   npx vercel
   ```
2. Làm theo hướng dẫn trên màn hình (đăng nhập email/GitHub, bấm Enter chọn cấu hình mặc định).
3. Chạy tiếp lệnh sau để deploy lên môi trường Production:
   ```bash
   npx vercel --prod
   ```
4. Copy đường link Vercel tạo ra gửi cho vợ!

---

## 🎁 Mẹo Gửi Link Cá Nhân Hóa Cho Vợ
Bạn có thể tùy chỉnh trực tiếp tên vợ, tên chồng và ngày kỷ niệm ngay trên URL:
```text
https://tên-dự-án.vercel.app/?wife=Bé+Bống&husband=Chồng+Cưng&date=2021-10-20
```
- `wife`: Tên bạn gọi vợ (ví dụ: `Vợ Yêu`, `Lan`, `Bé Heo`...)
- `husband`: Tên vợ gọi bạn (ví dụ: `Chồng Cưng`, `Anh Yêu`...)
- `date`: Ngày kỷ niệm dạng `YYYY-MM-DD` (ví dụ: `2020-05-18`)

Hoặc chỉ cần mở website, bấm vào nút **"Tùy Chỉnh Cho Vợ"** ở góc dưới bên phải, nhập thông tin rồi bấm **"Chép link"**!
