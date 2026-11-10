import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import './App.css';
import {
  Calendar,
  CalendarCheck,
  HeartHandshake,
  UtensilsCrossed,
  Sparkles,
  Video
} from 'lucide-react';
import {
  AdminSettingsConfig,
  AnnadhanamBooking,
  AnnadhanamConfig,
  CalendarEvent,
  DarisanamBooking,
  DarisanamSlotTemplate,
  DeityInfo,
  DonationRecord,
  FestivalItem,
  HeroMediaItem,
  LiveStreamConfig,
  PageView,
  TempleAnnouncement,
  TempleLocationConfig
} from './types';
import {
  createInitialAnnadhanamBookings,
  createInitialAnnadhanamConfig,
  createInitialDarisanamBookings,
  generateFullTenYearCalendar,
  getStoredData,
  initialAdminSettings,
  initialAnnouncements,
  initialDarisanamSlots,
  initialDeityInfo,
  initialDonations,
  initialFestivals,
  initialHeroSlides,
  initialLiveStreamConfig,
  initialLocationConfig,
  resetAllToFactoryDefaults,
  setStoredData,
  STORAGE_KEYS
} from './data/mockData';
import { Language, translations } from './translations';

import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ModuleCard } from './components/ModuleCard';
import { DeityDetailsSection } from './components/DeityDetailsSection';
import { TempleLocationSection } from './components/TempleLocationSection';
import { Footer } from './components/Footer';
import { LotusOrnament } from './components/LotusOrnament';
import { NotificationsModal } from './components/NotificationsModal';

// Code-split sub-modules for fast initial homepage load speed
const CalendarModule = lazy(() =>
  import('./components/CalendarModule').then((m) => ({ default: m.CalendarModule }))
);
const DarisanamModule = lazy(() =>
  import('./components/DarisanamModule').then((m) => ({ default: m.DarisanamModule }))
);
const DonationModule = lazy(() =>
  import('./components/DonationModule').then((m) => ({ default: m.DonationModule }))
);
const AnnadhanamModule = lazy(() =>
  import('./components/AnnadhanamModule').then((m) => ({ default: m.AnnadhanamModule }))
);
const FestivalModule = lazy(() =>
  import('./components/FestivalModule').then((m) => ({ default: m.FestivalModule }))
);
const LiveDarisanamModule = lazy(() =>
  import('./components/LiveDarisanamModule').then((m) => ({ default: m.LiveDarisanamModule }))
);
const AboutModule = lazy(() =>
  import('./components/AboutModule').then((m) => ({ default: m.AboutModule }))
);
const ContactModule = lazy(() =>
  import('./components/ContactModule').then((m) => ({ default: m.ContactModule }))
);
const PrivacyPolicyView = lazy(() =>
  import('./components/LegalPages').then((m) => ({ default: m.PrivacyPolicyView }))
);
const TermsConditionsView = lazy(() =>
  import('./components/LegalPages').then((m) => ({ default: m.TermsConditionsView }))
);
const AdminLogin = lazy(() =>
  import('./components/AdminLogin').then((m) => ({ default: m.AdminLogin }))
);
const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);

const VALID_PAGES = new Set<PageView>([
  'home',
  'calendar',
  'darisanam',
  'donation',
  'annadhanam',
  'festival',
  'live',
  'about',
  'contact',
  'privacy',
  'terms',
  'admin-login',
  'admin-dashboard'
]);

function readPageFromHash(): PageView {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '').trim() as PageView;
    if (VALID_PAGES.has(raw)) {
      return raw === 'admin-dashboard' ? 'admin-login' : raw;
    }
  } catch {
    // ignore
  }
  return 'home';
}

