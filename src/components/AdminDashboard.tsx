import React, { useState, useMemo } from 'react';
import {
  Calendar,
  CalendarCheck,
  HeartHandshake,
  UtensilsCrossed,
  Sparkles,
  Video,
  Image as ImageIcon,
  MapPin,
  BookOpen,
  Receipt,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Search,
  RotateCcw,
  KeyRound
} from 'lucide-react';
import {
  AdminSettingsConfig,
  AnnadhanamBooking,
  AnnadhanamConfig,
  CalendarEvent,
  CommonReceiptData,
  DarisanamBooking,
  DarisanamSlotTemplate,
  DarisanamStatus,
  DeityInfo,
  DonationRecord,
  EventCategory,
  FestivalCategory,
  FestivalItem,
  HeroMediaItem,
  LiveSourceType,
  LiveStreamConfig,
  PageView,
  PaymentStatus,
  TempleAnnouncement,
  TempleLocationConfig
} from '../types';
import { formatLocalDateISO } from '../data/mockData';
import { Language, translations } from '../translations';
import { ReceiptView } from './ReceiptModal';
import { saveDemoPasscode } from '../utils/demoAuth';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
  events: CalendarEvent[];
  onUpdateEvents: (events: CalendarEvent[]) => void;
  darisanamSlots: DarisanamSlotTemplate[];
  onUpdateDarisanamSlots: (slots: DarisanamSlotTemplate[]) => void;
  darisanamBookings: DarisanamBooking[];
  onUpdateDarisanamBookings: (bookings: DarisanamBooking[]) => void;
  donations: DonationRecord[];
  onUpdateDonations: (donations: DonationRecord[]) => void;
  annadhanamBookings: AnnadhanamBooking[];
  onUpdateAnnadhanamBookings: (bookings: AnnadhanamBooking[]) => void;
  annadhanamConfig: AnnadhanamConfig;
  onUpdateAnnadhanamConfig: (cfg: AnnadhanamConfig) => void;
  festivals: FestivalItem[];
  onUpdateFestivals: (festivals: FestivalItem[]) => void;
  liveStreamConfig: LiveStreamConfig;
  onUpdateLiveStream: (config: LiveStreamConfig) => void;
  heroSlides: HeroMediaItem[];
  onUpdateHeroSlides: (slides: HeroMediaItem[]) => void;
  locationConfig: TempleLocationConfig;
  onUpdateLocation: (config: TempleLocationConfig) => void;
  deityInfo: DeityInfo;
  onUpdateDeityInfo: (info: DeityInfo) => void;
  announcements: TempleAnnouncement[];
  onUpdateAnnouncements: (announcements: TempleAnnouncement[]) => void;
  adminSettings: AdminSettingsConfig;
  onUpdateAdminSettings: (cfg: AdminSettingsConfig) => void;
  onResetFactoryData: () => void;
  language: Language;
}

type AdminTab =
  | 'calendar'
  | 'darisanam'
  | 'donations'
  | 'annadhanam'
  | 'festivals'
  | 'livestream'
  | 'media'
  | 'location'
  | 'deity'
  | 'receipts'
  | 'settings';

