export type Language = 'en' | 'ta';

export interface Translations {
  // Temple branding
  templeName: string;
  templeSubtitle: string;
  mantraShort: string;
  moolaMantra: string;

  // Nav items (9 items)
  navHome: string;
  navCalendar: string;
  navDarisanam: string;
  navDonation: string;
  navAnnadhanam: string;
  navFestival: string;
  navLive: string;
  navAbout: string;
  navContact: string;
  navAdminPanel: string;
  navSignOut: string;

  // Header & Controls
  audioChants: string;
  audioMuted: string;
  audioPlaying: string;
  announcements: string;
  templeAccess: string;
  adminLogin: string;
  adminDashboard: string;
  templeHelpDesk: string;
  switchLang: string;
  otherLangName: string;

  // Hero Carousel
  heroLiveBadgeLive: string;
  heroLiveBadgeOffline: string;
  watchLiveBtn: string;

  // Home Modules Section (6 Modules)
  homeModulesTitle: string;
  homeModulesSubtitle: string;
  cardCalendarTitle: string;
  cardCalendarSub: string;
  cardCalendarBadge: string;
  cardDarisanamTitle: string;
  cardDarisanamSub: string;
  cardDarisanamBadge: string;
  cardDonationTitle: string;
  cardDonationSub: string;
  cardDonationBadge: string;
  cardAnnadhanamTitle: string;
  cardAnnadhanamSub: string;
  cardAnnadhanamBadge: string;
  cardFestivalTitle: string;
  cardFestivalSub: string;
  cardFestivalBadge: string;
  cardLiveTitle: string;
  cardLiveSub: string;
  cardLiveBadge: string;

  // Deity Details
  deityBadge: string;
  deityTitle: string;
  deitySubtitle: string;
  deityIntro: string;
  deityFeat1Title: string;
  deityFeat1Sub: string;
  deityFeat2Title: string;
  deityFeat2Sub: string;
  deityViewDetailsBtn: string;

  // Temple Location
  locTitle: string;
  locSubtitle: string;
  locOpenInMaps: string;
  locTimingsTitle: string;
  locMorning: string;
  locEvening: string;
  locVerified: string;
  locPendingVerification: string;
  locGetDirections: string;

  // Footer
  footerMission: string;
  footerReadHistory: string;
  footerServicesTitle: string;
  footerContactTitle: string;
  footerOfficialOffice: string;
  footerHours: string;
  footerCopyright: string;
  footerPrivacy: string;
  footerTerms: string;

  // Calendar Module
  calPanchangamBadge: string;
  calTitle: string;
  calSubtitle: string;
  calLegendGold: string;
  calLegendBrown: string;
  calLegendGreen: string;
  calLegendRed: string;
  calTodayBtn: string;
  calAllEvents: string;
  calMajorFestivals: string;
  calSpecialPooja: string;
  calRegularEvents: string;
  calImportantDates: string;
  calSun: string;
  calMon: string;
  calTue: string;
  calWed: string;
  calThu: string;
  calFri: string;
  calSat: string;
  calDateLabel: string;
  calTimingsLabel: string;
  calAuspiciousLabel: string;
  calOverviewLabel: string;
  calGuidelinesLabel: string;
  calCloseBtn: string;

  // Book Darisanam Module
  darBadge: string;
  darTitle: string;
  darSubtitle: string;
  darStep1: string;
  darStep2: string;
  darStep3: string;
  darStep4: string;
  darStep5: string;

  // Make Donation Module
  donBadge: string;
  donTitle: string;
  donSubtitle: string;

  // Annadhanam Module
  annBadge: string;
  annTitle: string;
  annSubtitle: string;
  annPerMealBadge: string;
  annStep1Title: string;
  annAvailable: string;
  annBooked: string;
  annSelected: string;
  annUnavailable: string;
  annStep2Title: string;
  annLunchTitle: string;
  annLunchDesc: string;
  annEveningTitle: string;
  annEveningDesc: string;
  annMealsCountLabel: string;
  annStep3Title: string;
  annNameLabel: string;
  annMobileLabel: string;
  annEmailLabel: string;
  annDedicationLabel: string;
  annTotalAmount: string;
  annReviewBtn: string;
  annSimulateTitle: string;
  annSimulateNotice: string;
  annSimulateBtn: string;
  annReceiptTitle: string;
  annCertSubtitle: string;
  annStatusConfirmed: string;
  annReceiptNo: string;
  annServiceDate: string;
  annMealSlot: string;
  annSponsorName: string;
  annAmountSponsored: string;
  annDedicationNote: string;
  annSankalpamNote: string;
  annPrintBtn: string;
  annBookAnotherBtn: string;

  // Festival Module
  festBadge: string;
  festTitle: string;
  festSubtitle: string;
  festAll: string;
  festMajor: string;
  festUpcoming: string;
  festSpecial: string;
  festTamilCalendar: string;
  festCompleted: string;
  festAllMonths: string;
  festSchedule: string;
  festViewDetailsBtn: string;

