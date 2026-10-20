export interface CoupleConfig {
  wifeName: string;
  husbandName: string;
  startDate: string; // YYYY-MM-DD
  letterTitle: string;
  letterMessage: string;
  songUrl?: string;
}

export interface CouponItem {
  id: string;
  title: string;
  desc: string;
  badge: string;
  iconName: string;
  redeemed: boolean;
}

export interface ReasonItem {
  id: number;
  emoji: string;
  title: string;
  content: string;
}