export function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => readPageFromHash());
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const isAdminLoggedInRef = useRef<boolean>(false);

  const [language, setLanguage] = useState<Language>(() =>
    getStoredData<Language>(STORAGE_KEYS.LANGUAGE, 'en')
  );
  const [resetVersion, setResetVersion] = useState<number>(0);
  const t = translations[language];

  const [events, setEvents] = useState<CalendarEvent[]>(() =>
    getStoredData(STORAGE_KEYS.CALENDAR_EVENTS, generateFullTenYearCalendar())
  );
  const [darisanamSlots, setDarisanamSlots] = useState<DarisanamSlotTemplate[]>(() =>
    getStoredData(STORAGE_KEYS.DARISANAM_SLOTS, initialDarisanamSlots)
  );
  const [darisanamBookings, setDarisanamBookings] = useState<DarisanamBooking[]>(() =>
    getStoredData(STORAGE_KEYS.DARISANAM_BOOKINGS, createInitialDarisanamBookings())
  );
  const [donations, setDonations] = useState<DonationRecord[]>(() =>
    getStoredData(STORAGE_KEYS.DONATIONS, initialDonations)
  );
  const [annadhanamBookings, setAnnadhanamBookings] = useState<AnnadhanamBooking[]>(() =>
    getStoredData(STORAGE_KEYS.ANNADHANAM_BOOKINGS, createInitialAnnadhanamBookings())
  );
  const [annadhanamConfig, setAnnadhanamConfig] = useState<AnnadhanamConfig>(() =>
    getStoredData(STORAGE_KEYS.ANNADHANAM_CONFIG, createInitialAnnadhanamConfig())
  );
  const [festivals, setFestivals] = useState<FestivalItem[]>(() =>
    getStoredData(STORAGE_KEYS.FESTIVALS, initialFestivals)
  );
  const [locationConfig, setLocationConfig] = useState<TempleLocationConfig>(() =>
    getStoredData(STORAGE_KEYS.LOCATION_CONFIG, initialLocationConfig)
  );
  const [liveStreamConfig, setLiveStreamConfig] = useState<LiveStreamConfig>(() =>
    getStoredData(STORAGE_KEYS.LIVE_STREAM_CONFIG, initialLiveStreamConfig)
  );
  const [heroSlides, setHeroSlides] = useState<HeroMediaItem[]>(() =>
    getStoredData(STORAGE_KEYS.HERO_SLIDES, initialHeroSlides)
  );
  const [deityInfo, setDeityInfo] = useState<DeityInfo>(() =>
    getStoredData(STORAGE_KEYS.DEITY_INFO, initialDeityInfo)
  );
  const [announcements, setAnnouncements] = useState<TempleAnnouncement[]>(() =>
    getStoredData(STORAGE_KEYS.ANNOUNCEMENTS, initialAnnouncements)
  );
  const [adminSettings, setAdminSettings] = useState<AdminSettingsConfig>(() =>
    getStoredData(STORAGE_KEYS.ADMIN_SETTINGS, initialAdminSettings)
  );

  // Sync URL hash back/forward navigation
  useEffect(() => {
    const onHashChange = () => {
      const target = window.location.hash.replace(/^#\/?/, '').trim() as PageView;
      if (VALID_PAGES.has(target)) {
        if (target === 'admin-dashboard' && !isAdminLoggedInRef.current) {
          setCurrentPage('admin-login');
        } else {
          setCurrentPage(target);
        }
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Persist to localStorage
  useEffect(() => setStoredData(STORAGE_KEYS.LANGUAGE, language), [language]);
  useEffect(() => setStoredData(STORAGE_KEYS.CALENDAR_EVENTS, events), [events]);
  useEffect(() => setStoredData(STORAGE_KEYS.DARISANAM_SLOTS, darisanamSlots), [darisanamSlots]);
  useEffect(() => setStoredData(STORAGE_KEYS.DARISANAM_BOOKINGS, darisanamBookings), [darisanamBookings]);
  useEffect(() => setStoredData(STORAGE_KEYS.DONATIONS, donations), [donations]);
  useEffect(() => setStoredData(STORAGE_KEYS.ANNADHANAM_BOOKINGS, annadhanamBookings), [annadhanamBookings]);
  useEffect(() => setStoredData(STORAGE_KEYS.ANNADHANAM_CONFIG, annadhanamConfig), [annadhanamConfig]);
  useEffect(() => setStoredData(STORAGE_KEYS.FESTIVALS, festivals), [festivals]);
  useEffect(() => setStoredData(STORAGE_KEYS.LOCATION_CONFIG, locationConfig), [locationConfig]);
  useEffect(() => setStoredData(STORAGE_KEYS.LIVE_STREAM_CONFIG, liveStreamConfig), [liveStreamConfig]);
  useEffect(() => setStoredData(STORAGE_KEYS.HERO_SLIDES, heroSlides), [heroSlides]);
  useEffect(() => setStoredData(STORAGE_KEYS.DEITY_INFO, deityInfo), [deityInfo]);
  useEffect(() => setStoredData(STORAGE_KEYS.ANNOUNCEMENTS, announcements), [announcements]);
  useEffect(() => setStoredData(STORAGE_KEYS.ADMIN_SETTINGS, adminSettings), [adminSettings]);

  const handleNavigate = (page: PageView) => {
    const resolved = page === 'admin-dashboard' && !isAdminLoggedIn ? 'admin-login' : page;
    setCurrentPage(resolved);
    try {
      const targetHash = resolved === 'home' ? '#/' : `#/${resolved}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    } catch {
      // ignore hash restrictions
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAllAnnouncementsAsRead = () => {
    setAnnouncements((prev) => prev.map((a) => ({ ...a, isNew: false })));
  };

  const handleAdminLoginSuccess = () => {
    isAdminLoggedInRef.current = true;
    setIsAdminLoggedIn(true);
    setCurrentPage('admin-dashboard');
    try {
      window.location.hash = '#/admin-dashboard';
    } catch {
      // ignore
    }
  };

  const handleAdminLogout = () => {
    isAdminLoggedInRef.current = false;
    setIsAdminLoggedIn(false);
    handleNavigate('home');
  };

  const handleResetFactoryData = () => {
    resetAllToFactoryDefaults();
    setEvents(generateFullTenYearCalendar());
    setDarisanamSlots(initialDarisanamSlots);
    setDarisanamBookings(createInitialDarisanamBookings());
    setDonations(initialDonations);
    setAnnadhanamBookings(createInitialAnnadhanamBookings());
    setAnnadhanamConfig(createInitialAnnadhanamConfig());
    setFestivals(initialFestivals);
    setLocationConfig(initialLocationConfig);
    setLiveStreamConfig(initialLiveStreamConfig);
    setHeroSlides(initialHeroSlides);
    setDeityInfo(initialDeityInfo);
    setAnnouncements(initialAnnouncements);
    setAdminSettings(initialAdminSettings);
    setResetVersion((v) => v + 1);
  };

  const moduleLoadingFallback = (
    <div style={{ maxWidth: '680px', margin: '40px auto', padding: '24px', textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          color: 'var(--color-temple-brown)',
          fontWeight: 700
        }}
      >
        Loading Mouna Gurunathar Temple Module...
      </div>
    </div>
  );

  return (
    <div
      className="temple-app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-main-bg)'
      }}
    >
      {/* 1. Temple Header and Navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        announcements={announcements}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onAdminLogout={handleAdminLogout}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Main Content */}
      <main key={currentPage} className="temple-fade-in" style={{ flex: 1, width: '100%' }}>
        {currentPage === 'home' && (
          <div>
            {/* 2. Devotional Video/Image Carousel */}
            <HeroCarousel
              slides={heroSlides}
              onNavigate={handleNavigate}
              liveStreamConfig={liveStreamConfig}
              language={language}
            />

            <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '20px 14px 8px 14px' }}>
              <LotusOrnament label={t.moolaMantra} />

              {/* 3. Six Main Module Cards */}
              <section aria-label="Temple Modules">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)',
                        color: 'var(--color-temple-brown)',
                        fontWeight: 800
                      }}
                    >
                      {t.homeModulesTitle}
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', fontWeight: 600 }}>
                      {t.homeModulesSubtitle}
                    </p>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--color-temple-brown)', fontWeight: 800 }}>
                    {t.templeSubtitle}
                  </div>
                </div>

                {/* Exact 6 Main Modules (Admin Panel is ONLY in ⋮ overflow menu) */}
                <div className="module-cards-grid">
                  <ModuleCard
                    id="calendar"
                    title={t.cardCalendarTitle}
                    tamilTitle={language === 'ta' ? undefined : 'கோயில் நாள்காட்டி'}
                    subtitle={t.cardCalendarSub}
                    badge={t.cardCalendarBadge}
                    icon={Calendar}
                    onClick={handleNavigate}
                  />

                  <ModuleCard
                    id="darisanam"
                    title={t.cardDarisanamTitle}
                    tamilTitle={language === 'ta' ? undefined : 'தரிசனம் முன்பதிவு'}
                    subtitle={t.cardDarisanamSub}
                    badge={t.cardDarisanamBadge}
                    icon={CalendarCheck}
                    onClick={handleNavigate}
                  />

                  <ModuleCard
                    id="donation"
                    title={t.cardDonationTitle}
                    tamilTitle={language === 'ta' ? undefined : 'நன்கொடை வழங்க'}
                    subtitle={t.cardDonationSub}
                    badge={t.cardDonationBadge}
                    icon={HeartHandshake}
                    onClick={handleNavigate}
                  />

                  <ModuleCard
                    id="annadhanam"
                    title={t.cardAnnadhanamTitle}
                    tamilTitle={language === 'ta' ? undefined : 'அன்னதான சேவை'}
                    subtitle={t.cardAnnadhanamSub}
                    badge={`₹${annadhanamConfig.sponsorshipAmount} / ${language === 'ta' ? 'பதிவு' : 'Booking'}`}
                    icon={UtensilsCrossed}
                    onClick={handleNavigate}
                  />

                  <ModuleCard
                    id="festival"
                    title={t.cardFestivalTitle}
                    tamilTitle={language === 'ta' ? undefined : 'திருவிழா காலங்கள்'}
                    subtitle={t.cardFestivalSub}
                    badge={t.cardFestivalBadge}
                    icon={Sparkles}
                    onClick={handleNavigate}
                  />

                  <ModuleCard
                    id="live"
                    title={t.cardLiveTitle}
                    tamilTitle={language === 'ta' ? undefined : 'நேரலை தரிசனம்'}
                    subtitle={t.cardLiveSub}
                    badge={
                      liveStreamConfig.isLive && Boolean(liveStreamConfig.streamUrl.trim())
                        ? language === 'ta'
                          ? 'நேரலை'
                          : 'LIVE'
                        : t.cardLiveBadge
                    }
                    icon={Video}
                    onClick={handleNavigate}
                  />
                </div>
              </section>

              <LotusOrnament />

              {/* 4. Mouna Gurunathar Details Section */}
              <DeityDetailsSection
                deityInfo={deityInfo}
                onNavigate={handleNavigate}
                language={language}
              />

              <LotusOrnament />

              {/* 5. Temple Location and Map Section */}
              <TempleLocationSection
                locationConfig={locationConfig}
                language={language}
              />
            </div>
          </div>
        )}

        <Suspense fallback={moduleLoadingFallback}>
          {currentPage === 'calendar' && (
            <CalendarModule events={events} onNavigate={handleNavigate} language={language} />
          )}

          {currentPage === 'darisanam' && (
            <DarisanamModule
              slots={darisanamSlots}
              bookings={darisanamBookings}
              onAddBooking={(b) => setDarisanamBookings((prev) => [b, ...prev])}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'donation' && (
            <DonationModule
              onAddDonation={(d) => setDonations((prev) => [d, ...prev])}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'annadhanam' && (
            <AnnadhanamModule
              annadhanamConfig={annadhanamConfig}
              bookings={annadhanamBookings}
              onAddBooking={(b) => setAnnadhanamBookings((prev) => [b, ...prev])}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'festival' && (
            <FestivalModule festivals={festivals} onNavigate={handleNavigate} language={language} />
          )}

          {currentPage === 'live' && (
            <LiveDarisanamModule
              streamConfig={liveStreamConfig}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'about' && (
            <AboutModule deityInfo={deityInfo} onNavigate={handleNavigate} language={language} />
          )}

          {currentPage === 'contact' && (
            <ContactModule
              locationConfig={locationConfig}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicyView
              locationConfig={locationConfig}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'terms' && (
            <TermsConditionsView
              locationConfig={locationConfig}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'admin-login' && (
            <AdminLogin
              onLoginSuccess={handleAdminLoginSuccess}
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentPage === 'admin-dashboard' && isAdminLoggedIn && (
            <AdminDashboard
              key={resetVersion}
              onLogout={handleAdminLogout}
              onNavigate={handleNavigate}
              events={events}
              onUpdateEvents={setEvents}
              darisanamSlots={darisanamSlots}
              onUpdateDarisanamSlots={setDarisanamSlots}
              darisanamBookings={darisanamBookings}
              onUpdateDarisanamBookings={setDarisanamBookings}
              donations={donations}
              onUpdateDonations={setDonations}
              annadhanamBookings={annadhanamBookings}
              onUpdateAnnadhanamBookings={setAnnadhanamBookings}
              annadhanamConfig={annadhanamConfig}
              onUpdateAnnadhanamConfig={setAnnadhanamConfig}
              festivals={festivals}
              onUpdateFestivals={setFestivals}
              liveStreamConfig={liveStreamConfig}
              onUpdateLiveStream={setLiveStreamConfig}
              heroSlides={heroSlides}
              onUpdateHeroSlides={setHeroSlides}
              locationConfig={locationConfig}
              onUpdateLocation={setLocationConfig}
              deityInfo={deityInfo}
              onUpdateDeityInfo={setDeityInfo}
              announcements={announcements}
              onUpdateAnnouncements={setAnnouncements}
              adminSettings={adminSettings}
              onUpdateAdminSettings={setAdminSettings}
              onResetFactoryData={handleResetFactoryData}
              language={language}
            />
          )}
        </Suspense>
      </main>

      {/* 6. Footer */}
      <Footer
        locationConfig={locationConfig}
        onNavigate={handleNavigate}
        language={language}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        announcements={announcements}
        onMarkAllAsRead={handleMarkAllAnnouncementsAsRead}
        onNavigate={handleNavigate}
        language={language}
      />
    </div>
  );
}

export default App;