  // Live Darisanam Module
  liveBadge: string;
  liveTitle: string;
  liveSubtitle: string;
  liveNow: string;
  liveOffline: string;
  liveViewersCount: string;
  liveResumesAt: string;
  liveAudioOn: string;
  liveMuted: string;
  liveVirtualTitle: string;
  liveVirtualSub: string;
  liveOfferFlowersBtn: string;
  liveLightDeepamBtn: string;
  liveExtinguishDeepamBtn: string;
  liveScheduleTitle: string;
  liveUshakkala: string;
  liveUchikala: string;
  liveSayarakshai: string;
  liveRaakkalam: string;
  livePrayerWallTitle: string;
  livePrayerWallSub: string;
  livePrayerPlaceholder: string;
  liveSendPrayerBtn: string;

  // About Module
  aboutBadge: string;
  aboutHistoryTitle: string;
  aboutSignificanceTitle: string;
  aboutTraditionsTitle: string;
  aboutAnnualTitle: string;
  aboutHeritageTitle: string;
  aboutPhotosTitle: string;
  aboutExploreAnnadhanamBtn: string;

  // Contact Module
  contactOfficeBadge: string;
  contactTitle: string;
  contactSubtitle: string;
  contactAddressTitle: string;
  contactPhoneTitle: string;
  contactEmailTitle: string;
  contactHoursNote: string;
  contactInquiryTitle: string;
  contactInquirySub: string;
  contactNameLabel: string;
  contactPhoneLabel: string;
  contactMsgLabel: string;
  contactSubmitBtn: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;

  // Admin Portal & Dashboard (11 Tabs)
  adminPortalTitle: string;
  adminPortalSub: string;
  adminLoginIdLabel: string;
  adminAirLabel: string;
  adminAirNote: string;
  adminPasswordLabel: string;
  adminSignInBtn: string;
  adminDemoBox: string;
  adminReturnHome: string;
  adminActiveSession: string;
  adminViewPublicSite: string;
  adminSignOut: string;
  adminDashboardTitle: string;
  adminTabCalendar: string;
  adminTabDarisanam: string;
  adminTabDonations: string;
  adminTabAnnadhanam: string;
  adminTabFestivals: string;
  adminTabLiveVideo: string;
  adminTabMedia: string;
  adminTabLocation: string;
  adminTabDeity: string;
  adminTabReceipts: string;
  adminTabSettings: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    templeName: 'Mouna Gurunathar Temple',
    templeSubtitle: 'Arul Tharum Muneeswaran',
    mantraShort: 'Om Mouna Gurunatharaya Namaha',
    moolaMantra: '|| Om Mouna Gurunatharaya Namaha ||',

    navHome: 'Home',
    navCalendar: 'Calendar',
    navDarisanam: 'Book Darisanam',
    navDonation: 'Make Donation',
    navAnnadhanam: 'Annadhanam',
    navFestival: 'Festival Season',
    navLive: 'Live Darisanam View',
    navAbout: 'About Temple',
    navContact: 'Contact',
    navAdminPanel: 'Admin Panel',
    navSignOut: 'Sign Out',

    audioChants: 'Play Sacred Bell & Om Resonance',
    audioMuted: 'Mute Sacred Sound',
    audioPlaying: 'Playing Sacred Resonance',
    announcements: 'Temple Announcements',
    templeAccess: 'TEMPLE OPTIONS & ADMIN',
    adminLogin: 'Admin Panel',
    adminDashboard: 'Admin Dashboard',
    templeHelpDesk: 'Contact & Help Desk',
    switchLang: 'தமிழ்',
    otherLangName: 'தமிழ் (Tamil)',

    heroLiveBadgeLive: 'LIVE STREAM ACTIVE',
    heroLiveBadgeOffline: 'LIVE STREAM UNAVAILABLE',
    watchLiveBtn: 'Live Darisanam View',

    homeModulesTitle: 'Mouna Gurunathar Temple Services',
    homeModulesSubtitle: 'Select any of the six devotee modules below',
    cardCalendarTitle: 'Calendar',
    cardCalendarSub: '2026–2035 Tamil Months, Festivals, Amavasai, Pournami & Pradosham',
    cardCalendarBadge: '2026–2035',
    cardDarisanamTitle: 'Book Darisanam',
    cardDarisanamSub: 'Rolling 7-Day Slot Selection, Capacity View & Request Submission',
    cardDarisanamBadge: '7-Day Window',
    cardDonationTitle: 'Make Donation',
    cardDonationSub: 'Sacred Temple Offerings (₹100, ₹251, ₹501, ₹1,001 or Custom)',
    cardDonationBadge: 'Demo Gateway',
    cardAnnadhanamTitle: 'Annadhanam',
    cardAnnadhanamSub: 'Rolling 1-Month Meal Sponsorship Calendar (₹100 Initial Fee)',
    cardAnnadhanamBadge: '₹100 / Booking',
    cardFestivalTitle: 'Festival Season',
    cardFestivalSub: 'Major Festivals, Special Poojas & Month-Based Filtering',
    cardFestivalBadge: 'Utsavams',
    cardLiveTitle: 'Live Darisanam View',
    cardLiveSub: 'Sanctum Darisanam Player, Live Status & Sacred Offerings',
    cardLiveBadge: 'Sanctum View',

