import {
  CalendarEvent,
  DarisanamSlotTemplate,
  DarisanamBooking,
  DonationRecord,
  AnnadhanamBooking,
  AnnadhanamConfig,
  FestivalItem,
  TempleLocationConfig,
  LiveStreamConfig,
  TempleAnnouncement,
  DeityInfo,
  HeroMediaItem,
  AdminSettingsConfig
} from '../types';

export const initialDeityInfo: DeityInfo = {
  name: 'Mouna Gurunathar',
  subtitle: 'Arul Tharum Muneeswaran',
  shortIntro:
    'Mouna Gurunathar (Arul Tharum Muneeswaran) is revered as the serene silent spiritual master and compassionate guardian deity who bestows inner peace, courage, and divine protection upon sincere devotees.',
  history: [
    'Mouna Gurunathar Temple is dedicated to Lord Muneeswaran worshipped in the sacred aspect of Mouna Gurunathar — the silent spiritual preceptor.',
    '[Editable Temple History Placeholder] Specific local Sthalapuranam chronicles, founding year, and consecrated lineage details will be updated here once verified records are provided by the temple administration.',
    'Devotees gather at the sanctum to offer silent prayers, sacred lamps, and heartfelt devotion seeking clarity, strength, and relief from worldly anxieties.'
  ],
  spiritualSignificance: [
    'Mouna (Sacred Silence): Contemplating Mouna Gurunathar cultivates stillness of mind, humility, and inner spiritual clarity.',
    'Trishul & Vibhuti: Traditional emblems symbolizing protection, auspiciousness, and the removal of fear.',
    'Arul Tharum Muneeswaran: Worshipped as a compassionate guardian who responds to sincere silent devotion.'
  ],
  traditions: [
    '[Editable Tradition Placeholder] Daily sanctum worship timings and pooja order to be confirmed by Temple Office.',
    'Traditional lamp lighting (Deepam) and silent meditation before the sanctum.',
    'Special offerings on Fridays, Pournami, Amavasai, and Pradosham observances.',
    'Philanthropic Annadhanam food seva offered to visiting pilgrims.'
  ],
  annualFestivals: [
    'Chithirai Tamil New Year Observance',
    'Aadi Velli & Aadi Special Worship',
    'Navarathri & Vijayadasami Deepam',
    'Karthigai Deepam',
    'Thai Pongal & Thai Poosam',
    'Maha Shivaratri & Panguni Uthiram (Dates published after Temple Panchangam verification)'
  ],
  heritage: [
    '[Editable Heritage Placeholder] Architectural details of the Raja Gopuram, sanctum stone carvings, mandapam pillars, and sacred temple trees (Sthala Vriksham) can be updated through the Admin Panel.',
    'The temple portal preserves original photographs of the Mouna Gurunathar sanctum, Raja Gopuram, annual chariot procession, and Annadhanam hall.'
  ],
  mantra: '|| Om Mouna Gurunatharaya Namaha ||',
  historicalPhotos: [
    {
      id: 'hist-1',
      image: '/images/opt/deity.jpg',
      title: 'Mouna Gurunathar Sanctum Vigraham',
      titleTa: 'மௌன குருநாதர் மூலவர் சந்நிதி',
      caption: 'Original sanctum photograph of Mouna Gurunathar adorned with floral garlands and brass deepams.',
      captionTa: 'மலர் மாலைகள் மற்றும் குத்துவிளக்கு அலங்காரத்தில் மௌன குருநாதர் மூலவர் காட்சி.',
      isOriginal: true,
      isPlaceholder: false
    },
    {
      id: 'hist-2',
      image: '/images/opt/gopuram.jpg',
      title: 'Temple Raja Gopuram & Courtyard',
      titleTa: 'திருக்கோயில் இராஜகோபுரம் மற்றும் பிரகாரம்',
      caption: 'Original temple gopuram and courtyard architecture welcoming pilgrims at dawn.',
      captionTa: 'திருக்கோயில் இராஜகோபுரம் மற்றும் பிரகாரக் காட்சி.',
      isOriginal: true,
      isPlaceholder: false
    },
    {
      id: 'hist-3',
      image: '/images/opt/festival.jpg',
      title: 'Annual Chariot (Ther) Procession',
      titleTa: 'திருவிழா தேர் உற்சவக் காட்சி',
      caption: 'Archival temple festival photograph showing devotees gathering for the sacred evening procession.',
      captionTa: 'திருவிழா காலத்தில் தேர் பவனி மற்றும் பக்தர்கள் கூட்டம்.',
      isOriginal: true,
      isPlaceholder: false
    },
    {
      id: 'hist-4',
      image: '/images/opt/annadhanam.jpg',
      title: 'Traditional Banana-Leaf Annadhanam',
      titleTa: 'வாழை இலை அன்னதான சேவை',
      caption: '[Editable Archive Caption] Original photograph of pilgrims partaking in temple Annadhanam prasadam.',
      captionTa: 'திருக்கோயில் மண்டபத்தில் பக்தர்களுக்கு வாழை இலையில் அன்னதானம் வழங்கப்படும் காட்சி.',
      isOriginal: true,
      isPlaceholder: true
    }
  ]
};

