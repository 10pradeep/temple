export type PageView =
  | 'home'
  | 'calendar'
  | 'darisanam'
  | 'donation'
  | 'annadhanam'
  | 'festival'
  | 'live'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin-login'
  | 'admin-dashboard';

export type EventCategory = 'festival' | 'pooja' | 'regular' | 'important';

export interface CalendarEvent {
  id: string;
  title: string;
  tamilDate: string;
  date: string; // YYYY-MM-DD
  year: number;
  month: number; // 0-11
  day: number;
  category: EventCategory;
  startTime: string;
  endTime: string;
  auspiciousTime?: string;
  description: string;
  specialInstructions?: string;
  image?: string;
  isVerified: boolean;
}

export interface DarisanamSlotTemplate {
  id: string;
  label: string;
  labelTa: string;
  timeRange: string;
  capacity: number;
}

export type DarisanamStatus = 'pending' | 'confirmed' | 'cancelled';

export interface DarisanamBooking {
  id: string;
  referenceNumber: string;
  devoteeName: string;
  mobile: string;
  email?: string;
  numberOfDevotees: number;
  date: string; // YYYY-MM-DD
  slotId: string;
  slotLabel: string;
  status: DarisanamStatus;
  statusNote: string;
  createdAt: string;
  isDemo?: boolean;
}

export type PaymentStatus = 'verified' | 'pending' | 'failed';

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  paymentReference: string;
  donorName: string;
  mobile: string;
  email: string;
  amount: number;
  purpose: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  isDemo?: boolean;
}

export interface AnnadhanamBooking {
  id: string;
  receiptNumber: string;
  paymentReference: string;
  devoteeName: string;
  mobile: string;
  email?: string;
  date: string; // YYYY-MM-DD
  mealType: 'Lunch' | 'Evening Prasadam';
  quantity: number;
  amount: number;
  dedicationMessage: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  isDemo?: boolean;
}

export interface AnnadhanamConfig {
  sponsorshipAmount: number;
  unavailableDates: string[]; // YYYY-MM-DD marked Grey / Unavailable by Admin
  disabledSlots: string[]; // `${date}|${mealType}` marked unavailable
  maxBookingsPerSlot: number;
}

export interface CommonReceiptData {
  receiptNumber: string;
  paymentReference: string;
  devoteeName: string;
  mobile: string;
  email?: string;
  purpose: string;
  amount: number;
  date: string;
  issuedAt: string;
  paymentStatus: PaymentStatus;
  category: 'donation' | 'annadhanam';
  extraNote?: string;
  isDemo?: boolean;
}

export type FestivalCategory =
  | 'Upcoming Festivals'
  | 'Major Temple Festivals'
  | 'Special Pooja'
  | 'Tamil Calendar Events'
  | 'Completed Festivals';

export interface FestivalItem {
  id: string;
  name: string;
  tamilMonth: string;
  dateStr: string;
  category: FestivalCategory;
  image: string;
  description: string;
  poojaTimings: string;
  specialInstructions: string;
  isProminent?: boolean;
  isVerified?: boolean;
}

export interface TempleLocationConfig {
  templeName: string;
  subtitle: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  darshanMorning: string;
  darshanEvening: string;
  googleMapsUrl: string;
  isVerified: boolean;
  verificationNote: string;
}

export type LiveSourceType = 'demo' | 'embed' | 'video';

export interface LiveStreamConfig {
  sourceType: LiveSourceType;
  streamUrl: string;
  isLive: boolean;
  statusMessage: string;
  offlineFallbackMessage: string;
  fallbackImage: string;
  activeViewers: number;
}

export interface HeroMediaItem {
  id: string;
  mediaType: 'image' | 'video';
  src: string;
  poster?: string;
  titleEn: string;
  titleTa: string;
  subtitleEn: string;
  subtitleTa: string;
  badgeEn: string;
  badgeTa: string;
  actionTextEn: string;
  actionTextTa: string;
  actionPage: PageView;
  isOriginal?: boolean;
}

export interface HistoricalPhotoItem {
  id: string;
  image: string;
  title: string;
  titleTa: string;
  caption: string;
  captionTa: string;
  isOriginal: boolean;
  isPlaceholder?: boolean;
}

export interface TempleAnnouncement {
  id: string;
  title: string;
  message: string;
  date: string;
  isNew: boolean;
  priority: 'high' | 'normal';
}

export interface DeityInfo {
  name: string;
  subtitle: string;
  shortIntro: string;
  history: string[];
  spiritualSignificance: string[];
  traditions: string[];
  annualFestivals: string[];
  heritage: string[];
  mantra: string;
  historicalPhotos: HistoricalPhotoItem[];
}

export interface AdminSettingsConfig {
  adminDisplayName: string;
  airVerificationNote: string;
  templeOfficeNote: string;
}