    deityBadge: 'PRESIDING DEITY & TEMPLE HERITAGE',
    deityTitle: 'Mouna Gurunathar',
    deitySubtitle: 'Arul Tharum Muneeswaran',
    deityIntro:
      'Mouna Gurunathar (Arul Tharum Muneeswaran) is worshipped as the serene silent spiritual master and compassionate guardian deity who blesses sincere devotees with inner peace, courage, and protection.',
    deityFeat1Title: 'Mouna Sakthi',
    deityFeat1Sub: 'Sacred silence, clarity & peace of mind',
    deityFeat2Title: 'Arul Tharum Grace',
    deityFeat2Sub: 'Compassionate protection & blessings',
    deityViewDetailsBtn: 'View Details',

    locTitle: 'Temple Location & Darisanam Timings',
    locSubtitle: 'Official address details & visiting hours',
    locOpenInMaps: 'Open in Maps',
    locTimingsTitle: 'Daily Temple Darisanam Timings',
    locMorning: 'Morning',
    locEvening: 'Evening',
    locVerified: 'Verified Temple Location',
    locPendingVerification: 'Address Pending Admin Verification',
    locGetDirections: 'Directions →',

    footerMission:
      'Dedicated to preserving traditional Tamil Nadu temple worship, peaceful darisanam, and devotional Annadhanam service under the grace of Mouna Gurunathar.',
    footerReadHistory: 'Read Mouna Gurunathar Temple Details →',
    footerServicesTitle: 'Temple Modules',
    footerContactTitle: 'Contact Us',
    footerOfficialOffice: '(Temple Office)',
    footerHours: 'Visiting Hours',
    footerCopyright: 'Mouna Gurunathar Temple. All Rights Reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms and Conditions',

    calPanchangamBadge: '2026 – 2035 TEMPLE CALENDAR',
    calTitle: 'Mouna Gurunathar Temple Calendar',
    calSubtitle:
      'Browse Tamil months, verified solar anchors, and estimated Amavasai, Pournami, Pradosham, and festival observances across January 2026 to December 2035.',
    calLegendGold: 'Gold: Major Festivals',
    calLegendBrown: 'Temple Brown: Special Pooja',
    calLegendGreen: 'Green: Regular / Pradosham',
    calLegendRed: 'Crimson: Important / Amavasai',
    calTodayBtn: 'Today',
    calAllEvents: 'All Events',
    calMajorFestivals: 'Major Festivals',
    calSpecialPooja: 'Special Pooja',
    calRegularEvents: 'Regular Observances',
    calImportantDates: 'Important / Amavasai',
    calSun: 'SUN',
    calMon: 'MON',
    calTue: 'TUE',
    calWed: 'WED',
    calThu: 'THU',
    calFri: 'FRI',
    calSat: 'SAT',
    calDateLabel: 'DATE:',
    calTimingsLabel: 'POOJA TIMINGS:',
    calAuspiciousLabel: 'VERIFICATION / TIMING NOTE:',
    calOverviewLabel: 'Description & Spiritual Significance',
    calGuidelinesLabel: 'Verification & Devotee Note:',
    calCloseBtn: 'Close',

    darBadge: '7-DAY ROLLING DARISANAM BOOKING',
    darTitle: 'Book Darisanam — Mouna Gurunathar Temple',
    darSubtitle:
      'Select an eligible date within the rolling seven-day window, choose an available time slot, and submit your darisanam booking request.',
    darStep1: '1. Select Date (7-Day Window)',
    darStep2: '2. Select Time Slot',
    darStep3: '3. Devotee Details',
    darStep4: '4. Review Booking',
    darStep5: '5. Request Status',

    donBadge: 'SACRED TEMPLE OFFERINGS',
    donTitle: 'Make Donation — Mouna Gurunathar Temple',
    donSubtitle:
      'Support daily poojas, temple maintenance, and charitable seva through the transparent demonstration donation workflow.',

    annBadge: 'SACRED ANNADHANAM SEVA',
    annTitle: 'Annadhanam Sponsorship — Mouna Gurunathar Temple',
    annSubtitle:
      'Sponsor holy Annadhanam meals served to visiting devotees. Select an available date from the rolling one-month calendar.',
    annPerMealBadge: 'Initial Sponsorship: ₹100 per Booking / Meal',
    annStep1Title: '1. Select Date (Rolling 1-Month Calendar)',
    annAvailable: 'Available',
    annBooked: 'Fully Booked',
    annSelected: 'Selected',
    annUnavailable: 'Unavailable',
    annStep2Title: '2. Select Meal Slot & Quantity',
    annLunchTitle: 'Maha Annadhanam Lunch',
    annLunchDesc: 'Afternoon Prasadam Service',
    annEveningTitle: 'Evening Sacred Prasadam',
    annEveningDesc: 'Evening Temple Prasadam Service',
    annMealsCountLabel: 'Number of Sponsorship Units',
    annStep3Title: '3. Devotee Information',
    annNameLabel: 'Devotee Name *',
    annMobileLabel: 'Mobile Number *',
    annEmailLabel: 'Email Address *',
    annDedicationLabel: 'Optional Dedication Message',
    annTotalAmount: 'Total Sponsorship Amount:',
    annReviewBtn: 'Review Sponsorship',
    annSimulateTitle: 'Demonstration Payment Interface',
    annSimulateNotice:
      'FRONTEND PROTOTYPE ONLY: No real payment is processed and no real money is collected. An official-format receipt is generated only when payment status is verified.',
    annSimulateBtn: 'Complete Demo Payment (Verified)',
    annReceiptTitle: 'MOUNA GURUNATHAR TEMPLE',
    annCertSubtitle: 'Official-Format Demonstration Receipt',
    annStatusConfirmed: 'PAYMENT STATUS: VERIFIED (DEMO)',
    annReceiptNo: 'RECEIPT NUMBER:',
    annServiceDate: 'DATE:',
    annMealSlot: 'PURPOSE / SLOT:',
    annSponsorName: 'DEVOTEE NAME:',
    annAmountSponsored: 'AMOUNT:',
    annDedicationNote: 'DEDICATION NOTE:',
    annSankalpamNote:
      'Prototype notice: Private devotee receipt details are restricted to this session and authorized administrators.',
    annPrintBtn: 'Print / Save as PDF',
    annBookAnotherBtn: 'Sponsor Another Date',