export const initialLocationConfig: TempleLocationConfig = {
  templeName: 'Mouna Gurunathar Temple',
  subtitle: 'Arul Tharum Muneeswaran',
  addressLine1: '[Editable Placeholder: Temple Street / Sannathi Address]',
  addressLine2: '[Editable Placeholder: Village / Locality / Landmark]',
  city: '[City / Town — Pending Verification]',
  district: '[District — Pending Verification]',
  state: 'Tamil Nadu',
  pincode: '[PIN Code]',
  phone: '[Official Temple Phone — Update in Admin]',
  secondaryPhone: '[Helpline Phone — Update in Admin]',
  email: 'office@mounagurunathartemple.example',
  darshanMorning: '06:00 AM - 12:30 PM (Placeholder)',
  darshanEvening: '04:30 PM - 09:00 PM (Placeholder)',
  googleMapsUrl: '',
  isVerified: false,
  verificationNote: 'Official address, contact numbers, and verified Google Maps coordinates are pending administrator confirmation.'
};

export const initialLiveStreamConfig: LiveStreamConfig = {
  sourceType: 'demo',
  streamUrl: '',
  isLive: false,
  statusMessage: 'Live stream is currently unavailable.',
  offlineFallbackMessage:
    'Live stream is currently unavailable. Displaying the original sanctum image of Mouna Gurunathar until an official live video feed is connected by the temple administrator.',
  fallbackImage: '/images/opt/deity.jpg',
  activeViewers: 0
};