const FESTIVAL_CATEGORIES: FestivalCategory[] = [
  'Upcoming Festivals',
  'Major Temple Festivals',
  'Special Pooja',
  'Tamil Calendar Events',
  'Completed Festivals'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onNavigate,
  events,
  onUpdateEvents,
  darisanamSlots,
  onUpdateDarisanamSlots,
  darisanamBookings,
  onUpdateDarisanamBookings,
  donations,
  onUpdateDonations,
  annadhanamBookings,
  onUpdateAnnadhanamBookings,
  annadhanamConfig,
  onUpdateAnnadhanamConfig,
  festivals,
  onUpdateFestivals,
  liveStreamConfig,
  onUpdateLiveStream,
  heroSlides,
  onUpdateHeroSlides,
  locationConfig,
  onUpdateLocation,
  deityInfo,
  onUpdateDeityInfo,
  announcements,
  onUpdateAnnouncements,
  adminSettings,
  onUpdateAdminSettings,
  onResetFactoryData,
  language
}) => {
  const t = translations[language];
  const isTa = language === 'ta';
  const [today] = useState<Date>(() => new Date());
  const [activeTab, setActiveTab] = useState<AdminTab>('calendar');
  const [toast, setToast] = useState<string>('');

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  // --- TAB 1: CALENDAR MANAGEMENT (Add / Edit / Delete) ---
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [calTitle, setCalTitle] = useState('');
  const [calDate, setCalDate] = useState('2026-11-15');
  const [calTamilDate, setCalTamilDate] = useState('Karthigai');
  const [calCategory, setCalCategory] = useState<EventCategory>('festival');
  const [calStartTime, setCalStartTime] = useState('06:00 AM');
  const [calEndTime, setCalEndTime] = useState('12:00 PM');
  const [calAuspiciousTime, setCalAuspiciousTime] = useState('');
  const [calSpecialInstructions, setCalSpecialInstructions] = useState('');
  const [calDesc, setCalDesc] = useState('');
  const [calVerified, setCalVerified] = useState(true);
  const [calSearch, setCalSearch] = useState('');
  const [calYearFilter, setCalYearFilter] = useState<string>('all');

  const handleSaveCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calTitle.trim() || !calDate) return;
    const [yrStr, moStr, dyStr] = calDate.split('-');
    const yr = Number(yrStr);
    const mo = Number(moStr) - 1;
    const dy = Number(dyStr);
    if (yr < 2026 || yr > 2035) {
      notify(isTa ? 'நாள்காட்டி தேதி ஜனவரி 2026 முதல் டிசம்பர் 2035 வரை இருக்க வேண்டும்.' : 'Calendar date must be between Jan 2026 and Dec 2035.');
      return;
    }

    if (editingEventId) {
      const updated = events.map((ev) =>
        ev.id === editingEventId
          ? {
              ...ev,
              title: calTitle.trim(),
              date: calDate,
              year: yr,
              month: mo,
              day: dy,
              tamilDate: calTamilDate.trim() || 'Tamil Month',
              category: calCategory,
              startTime: calStartTime.trim() || 'To be confirmed',
              endTime: calEndTime.trim() || 'Temple Office',
              auspiciousTime: calAuspiciousTime.trim() || undefined,
              specialInstructions: calSpecialInstructions.trim() || undefined,
              description: calDesc.trim() || ev.description,
              isVerified: calVerified
            }
          : ev
      );
      onUpdateEvents(updated);
      setEditingEventId(null);
      notify(isTa ? 'நாள்காட்டி நிகழ்வு புதுப்பிக்கப்பட்டது.' : 'Calendar event updated.');
    } else {
      const newEvt: CalendarEvent = {
        id: `admin-evt-${Date.now()}`,
        title: calTitle.trim(),
        tamilDate: calTamilDate.trim() || 'Tamil Month',
        date: calDate,
        year: yr,
        month: mo,
        day: dy,
        category: calCategory,
        startTime: calStartTime.trim() || 'To be confirmed',
        endTime: calEndTime.trim() || 'Temple Office',
        auspiciousTime: calAuspiciousTime.trim() || undefined,
        specialInstructions: calSpecialInstructions.trim() || undefined,
        description: calDesc.trim() || 'Scheduled temple observance.',
        isVerified: calVerified
      };
      onUpdateEvents([newEvt, ...events]);
      notify(isTa ? 'புதிய நாள்காட்டி நிகழ்வு சேர்க்கப்பட்டது.' : 'New calendar event added.');
    }

    setCalTitle('');
    setCalDesc('');
    setCalAuspiciousTime('');
    setCalSpecialInstructions('');
  };

  const handleStartEditEvent = (ev: CalendarEvent) => {
    setEditingEventId(ev.id);
    setCalTitle(ev.title);
    setCalDate(ev.date);
    setCalTamilDate(ev.tamilDate);
    setCalCategory(ev.category);
    setCalStartTime(ev.startTime);
    setCalEndTime(ev.endTime);
    setCalAuspiciousTime(ev.auspiciousTime || '');
    setCalSpecialInstructions(ev.specialInstructions || '');
    setCalDesc(ev.description);
    setCalVerified(ev.isVerified);
  };

  const filteredEvents = useMemo(() => {
    const q = calSearch.trim().toLowerCase();
    return events
      .filter((e) => {
        if (calYearFilter !== 'all' && e.year !== Number(calYearFilter)) return false;
        if (!q) return true;
        return e.title.toLowerCase().includes(q) || e.date.includes(q) || e.tamilDate.toLowerCase().includes(q);
      })
      .slice(0, 60);
  }, [events, calSearch, calYearFilter]);

  // --- TAB 2: DARISANAM BOOKING MANAGEMENT ---
  const [slotCapacities, setSlotCapacities] = useState<Record<string, number>>(() =>
    Object.fromEntries(darisanamSlots.map((s) => [s.id, s.capacity]))
  );

  const handleSaveSlotCapacities = () => {
    const updatedSlots = darisanamSlots.map((s) => ({
      ...s,
      capacity: Math.max(1, Number(slotCapacities[s.id]) || s.capacity)
    }));
    onUpdateDarisanamSlots(updatedSlots);
    notify(isTa ? 'தரிசன நேர இடங்களின் கொள்ளளவு சேமிக்கப்பட்டது.' : 'Darisanam slot capacities updated.');
  };

  const handleUpdateDarisanamStatus = (bookingId: string, status: DarisanamStatus) => {
    onUpdateDarisanamBookings(
      darisanamBookings.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status,
              statusNote:
                status === 'confirmed'
                  ? isTa ? 'கோயில் நிர்வாகியால் உறுதி செய்யப்பட்டது (மாதிரி).' : 'Confirmed by Temple Administrator (Demo).'
                  : status === 'cancelled'
                    ? isTa ? 'கோயில் நிர்வாகியால் ரத்து செய்யப்பட்டது.' : 'Cancelled by Temple Administrator.'
                    : isTa ? 'சரிபார்ப்பு நிலுவையில் உள்ளது.' : 'Pending Verification.'
            }
          : b
      )
    );
    notify(
      isTa
        ? `தரிசன கோரிக்கை நிலை மாற்றப்பட்டது: ${status === 'confirmed' ? 'உறுதியானது' : status === 'cancelled' ? 'ரத்து' : 'நிலுவை'}`
        : `Darisanam request updated to ${status.toUpperCase()}.`
    );
  };

  // --- TAB 3: DONATION RECORDS ---
  const [activeReceiptPreview, setActiveReceiptPreview] = useState<CommonReceiptData | null>(null);

  const handleUpdateDonationStatus = (id: string, paymentStatus: PaymentStatus) => {
    onUpdateDonations(donations.map((d) => (d.id === id ? { ...d, paymentStatus } : d)));
    notify(
      isTa
        ? `நன்கொடை நிலை புதுப்பிக்கப்பட்டது: ${paymentStatus === 'verified' ? 'சரிபார்க்கப்பட்டது' : 'நிலுவையில்'}`
        : `Donation payment status updated to ${paymentStatus.toUpperCase()}.`
    );
  };

  // --- TAB 4: ANNADHANAM MANAGEMENT ---
  const [tempAnnAmount, setTempAnnAmount] = useState<number>(annadhanamConfig.sponsorshipAmount);
  const [tempMaxPerSlot, setTempMaxPerSlot] = useState<number>(annadhanamConfig.maxBookingsPerSlot);
  const [annSlotConfigDate, setAnnSlotConfigDate] = useState<string>(() => formatLocalDateISO(today));

  const adminRolling30Dates = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return formatLocalDateISO(d);
    });
  }, [today]);

  const handleToggleDisabledSlot = (dateStr: string, slot: 'Lunch' | 'Evening Prasadam') => {
    if (!dateStr) return;
    const key = `${dateStr}|${slot}`;
    const exists = annadhanamConfig.disabledSlots.includes(key);
    const nextDisabled = exists
      ? annadhanamConfig.disabledSlots.filter((s) => s !== key)
      : [...annadhanamConfig.disabledSlots, key];
    onUpdateAnnadhanamConfig({ ...annadhanamConfig, disabledSlots: nextDisabled });
    const slotLabel = isTa ? (slot === 'Lunch' ? 'மதிய உணவு' : 'மாலை பிரசாதம்') : slot;
    notify(
      exists
        ? isTa ? `${dateStr} (${slotLabel}) மீண்டும் திறக்கப்பட்டது.` : `${dateStr} (${slot}) re-enabled.`
        : isTa ? `${dateStr} (${slotLabel}) முடக்கப்பட்டது.` : `${dateStr} (${slot}) disabled.`
    );
  };

  const handleToggleUnavailableDate = (dateStr: string) => {
    const exists = annadhanamConfig.unavailableDates.includes(dateStr);
    const nextUnavailable = exists
      ? annadhanamConfig.unavailableDates.filter((d) => d !== dateStr)
      : [...annadhanamConfig.unavailableDates, dateStr];
    onUpdateAnnadhanamConfig({ ...annadhanamConfig, unavailableDates: nextUnavailable });
    notify(
      exists
        ? isTa ? `${dateStr} அன்னதானத்திற்கு மீண்டும் திறக்கப்பட்டது.` : `${dateStr} reopened for Annadhanam.`
        : isTa ? `${dateStr} கிடைக்காத நாளாகக் குறிக்கப்பட்டது.` : `${dateStr} marked Unavailable (Grey).`
    );
  };

  const handleSaveAnnConfig = () => {
    onUpdateAnnadhanamConfig({
      ...annadhanamConfig,
      sponsorshipAmount: Math.max(1, tempAnnAmount || 100),
      maxBookingsPerSlot: Math.max(1, tempMaxPerSlot || 1)
    });
    notify(
      isTa
        ? `அன்னதான அமைப்புகள் சேமிக்கப்பட்டன (பதிவுக்கு ₹${tempAnnAmount}).`
        : `Annadhanam configuration saved (₹${tempAnnAmount} per booking).`
    );
  };

  // --- TAB 5: FESTIVAL MANAGEMENT (Add / Edit / Delete) ---
  const [editingFestId, setEditingFestId] = useState<string | null>(null);
  const [festName, setFestName] = useState('');
  const [festTamilMonth, setFestTamilMonth] = useState('Aadi');
  const [festDateStr, setFestDateStr] = useState('');
  const [festCat, setFestCat] = useState<FestivalCategory>('Upcoming Festivals');
  const [festImage, setFestImage] = useState('/images/opt/festival.jpg');
  const [festTimings, setFestTimings] = useState('');
  const [festDesc, setFestDesc] = useState('');
  const [festInst, setFestInst] = useState('');
  const [festVerified, setFestVerified] = useState(false);

  const handleSaveFestival = (e: React.FormEvent) => {
    e.preventDefault();
    if (!festName.trim() || !festDateStr.trim()) return;

    if (editingFestId) {
      onUpdateFestivals(
        festivals.map((f) =>
          f.id === editingFestId
            ? {
                ...f,
                name: festName.trim(),
                tamilMonth: festTamilMonth.trim() || 'Chithirai',
                dateStr: festDateStr.trim(),
                category: festCat,
                image: festImage.trim() || '/images/opt/festival.jpg',
                poojaTimings: festTimings.trim() || (isTa ? 'கோயில் அலுவலகத்தால் உறுதிப்படுத்தப்படும்' : 'To be confirmed by Temple Office'),
                description: festDesc.trim() || f.description,
                specialInstructions: festInst.trim() || f.specialInstructions,
                isProminent: festCat === 'Major Temple Festivals',
                isVerified: festVerified
              }
            : f
        )
      );
      setEditingFestId(null);
      notify(isTa ? 'திருவிழா விவரம் புதுப்பிக்கப்பட்டது.' : 'Festival entry updated.');
    } else {
      const created: FestivalItem = {
        id: `fest-${Date.now()}`,
        name: festName.trim(),
        tamilMonth: festTamilMonth.trim() || 'Chithirai',
        dateStr: festDateStr.trim(),
        category: festCat,
        image: festImage.trim() || '/images/opt/festival.jpg',
        poojaTimings: festTimings.trim() || (isTa ? 'கோயில் அலுவலகத்தால் உறுதிப்படுத்தப்படும்' : 'To be confirmed by Temple Office'),
        description: festDesc.trim() || (isTa ? 'மௌன குருநாதர் திருக்கோயில் திருவிழா.' : 'Mouna Gurunathar Temple festival observance.'),
        specialInstructions: festInst.trim() || (isTa ? 'கோயில் நிர்வாகத்தால் வெளியிடப்படும் விவரங்கள்.' : 'Details published by temple administration.'),
        isProminent: festCat === 'Major Temple Festivals',
        isVerified: festVerified
      };
      onUpdateFestivals([created, ...festivals]);
      notify(isTa ? 'புதிய திருவிழா சேர்க்கப்பட்டது.' : 'Festival entry added.');
    }

    setFestName('');
    setFestDateStr('');
    setFestTimings('');
    setFestDesc('');
    setFestInst('');
  };

  const handleEditFestival = (f: FestivalItem) => {
    setEditingFestId(f.id);
    setFestName(f.name);
    setFestTamilMonth(f.tamilMonth);
    setFestDateStr(f.dateStr);
    setFestCat(f.category);
    setFestImage(f.image);
    setFestTimings(f.poojaTimings);
    setFestDesc(f.description);
    setFestInst(f.specialInstructions);
    setFestVerified(Boolean(f.isVerified));
  };

  const isSafeUrl = (value: string) => {
    const v = value.trim();
    return v === '' || v.startsWith('/') || /^https?:\/\//i.test(v);
  };

  // --- TAB 6: LIVE DARISANAM MANAGEMENT ---
  const [liveForm, setLiveForm] = useState<LiveStreamConfig>(liveStreamConfig);

  const handleSaveLiveForm = () => {
    if (liveForm.streamUrl.trim() && !isSafeUrl(liveForm.streamUrl)) {
      notify(isTa ? 'ஸ்ட்ரீம் URL https://, http://, அல்லது / உடன் தொடங்க வேண்டும்' : 'Stream URL must start with https://, http://, or /');
      return;
    }
    if (liveForm.fallbackImage.trim() && !isSafeUrl(liveForm.fallbackImage)) {
      notify(isTa ? 'படத்தின் வழி https://, http://, அல்லது / உடன் தொடங்க வேண்டும்' : 'Fallback image path must start with https://, http://, or /');
      return;
    }
    onUpdateLiveStream(liveForm);
    notify(isTa ? 'நேரலை தரிசன அமைப்புகள் சேமிக்கப்பட்டன.' : 'Live Darisanam stream settings saved.');
  };

  // --- TAB 7: TEMPLE IMAGES AND VIDEOS ---
  const [newSlideType, setNewSlideType] = useState<'image' | 'video'>('image');
  const [newSlideSrc, setNewSlideSrc] = useState('/images/opt/deity.jpg');
  const [newSlideTitleEn, setNewSlideTitleEn] = useState('');
  const [newSlideTitleTa, setNewSlideTitleTa] = useState('');
  const [newSlideSubEn, setNewSlideSubEn] = useState('');
  const [newSlideActionPage, setNewSlideActionPage] = useState<PageView>('darisanam');

  const handleAddHeroSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideSrc.trim() || !newSlideTitleEn.trim()) return;
    if (!isSafeUrl(newSlideSrc)) {
      notify(isTa ? 'ஊடக URL/வழி /, https://, அல்லது http:// உடன் தொடங்க வேண்டும்' : 'Media URL/path must start with /, https://, or http://');
      return;
    }
    const nextSlide: HeroMediaItem = {
      id: `slide-${Date.now()}`,
      mediaType: newSlideType,
      src: newSlideSrc.trim(),
      poster: '/images/opt/deity.jpg',
      titleEn: newSlideTitleEn.trim(),
      titleTa: newSlideTitleTa.trim() || newSlideTitleEn.trim(),
      subtitleEn: newSlideSubEn.trim() || 'Mouna Gurunathar Temple Devotional Showcase',
      subtitleTa: newSlideSubEn.trim() || 'மௌன குருநாதர் திருக்கோயில் காட்சி',
      badgeEn: newSlideType === 'video' ? 'DEVOTIONAL VIDEO' : 'TEMPLE GALLERY',
      badgeTa: newSlideType === 'video' ? 'பக்தி காணொளி' : 'திருக்கோயில் காட்சி',
      actionTextEn: 'View More',
      actionTextTa: 'மேலும் காண்க',
      actionPage: newSlideActionPage
    };
    onUpdateHeroSlides([...heroSlides, nextSlide]);
    setNewSlideTitleEn('');
    setNewSlideTitleTa('');
    setNewSlideSubEn('');
    notify(isTa ? 'படசுழற்சி ஊடகம் சேர்க்கப்பட்டது.' : 'Hero media slide added.');
  };

  // --- TAB 8: TEMPLE LOCATION MANAGEMENT ---
  const [locForm, setLocForm] = useState<TempleLocationConfig>(locationConfig);

  // --- TAB 9: MOUNA GURUNATHAR DETAILS & ABOUT TEMPLE ---
  const [deityForm, setDeityForm] = useState<DeityInfo>(deityInfo);
  const [historyText, setHistoryText] = useState(() => deityInfo.history.join('\n\n'));
  const [sigText, setSigText] = useState(() => deityInfo.spiritualSignificance.join('\n'));
  const [tradText, setTradText] = useState(() => deityInfo.traditions.join('\n'));
  const [annualText, setAnnualText] = useState(() => deityInfo.annualFestivals.join('\n'));
  const [heritageText, setHeritageText] = useState(() => deityInfo.heritage.join('\n\n'));

  const handleSaveDeitySection = () => {
    const splitLines = (txt: string, sep: string) =>
      txt
        .split(sep)
        .map((s) => s.trim())
        .filter(Boolean);

    const updated: DeityInfo = {
      ...deityForm,
      history: splitLines(historyText, '\n\n'),
      spiritualSignificance: splitLines(sigText, '\n'),
      traditions: splitLines(tradText, '\n'),
      annualFestivals: splitLines(annualText, '\n'),
      heritage: splitLines(heritageText, '\n\n')
    };
    onUpdateDeityInfo(updated);
    notify(isTa ? 'மௌன குருநாதர் தகவல்கள் & கோயில் பற்றி பகுதிகள் சேமிக்கப்பட்டன.' : 'Mouna Gurunathar details & About Temple sections saved.');
  };

  // --- TAB 10: RECEIPT MANAGEMENT ---
  const [receiptSearch, setReceiptSearch] = useState('');
  const unifiedReceipts: CommonReceiptData[] = useMemo(() => {
    const donRecs: CommonReceiptData[] = donations.map((d) => ({
      receiptNumber: d.receiptNumber,
      paymentReference: d.paymentReference,
      devoteeName: d.donorName,
      mobile: d.mobile,
      email: d.email,
      purpose: `Donation — ${d.purpose}`,
      amount: d.amount,
      date: formatLocalDateISO(new Date(d.createdAt)),
      issuedAt: d.createdAt,
      paymentStatus: d.paymentStatus,
      category: 'donation',
      isDemo: d.isDemo
    }));
    const annRecs: CommonReceiptData[] = annadhanamBookings.map((a) => ({
      receiptNumber: a.receiptNumber,
      paymentReference: a.paymentReference,
      devoteeName: a.devoteeName,
      mobile: a.mobile,
      email: a.email,
      purpose: `Annadhanam — ${a.mealType}`,
      amount: a.amount,
      date: a.date,
      issuedAt: a.createdAt,
      paymentStatus: a.paymentStatus,
      category: 'annadhanam',
      extraNote: a.dedicationMessage || undefined,
      isDemo: a.isDemo
    }));
    const q = receiptSearch.trim().toLowerCase();
    return [...donRecs, ...annRecs].filter(
      (r) =>
        !q ||
        r.receiptNumber.toLowerCase().includes(q) ||
        r.paymentReference.toLowerCase().includes(q) ||
        r.devoteeName.toLowerCase().includes(q) ||
        r.mobile.includes(q)
    );
  }, [donations, annadhanamBookings, receiptSearch]);

  // --- TAB 11: ADMINISTRATOR SETTINGS ---
  const [settingsForm, setSettingsForm] = useState<AdminSettingsConfig>(adminSettings);
  const [newDemoPasscode, setNewDemoPasscode] = useState('');
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annPriority, setAnnPriority] = useState<'high' | 'normal'>('normal');

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;
    const item: TempleAnnouncement = {
      id: `ann-${Date.now()}`,
      title: annTitle.trim(),
      message: annMessage.trim(),
      date: formatLocalDateISO(today),
      isNew: true,
      priority: annPriority
    };
    onUpdateAnnouncements([item, ...announcements]);
    setAnnTitle('');
    setAnnMessage('');
    notify(isTa ? 'கோயில் அறிவிப்பு மணி செய்திகளில் வெளியிடப்பட்டது.' : 'Temple announcement published to notification bell.');
  };

  const handleUpdateDemoPasscode = async () => {
    if (newDemoPasscode.trim().length < 6) {
      notify(isTa ? 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்.' : 'Passcode must be at least 6 characters.');
      return;
    }
    await saveDemoPasscode(newDemoPasscode.trim());
    setNewDemoPasscode('');
    notify(isTa ? 'உள்ளூர் உலாவி மாதிரி கடவுச்சொல் மாற்றப்பட்டது.' : 'Local browser demo passcode updated.');
  };

  const navTabs: Array<{ id: AdminTab; label: string; icon: React.ComponentType<{ size?: number }> }> = [
    { id: 'calendar', label: t.adminTabCalendar, icon: Calendar },
    { id: 'darisanam', label: t.adminTabDarisanam, icon: CalendarCheck },
    { id: 'donations', label: t.adminTabDonations, icon: HeartHandshake },
    { id: 'annadhanam', label: t.adminTabAnnadhanam, icon: UtensilsCrossed },
    { id: 'festivals', label: t.adminTabFestivals, icon: Sparkles },
    { id: 'livestream', label: t.adminTabLiveVideo, icon: Video },
    { id: 'media', label: t.adminTabMedia, icon: ImageIcon },
    { id: 'location', label: t.adminTabLocation, icon: MapPin },
    { id: 'deity', label: t.adminTabDeity, icon: BookOpen },
    { id: 'receipts', label: t.adminTabReceipts, icon: Receipt },
    { id: 'settings', label: t.adminTabSettings, icon: Settings }
  ];

  return (
    <div className="admin-dashboard-view" style={{ maxWidth: '1220px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-temple-brown)',
          border: '2px solid #FFD54F',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 18px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-temple-brown-dark)',
              border: '2px solid #FFD54F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD54F',
              fontWeight: 800,
              fontSize: '20px',
              flexShrink: 0
            }}
          >
            ॐ
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.18rem', color: '#FFD54F', fontWeight: 800 }}>
              {t.adminDashboardTitle}
            </h2>
            <p style={{ color: '#FFE9A8', fontSize: '0.78rem' }}>
              {adminSettings.adminDisplayName} • {t.adminActiveSession}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="btn-temple-gold"
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            {t.adminViewPublicSite}
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              backgroundColor: '#B91C1C',
              color: '#FFFFFF',
              border: '1.5px solid #FFD54F',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} />
            <span>{t.adminSignOut}</span>
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#1B7A3C',
            color: '#FFFFFF',
            border: '1.5px solid #FFD54F',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1200
          }}
        >
          <CheckCircle2 size={18} />
          <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>{toast}</span>
        </div>
      )}

      {/* 11 Admin Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Admin Management Sections"
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '18px',
          borderBottom: '2px solid var(--color-border-gold)'
        }}
      >
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 13px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--color-temple-brown)' : 'var(--color-section-bg)',
                color: isActive ? '#FFD54F' : 'var(--color-text-main)',
                border: isActive ? '1.5px solid #FFD54F' : '1px solid var(--color-border-gold)',
                fontWeight: isActive ? 800 : 700,
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: CALENDAR MANAGEMENT */}
      {activeTab === 'calendar' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa
                ? (editingEventId ? 'நாள்காட்டி நிகழ்வைத் திருத்து' : 'நாள்காட்டி நிகழ்வு சேர்க்க (2026–2035)')
                : (editingEventId ? 'Edit Calendar Event' : 'Add Calendar Event (2026–2035)')}
            </h3>
            <form onSubmit={handleSaveCalendarEvent} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div>
                <label className="form-label">{isTa ? 'நிகழ்வின் பெயர் *' : 'Event Title *'}</label>
                <input
                  type="text"
                  required
                  value={calTitle}
                  onChange={(e) => setCalTitle(e.target.value)}
                  className="form-input"
                  placeholder={isTa ? 'எ.கா. மாதாந்திர சிறப்பு அபிஷேகம்' : 'e.g. Monthly Special Abhishekam'}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '10px' }}>
                <div>
                  <label className="form-label">{isTa ? 'தேதி (2026–2035) *' : 'Date (2026–2035) *'}</label>
                  <input type="date" min="2026-01-01" max="2035-12-31" required value={calDate} onChange={(e) => setCalDate(e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'தமிழ் மாதம் / தேதி' : 'Tamil Month / Date'}</label>
                  <input
                    type="text"
                    value={calTamilDate}
                    onChange={(e) => setCalTamilDate(e.target.value)}
                    className="form-input"
                    placeholder={isTa ? 'எ.கா. கார்த்திகை 01' : 'e.g. Karthigai 01'}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '8px' }}>
                <div>
                  <label className="form-label">{isTa ? 'வகை' : 'Category'}</label>
                  <select value={calCategory} onChange={(e) => setCalCategory(e.target.value as EventCategory)} className="form-select">
                    <option value="festival">{isTa ? 'முக்கிய திருவிழா' : 'Major Festival'}</option>
                    <option value="pooja">{isTa ? 'சிறப்பு பூஜை' : 'Special Pooja'}</option>
                    <option value="regular">{isTa ? 'வழக்கமான / பிரதோஷம்' : 'Regular / Pradosham'}</option>
                    <option value="important">{isTa ? 'முக்கிய நிகழ்வு / அமாவாசை' : 'Important / Amavasai'}</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">{isTa ? 'தொடக்க நேரம்' : 'Start Time'}</label>
                  <input type="text" value={calStartTime} onChange={(e) => setCalStartTime(e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'முடிவு நேரம்' : 'End Time'}</label>
                  <input type="text" value={calEndTime} onChange={(e) => setCalEndTime(e.target.value)} className="form-input" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '10px' }}>
                <div>
                  <label className="form-label">{isTa ? 'நல்ல நேரம் / திதி குறிப்பு' : 'Auspicious / Thithi Note'}</label>
                  <input
                    type="text"
                    value={calAuspiciousTime}
                    onChange={(e) => setCalAuspiciousTime(e.target.value)}
                    className="form-input"
                    placeholder={isTa ? 'விருப்ப நேரம் குறிப்பு' : 'Optional timing note'}
                  />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'சிறப்பு குறிப்புகள்' : 'Special Instructions'}</label>
                  <input
                    type="text"
                    value={calSpecialInstructions}
                    onChange={(e) => setCalSpecialInstructions(e.target.value)}
                    className="form-input"
                    placeholder={isTa ? 'பக்தர்களுக்கான குறிப்பு' : 'Optional devotee note'}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">{isTa ? 'விளக்கம்' : 'Description'}</label>
                <textarea rows={3} value={calDesc} onChange={(e) => setCalDesc(e.target.value)} className="form-textarea" />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 700 }}>
                <input type="checkbox" checked={calVerified} onChange={(e) => setCalVerified(e.target.checked)} />
                <span>{isTa ? 'தேதி & நேரங்களை அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டதாகக் குறிக்கவும்' : 'Mark date & timings as Officially Verified'}</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn-temple-primary">
                  {editingEventId ? <Save size={15} /> : <Plus size={15} />}
                  <span>
                    {isTa
                      ? (editingEventId ? 'மாற்றங்களைச் சேமி' : 'நிகழ்வைச் சேர்')
                      : (editingEventId ? 'Save Changes' : 'Add Calendar Event')}
                  </span>
                </button>
                {editingEventId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEventId(null);
                      setCalTitle('');
                      setCalDesc('');
                      setCalAuspiciousTime('');
                      setCalSpecialInstructions('');
                    }}
                    className="btn-temple-secondary"
                  >
                    {isTa ? 'ரத்து செய்' : 'Cancel Edit'}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)' }}>
                {isTa ? `நிகழ்வுகள் (${events.length})` : `Events (${events.length})`}
              </h3>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', width: '100%' }}>
                <select
                  aria-label={isTa ? 'ஆண்டுகளின்படி நிகழ்வுகளை வடிகட்டு' : 'Filter events by year'}
                  value={calYearFilter}
                  onChange={(e) => setCalYearFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', minWidth: '105px', padding: '6px 10px', fontSize: '0.82rem' }}
                >
                  <option value="all">{isTa ? 'அனைத்து ஆண்டுகள்' : 'All Years'}</option>
                  {Array.from({ length: 10 }, (_, idx) => 2026 + idx).map((yr) => (
                    <option key={yr} value={String(yr)}>
                      {yr}
                    </option>
                  ))}
                </select>
                <input
                  type="search"
                  placeholder={isTa ? 'தலைப்பு அல்லது YYYY-MM-DD தேட...' : 'Search title or YYYY-MM-DD...'}
                  value={calSearch}
                  onChange={(e) => setCalSearch(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, minWidth: '150px', padding: '6px 10px', fontSize: '0.82rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '460px', overflowY: 'auto' }}>
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    backgroundColor: '#FFFDF5',
                    border: '1px solid var(--color-border-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-temple-brown)' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)' }}>
                      {ev.date} ({ev.tamilDate}) • {ev.category} • {ev.isVerified ? (isTa ? 'சரிபார்க்கப்பட்டது' : 'Verified') : (isTa ? 'மதிப்பீடு' : 'Estimate')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button type="button" onClick={() => handleStartEditEvent(ev)} aria-label={isTa ? 'நிகழ்வைத் திருத்து' : 'Edit event'} style={{ color: 'var(--color-temple-brown)', padding: '4px' }}>
                      <Edit3 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateEvents(events.filter((x) => x.id !== ev.id));
                        notify(isTa ? 'நிகழ்வு நீக்கப்பட்டது.' : 'Event deleted.');
                      }}
                      aria-label={isTa ? 'நிகழ்வை நீக்கு' : 'Delete event'}
                      style={{ color: '#B91C1C', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: DARISANAM BOOKING MANAGEMENT */}
      {activeTab === 'darisanam' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? 'தினசரி தரிசன நேர இடங்களின் கொள்ளளவை அமைக்கவும்' : 'Configure Daily Darisanam Time Slot Capacities'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '12px', marginBottom: '14px' }}>
              {darisanamSlots.map((slot) => (
                <div key={slot.id} style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--color-temple-brown)' }}>{slot.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{slot.timeRange}</div>
                  <label className="form-label">{isTa ? 'கொள்ளளவு' : 'Capacity'}</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={slotCapacities[slot.id] ?? slot.capacity}
                    onChange={(e) => setSlotCapacities({ ...slotCapacities, [slot.id]: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={handleSaveSlotCapacities} className="btn-temple-primary">
              <Save size={15} />
              <span>{isTa ? 'இட கொள்ளளவைச் சேமிக்க' : 'Save Slot Capacities'}</span>
            </button>
          </div>

          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? `தரிசன முன்பதிவு கோரிக்கைகள் (${darisanamBookings.length})` : `Darisanam Booking Requests (${darisanamBookings.length})`}
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-temple-brown)', color: '#FFE9A8', textAlign: 'left' }}>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'குறிப்பு எண்' : 'Reference'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'பக்தர்' : 'Devotee'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'தேதி & நேரம்' : 'Date & Slot'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'பக்தர்கள்' : 'Devotees'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'நிலை' : 'Status'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'செயல்கள்' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {darisanamBookings.map((b) => (
                    <tr key={b.id} style={{ backgroundColor: '#FFFDF5', borderBottom: '1px solid var(--color-border-gold)' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 800 }}>{b.referenceNumber}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <strong>{b.devoteeName}</strong>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{b.mobile}</div>
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        {b.date}
                        <div style={{ fontSize: '0.72rem' }}>{b.slotLabel}</div>
                      </td>
                      <td style={{ padding: '8px 10px', fontWeight: 700 }}>{b.numberOfDevotees}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            backgroundColor:
                              b.status === 'confirmed' ? '#EAF7EE' : b.status === 'cancelled' ? '#FEE2E2' : '#FEF3C7',
                            color: b.status === 'confirmed' ? '#1B7A3C' : b.status === 'cancelled' ? '#7F1D1D' : '#92400E'
                          }}
                        >
                          {b.status === 'confirmed' ? (isTa ? 'உறுதியானது' : 'CONFIRMED') : b.status === 'cancelled' ? (isTa ? 'ரத்து' : 'CANCELLED') : (isTa ? 'நிலுவையில்' : 'PENDING')}
                        </span>
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <button type="button" onClick={() => handleUpdateDarisanamStatus(b.id, 'confirmed')} className="btn-temple-gold" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                            {isTa ? 'உறுதி செய்' : 'Confirm'}
                          </button>
                          <button type="button" onClick={() => handleUpdateDarisanamStatus(b.id, 'pending')} className="btn-temple-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }}>
                            {isTa ? 'நிலுவை' : 'Pending'}
                          </button>
                          <button type="button" onClick={() => handleUpdateDarisanamStatus(b.id, 'cancelled')} style={{ padding: '4px 8px', fontSize: '0.72rem', backgroundColor: '#FEE2E2', color: '#7F1D1D', borderRadius: '6px', fontWeight: 700 }}>
                            {isTa ? 'ரத்து' : 'Cancel'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DONATION RECORDS */}
      {activeTab === 'donations' && (
        <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
            {isTa ? `நன்கொடை பதிவுகள் (${donations.length})` : `Donation Records (${donations.length})`}
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-temple-brown)', color: '#FFE9A8', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'ரசீது / குறிப்பு' : 'Receipt / Ref'}</th>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'நன்கொடையாளர்' : 'Donor'}</th>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'நோக்கம்' : 'Purpose'}</th>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'தொகை' : 'Amount'}</th>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'கட்டண நிலை' : 'Payment Status'}</th>
                  <th style={{ padding: '8px 10px' }}>{isTa ? 'செயல்கள்' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id} style={{ backgroundColor: '#FFFDF5', borderBottom: '1px solid var(--color-border-gold)' }}>
                    <td style={{ padding: '8px 10px' }}>
                      <strong>{d.receiptNumber}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>{d.paymentReference}</div>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <strong>{d.donorName}</strong>
                      <div style={{ fontSize: '0.72rem' }}>{d.mobile} • {d.email}</div>
                    </td>
                    <td style={{ padding: '8px 10px' }}>{d.purpose}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 800, color: '#1B7A3C' }}>₹{d.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: d.paymentStatus === 'verified' ? '#EAF7EE' : '#FEF3C7',
                          color: d.paymentStatus === 'verified' ? '#1B7A3C' : '#92400E'
                        }}
                      >
                        {d.paymentStatus === 'verified' ? (isTa ? 'சரிபார்க்கப்பட்டது' : 'VERIFIED') : (isTa ? 'நிலுவையில்' : 'PENDING')}
                      </span>
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleUpdateDonationStatus(d.id, d.paymentStatus === 'verified' ? 'pending' : 'verified')}
                          className="btn-temple-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                        >
                          {d.paymentStatus === 'verified'
                            ? (isTa ? 'நிலுவையாக்கு' : 'Mark Pending')
                            : (isTa ? 'சரிபார்க்கப்பட்டதாகக் குறி' : 'Mark Verified')}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveReceiptPreview({
                              receiptNumber: d.receiptNumber,
                              paymentReference: d.paymentReference,
                              devoteeName: d.donorName,
                              mobile: d.mobile,
                              email: d.email,
                              purpose: `Donation — ${d.purpose}`,
                              amount: d.amount,
                              date: formatLocalDateISO(new Date(d.createdAt)),
                              issuedAt: d.createdAt,
                              paymentStatus: d.paymentStatus,
                              category: 'donation',
                              isDemo: d.isDemo
                            })
                          }
                          className="btn-temple-gold"
                          style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                        >
                          {isTa ? 'ரசீது' : 'Receipt'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: ANNADHANAM MANAGEMENT */}
      {activeTab === 'annadhanam' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? 'நன்கொடைத் தொகை & தேதி கிடைப்புத்தன்மை அமைப்புகள் (சாம்பல் / கிடைக்காத தேதிகள்)' : 'Configure Sponsorship Amount & Date Availability (Grey / Unavailable Dates)'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end', marginBottom: '16px' }}>
              <div>
                <label className="form-label">{isTa ? 'நன்கொடைத் தொகை (₹)' : 'Sponsorship Amount (₹)'}</label>
                <input type="number" min={1} value={tempAnnAmount} onChange={(e) => setTempAnnAmount(Number(e.target.value))} className="form-input" style={{ width: '160px' }} />
              </div>
              <div>
                <label className="form-label">{isTa ? 'ஒரு உணவுக்கான இடங்கள்' : 'Slots per Meal Session'}</label>
                <input type="number" min={1} value={tempMaxPerSlot} onChange={(e) => setTempMaxPerSlot(Number(e.target.value))} className="form-input" style={{ width: '160px' }} />
              </div>
              <button type="button" onClick={handleSaveAnnConfig} className="btn-temple-primary">
                <Save size={15} />
                <span>{isTa ? 'அமைப்புகளைச் சேமிக்க' : 'Save Annadhanam Settings'}</span>
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              {isTa
                ? 'அடுத்த 30 நாட்களில் கிடைக்காத (சாம்பல்) அல்லது கிடைக்கும் தேதியை மாற்ற கிளிக் செய்க:'
                : 'Click any date in the next 30 days to toggle Unavailable (Grey) vs Available:'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {adminRolling30Dates.map((dStr) => {
                const isUnavailable = annadhanamConfig.unavailableDates.includes(dStr);
                return (
                  <button
                    type="button"
                    key={dStr}
                    onClick={() => handleToggleUnavailableDate(dStr)}
                    style={{
                      padding: '5px 9px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: isUnavailable ? '#9CA3AF' : '#EAF7EE',
                      color: isUnavailable ? '#1F2937' : '#14532D',
                      border: `1px solid ${isUnavailable ? '#4B5563' : '#1B7A3C'}`
                    }}
                  >
                    {dStr.slice(5)} {isUnavailable ? (isTa ? '(கிடைக்காது)' : '(Grey/Off)') : (isTa ? '(திறந்துள்ளது)' : '(Open)')}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: '#FFFDF5',
                border: '1px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '8px' }}>
                {isTa ? 'குறிப்பிட்ட தேதிக்கான உணவு நேரத்தை அமைக்கவும்' : 'Configure Individual Meal Slot Availability for a Specific Date'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <input
                  type="date"
                  value={annSlotConfigDate}
                  onChange={(e) => setAnnSlotConfigDate(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto', minWidth: '150px' }}
                />
                {(['Lunch', 'Evening Prasadam'] as const).map((slotKey) => {
                  const isDisabled = annadhanamConfig.disabledSlots.includes(`${annSlotConfigDate}|${slotKey}`);
                  const slotLabel = isTa ? (slotKey === 'Lunch' ? 'மதிய உணவு' : 'மாலை பிரசாதம்') : slotKey;
                  return (
                    <button
                      type="button"
                      key={slotKey}
                      onClick={() => handleToggleDisabledSlot(annSlotConfigDate, slotKey)}
                      className={isDisabled ? 'btn-temple-secondary' : 'btn-temple-gold'}
                      style={{ fontSize: '0.76rem', padding: '7px 12px' }}
                    >
                      {slotLabel}: {isDisabled
                        ? (isTa ? 'முடக்கப்பட்டுள்ளது (திறக்க கிளிக் செய்க)' : 'Disabled (Click to Open)')
                        : (isTa ? 'திறந்துள்ளது (முடக்க கிளிக் செய்க)' : 'Open (Click to Disable)')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? `அன்னதான முன்பதிவுகள் (${annadhanamBookings.length})` : `Annadhanam Bookings (${annadhanamBookings.length})`}
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-temple-brown)', color: '#FFE9A8', textAlign: 'left' }}>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'ரசீது எண்' : 'Receipt No'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'தேதி & நேரம்' : 'Date & Slot'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'பக்தர்' : 'Devotee'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'தொகை' : 'Amount'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'நிலை' : 'Status'}</th>
                    <th style={{ padding: '8px 10px' }}>{isTa ? 'செயல்கள்' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {annadhanamBookings.map((b) => (
                    <tr key={b.id} style={{ backgroundColor: '#FFFDF5', borderBottom: '1px solid var(--color-border-gold)' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 800 }}>{b.receiptNumber}</td>
                      <td style={{ padding: '8px 10px' }}>
                        {b.date} ({isTa ? (b.mealType === 'Lunch' ? 'மதிய உணவு' : 'மாலை பிரசாதம்') : b.mealType})
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <strong>{b.devoteeName}</strong>
                        <div style={{ fontSize: '0.72rem' }}>{b.mobile}</div>
                      </td>
                      <td style={{ padding: '8px 10px', fontWeight: 800, color: '#1B7A3C' }}>₹{b.amount}</td>
                      <td style={{ padding: '8px 10px', fontWeight: 800 }}>
                        {b.paymentStatus === 'verified' ? (isTa ? 'சரிபார்க்கப்பட்டது' : 'VERIFIED') : (isTa ? 'நிலுவையில்' : 'PENDING')}
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const next: PaymentStatus = b.paymentStatus === 'verified' ? 'pending' : 'verified';
                              onUpdateAnnadhanamBookings(
                                annadhanamBookings.map((item) => (item.id === b.id ? { ...item, paymentStatus: next } : item))
                              );
                            }}
                            className="btn-temple-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          >
                            {isTa ? 'நிலையை மாற்று' : 'Toggle Status'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveReceiptPreview({
                                receiptNumber: b.receiptNumber,
                                paymentReference: b.paymentReference,
                                devoteeName: b.devoteeName,
                                mobile: b.mobile,
                                email: b.email,
                                purpose: `Annadhanam — ${b.mealType}`,
                                amount: b.amount,
                                date: b.date,
                                issuedAt: b.createdAt,
                                paymentStatus: b.paymentStatus,
                                category: 'annadhanam',
                                extraNote: b.dedicationMessage || undefined,
                                isDemo: b.isDemo
                              })
                            }
                            className="btn-temple-gold"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                          >
                            {isTa ? 'ரசீது' : 'Receipt'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: FESTIVAL MANAGEMENT */}
      {activeTab === 'festivals' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa
                ? (editingFestId ? 'திருவிழாவைத் திருத்து' : 'கோயில் திருவிழா சேர்க்க')
                : (editingFestId ? 'Edit Festival' : 'Add Temple Festival')}
            </h3>
            <form onSubmit={handleSaveFestival} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="form-label">{isTa ? 'திருவிழா பெயர் *' : 'Festival Name *'}</label>
                <input type="text" required value={festName} onChange={(e) => setFestName(e.target.value)} className="form-input" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '10px' }}>
                <div>
                  <label className="form-label">{isTa ? 'தமிழ் மாதம் *' : 'Tamil Month *'}</label>
                  <input type="text" value={festTamilMonth} onChange={(e) => setFestTamilMonth(e.target.value)} className="form-input" placeholder={isTa ? 'எ.கா. ஆடி' : 'e.g. Aadi'} />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'தேதி குறிப்பு *' : 'Date Label *'}</label>
                  <input type="text" required value={festDateStr} onChange={(e) => setFestDateStr(e.target.value)} className="form-input" placeholder={isTa ? 'எ.கா. ஆகஸ்ட் 14' : 'e.g. August 14'} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '10px' }}>
                <div>
                  <label className="form-label">{isTa ? 'வகை' : 'Category'}</label>
                  <select value={festCat} onChange={(e) => setFestCat(e.target.value as FestivalCategory)} className="form-select">
                    {FESTIVAL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c === 'Upcoming Festivals'
                          ? (isTa ? 'வரவிருக்கும் திருவிழாக்கள்' : c)
                          : c === 'Major Temple Festivals'
                            ? (isTa ? 'முக்கிய கோயில் திருவிழாக்கள்' : c)
                            : c === 'Special Pooja'
                              ? (isTa ? 'சிறப்பு பூஜை' : c)
                              : c === 'Tamil Calendar Events'
                                ? (isTa ? 'தமிழ் நாள்காட்டி நிகழ்வுகள்' : c)
                                : (isTa ? 'முடிவடைந்த திருவிழாக்கள்' : c)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">{isTa ? 'படத்தின் வழி' : 'Image Path'}</label>
                  <input type="text" value={festImage} onChange={(e) => setFestImage(e.target.value)} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">{isTa ? 'பூஜை நேரங்கள்' : 'Pooja Timings'}</label>
                <input type="text" value={festTimings} onChange={(e) => setFestTimings(e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="form-label">{isTa ? 'விளக்கம்' : 'Description'}</label>
                <textarea rows={2} value={festDesc} onChange={(e) => setFestDesc(e.target.value)} className="form-textarea" />
              </div>
              <div>
                <label className="form-label">{isTa ? 'சிறப்பு குறிப்புகள்' : 'Special Instructions'}</label>
                <input type="text" value={festInst} onChange={(e) => setFestInst(e.target.value)} className="form-input" />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 700 }}>
                <input type="checkbox" checked={festVerified} onChange={(e) => setFestVerified(e.target.checked)} />
                <span>{isTa ? 'சரிபார்க்கப்பட்ட கோயில் திருவிழா தேதி' : 'Verified Temple Festival Date'}</span>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn-temple-primary">
                  <Save size={15} />
                  <span>
                    {isTa
                      ? (editingFestId ? 'திருவிழாவைச் சேமி' : 'திருவிழா சேர்க்க')
                      : (editingFestId ? 'Save Festival' : 'Add Festival')}
                  </span>
                </button>
                {editingFestId && (
                  <button type="button" onClick={() => setEditingFestId(null)} className="btn-temple-secondary">
                    {isTa ? 'ரத்து' : 'Cancel'}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? `திருவிழா பட்டியல் (${festivals.length})` : `Festival Listings (${festivals.length})`}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '540px', overflowY: 'auto' }}>
              {festivals.map((fest) => (
                <div key={fest.id} style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--color-temple-brown)' }}>{fest.name}</strong>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                        {fest.dateStr} • {fest.tamilMonth} • {fest.category}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button type="button" onClick={() => handleEditFestival(fest)} aria-label={isTa ? 'திருவிழாவைத் திருத்து' : 'Edit festival'} style={{ color: 'var(--color-temple-brown)', padding: '4px' }}>
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateFestivals(festivals.filter((f) => f.id !== fest.id));
                          notify(isTa ? 'திருவிழா நீக்கப்பட்டது.' : 'Festival removed.');
                        }}
                        aria-label={isTa ? 'திருவிழாவை நீக்கு' : 'Delete festival'}
                        style={{ color: '#B91C1C', padding: '4px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: LIVE DARISANAM MANAGEMENT */}
      {activeTab === 'livestream' && (
        <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px', maxWidth: '720px' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
            {isTa ? 'நேரலை தரிசன ஒளிபரப்பு அமைப்புகள்' : 'Live Darisanam Stream Configuration'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label className="form-label">{isTa ? 'ஒளிபரப்பு முறை / மூல வகை' : 'Player Mode / Source Type'}</label>
              <select
                value={liveForm.sourceType}
                onChange={(e) => setLiveForm({ ...liveForm, sourceType: e.target.value as LiveSourceType })}
                className="form-select"
              >
                <option value="demo">{isTa ? 'மாதிரி காட்சி முறை (நேரலை அல்ல)' : 'Demonstration Fallback Image Mode (Not Live)'}</option>
                <option value="embed">{isTa ? 'நேரலை உட்பொதிவு URL (YouTube / HLS Iframe)' : 'Live Embed URL (YouTube / HLS Iframe)'}</option>
                <option value="video">{isTa ? 'நேரடி MP4 / வீடியோ ஸ்ட்ரீம் URL' : 'Direct MP4 / Video File Stream URL'}</option>
              </select>
            </div>

            <div>
              <label className="form-label">{isTa ? 'நேரலை ஸ்ட்ரீம் / வீடியோ URL' : 'Live Stream / Video URL'}</label>
              <input
                type="text"
                placeholder={isTa ? 'https://... (நேரலை இல்லாத போது காலியாக விடவும்)' : 'https://... (Leave blank while offline)'}
                value={liveForm.streamUrl}
                onChange={(e) => setLiveForm({ ...liveForm, streamUrl: e.target.value })}
                className="form-input"
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700 }}>
              <input
                type="checkbox"
                checked={liveForm.isLive}
                onChange={(e) => setLiveForm({ ...liveForm, isLive: e.target.checked })}
              />
              <span>
                {isTa
                  ? 'தற்போது நேரலை இயங்குகிறது (embed/video தேர்ந்தெடுக்கப்பட்டு URL உள்ளிடப்பட்டால் மட்டுமே இயங்கும்)'
                  : 'Stream Currently Live (only activates if Source Type is embed/video and URL is provided)'}
              </span>
            </label>

            <div>
              <label className="form-label">{isTa ? 'பின்னணி சுவாமி பட வழி' : 'Fallback Deity Image Path'}</label>
              <input
                type="text"
                value={liveForm.fallbackImage}
                onChange={(e) => setLiveForm({ ...liveForm, fallbackImage: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">{isTa ? 'ஒளிபரப்பு இல்லாதபோது காட்டப்படும் செய்தி' : 'Stream Unavailable Notice'}</label>
              <textarea
                rows={3}
                value={liveForm.offlineFallbackMessage}
                onChange={(e) => setLiveForm({ ...liveForm, offlineFallbackMessage: e.target.value })}
                className="form-textarea"
              />
            </div>

            <button type="button" onClick={handleSaveLiveForm} className="btn-temple-primary" style={{ alignSelf: 'flex-start' }}>
              <Save size={15} />
              <span>{isTa ? 'நேரலை அமைப்புகளைச் சேமிக்க' : 'Save Live Darisanam Config'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 7: TEMPLE IMAGES AND VIDEOS */}
      {activeTab === 'media' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {isTa ? 'பாதுகாக்கப்பட்ட அசல் கோயில் படங்கள்' : 'Original Protected Temple Images'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
              {[
                { src: '/images/opt/deity.jpg', name: isTa ? 'மௌன குருநாதர் விக்கிரகம் (/images/deity.jpg)' : 'Mouna Gurunathar Vigraham (/images/deity.jpg)' },
                { src: '/images/opt/gopuram.jpg', name: isTa ? 'கோயில் கோபுரம் (/images/gopuram.jpg)' : 'Temple Gopuram (/images/gopuram.jpg)' },
                { src: '/images/opt/festival.jpg', name: isTa ? 'கோயில் திருவிழா (/images/festival.jpg)' : 'Temple Festival (/images/festival.jpg)' },
                { src: '/images/opt/annadhanam.jpg', name: isTa ? 'அன்னதானம் (/images/annadhanam.jpg)' : 'Annadhanam (/images/annadhanam.jpg)' }
              ].map((asset) => (
                <div key={asset.src} style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img src={asset.src} alt={asset.name} style={{ width: '100%', height: '125px', objectFit: 'cover' }} />
                  <div style={{ padding: '8px', fontSize: '0.75rem', fontWeight: 700 }}>{asset.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
            <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '10px' }}>
                {isTa ? 'முகப்பு படசுழற்சி படம் / வீடியோ சேர்க்க' : 'Add Hero Carousel Image / Video Slide'}
              </h3>
              <form onSubmit={handleAddHeroSlide} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label className="form-label">{isTa ? 'ஊடக வகை' : 'Media Type'}</label>
                  <select value={newSlideType} onChange={(e) => setNewSlideType(e.target.value as 'image' | 'video')} className="form-select">
                    <option value="image">{isTa ? 'படம்' : 'Image'}</option>
                    <option value="video">{isTa ? 'வீடியோ (.mp4 / ஸ்ட்ரீம்)' : 'Video (.mp4 / stream)'}</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">{isTa ? 'படம் / வீடியோ URL அல்லது வழி *' : 'Image / Video URL or Path *'}</label>
                  <input type="text" required value={newSlideSrc} onChange={(e) => setNewSlideSrc(e.target.value)} className="form-input" placeholder="/images/opt/deity.jpg or https://..." />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                    {[
                      { label: isTa ? 'சுவாமி' : 'Deity', path: '/images/opt/deity.jpg' },
                      { label: isTa ? 'கோபுரம்' : 'Gopuram', path: '/images/opt/gopuram.jpg' },
                      { label: isTa ? 'திருவிழா' : 'Festival', path: '/images/opt/festival.jpg' },
                      { label: isTa ? 'அன்னதானம்' : 'Annadhanam', path: '/images/opt/annadhanam.jpg' }
                    ].map((preset) => (
                      <button
                        type="button"
                        key={preset.path}
                        onClick={() => setNewSlideSrc(preset.path)}
                        className="btn-temple-secondary"
                        style={{ padding: '2px 8px', fontSize: '0.68rem' }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label">{isTa ? 'ஆங்கில தலைப்பு *' : 'English Heading *'}</label>
                  <input type="text" required value={newSlideTitleEn} onChange={(e) => setNewSlideTitleEn(e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'தமிழ் தலைப்பு' : 'Tamil Heading'}</label>
                  <input type="text" value={newSlideTitleTa} onChange={(e) => setNewSlideTitleTa(e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'துணைத்தலைப்பு' : 'Subtitle'}</label>
                  <input type="text" value={newSlideSubEn} onChange={(e) => setNewSlideSubEn(e.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'பொத்தான் செல்லும் பக்கம்' : 'Button Target Module'}</label>
                  <select value={newSlideActionPage} onChange={(e) => setNewSlideActionPage(e.target.value as PageView)} className="form-select">
                    <option value="darisanam">{isTa ? 'தரிசனம் முன்பதிவு' : 'Book Darisanam'}</option>
                    <option value="calendar">{isTa ? 'நாள்காட்டி' : 'Calendar'}</option>
                    <option value="donation">{isTa ? 'நன்கொடை' : 'Make Donation'}</option>
                    <option value="annadhanam">{isTa ? 'அன்னதானம்' : 'Annadhanam'}</option>
                    <option value="festival">{isTa ? 'திருவிழா காலங்கள்' : 'Festival Season'}</option>
                    <option value="live">{isTa ? 'நேரலை தரிசனம்' : 'Live Darisanam View'}</option>
                  </select>
                </div>
                <button type="submit" className="btn-temple-primary">
                  <Plus size={15} />
                  <span>{isTa ? 'படசுழற்சி படம் சேர்க்க' : 'Add Hero Slide'}</span>
                </button>
              </form>
            </div>

            <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '18px', minWidth: 0 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '10px' }}>
                {isTa ? `அமைக்கப்பட்ட படங்கள் (${heroSlides.length})` : `Configured Hero Slides (${heroSlides.length})`}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {heroSlides.map((s) => (
                  <div key={s.id} style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ fontSize: '0.86rem' }}>{s.titleEn}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', overflowWrap: 'anywhere' }}>
                        {s.mediaType.toUpperCase()} • {s.src}
                      </div>
                    </div>
                    {heroSlides.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateHeroSlides(heroSlides.filter((x) => x.id !== s.id));
                          notify(isTa ? 'படம் நீக்கப்பட்டது.' : 'Slide removed.');
                        }}
                        style={{ color: '#B91C1C', padding: '4px' }}
                        aria-label={isTa ? 'படத்தை நீக்கு' : 'Remove slide'}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: TEMPLE LOCATION MANAGEMENT */}
      {activeTab === 'location' && (
        <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '14px' }}>
            {isTa ? 'கோயில் அமைவிடம், அதிகாரப்பூர்வ மின்னஞ்சல் & தொடர்பு மேலாண்மை' : 'Temple Location, Official Email & Contact Management'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">{isTa ? 'கோயில் பெயர்' : 'Temple Name'}</label>
              <input type="text" value={locForm.templeName} onChange={(e) => setLocForm({ ...locForm, templeName: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'துணைத்தலைப்பு' : 'Subtitle'}</label>
              <input type="text" value={locForm.subtitle} onChange={(e) => setLocForm({ ...locForm, subtitle: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'முகவரி வரி 1' : 'Address Line 1'}</label>
              <input type="text" value={locForm.addressLine1} onChange={(e) => setLocForm({ ...locForm, addressLine1: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'முகவரி வரி 2' : 'Address Line 2'}</label>
              <input type="text" value={locForm.addressLine2} onChange={(e) => setLocForm({ ...locForm, addressLine2: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'நகரம் / கிராமம்' : 'City / Village'}</label>
              <input type="text" value={locForm.city} onChange={(e) => setLocForm({ ...locForm, city: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'மாவட்டம்' : 'District'}</label>
              <input type="text" value={locForm.district} onChange={(e) => setLocForm({ ...locForm, district: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'மாநிலம்' : 'State'}</label>
              <input type="text" value={locForm.state} onChange={(e) => setLocForm({ ...locForm, state: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'அஞ்சல் குறியீடு' : 'PIN Code'}</label>
              <input type="text" value={locForm.pincode} onChange={(e) => setLocForm({ ...locForm, pincode: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'அலுவலக தொலைபேசி' : 'Official Phone'}</label>
              <input type="text" value={locForm.phone} onChange={(e) => setLocForm({ ...locForm, phone: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'உதவி எண்' : 'Secondary Helpline'}</label>
              <input type="text" value={locForm.secondaryPhone} onChange={(e) => setLocForm({ ...locForm, secondaryPhone: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'அதிகாரப்பூர்வ மின்னஞ்சல்' : 'Official Email'}</label>
              <input type="email" value={locForm.email} onChange={(e) => setLocForm({ ...locForm, email: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'காலை தரிசன நேரம்' : 'Morning Hours'}</label>
              <input type="text" value={locForm.darshanMorning} onChange={(e) => setLocForm({ ...locForm, darshanMorning: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'மாலை தரிசன நேரம்' : 'Evening Hours'}</label>
              <input type="text" value={locForm.darshanEvening} onChange={(e) => setLocForm({ ...locForm, darshanEvening: e.target.value })} className="form-input" />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">{isTa ? 'சரிபார்க்கப்பட்ட கூகுள் வரைபட வழித்தட URL' : 'Verified Google Maps Directions URL'}</label>
            <input type="url" placeholder="https://maps.google.com/..." value={locForm.googleMapsUrl} onChange={(e) => setLocForm({ ...locForm, googleMapsUrl: e.target.value })} className="form-input" />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label className="form-label">{isTa ? 'சரிபார்ப்பு / வழித்தட குறிப்பு' : 'Verification / Directions Note'}</label>
            <input type="text" value={locForm.verificationNote} onChange={(e) => setLocForm({ ...locForm, verificationNote: e.target.value })} className="form-input" />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 700, marginBottom: '14px' }}>
            <input type="checkbox" checked={locForm.isVerified} onChange={(e) => setLocForm({ ...locForm, isVerified: e.target.checked })} />
            <span>{isTa ? 'முகவரி & வரைபடக் குறிப்பை அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டதாகக் குறிக்கவும்' : 'Mark Address & Map Coordinates as Officially Verified'}</span>
          </label>

          <button
            type="button"
            onClick={() => {
              if (locForm.googleMapsUrl.trim() && !isSafeUrl(locForm.googleMapsUrl)) {
                notify(isTa ? 'கூகுள் வரைபட URL https:// அல்லது http:// உடன் தொடங்க வேண்டும்' : 'Google Maps URL must start with https:// or http://');
                return;
              }
              onUpdateLocation(locForm);
              notify(isTa ? 'கோயில் அமைவிடம் & தொடர்பு விவரங்கள் சேமிக்கப்பட்டன.' : 'Temple location & contact details saved.');
            }}
            className="btn-temple-primary"
          >
            <Save size={15} />
            <span>{isTa ? 'கோயில் அமைவிடத்தைச் சேமிக்க' : 'Save Temple Location'}</span>
          </button>
        </div>
      )}

      {/* SECTION 9: MOUNA GURUNATHAR DETAILS AND ABOUT TEMPLE */}
      {activeTab === 'deity' && (
        <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '14px' }}>
            {isTa ? 'மௌன குருநாதர் விவரங்கள் & கோயில் பற்றி திருத்தி' : 'Mouna Gurunathar Details & About Temple Editor'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '780px' }}>
            <div>
              <label className="form-label">{isTa ? 'முகப்பு பக்தி அறிமுகம்' : 'Homepage Devotional Introduction'}</label>
              <textarea rows={3} value={deityForm.shortIntro} onChange={(e) => setDeityForm({ ...deityForm, shortIntro: e.target.value })} className="form-textarea" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'மந்திரம்' : 'Mantra'}</label>
              <input type="text" value={deityForm.mantra} onChange={(e) => setDeityForm({ ...deityForm, mantra: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'கோயில் வரலாறு (பத்திகளுக்கு இடையே இடைவெளி விடவும்)' : 'Temple History (separate paragraphs with blank line)'}</label>
              <textarea rows={4} value={historyText} onChange={(e) => setHistoryText(e.target.value)} className="form-textarea" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'ஆன்மீக முக்கியத்துவம் (வரிக்கு ஒன்று: தலைப்பு: விளக்கம்)' : 'Religious Significance (one per line: Title: Description)'}</label>
              <textarea rows={3} value={sigText} onChange={(e) => setSigText(e.target.value)} className="form-textarea" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'முக்கிய வழிபாட்டு மரபுகள் (வரிக்கு ஒன்று)' : 'Important Traditions (one per line)'}</label>
              <textarea rows={3} value={tradText} onChange={(e) => setTradText(e.target.value)} className="form-textarea" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'ஆண்டு விழாக்கள் (வரிக்கு ஒன்று)' : 'Annual Celebrations (one per line)'}</label>
              <textarea rows={3} value={annualText} onChange={(e) => setAnnualText(e.target.value)} className="form-textarea" />
            </div>
            <div>
              <label className="form-label">{isTa ? 'கோயில் பாரம்பரியம் (பத்திகளுக்கு இடையே இடைவெளி விடவும்)' : 'Temple Heritage (separate paragraphs with blank line)'}</label>
              <textarea rows={3} value={heritageText} onChange={(e) => setHeritageText(e.target.value)} className="form-textarea" />
            </div>
            <button type="button" onClick={handleSaveDeitySection} className="btn-temple-primary" style={{ alignSelf: 'flex-start' }}>
              <Save size={15} />
              <span>{isTa ? 'மௌன குருநாதர் தகவல்களைச் சேமிக்க' : 'Save Mouna Gurunathar Content'}</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 10: RECEIPT MANAGEMENT */}
      {activeTab === 'receipts' && (
        <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '8px' }}>
            {isTa ? 'ஒருங்கிணைந்த ரசீது மேலாண்மை (நன்கொடைகள் & அன்னதானம்)' : 'Unified Receipt Management (Donations & Annadhanam)'}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
            {isTa
              ? 'பக்தர்களின் ரசீதுகளை அங்கீகரிக்கப்பட்ட நிர்வாக அமர்வில் மட்டுமே காண இயலும். சரிபார்க்கப்பட்ட கட்டணங்களுக்கு மட்டுமே அச்சிட/PDF பெற முடியும்.'
              : 'Access to private devotee receipts is restricted to verified admin sessions. Receipts open in print/PDF-ready format only for verified payments.'}
          </p>

          <div style={{ display: 'flex', gap: '8px', maxWidth: '460px', marginBottom: '16px' }}>
            <input
              type="search"
              placeholder={isTa ? 'ரசீது எண், கட்டணக் குறிப்பு, பெயர் அல்லது அலைபேசியைத் தேட...' : 'Search receipt no, payment ref, name, or mobile...'}
              value={receiptSearch}
              onChange={(e) => setReceiptSearch(e.target.value)}
              className="form-input"
              style={{ minWidth: 0, flex: 1 }}
            />
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 10px', color: 'var(--color-temple-brown)' }}>
              <Search size={18} />
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unifiedReceipts.length === 0 ? (
              <div style={{ backgroundColor: '#FFFDF5', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
                <AlertCircle size={16} /> {isTa ? 'பொருத்தமான ரசீதுகள் எதுவும் கிடைக்கவில்லை.' : 'No matching receipts found.'}
              </div>
            ) : (
              unifiedReceipts.map((r) => (
                <div
                  key={`${r.receiptNumber}-${r.paymentReference}`}
                  style={{
                    backgroundColor: '#FFFDF5',
                    border: '1px solid var(--color-border-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--color-temple-brown)' }}>{r.receiptNumber}</strong>{' '}
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>({r.paymentReference})</span>
                    <div style={{ fontSize: '0.82rem' }}>
                      {r.devoteeName} • {r.purpose} • <strong>₹{r.amount.toLocaleString('en-IN')}</strong> •{' '}
                      <span style={{ color: r.paymentStatus === 'verified' ? '#1B7A3C' : '#B45309', fontWeight: 800 }}>
                        {r.paymentStatus === 'verified' ? (isTa ? 'சரிபார்க்கப்பட்டது' : 'VERIFIED') : (isTa ? 'நிலுவையில்' : 'PENDING')}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveReceiptPreview(r)}
                    className="btn-temple-gold"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    {isTa ? 'ரசீதைத் திற / PDF அச்சிடு' : 'Open Receipt / Print PDF'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SECTION 11: ADMINISTRATOR SETTINGS */}
      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
                {isTa ? 'நிர்வாகி சுயவிவரம் & நிர்வாகக் குறிப்புகள்' : 'Administrator Profile & Governance Notes'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className="form-label">{isTa ? 'நிர்வாகி காட்சிப் பெயர்' : 'Administrator Display Name'}</label>
                  <input
                    type="text"
                    value={settingsForm.adminDisplayName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, adminDisplayName: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'AIR சரிபார்ப்பு நிலை குறிப்பு' : 'AIR Verification Status Note'}</label>
                  <textarea
                    rows={2}
                    value={settingsForm.airVerificationNote}
                    onChange={(e) => setSettingsForm({ ...settingsForm, airVerificationNote: e.target.value })}
                    className="form-textarea"
                  />
                </div>
                <div>
                  <label className="form-label">{isTa ? 'கோயில் நிர்வாகக் குறிப்பு' : 'Temple Administration Note'}</label>
                  <textarea
                    rows={2}
                    value={settingsForm.templeOfficeNote}
                    onChange={(e) => setSettingsForm({ ...settingsForm, templeOfficeNote: e.target.value })}
                    className="form-textarea"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateAdminSettings(settingsForm);
                    notify(isTa ? 'நிர்வாக அமைப்புகள் சேமிக்கப்பட்டன.' : 'Administrator settings saved.');
                  }}
                  className="btn-temple-primary"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <Save size={15} />
                  <span>{isTa ? 'நிர்வாக அமைப்புகளைச் சேமிக்க' : 'Save Admin Settings'}</span>
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '10px' }}>
                {isTa ? `கோயில் அறிவிப்பு மணி செய்திகள் (${announcements.length})` : `Temple Notification Bell Announcements (${announcements.length})`}
              </h3>
              <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '8px' }}>
                  <input
                    type="text"
                    required
                    placeholder={isTa ? 'அறிவிப்பு தலைப்பு' : 'Announcement title'}
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="form-input"
                  />
                  <select
                    value={annPriority}
                    onChange={(e) => setAnnPriority(e.target.value as 'high' | 'normal')}
                    className="form-select"
                  >
                    <option value="normal">{isTa ? 'சாதாரண முக்கியத்துவம்' : 'Normal Priority'}</option>
                    <option value="high">{isTa ? 'அதிக முக்கியத்துவம் (முக்கியமானது)' : 'High Priority (Important)'}</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder={isTa ? 'பக்தர்களுக்கான கோயில் அறிவிப்பு செய்தி...' : 'Announcement message for devotees...'}
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  className="form-textarea"
                />
                <button type="submit" className="btn-temple-primary" style={{ alignSelf: 'flex-start' }}>
                  <Plus size={15} />
                  <span>{isTa ? 'அறிவிப்பை வெளியிடு' : 'Publish Announcement'}</span>
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      backgroundColor: '#FFFDF5',
                      border: '1px solid var(--color-border-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--color-temple-brown)' }}>{a.title}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                        {a.date} • {a.priority === 'high' ? (isTa ? 'முக்கியமானது' : 'HIGH') : (isTa ? 'சாதாரணமானது' : 'NORMAL')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateAnnouncements(announcements.filter((item) => item.id !== a.id));
                        notify(isTa ? 'அறிவிப்பு நீக்கப்பட்டது.' : 'Announcement removed.');
                      }}
                      aria-label={isTa ? 'அறிவிப்பை நீக்கு' : 'Delete announcement'}
                      style={{ color: '#B91C1C', padding: '4px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
            <div style={{ backgroundColor: 'var(--color-section-bg)', border: '1.5px solid var(--color-border-gold)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <KeyRound size={17} />
                <span>{isTa ? 'உள்ளூர் மாதிரி கடவுச்சொல்லை மாற்றுக' : 'Update Local Demo Passcode'}</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                {isTa
                  ? 'உலாவி மாதிரி கடவுச்சொல் மாற்றம். உண்மையான இயக்கத்திற்கு பின்னணி அங்கீகாரம் & RBAC தேவை.'
                  : 'Prototype browser-local credential rotation. Production deployments must use backend authentication & RBAC.'}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="password"
                  placeholder={isTa ? 'புதிய கடவுச்சொல் (குறைந்தது 6 எழுத்துக்கள்)' : 'New passcode (min 6 chars)'}
                  value={newDemoPasscode}
                  onChange={(e) => setNewDemoPasscode(e.target.value)}
                  className="form-input"
                  style={{ flex: '1 1 180px', minWidth: 0 }}
                />
                <button type="button" onClick={handleUpdateDemoPasscode} className="btn-temple-secondary">
                  {isTa ? 'கடவுச்சொல்லை மாற்று' : 'Update Passcode'}
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#FEF3C7', border: '1.5px solid #D97706', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#92400E', marginBottom: '6px' }}>
                {isTa ? 'உள்ளூர் மாதிரி தரவுகளை மீட்டமைக்க' : 'Reset Local Prototype Data to Defaults'}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#78350F', marginBottom: '12px' }}>
                {isTa
                  ? 'உலாவியில் மாற்றப்பட்ட தரவுகளை அழித்து, ஆரம்பகால மௌன குருநாதர் திருக்கோயில் மாதிரி பதிவுகளை மீட்டமைக்கிறது.'
                  : 'Clears edited local browser data and restores initial Mouna Gurunathar Temple seed records.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(isTa ? 'அனைத்து உள்ளூர் மாதிரி தரவுகளையும் ஆரம்ப நிலைக்கு மீட்டமைக்கவா?' : 'Reset all local prototype data to factory seed state?')) {
                    onResetFactoryData();
                    notify(isTa ? 'அனைத்து மாதிரி தரவுகளும் மீட்டமைக்கப்பட்டன.' : 'All prototype data reset to defaults.');
                  }
                }}
                style={{
                  backgroundColor: '#B45309',
                  color: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={15} />
                <span>{isTa ? 'மாதிரி தரவை மீட்டமைக்க' : 'Reset Prototype Data'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Preview for Common Receipt in Donations / Annadhanam / Receipts tabs */}
      {activeReceiptPreview && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(62, 33, 20, 0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            padding: '16px',
            overflowY: 'auto'
          }}
          onClick={() => setActiveReceiptPreview(null)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', width: '100%' }}>
            <ReceiptView
              receipt={activeReceiptPreview}
              language={language}
              onClose={() => setActiveReceiptPreview(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