    festBadge: 'TEMPLE FESTIVALS & UTSAVAMS',
    festTitle: 'Festival Season — Mouna Gurunathar Temple',
    festSubtitle:
      'Explore temple festivals, special poojas, and Tamil calendar observances. Filter by festival category or Tamil month.',
    festAll: 'All Categories',
    festMajor: 'Major Temple Festivals',
    festUpcoming: 'Upcoming Festivals',
    festSpecial: 'Special Pooja',
    festTamilCalendar: 'Tamil Calendar Events',
    festCompleted: 'Completed Festivals',
    festAllMonths: 'All Months',
    festSchedule: 'Pooja Timings',
    festViewDetailsBtn: 'View Details',

    liveBadge: 'SANCTUM STREAM VIEW',
    liveTitle: 'Live Darisanam View — Mouna Gurunathar',
    liveSubtitle: 'Mouna Gurunathar Sanctum Feed & Status',
    liveNow: 'LIVE STREAM ACTIVE',
    liveOffline: 'LIVE STREAM UNAVAILABLE',
    liveViewersCount: 'Watching Now',
    liveResumesAt: 'Demo player active until real stream is connected',
    liveAudioOn: 'Audio On',
    liveMuted: 'Muted',
    liveVirtualTitle: 'Devotional Offerings (Demo)',
    liveVirtualSub: 'Express devotion interactively during your darisanam session.',
    liveOfferFlowersBtn: 'Offer Flowers',
    liveLightDeepamBtn: 'Light Deepam',
    liveExtinguishDeepamBtn: 'Dim Deepam',
    liveScheduleTitle: 'Daily Darisanam Schedule (Reference)',
    liveUshakkala: 'Morning Worship',
    liveUchikala: 'Midday Pooja',
    liveSayarakshai: 'Evening Sayarakshai',
    liveRaakkalam: 'Night Deeparadhanai',
    livePrayerWallTitle: 'Personal Prayer Notes (Local Session)',
    livePrayerWallSub: 'Write a personal prayer note during your session (stored locally only).',
    livePrayerPlaceholder: 'Write a silent prayer note...',
    liveSendPrayerBtn: 'Add Prayer Note',

    aboutBadge: 'MOUNA GURUNATHAR DETAILS & TEMPLE HERITAGE',
    aboutHistoryTitle: 'Temple History',
    aboutSignificanceTitle: 'Religious Significance',
    aboutTraditionsTitle: 'Important Traditions',
    aboutAnnualTitle: 'Annual Celebrations',
    aboutHeritageTitle: 'Temple Heritage',
    aboutPhotosTitle: 'Historical Photographs & Temple Gallery',
    aboutExploreAnnadhanamBtn: 'Go to Annadhanam Seva',

    contactOfficeBadge: 'TEMPLE OFFICE & HELP DESK',
    contactTitle: 'Contact Mouna Gurunathar Temple',
    contactSubtitle:
      'View current temple office details (editable placeholders until verified) or submit a general inquiry.',
    contactAddressTitle: 'Temple Address',
    contactPhoneTitle: 'Telephone',
    contactEmailTitle: 'Official Email',
    contactHoursNote: 'Hours subject to temple office confirmation',
    contactInquiryTitle: 'Send a Devotee Inquiry (Demo)',
    contactInquirySub: 'Prototype inquiry form — connect backend API to route messages to temple staff.',
    contactNameLabel: 'Devotee Name',
    contactPhoneLabel: 'Mobile Number',
    contactMsgLabel: 'Message / Inquiry',
    contactSubmitBtn: 'Submit Inquiry',
    contactSuccessTitle: 'Inquiry Recorded (Demo)',
    contactSuccessDesc:
      'Your inquiry was recorded in this frontend session. Backend email/API integration is required to deliver messages to temple administration.',