export const initialHeroSlides: HeroMediaItem[] = [
  {
    id: 'slide-deity',
    mediaType: 'image',
    src: '/images/opt/deity.jpg',
    titleEn: 'Mouna Gurunathar',
    titleTa: 'மௌன குருநாதர்',
    subtitleEn: 'Arul Tharum Muneeswaran — Divine Silent Master & Guardian of Devotees',
    subtitleTa: 'அருள் தரும் முனீஸ்வரன் — அமைதியின் வடிவம், காக்கும் காவல் தெய்வம்',
    badgeEn: 'SACRED SANCTUM DARISANAM',
    badgeTa: 'புனித சந்நிதி தரிசனம்',
    actionTextEn: 'Book Darisanam',
    actionTextTa: 'தரிசனம் முன்பதிவு',
    actionPage: 'darisanam',
    isOriginal: true
  },
  {
    id: 'slide-gopuram',
    mediaType: 'image',
    src: '/images/opt/gopuram.jpg',
    titleEn: 'Mouna Gurunathar Temple Sannathi',
    titleTa: 'மௌன குருநாதர் திருக்கோயில் சந்நிதி',
    subtitleEn: 'Traditional Tamil Nadu Temple Architecture, Daily Poojas & Peaceful Worship',
    subtitleTa: 'தமிழ்நாடு பாரம்பரிய கோயில் மரபு, தினசரி பூசைகள் மற்றும் அமைதி வழிபாடு',
    badgeEn: 'SACRED TEMPLE SHRINE',
    badgeTa: 'புனித திருத்தலம்',
    actionTextEn: 'View Calendar',
    actionTextTa: 'நாள்காட்டி பார்க்க',
    actionPage: 'calendar',
    isOriginal: true
  },
  {
    id: 'slide-festival',
    mediaType: 'image',
    src: '/images/opt/festival.jpg',
    titleEn: 'Festival Season & Utsavams',
    titleTa: 'திருவிழா காலங்கள் & உற்சவங்கள்',
    subtitleEn: 'Explore Temple Festivals, Special Pooja Schedules & Tamil Calendar Observances',
    subtitleTa: 'திருக்கோயில் திருவிழாக்கள், சிறப்பு பூசைகள் மற்றும் தமிழ் மாத விசேஷங்கள்',
    badgeEn: 'FESTIVAL SEASON',
    badgeTa: 'திருவிழா காலங்கள்',
    actionTextEn: 'Festival Season',
    actionTextTa: 'திருவிழாக்கள் காண்க',
    actionPage: 'festival',
    isOriginal: true
  },
  {
    id: 'slide-annadhanam',
    mediaType: 'image',
    src: '/images/opt/annadhanam.jpg',
    titleEn: 'Annadhanam & Sacred Offerings',
    titleTa: 'புனித அன்னதான சேவை',
    subtitleEn: 'Sponsor Traditional Banana-Leaf Annadhanam Meals (₹100 Initial Sponsorship)',
    subtitleTa: 'பக்தர்களுக்கு வாழை இலையில் அன்னதான உணவு வழங்க ₹100 சேவையில் இணையுங்கள்',
    badgeEn: 'ANNADHANAM SEVA',
    badgeTa: 'அன்னதான கைங்கர்யம்',
    actionTextEn: 'Sponsor Annadhanam',
    actionTextTa: 'அன்னதானம் வழங்க',
    actionPage: 'annadhanam',
    isOriginal: true
  }
];

export const initialAnnouncements: TempleAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Darisanam 7-Day Rolling Window Open (Demo)',
    message:
      'Devotees can browse available Darisanam time slots for the next 7 consecutive days via the Book Darisanam module.',
    date: '2026-11-09',
    isNew: true,
    priority: 'high'
  },
  {
    id: 'ann-2',
    title: 'Annadhanam Sponsorship Seva (₹100 Initial)',
    message:
      'Sponsor sacred Annadhanam meals through the rolling 1-month sponsorship calendar. Green indicates open dates; Grey indicates unavailable dates.',
    date: '2026-11-08',
    isNew: true,
    priority: 'normal'
  },
  {
    id: 'ann-3',
    title: 'Official Temple Contact & Address Notice',
    message:
      'Temple address, phone, and festival Panchangam dates marked as tentative can be verified and updated by authorized trustees in the Admin Panel.',
    date: '2026-11-05',
    isNew: false,
    priority: 'normal'
  }
];

