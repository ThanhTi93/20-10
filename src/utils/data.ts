import { CoupleConfig, CouponItem, ReasonItem } from "@/types";

export const DEFAULT_CONFIG: CoupleConfig = {
  wifeName: "Vợ Yêu",
  husbandName: "Chồng Cưng",
  startDate: "2023-08-06", // Ngày 06/08/2023 dương lịch
  letterTitle: "Gửi người phụ nữ tuyệt vời nhất của cuộc đời anh",
  letterMessage: `Nhân ngày Phụ nữ Việt Nam 20/10, anh muốn dành những lời chân thành và ấm áp nhất gửi đến em — người vợ dịu dàng, người bạn đồng hành tuyệt vời và là bến đỗ bình yên nhất của anh.

Cảm ơn em vì đã luôn ở bên cạnh, cùng anh chia sẻ từng bữa cơm, từng niềm vui nhỏ bé và cả những lúc khó khăn. Sự chu đáo, nụ cười rạng rỡ và tình yêu của em chính là động lực lớn nhất để anh nỗ lực mỗi ngày.

Chúc vợ của anh ngày 20/10 thật nhiều niềm vui, luôn xinh đẹp rạng ngời, mãi giữ nụ cười hạnh phúc trên môi và an tâm rằng phía sau em luôn có anh che chở, yêu thương vô điều kiện! Yêu vợ rất nhiều ❤️`,
};

export const INITIAL_COUPONS: CouponItem[] = [
  {
    id: "coupon-1",
    title: "Vé Massage VIP Toàn Thân",
    desc: "Massage lưng, vai gáy & ngâm chân nước ấm bất cứ khi nào vợ thấy mỏi. Phục vụ 24/7!",
    badge: "VIP Không Giới Hạn",
    iconName: "Sparkles",
    redeemed: false,
  },
  {
    id: "coupon-2",
    title: "Phiếu Miễn Rửa Bát & Dọn Dẹp 1 Tuần",
    desc: "Chồng đảm nhiệm toàn bộ chén bát và nhà cửa sạch bóng, vợ chỉ việc nằm nghỉ ngơi.",
    badge: "Đặc Quyền Nữ Hoàng",
    iconName: "Utensils",
    redeemed: false,
  },
  {
    id: "coupon-3",
    title: "Thẻ Shopping Không Cằn Nhằn",
    desc: "Chồng đi cùng xách đồ, kiên nhẫn đợi thử đồ và luôn khen: 'Em mặc gì cũng xinh hết nấc!'",
    badge: "Hạn Sử Dụng Vĩnh Viễn",
    iconName: "ShoppingBag",
    redeemed: false,
  },
  {
    id: "coupon-4",
    title: "Vé 'Chồng Nhận Sai Trước'",
    desc: "Bất kể cãi nhau chuyện gì, chỉ cần giơ vé này ra là chồng tự động nhận sai và dỗ dành ngay!",
    badge: "Quyền Năng Tối Thượng",
    iconName: "Award",
    redeemed: false,
  },
  {
    id: "coupon-5",
    title: "Bữa Tối Lãng Mạn 2 Người",
    desc: "Một buổi hẹn hò riêng tư tại nhà hàng vợ thích, hoặc chồng tự tay vào bếp nấu món vợ mê.",
    badge: "Date Night Đặc Biệt",
    iconName: "Heart",
    redeemed: false,
  },
  {
    id: "coupon-6",
    title: "Gói 1000 Nụ Hôn & Cái Ôm Ấm Áp",
    desc: "Dùng để nạp năng lượng bất kỳ lúc nào vợ thấy mệt mỏi hay cần được vỗ về.",
    badge: "Ngọt Ngào Vô Hạn",
    iconName: "Flame",
    redeemed: false,
  },
];

export const REASONS_LIST: ReasonItem[] = [
  {
    id: 1,
    emoji: "✨",
    title: "Nụ cười rạng rỡ của em",
    content: "Mỗi khi em cười, dường như mọi mệt mỏi trong ngày của anh đều tan biến. Em là ánh mặt trời nhỏ của anh.",
  },
  {
    id: 2,
    emoji: "🍲",
    title: "Bữa cơm ấm áp tình yêu",
    content: "Dù là món cầu kỳ hay chỉ là tô canh giản dị, vị ngon nhất luôn là sự chăm sóc và yêu thương em gửi gắm.",
  },
  {
    id: 3,
    emoji: "🌸",
    title: "Sự dịu dàng & thấu hiểu",
    content: "Em luôn biết lắng nghe, động viên và tin tưởng anh ngay cả trong những thời điểm anh hoang mang nhất.",
  },
  {
    id: 4,
    emoji: "🏡",
    title: "Tổ ấm bình yên em vun vén",
    content: "Có em, ngôi nhà mới thực sự là 'nhà' — nơi ngập tràn tiếng cười, sự ngăn nắp và hơi ấm gia đình.",
  },
  {
    id: 5,
    emoji: "💖",
    title: "Đôi mắt biết nói",
    content: "Mỗi lần nhìn vào mắt em, anh lại thấy lý do vì sao mình muốn phấn đấu để trở thành người đàn ông tốt hơn.",
  },
  {
    id: 6,
    emoji: "💍",
    title: "Vì em là chính em",
    content: "Đơn giản vì em là mảnh ghép hoàn hảo nhất, là món quà tuyệt vời nhất mà cuộc đời đã mang đến cho anh.",
  },
];

export const SWEET_COMPLIMENTS = [
  "Hôm nay vợ của anh trông cực kỳ xinh đẹp và quyến rũ! 🥰",
  "Trong mắt anh, không ai có nụ cười đẹp và ngọt ngào bằng vợ! ✨",
  "Lấy được em là quyết định đúng đắn và may mắn nhất cuộc đời anh! 💍",
  "Cảm ơn em vì mỗi ngày đều biến ngôi nhà của chúng mình thành nơi bình yên nhất. 🏡",
  "Em chính là người phụ nữ thông minh, tài giỏi và đáng yêu nhất trần đời! 🌟",
  "Yêu em hôm nay nhiều hơn hôm qua, và chắc chắn ít hơn ngày mai! ❤️",
  "Bất kể thời gian trôi qua bao lâu, trong tim anh em vẫn mãi là cô gái đẹp nhất! 🌹",
  "Chỉ cần có em bên cạnh, khó khăn nào anh cũng có thể vượt qua! 💪",
  "Vợ anh nấu ăn ngon nhất quả đất, không nhà hàng 5 sao nào sánh bằng! 🍲",
  "Cả thế giới này có thể quay lưng, nhưng anh sẽ luôn đứng về phía vợ! 🛡️",
];
