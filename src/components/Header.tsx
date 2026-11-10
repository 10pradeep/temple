import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Menu,
  X,
  MoreVertical,
  ShieldCheck,
  Volume2,
  VolumeX,
  Phone,
  Compass,
  Calendar,
  CalendarCheck,
  HeartHandshake,
  UtensilsCrossed,
  Sparkles,
  Video,
  Info,
  Languages
} from 'lucide-react';
import { PageView, TempleAnnouncement } from '../types';
import { Language, translations } from '../translations';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  announcements: TempleAnnouncement[];
  onOpenNotifications: () => void;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  announcements,
  onOpenNotifications,
  isAdminLoggedIn,
  onAdminLogout,
  language,
  onSelectLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(false);
  const [chantPlaying, setChantPlaying] = useState(false);

  const overflowRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const t = translations[language];
  const unreadAnnouncementsCount = announcements.filter((a) => a.isNew).length;

  // All 9 required navigation links in exact order
  const navItems = [
    { id: 'home' as PageView, label: t.navHome, icon: Compass },
    { id: 'calendar' as PageView, label: t.navCalendar, icon: Calendar },
    { id: 'darisanam' as PageView, label: t.navDarisanam, icon: CalendarCheck },
    { id: 'donation' as PageView, label: t.navDonation, icon: HeartHandshake },
    { id: 'annadhanam' as PageView, label: t.navAnnadhanam, icon: UtensilsCrossed },
    { id: 'festival' as PageView, label: t.navFestival, icon: Sparkles },
    { id: 'live' as PageView, label: t.navLive, icon: Video },
    { id: 'about' as PageView, label: t.navAbout, icon: Info },
    { id: 'contact' as PageView, label: t.navContact, icon: Phone }
  ];

  // Close overflow menu on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setOverflowMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOverflowMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setOverflowMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gentle synthesized temple bell & soft Om harmonic drone on user toggle
  const toggleChant = () => {
    if (chantPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.35
        );
      }
      setTimeout(() => {
        audioCtxRef.current?.close().catch(() => {});
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }, 380);
      setChantPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.6);
      masterGain.connect(ctx.destination);

      // Soft Om tanpura drone (Sa + Pa)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(136.1, ctx.currentTime); // Om frequency C#3

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(204.15, ctx.currentTime); // Perfect fifth

      // Soft temple bell chime once
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'triangle';
      bell.frequency.setValueAtTime(880, ctx.currentTime);
      bellGain.gain.setValueAtTime(0.08, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
      bell.connect(bellGain);
      bellGain.connect(ctx.destination);

      osc1.connect(masterGain);
      osc2.connect(masterGain);

      osc1.start();
      osc2.start();
      bell.start();
      bell.stop(ctx.currentTime + 2.3);

      audioCtxRef.current = ctx;
      gainNodeRef.current = masterGain;
      setChantPlaying(true);
    } catch {
      setChantPlaying(false);
    }
  };

  return (
    <header className="temple-header sticky top-0 z-50 shadow-md">
      {/* Top Auspicious Gold Strip */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #FFD54F 0%, #FFE9A8 50%, #FFD54F 100%)'
        }}
      />

      {/* Main Header Bar (Temple Brown #6D3518 with Golden Border) */}
      <div
        style={{
          backgroundColor: 'var(--color-temple-brown)',
          borderBottom: '2px solid var(--color-gold-bright)',
          padding: '10px 12px',
          boxShadow: '0 2px 10px rgba(62, 33, 20, 0.35)'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          {/* Temple Branding: Logo + Exact Name "Mouna Gurunathar" */}
          <div
            onClick={() => handleNavClick('home')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('home');
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              userSelect: 'none',
              minWidth: 0
            }}
          >
            {/* Traditional Temple Gopuram & Trishul Emblem */}
            <div
              className="header-brand-emblem"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #522710 0%, #6D3518 100%)',
                border: '2px solid var(--color-gold-bright)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(255, 213, 79, 0.45)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <path d="M50 8 L54 28 L68 30 L56 40 L62 58 L50 48 L38 58 L44 40 L32 30 L46 28 Z" fill="#FFD54F" />
                <path d="M50 48 L50 92" stroke="#FFFDF5" strokeWidth="6" strokeLinecap="round" />
                <path d="M28 65 Q50 78 72 65" stroke="#FFD54F" strokeWidth="4" fill="none" strokeLinecap="round" />
                <circle cx="50" cy="92" r="5" fill="#FFE9A8" />
              </svg>
            </div>

            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <h1
                className="header-brand-title"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.88rem, 2.8vw, 1.25rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                  letterSpacing: '0.3px',
                  textShadow: '0 1px 3px rgba(62, 33, 20, 0.6)'
                }}
              >
                {t.templeName}
              </h1>
              <p
                className="header-brand-subtitle"
                style={{
                  color: '#FFE9A8',
                  fontSize: 'clamp(0.68rem, 1.8vw, 0.82rem)',
                  fontWeight: 600,
                  letterSpacing: '0.4px',
                  marginTop: '1px'
                }}
              >
                {t.templeSubtitle}
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* Desktop/Tablet Extras (moved into Mobile Drawer & Overflow Menu on < 540px so temple title never clips at 320px) */}
            <div className="header-desktop-extras">
              {/* Language Switcher */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(62, 33, 20, 0.5)',
                  border: '1.5px solid var(--color-gold-bright)',
                  borderRadius: '20px',
                  padding: '2px'
                }}
                role="group"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => onSelectLanguage('ta')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '16px',
                    fontSize: '0.72rem',
                    fontWeight: language === 'ta' ? 800 : 600,
                    backgroundColor: language === 'ta' ? 'var(--color-gold-bright)' : 'transparent',
                    color: language === 'ta' ? 'var(--color-text-main)' : '#FFE9A8'
                  }}
                  title="தமிழ்"
                >
                  தமிழ்
                </button>
                <button
                  type="button"
                  onClick={() => onSelectLanguage('en')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '16px',
                    fontSize: '0.72rem',
                    fontWeight: language === 'en' ? 800 : 600,
                    backgroundColor: language === 'en' ? 'var(--color-gold-bright)' : 'transparent',
                    color: language === 'en' ? 'var(--color-text-main)' : '#FFE9A8'
                  }}
                  title="English"
                >
                  ENG
                </button>
              </div>

              {/* Audio Resonance Toggle */}
              <button
                type="button"
                onClick={toggleChant}
                aria-label={chantPlaying ? t.audioMuted : t.audioChants}
                title={chantPlaying ? t.audioMuted : t.audioChants}
                style={{
                  background: chantPlaying ? 'rgba(255, 213, 79, 0.3)' : 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid var(--color-gold-bright)',
                  color: '#FFD54F',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {chantPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="header-action-btn"
              aria-label={t.announcements}
              title={t.announcements}
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1.5px solid var(--color-gold-bright)',
                color: '#FFE9A8',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bell size={16} />
              {unreadAnnouncementsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#B91C1C',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 800,
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #FFD54F'
                  }}
                >
                  {unreadAnnouncementsCount}
                </span>
              )}
            </button>

            {/* Three-Dot Overflow Menu (Sole Access Point to Admin Panel) */}
            <div ref={overflowRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setOverflowMenuOpen((prev) => !prev)}
                className="header-action-btn"
                aria-label="More options and Admin Panel"
                aria-expanded={overflowMenuOpen}
                title="Options & Admin Panel"
                style={{
                  background: overflowMenuOpen ? 'rgba(255, 213, 79, 0.28)' : 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid var(--color-gold-bright)',
                  color: '#FFD54F',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MoreVertical size={17} />
              </button>

              {overflowMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '42px',
                    width: '235px',
                    maxWidth: 'calc(100vw - 24px)',
                    backgroundColor: 'var(--color-section-bg)',
                    border: '2px solid var(--color-temple-brown)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 120,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'var(--color-temple-brown)',
                      color: '#FFE9A8',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.5px'
                    }}
                  >
                    {t.templeAccess}
                  </div>

                  {isAdminLoggedIn ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleNavClick('admin-dashboard')}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '11px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: 'var(--color-text-main)',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          backgroundColor: '#FFFDF5',
                          borderBottom: '1px solid rgba(200, 150, 36, 0.35)'
                        }}
                      >
                        <ShieldCheck size={16} color="var(--color-temple-brown)" />
                        <span>{t.adminDashboard}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onAdminLogout();
                          setOverflowMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          color: '#B91C1C',
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          backgroundColor: '#FFFDF5'
                        }}
                      >
                        <span>{t.navSignOut}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNavClick('admin-login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '11px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--color-text-main)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        backgroundColor: '#FFFDF5'
                      }}
                    >
                      <ShieldCheck size={16} color="var(--color-temple-brown)" />
                      <span>{t.adminLogin}</span>
                    </button>
                  )}

                  <div style={{ borderTop: '1px solid rgba(200, 150, 36, 0.35)' }}>
                    <button
                      type="button"
                      onClick={() => handleNavClick('contact')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--color-text-main)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        backgroundColor: '#FFFDF5',
                        borderBottom: '1px solid rgba(200, 150, 36, 0.25)'
                      }}
                    >
                      <Phone size={14} color="var(--color-temple-brown)" />
                      <span>{t.templeHelpDesk}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toggleChant();
                        setOverflowMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--color-text-main)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        backgroundColor: '#FFFDF5'
                      }}
                    >
                      {chantPlaying ? (
                        <Volume2 size={14} color="var(--color-temple-brown)" />
                      ) : (
                        <VolumeX size={14} color="var(--color-temple-brown)" />
                      )}
                      <span>{chantPlaying ? t.audioMuted : t.audioChants}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="mobile-menu-toggle header-action-btn"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1.5px solid var(--color-gold-bright)',
                color: '#FFD54F',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar (All 9 Links) */}
      <nav
        aria-label="Main temple navigation"
        className="desktop-nav-bar"
        style={{
          backgroundColor: 'var(--color-temple-brown-dark)',
          borderBottom: '2.5px solid var(--color-gold-bright)',
          boxShadow: '0 4px 12px rgba(62, 33, 20, 0.25)'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '2px 8px',
            gap: '2px'
          }}
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const IconComponent = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '8px 12px',
                  color: isActive ? '#3E2114' : '#FFE9A8',
                  backgroundColor: isActive ? 'var(--color-gold-bright)' : 'transparent',
                  borderBottom: isActive ? '3px solid var(--color-temple-brown)' : '3px solid transparent',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '6px 6px 0 0',
                  whiteSpace: 'nowrap'
                }}
              >
                <IconComponent size={15} color={isActive ? '#3E2114' : '#FFD54F'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile temple navigation"
          style={{
            backgroundColor: 'var(--color-section-bg)',
            borderBottom: '3px solid var(--color-temple-brown)',
            boxShadow: 'var(--shadow-lg)',
            padding: '14px 12px',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '8px',
              borderBottom: '1.5px solid var(--color-border-gold)'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-main)',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Languages size={15} color="var(--color-temple-brown)" />
              {language === 'ta' ? 'மொழி:' : 'Language:'}
            </span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={toggleChant}
                aria-label={chantPlaying ? t.audioMuted : t.audioChants}
                title={chantPlaying ? t.audioMuted : t.audioChants}
                style={{
                  padding: '4px 9px',
                  borderRadius: '14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  backgroundColor: chantPlaying ? 'var(--color-temple-brown)' : '#FFFDF5',
                  color: chantPlaying ? '#FFD54F' : 'var(--color-temple-brown)',
                  border: '1.5px solid var(--color-border-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {chantPlaying ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>{language === 'ta' ? 'ஓம்' : 'Om'}</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('ta')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '14px',
                  fontSize: '0.78rem',
                  fontWeight: language === 'ta' ? 800 : 600,
                  backgroundColor: language === 'ta' ? 'var(--color-gold-bright)' : '#FFFDF5',
                  color: 'var(--color-text-main)',
                  border: '1.5px solid var(--color-border-gold)'
                }}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => onSelectLanguage('en')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '14px',
                  fontSize: '0.78rem',
                  fontWeight: language === 'en' ? 800 : 600,
                  backgroundColor: language === 'en' ? 'var(--color-gold-bright)' : '#FFFDF5',
                  color: 'var(--color-text-main)',
                  border: '1.5px solid var(--color-border-gold)'
                }}
              >
                ENG
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
              gap: '8px'
            }}
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    padding: '10px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isActive ? 'var(--color-temple-brown)' : '#FFFDF5',
                    border: isActive ? '1.5px solid #FFD54F' : '1px solid var(--color-border-gold)',
                    color: isActive ? '#FFFDF5' : 'var(--color-text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 800 : 600,
                    textAlign: 'left'
                  }}
                >
                  <IconComponent size={15} color={isActive ? '#FFD54F' : 'var(--color-temple-brown)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid var(--color-border-gold)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
              {t.mantraShort}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
              {language === 'ta' ? 'நிர்வாகி உள்நுழைவு: ⋮ மெனு' : 'Admin access via ⋮ menu'}
            </span>
          </div>
        </nav>
      )}
    </header>
  );
};