export const initialFestivals: FestivalItem[] = [
  {
    id: 'fest-1',
    name: 'Mouna Gurunathar Annual Maha Utsavam (Schedule Pending)',
    tamilMonth: 'Aadi',
    dateStr: 'Date Pending Verification (Aadi Month)',
    category: 'Major Temple Festivals',
    image: '/images/opt/festival.jpg',
    description:
      'Grand annual temple celebration honoring Mouna Gurunathar (Arul Tharum Muneeswaran). Exact festival dates and Vedic schedule will be confirmed by the Temple Office.',
    poojaTimings: 'Schedule to be published by Temple Archakar',
    specialInstructions: 'Watch official announcements or check Calendar after Panchangam verification.',
    isProminent: true,
    isVerified: false
  },
  {
    id: 'fest-2',
    name: 'Panguni Uthiram Chariot Observance (Schedule Pending)',
    tamilMonth: 'Panguni',
    dateStr: 'Date Pending Verification (Panguni Month)',
    category: 'Major Temple Festivals',
    image: '/images/opt/gopuram.jpg',
    description:
      'Traditional Tamil festival celebrated during Panguni Uthiram. Exact chariot and procession timings are awaiting official verification.',
    poojaTimings: 'Schedule to be announced by Temple Administration',
    specialInstructions: 'Updates will be posted prior to festival commencement.',
    isProminent: true,
    isVerified: false
  },
  {
    id: 'fest-3',
    name: 'Aadi Velli Special Pooja',
    tamilMonth: 'Aadi',
    dateStr: 'Fridays in Aadi (Tamil Calendar)',
    category: 'Special Pooja',
    image: '/images/opt/deity.jpg',
    description:
      'Auspicious Fridays in the Tamil month of Aadi marked by special floral decoration, lamp lighting, and silent devotional prayers to Mouna Gurunathar.',
    poojaTimings: 'To be confirmed by Temple Office',
    specialInstructions: 'Devotees may bring fresh flowers and traditional offerings.',
    isProminent: false,
    isVerified: false
  },
  {
    id: 'fest-4',
    name: 'Karthigai Deepam Festival',
    tamilMonth: 'Karthigai',
    dateStr: 'Date Pending Verification (Karthigai Month)',
    category: 'Tamil Calendar Events',
    image: '/images/opt/festival.jpg',
    description:
      'Sacred festival of lights illuminating the temple courtyard and sanctum of Mouna Gurunathar with traditional clay oil lamps.',
    poojaTimings: 'Evening Deepam lighting schedule pending confirmation',
    specialInstructions: 'Sesame oil and cotton wicks may be offered at temple counters.',
    isProminent: true,
    isVerified: false
  },
  {
    id: 'fest-5',
    name: 'Thai Pongal & Surya Pooja',
    tamilMonth: 'Thai',
    dateStr: 'January 14 (Thai 01)',
    category: 'Upcoming Festivals',
    image: '/images/opt/annadhanam.jpg',
    description:
      'Traditional harvest thanksgiving festival marking the auspicious dawn of the Tamil month of Thai with sweet Pongal offering and Annadhanam.',
    poojaTimings: 'Morning timings to be confirmed by Temple Office',
    specialInstructions: 'Traditional attire encouraged for morning darisanam.',
    isProminent: false,
    isVerified: true
  },
  {
    id: 'fest-6',
    name: 'Chithirai Tamil New Year Special Darisanam',
    tamilMonth: 'Chithirai',
    dateStr: 'April 14 (Chithirai 01)',
    category: 'Completed Festivals',
    image: '/images/opt/gopuram.jpg',
    description:
      'Solar commencement of the Tamil New Year observed with morning prayers, Panchangam reading, and blessings of Mouna Gurunathar.',
    poojaTimings: 'Morning & Evening Darisanam',
    specialInstructions: 'Archived observance record; upcoming year timings updated in Calendar.',
    isProminent: false,
    isVerified: true
  }
];

export const initialDarisanamSlots: DarisanamSlotTemplate[] = [
  {
    id: 'slot-morning',
    label: 'Morning Darisanam',
    labelTa: 'காலை தரிசனம்',
    timeRange: '06:30 AM - 08:00 AM',
    capacity: 40
  },
  {
    id: 'slot-forenoon',
    label: 'Forenoon Darisanam',
    labelTa: 'முற்பகல் தரிசனம்',
    timeRange: '09:00 AM - 11:00 AM',
    capacity: 40
  },
  {
    id: 'slot-evening',
    label: 'Sayarakshai Evening Darisanam',
    labelTa: 'சாயரட்சை மாலை தரிசனம்',
    timeRange: '05:00 PM - 06:30 PM',
    capacity: 40
  },
  {
    id: 'slot-night',
    label: 'Night Deeparadhanai Darisanam',
    labelTa: 'இரவு தீபாராதனை தரிசனம்',
    timeRange: '07:00 PM - 08:30 PM',
    capacity: 30
  }
];