    adminPortalTitle: 'Mouna Gurunathar Admin Panel',
    adminPortalSub: 'Authorized Temple Administration (Frontend Prototype)',
    adminLoginIdLabel: 'Administrator Login ID *',
    adminAirLabel: 'AIR Number Identifier *',
    adminAirNote: '* Subject to clarification & backend verification. AIR number alone cannot authorize access.',
    adminPasswordLabel: 'Password *',
    adminSignInBtn: 'Sign In to Admin Panel',
    adminDemoBox: 'Prototype Demo Authentication Setup',
    adminReturnHome: '← Return to Mouna Gurunathar Home',
    adminActiveSession: 'Admin Session Active (Demo)',
    adminViewPublicSite: 'View Public Site',
    adminSignOut: 'Logout',
    adminDashboardTitle: 'Mouna Gurunathar Temple Admin Dashboard',
    adminTabCalendar: '1. Calendar',
    adminTabDarisanam: '2. Darisanam',
    adminTabDonations: '3. Donations',
    adminTabAnnadhanam: '4. Annadhanam',
    adminTabFestivals: '5. Festivals',
    adminTabLiveVideo: '6. Live Darisanam',
    adminTabMedia: '7. Images & Videos',
    adminTabLocation: '8. Location',
    adminTabDeity: '9. Mouna Gurunathar & About',
    adminTabReceipts: '10. Receipts',
    adminTabSettings: '11. Admin Settings'
  },

  ta: {
    templeName: 'மௌன குருநாதர் திருக்கோயில்',
    templeSubtitle: 'அருள் தரும் முனீஸ்வரன்',
    mantraShort: 'ஓம் மௌன குருநாதராய நமஹ',
    moolaMantra: '|| ஓம் மௌன குருநாதராய நமஹ ||',

    navHome: 'முகப்பு',
    navCalendar: 'நாள்காட்டி',
    navDarisanam: 'தரிசனம் முன்பதிவு',
    navDonation: 'நன்கொடை',
    navAnnadhanam: 'அன்னதானம்',
    navFestival: 'திருவிழா காலங்கள்',
    navLive: 'நேரலை தரிசனம்',
    navAbout: 'கோயில் விவரங்கள்',
    navContact: 'தொடர்புக்கு',
    navAdminPanel: 'நிர்வாக பலகை',
    navSignOut: 'வெளியேறு',

    audioChants: 'திருக்கோயில் மணி & ஓம் நாதம் ஒலிக்க',
    audioMuted: 'ஒலியை நிறுத்து',
    audioPlaying: 'பக்தி நாதம் ஒலிக்கிறது',
    announcements: 'கோயில் அறிவிப்புகள்',
    templeAccess: 'கூடுதல் வசதிகள் & நிர்வாகம்',
    adminLogin: 'நிர்வாக பலகை',
    adminDashboard: 'நிர்வாக கட்டுப்பாட்டு மையம்',
    templeHelpDesk: 'தொடர்பு & உதவி மையம்',
    switchLang: 'ENG',
    otherLangName: 'English',

    heroLiveBadgeLive: 'நேரலை ஒளிபரப்பு இயக்கத்தில்',
    heroLiveBadgeOffline: 'நேரலை தற்போது இல்லை',
    watchLiveBtn: 'நேரலை தரிசனம்',

    homeModulesTitle: 'மௌன குருநாதர் திருக்கோயில் சேவைகள்',
    homeModulesSubtitle: 'கீழ்கண்ட ஆறு முக்கிய சேவைகளில் ஒன்றைத் தேர்வு செய்க',
    cardCalendarTitle: 'நாள்காட்டி',
    cardCalendarSub: '2026–2035 தமிழ் மாதங்கள், திருவிழாக்கள், அமாவாசை, பௌர்ணமி & பிரதோஷம்',
    cardCalendarBadge: '2026–2035',
    cardDarisanamTitle: 'தரிசனம் முன்பதிவு',
    cardDarisanamSub: '7 நாள் தரிசன நேரப் பதிவு, இருக்கை விவரம் மற்றும் கோரிக்கை',
    cardDarisanamBadge: '7 நாட்கள்',
    cardDonationTitle: 'நன்கொடை வழங்க',
    cardDonationSub: '₹100, ₹251, ₹501, ₹1,001 அல்லது விருப்பத் தொகை காணிக்கை',
    cardDonationBadge: 'மாதிரி சேவை',
    cardAnnadhanamTitle: 'அன்னதானம்',
    cardAnnadhanamSub: 'ஒரு மாத அன்னதான நாள்காட்டி (தொடக்கக் கட்டணம் ₹100)',
    cardAnnadhanamBadge: '₹100 / பதிவு',
    cardFestivalTitle: 'திருவிழா காலங்கள்',
    cardFestivalSub: 'பெருந்திருவிழாக்கள், சிறப்பு பூசைகள் & மாத வாரியான தேடல்',
    cardFestivalBadge: 'உற்சவங்கள்',
    cardLiveTitle: 'நேரலை தரிசனம்',
    cardLiveSub: 'சந்நிதி காட்சி, நேரலை நிலை & பக்தி வழிபாடு',
    cardLiveBadge: 'சந்நிதி காட்சி',

    deityBadge: 'மூலவர் & திருக்கோயில் சிறப்பு',
    deityTitle: 'மௌன குருநாதர்',
    deitySubtitle: 'அருள் தரும் முனீஸ்வரன்',
    deityIntro:
      'மௌன குருநாதர் (அருள் தரும் முனீஸ்வரன்) அமைதியின் திருவுருவமாகவும், பக்தர்களுக்கு மன அமைதி, தைரியம் மற்றும் தெய்வீகக் காவல் அருளும் ஞான குருவாகவும் போற்றப்படுகிறார்.',
    deityFeat1Title: 'மௌன சக்தி',
    deityFeat1Sub: 'ஆன்மீக அமைதி & மனத் தெளிவு',
    deityFeat2Title: 'அருள் தரும் கருணை',
    deityFeat2Sub: 'பக்தர்களைக் காக்கும் தெய்வீக அருள்',
    deityViewDetailsBtn: 'முழு விவரம் காண்க',

    locTitle: 'திருக்கோயில் அமைவிடம் & தரிசன நேரம்',
    locSubtitle: 'அதிகாரப்பூர்வ முகவரி மற்றும் வழிபாட்டு நேரங்கள்',
    locOpenInMaps: 'வரைபடத்தில் பார்க்க',
    locTimingsTitle: 'தினசரி தரிசன நேரங்கள்',
    locMorning: 'காலை',
    locEvening: 'மாலை',
    locVerified: 'சரிபார்க்கப்பட்ட கோயில் முகவரி',
    locPendingVerification: 'முகவரி நிர்வாக சரிபார்ப்பில் உள்ளது',
    locGetDirections: 'வழித்தடம் →',

    footerMission:
      'மௌன குருநாதர் திருவருளால் தமிழ்நாடு பாரம்பரிய கோயில் வழிபாடு, அமைதியான தரிசனம் மற்றும் அன்னதான சேவையைப் பேணுகிறது.',
    footerReadHistory: 'மௌன குருநாதர் திருக்கோயில் வரலாறு வாசிக்க →',
    footerServicesTitle: 'கோயில் சேவைகள்',
    footerContactTitle: 'தொடர்பு கொள்ள',
    footerOfficialOffice: '(கோயில் அலுவலகம்)',
    footerHours: 'தரிசன நேரம்',
    footerCopyright: 'மௌன குருநாதர் திருக்கோயில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    footerPrivacy: 'தனியுரிமைக் கொள்கை',
    footerTerms: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',

    calPanchangamBadge: '2026 – 2035 கோயில் நாள்காட்டி',
    calTitle: 'மௌன குருநாதர் திருக்கோயில் நாள்காட்டி',
    calSubtitle:
      'ஜனவரி 2026 முதல் டிசம்பர் 2035 வரை தமிழ் மாதங்கள், திருவிழாக்கள், அமாவாசை, பௌர்ணமி மற்றும் பிரதோஷ தினங்களைக் காண்க.',
    calLegendGold: 'தங்கம்: முக்கிய திருவிழாக்கள்',
    calLegendBrown: 'கோயில் பழுப்பு: சிறப்பு பூசைகள்',
    calLegendGreen: 'பச்சை: வழக்கமான / பிரதோஷம்',
    calLegendRed: 'சிவப்பு: விரதம் / அமாவாசை',
    calTodayBtn: 'இன்று',
    calAllEvents: 'அனைத்தும்',
    calMajorFestivals: 'முக்கிய திருவிழாக்கள்',
    calSpecialPooja: 'சிறப்பு பூசைகள்',
    calRegularEvents: 'வழக்கமான நிகழ்வுகள்',
    calImportantDates: 'முக்கிய / அமாவாசை',
    calSun: 'ஞாயி',
    calMon: 'திங்',
    calTue: 'செவ்',
    calWed: 'புத',
    calThu: 'வியா',
    calFri: 'வெள்',
    calSat: 'சனி',
    calDateLabel: 'தேதி:',
    calTimingsLabel: 'பூசை நேரம்:',
    calAuspiciousLabel: 'சரிபார்ப்பு / நேரக் குறிப்பு:',
    calOverviewLabel: 'விளக்கம் & ஆன்மீகச் சிறப்பு',
    calGuidelinesLabel: 'பக்தர்கள் & சரிபார்ப்புக் குறிப்பு:',
    calCloseBtn: 'மூடுக',

    darBadge: '7 நாள் தரிசனம் முன்பதிவு',
    darTitle: 'தரிசனம் முன்பதிவு — மௌன குருநாதர் திருக்கோயில்',
    darSubtitle:
      'அடுத்த 7 நாட்களில் கிடைக்கும் தேதியைத் தேர்ந்தெடுத்து, தரிசன நேரம் மற்றும் பக்தர் விவரங்களைச் சமர்ப்பிக்கவும்.',
    darStep1: '1. தேதி தேர்வு (7 நாட்கள்)',
    darStep2: '2. நேர இடைவெளி தேர்வு',
    darStep3: '3. பக்தர் விவரங்கள்',
    darStep4: '4. விவர சரிபார்ப்பு',
    darStep5: '5. பதிவு நிலை',

    donBadge: 'புனித திருக்கோயில் நன்கொடை',
    donTitle: 'நன்கொடை வழங்க — மௌன குருநாதர் திருக்கோயில்',
    donSubtitle:
      'தினசரி பூசைகள் மற்றும் திருக்கோயில் திருப்பணிகளுக்கு மாதிரி நன்கொடை முறை மூலம் பங்களிக்கலாம்.',

    annBadge: 'புனித அன்னதான சேவை',
    annTitle: 'அன்னதான சேவை — மௌன குருநாதர் திருக்கோயில்',
    annSubtitle:
      'ஒரு மாத சுழலும் நாள்காட்டியில் கிடைக்கும் தேதியைத் தேர்வு செய்து அன்னதான சேவைக்குப் பதிவு செய்யுங்கள்.',
    annPerMealBadge: 'தொடக்கக் கட்டணம்: ஒரு பதிவுக்கு ₹100',
    annStep1Title: '1. தேதி தேர்வு (சுழலும் 1 மாத நாள்காட்டி)',
    annAvailable: 'கிடைக்கிறது',
    annBooked: 'நிரம்பியது',
    annSelected: 'தேர்ந்தெடுக்கப்பட்டது',
    annUnavailable: 'கிடைக்காது',
    annStep2Title: '2. உணவுப் பொழுது & எண்ணிக்கை',
    annLunchTitle: 'மதிய மகா அன்னதானம்',
    annLunchDesc: 'மதிய அன்னதான சேவை',
    annEveningTitle: 'மாலை பிரசாத சேவை',
    annEveningDesc: 'மாலை நேர பிரசாத விநியோகம்',
    annMealsCountLabel: 'பதிவு எண்ணிக்கை',
    annStep3Title: '3. பக்தர் விவரங்கள்',
    annNameLabel: 'பக்தர் பெயர் *',
    annMobileLabel: 'அலைபேசி எண் *',
    annEmailLabel: 'மின்னஞ்சல் *',
    annDedicationLabel: 'விருப்ப அர்ப்பணிப்புச் செய்தி',
    annTotalAmount: 'மொத்த தொகை:',
    annReviewBtn: 'விவரங்களைச் சரிபார்',
    annSimulateTitle: 'மாதிரி கட்டண இடைமுகம்',
    annSimulateNotice:
      'முன்மாதிரி அறிவிப்பு: இது இணையவழி மாதிரி மட்டுமே. உண்மையான பணம் வசூலிக்கப்படாது. கட்டணம் உறுதிப்படுத்தப்பட்ட பின்பே ரசீது வழங்கப்படும்.',
    annSimulateBtn: 'மாதிரி கட்டணத்தை உறுதிசெய் (சரிபார்க்கப்பட்டது)',
    annReceiptTitle: 'மௌன குருநாதர் திருக்கோயில்',
    annCertSubtitle: 'மாதிரி சேவை & நன்கொடை ரசீது',
    annStatusConfirmed: 'கட்டண நிலை: சரிபார்க்கப்பட்டது (மாதிரி)',
    annReceiptNo: 'ரசீது எண்:',
    annServiceDate: 'தேதி:',
    annMealSlot: 'சேவை / நோக்கம்:',
    annSponsorName: 'பக்தர் பெயர்:',
    annAmountSponsored: 'தொகை:',
    annDedicationNote: 'குறிப்பு:',
    annSankalpamNote:
      'தனியுரிமைக் குறிப்பு: பக்தர்களின் ரசீது விவரங்கள் பாதுகாப்பாக வைக்கப்பட்டுள்ளன.',
    annPrintBtn: 'அச்சிடு / PDF பதிவிறக்கம்',
    annBookAnotherBtn: 'மற்றொரு தேதி பதிவு செய்',

    festBadge: 'திருவிழா காலங்கள் & உற்சவங்கள்',
    festTitle: 'திருவிழா காலங்கள் — மௌன குருநாதர் திருக்கோயில்',
    festSubtitle:
      'திருக்கோயில் திருவிழாக்கள், சிறப்பு பூசைகள் மற்றும் தமிழ் மாத விசேஷங்களைப் பிரிவு மற்றும் மாத அடிப்படையில் காண்க.',
    festAll: 'அனைத்து பிரிவுகள்',
    festMajor: 'முக்கிய திருவிழாக்கள்',
    festUpcoming: 'வரவிருக்கும் திருவிழாக்கள்',
    festSpecial: 'சிறப்பு பூசை',
    festTamilCalendar: 'தமிழ் நாள்காட்டி நிகழ்வுகள்',
    festCompleted: 'நிறைவுற்ற திருவிழாக்கள்',
    festAllMonths: 'அனைத்து மாதங்களும்',
    festSchedule: 'பூசை நேரங்கள்',
    festViewDetailsBtn: 'விவரம் காண்க',

    liveBadge: 'சந்நிதி நேரலை காட்சி',
    liveTitle: 'நேரலை தரிசனம் — மௌன குருநாதர்',
    liveSubtitle: 'மௌன குருநாதர் சந்நிதி நேரலை & மாதிரி காட்சி',
    liveNow: 'நேரலை ஒளிபரப்பாகிறது',
    liveOffline: 'நேரலை தற்போது இல்லை',
    liveViewersCount: 'பக்தர்கள் காண்கின்றனர்',
    liveResumesAt: 'நேரலை இணைப்பு சேர்க்கப்படும் வரை மாதிரி காட்சி காட்டப்படுகிறது',
    liveAudioOn: 'ஒலி இயக்கத்தில்',
    liveMuted: 'ஒலி முடக்கப்பட்டது',
    liveVirtualTitle: 'பக்தி வழிபாடு (மாதிரி)',
    liveVirtualSub: 'நேரலை தரிசனத்தின் போது மலர் மற்றும் தீப வழிபாடு செய்யுங்கள்.',
    liveOfferFlowersBtn: 'மலர் அஞ்சலி',
    liveLightDeepamBtn: 'தீபம் ஏற்றுக',
    liveExtinguishDeepamBtn: 'தீபம் தணிக்க',
    liveScheduleTitle: 'தினசரி பூசை நேரங்கள் (குறிப்பு)',
    liveUshakkala: 'காலை வழிபாடு',
    liveUchikala: 'உச்சிகால பூசை',
    liveSayarakshai: 'சாயரட்சை பூசை',
    liveRaakkalam: 'இரவு தீபாராதனை',
    livePrayerWallTitle: 'தனிப்பட்ட பிரார்த்தனைக் குறிப்பு',
    livePrayerWallSub: 'உங்களது பிரார்த்தனைக் குறிப்பை இங்கு பதிவு செய்யலாம் (உங்கள் உலாவியில் மட்டும் சேமிக்கப்படும்).',
    livePrayerPlaceholder: 'உங்கள் பிரார்த்தனையை எழுதுங்கள்...',
    liveSendPrayerBtn: 'குறிப்பு சேர்',

    aboutBadge: 'மௌன குருநாதர் விவரங்கள் & கோயில் மரபு',
    aboutHistoryTitle: 'திருக்கோயில் வரலாறு',
    aboutSignificanceTitle: 'ஆன்மீக முக்கியத்துவம்',
    aboutTraditionsTitle: 'முக்கிய மரபுகள்',
    aboutAnnualTitle: 'வருடாந்திர கொண்டாட்டங்கள்',
    aboutHeritageTitle: 'திருக்கோயில் பாரம்பரியம்',
    aboutPhotosTitle: 'வரலாற்றுப் புகைப்படங்கள் & திருக்கோயில் காட்சியகம்',
    aboutExploreAnnadhanamBtn: 'அன்னதான சேவைக்குச் செல்ல',

    contactOfficeBadge: 'திருக்கோயில் அலுவலகம்',
    contactTitle: 'மௌன குருநாதர் திருக்கோயில் தொடர்பு',
    contactSubtitle:
      'திருக்கோயில் முகவரி, தொலைபேசி (நிர்வாகம் உறுதிப்படுத்தும் வரை மாதிரி இடநிரப்பிகள்) மற்றும் விசாரணை படிவம்.',
    contactAddressTitle: 'திருக்கோயில் முகவரி',
    contactPhoneTitle: 'தொலைபேசி',
    contactEmailTitle: 'அதிகாரப்பூர்வ மின்னஞ்சல்',
    contactHoursNote: 'அலுவலக நேரம் உறுதிப்படுத்தலுக்கு உட்பட்டது',
    contactInquiryTitle: 'பக்தர் விசாரணைப் படிவம் (மாதிரி)',
    contactInquirySub: 'முன்மாதிரி படிவம் — நேரடி அனுப்புதலுக்கு பின்புல சேவை இணைப்பு தேவை.',
    contactNameLabel: 'பக்தர் பெயர்',
    contactPhoneLabel: 'அலைபேசி எண்',
    contactMsgLabel: 'செய்தி / கேள்வி',
    contactSubmitBtn: 'சமர்ப்பி',
    contactSuccessTitle: 'செய்தி பதிவு செய்யப்பட்டது (மாதிரி)',
    contactSuccessDesc:
      'உங்கள் செய்தி இந்த முன்மாதிரி அமர்வில் பதிவு செய்யப்பட்டது. கோயில் அலுவலகத்திற்குச் சேர பின்புல API இணைப்பு அவசியம்.',

    adminPortalTitle: 'மௌன குருநாதர் நிர்வாக பலகை',
    adminPortalSub: 'அங்கீகரிக்கப்பட்ட நிர்வாகிகள் உள்நுழைவு (முன்மாதிரி)',
    adminLoginIdLabel: 'நிர்வாகி உள்நுழைவு ஐடி *',
    adminAirLabel: 'AIR அடையாள எண் *',
    adminAirNote: '* சரிபார்ப்பு மற்றும் தெளிவுபடுத்தலுக்கு உட்பட்டது. AIR எண் மட்டுமே உள்நுழைவுக்குப் போதாது.',
    adminPasswordLabel: 'கடவுச்சொல் *',
    adminSignInBtn: 'நிர்வாக பலகையில் உள்நுழைக',
    adminDemoBox: 'முன்மாதிரி உள்நுழைவு அமைப்பு',
    adminReturnHome: '← மௌன குருநாதர் முகப்புக்குத் திரும்புக',
    adminActiveSession: 'நிர்வாக அமர்வு இயக்கத்தில் (மாதிரி)',
    adminViewPublicSite: 'பொதுத் தளத்தைப் பார்க்க',
    adminSignOut: 'வெளியேறு',
    adminDashboardTitle: 'மௌன குருநாதர் திருக்கோயில் நிர்வாக மையம்',
    adminTabCalendar: '1. நாள்காட்டி',
    adminTabDarisanam: '2. தரிசனம்',
    adminTabDonations: '3. நன்கொடைகள்',
    adminTabAnnadhanam: '4. அன்னதானம்',
    adminTabFestivals: '5. திருவிழாக்கள்',
    adminTabLiveVideo: '6. நேரலை',
    adminTabMedia: '7. படங்கள் & வீடியோ',
    adminTabLocation: '8. அமைவிடம்',
    adminTabDeity: '9. மௌன குருநாதர் விவரம்',
    adminTabReceipts: '10. ரசீதுகள்',
    adminTabSettings: '11. நிர்வாக அமைப்புகள்'
  }
};