export function formatLocalDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function createInitialDarisanamBookings(): DarisanamBooking[] {
  const base = new Date();
  const todayStr = formatLocalDateISO(base);
  const tomorrow = new Date(base);
  tomorrow.setDate(base.getDate() + 1);
  const tomorrowStr = formatLocalDateISO(tomorrow);

  // Demonstration capacity seed records (never exposed publicly with personal names)
  return [
    {
      id: 'dar-demo-1',
      referenceNumber: 'DAR-DEMO-2026-001',
      devoteeName: '[Demo Seed Entry — Capacity Demo]',
      mobile: '0000000000',
      numberOfDevotees: 40, // Fills one slot on todayStr so devotee sees Fully Booked vs Available states
      date: todayStr,
      slotId: 'slot-morning',
      slotLabel: 'Morning Darisanam (06:30 AM - 08:00 AM)',
      status: 'confirmed',
      statusNote: 'Demo capacity seed record to illustrate a fully booked slot.',
      createdAt: base.toISOString(),
      isDemo: true
    },
    {
      id: 'dar-demo-2',
      referenceNumber: 'DAR-DEMO-2026-002',
      devoteeName: '[Demo Seed Entry — Pending Review]',
      mobile: '0000000000',
      numberOfDevotees: 6,
      date: tomorrowStr,
      slotId: 'slot-evening',
      slotLabel: 'Sayarakshai Evening Darisanam (05:00 PM - 06:30 PM)',
      status: 'pending',
      statusNote: 'Awaiting backend / admin confirmation.',
      createdAt: base.toISOString(),
      isDemo: true
    }
  ];
}

export function createInitialAnnadhanamConfig(): AnnadhanamConfig {
  const base = new Date();
  const unavailable1 = new Date(base);
  unavailable1.setDate(base.getDate() + 4);
  const unavailable2 = new Date(base);
  unavailable2.setDate(base.getDate() + 14);

  return {
    sponsorshipAmount: 100,
    unavailableDates: [formatLocalDateISO(unavailable1), formatLocalDateISO(unavailable2)],
    disabledSlots: [],
    maxBookingsPerSlot: 1
  };
}

export function createInitialAnnadhanamBookings(): AnnadhanamBooking[] {
  const base = new Date();
  const bookedDay = new Date(base);
  bookedDay.setDate(base.getDate() + 2);
  const bookedStr = formatLocalDateISO(bookedDay);

  return [
    {
      id: 'ann-demo-1',
      receiptNumber: 'ANN-DEMO-2026-101',
      paymentReference: 'DEMO-REF-00101',
      devoteeName: '[Demo Sponsor Record]',
      mobile: '0000000000',
      date: bookedStr,
      mealType: 'Lunch',
      quantity: 1,
      amount: 100,
      dedicationMessage: '[Demo Seed Record — Admin Privacy Protected]',
      paymentStatus: 'verified',
      createdAt: base.toISOString(),
      isDemo: true
    },
    {
      id: 'ann-demo-2',
      receiptNumber: 'ANN-DEMO-2026-102',
      paymentReference: 'DEMO-REF-00102',
      devoteeName: '[Demo Sponsor Record]',
      mobile: '0000000000',
      date: bookedStr,
      mealType: 'Evening Prasadam',
      quantity: 1,
      amount: 100,
      dedicationMessage: '[Demo Seed Record — Admin Privacy Protected]',
      paymentStatus: 'verified',
      createdAt: base.toISOString(),
      isDemo: true
    }
  ];
}

export const initialDonations: DonationRecord[] = [
  {
    id: 'don-demo-1',
    receiptNumber: 'DON-DEMO-2026-001',
    paymentReference: 'DEMO-PAY-00101',
    donorName: '[Demo Donor Record]',
    mobile: '0000000000',
    email: 'demo-record@example.invalid',
    amount: 501,
    purpose: 'General Temple Hundi (Demo Seed)',
    paymentStatus: 'verified',
    createdAt: '2026-11-01T10:00:00Z',
    isDemo: true
  }
];

export const initialAdminSettings: AdminSettingsConfig = {
  adminDisplayName: 'Temple Trustee Administrator',
  airVerificationNote:
    'AIR (Administrator Identifier Record) format & authoritative registry require verification via backend identity service.',
  templeOfficeNote:
    'Frontend prototype storage active. Connect a secure backend API for production persistence, authentication, and payment processing.'
};

/**
 * Computes approximate IST dates of astronomical New Moon (Amavasai) and Full Moon (Pournami)
 * for any year 2026-2035 using the mean synodic period from the J2000 new moon epoch.
 * NOTE: Marked isVerified: false because temple Panchangam observances follow sunrise Thithi rules
 * and must be verified by temple archakars/administrators.
 */
function getAstronomicalLunarEventsForYear(year: number): CalendarEvent[] {
  const SYNODIC_MS = 29.530588853 * 86400000;
  const EPOCH_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14, 0);
  const IST_OFFSET_MS = 5.5 * 3600000;

  const startMs = Date.UTC(year, 0, 1) - SYNODIC_MS;
  const endMs = Date.UTC(year, 11, 31, 23, 59, 59) + SYNODIC_MS;

  const firstCycle = Math.floor((startMs - EPOCH_NEW_MOON_MS) / SYNODIC_MS);
  const lastCycle = Math.ceil((endMs - EPOCH_NEW_MOON_MS) / SYNODIC_MS);

  const events: CalendarEvent[] = [];

  const addIfInYear = (
    utcMs: number,
    suffix: string,
    title: string,
    tamilDate: string,
    category: CalendarEvent['category'],
    description: string
  ) => {
    const istDate = new Date(utcMs + IST_OFFSET_MS);
    const y = istDate.getUTCFullYear();
    const m = istDate.getUTCMonth();
    const d = istDate.getUTCDate();
    if (y !== year) return;

    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    events.push({
      id: `${suffix}-${y}-${m + 1}-${d}`,
      title,
      tamilDate,
      date: dateStr,
      year: y,
      month: m,
      day: d,
      category,
      startTime: 'To be confirmed',
      endTime: 'Temple Office',
      auspiciousTime: 'Pending Panchangam verification',
      description,
      specialInstructions:
        'Tentative astronomical lunar estimate. Confirm exact temple pooja timings with the Mouna Gurunathar Temple office.',
      isVerified: false
    });
  };

  for (let k = firstCycle; k <= lastCycle; k++) {
    const newMoonMs = EPOCH_NEW_MOON_MS + k * SYNODIC_MS;
    const fullMoonMs = newMoonMs + SYNODIC_MS * 0.5;
    const shuklaPradoshamMs = fullMoonMs - 2 * 86400000;
    const krishnaPradoshamMs = newMoonMs - 2 * 86400000;

    addIfInYear(
      newMoonMs,
      'amav',
      'Amavasai Observance (Est.)',
      'Amavasai (Est.)',
      'important',
      'New Moon (Amavasai) observance. Exact sankalpam and pooja timings are subject to official Temple Panchangam verification.'
    );
    addIfInYear(
      fullMoonMs,
      'pour',
      'Pournami Special Worship (Est.)',
      'Pournami (Est.)',
      'pooja',
      'Full Moon (Pournami) worship of Mouna Gurunathar. Confirm evening abhishekam and deeparadhanai timings with temple administration.'
    );
    addIfInYear(
      shuklaPradoshamMs,
      'prad-s',
      'Shukla Pradosham (Est.)',
      'Pradosham (Est.)',
      'regular',
      'Evening Pradosham observance prior to Pournami. Exact Pradosha Kalam timings depend on daily Panchangam.'
    );
    addIfInYear(
      krishnaPradoshamMs,
      'prad-k',
      'Krishna Pradosham (Est.)',
      'Pradosham (Est.)',
      'regular',
      'Evening Pradosham observance prior to Amavasai. Exact Pradosha Kalam timings depend on daily Panchangam.'
    );
  }

  return events;
}

// Generate 2026-2035 calendar dataset without inventing fake auspicious timings
export function generateYearlyCalendarEvents(year: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // Solar-anchored Tamil calendar events (fixed solar dates)
  const solarAnchors = [
    {
      month: 0,
      day: 14,
      title: 'Thai Pongal / Thai Month Begins',
      tamilDate: 'Thai 01',
      category: 'festival' as const,
      desc: 'Commencement of the auspicious Tamil month of Thai and harvest thanksgiving at Mouna Gurunathar Temple.'
    },
    {
      month: 3,
      day: 14,
      title: 'Tamil New Year (Chithirai 01)',
      tamilDate: 'Chithirai 01',
      category: 'festival' as const,
      desc: 'Solar beginning of the Tamil New Year in Chithirai. Special pooja timings are published annually by the temple office.'
    },
    {
      month: 9,
      day: 17,
      title: 'Aippasi Solar Transition (Month Marker)',
      tamilDate: 'Aippasi',
      category: 'regular' as const,
      desc: 'Transition into the Tamil month of Aippasi. Check temple announcements for Annabhishekam and seasonal poojas.'
    },
    {
      month: 10,
      day: 16,
      title: 'Karthigai Solar Transition (Month Marker)',
      tamilDate: 'Karthigai',
      category: 'regular' as const,
      desc: 'Transition into the Tamil month of Karthigai. Karthigai Deepam dates will be updated by Temple Administration.'
    }
  ];

  solarAnchors.forEach((rule, idx) => {
    const dStr = `${year}-${String(rule.month + 1).padStart(2, '0')}-${String(rule.day).padStart(2, '0')}`;
    events.push({
      id: `solar-${year}-${idx + 1}`,
      title: rule.title,
      tamilDate: rule.tamilDate,
      date: dStr,
      year,
      month: rule.month,
      day: rule.day,
      category: rule.category,
      startTime: 'To be confirmed',
      endTime: 'Temple Office',
      auspiciousTime: 'To be announced by Temple Archakar',
      description: rule.desc,
      specialInstructions: 'Verify exact morning/evening pooja schedule with temple office prior to visit.',
      image: rule.category === 'festival' ? '/images/opt/festival.jpg' : '/images/opt/gopuram.jpg',
      isVerified: true
    });
  });

  // Add astronomical lunar estimates (marked unverified/tentative)
  events.push(...getAstronomicalLunarEventsForYear(year));

  return events;
}

export function generateFullTenYearCalendar(): CalendarEvent[] {
  const all: CalendarEvent[] = [];
  for (let y = 2026; y <= 2035; y++) {
    all.push(...generateYearlyCalendarEvents(y));
  }
  return all;
}

// LocalStorage Persistence Keys (versioned so stale unverified data never leaks)
export const STORAGE_KEYS = {
  LANGUAGE: 'mgt_v2_language',
  CALENDAR_EVENTS: 'mgt_v2_calendar_events',
  DARISANAM_SLOTS: 'mgt_v2_darisanam_slots',
  DARISANAM_BOOKINGS: 'mgt_v2_darisanam_bookings',
  DONATIONS: 'mgt_v2_donations',
  ANNADHANAM_BOOKINGS: 'mgt_v2_annadhanam_bookings',
  ANNADHANAM_CONFIG: 'mgt_v2_annadhanam_config',
  LOCATION_CONFIG: 'mgt_v2_location_config',
  LIVE_STREAM_CONFIG: 'mgt_v2_livestream_config',
  HERO_SLIDES: 'mgt_v2_hero_slides',
  FESTIVALS: 'mgt_v2_festivals',
  DEITY_INFO: 'mgt_v2_deity_info',
  ANNOUNCEMENTS: 'mgt_v2_announcements',
  ADMIN_SETTINGS: 'mgt_v2_admin_settings',
  ADMIN_PASSCODE_HASH: 'mgt_v2_demo_pass_hash'
};

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage for key ${key}:`, err);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving to localStorage for key ${key}:`, err);
  }
}

export function resetAllToFactoryDefaults(): void {
  Object.values(STORAGE_KEYS).forEach((k) => {
    if (k !== STORAGE_KEYS.LANGUAGE) {
      localStorage.removeItem(k);
    }
  });
}
