import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DeityInfo, PageView } from '../types';
import { Language } from '../translations';

interface DeityDetailsSectionProps {
  deityInfo?: DeityInfo;
  onNavigate?: (page: PageView) => void;
  language?: Language;
}

interface TempleHistoryCopy {
  heading: string;
  backButton: string;
  paragraphs: string[];
  openAriaLabel: string;
  regionAriaLabel: string;
}

const TEMPLE_HISTORY_CONTENT: Record<Language, TempleHistoryCopy> = {
  en: {
    heading: 'A Sacred Place of Faith, Blessings and Humanity',
    backButton: '← BACK TO TEMPLE',
    paragraphs: [
      'This temple holds a special place in the hearts of the people of S. Parraipatty and its surrounding communities. The great spiritual personality, Mouna Gurunathar, associated with this sacred place, is remembered and respected by generations of people for his humanity, kindness, and selfless service.',
      'He is regarded by many devotees as a divine guardian and a source of blessings. His compassion, dedication, and contributions have made a lasting impact on the people and the spiritual development of this place. Even today, people remember him with deep respect, gratitude, and devotion.'
    ],
    openAriaLabel: 'Open Mouna Gurunathar temple history',
    regionAriaLabel: 'Mouna Gurunathar Temple History'
  },
  ta: {
    heading: 'நம்பிக்கை, அருள் மற்றும் மனிதநேயம் நிறைந்த புனிதத் தலம்',
    backButton: '← கோவிலுக்குத் திரும்ப',
    paragraphs: [
      'இந்த ஆலயம் S. Parraipatty மற்றும் அதைச் சுற்றியுள்ள பகுதிகளில் வாழும் மக்களின் இதயங்களில் ஒரு சிறப்பான இடத்தைப் பெற்றுள்ளது. இந்தப் புனிதத் தலத்துடன் தொடர்புடைய மகத்தான ஆன்மிகப் பெருமகனான மௌன குருநாதர், மனிதநேயம், கருணை மற்றும் தன்னலமற்ற சேவைக்காக தலைமுறை தலைமுறையாக மக்களால் நினைவுகூரப்பட்டு மதிக்கப்படுகிறார்.',
      'பல பக்தர்களால் அவர் தெய்வீகக் காவலராகவும் அருளையும் ஆசீர்வாதங்களையும் வழங்குபவராகவும் போற்றப்படுகிறார். அவரது கருணை, அர்ப்பணிப்பு மற்றும் பங்களிப்புகள் இப்பகுதி மக்களின் வாழ்விலும் ஆன்மிக வளர்ச்சியிலும் நிலையான தாக்கத்தை ஏற்படுத்தியுள்ளன. இன்றும் மக்கள் அவரை ஆழ்ந்த மரியாதை, நன்றியுணர்வு மற்றும் பக்தியுடன் நினைவுகூருகின்றனர்.'
    ],
    openAriaLabel: 'மௌன குருநாதர் திருக்கோயில் வரலாற்றைக் காண்க',
    regionAriaLabel: 'மௌன குருநாதர் திருக்கோயில் வரலாறு'
  }
};

export const DeityDetailsSection: React.FC<DeityDetailsSectionProps> = ({
  language = 'en'
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const historyScrollRef = useRef<HTMLDivElement | null>(null);
  const titlePanelRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const activeCopy = TEMPLE_HISTORY_CONTENT[language] ?? TEMPLE_HISTORY_CONTENT.en;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    if (!showHistory) {
      el.play().catch(() => {
        // Autoplay handled natively via autoPlay + muted + playsInline
      });
    }
  }, [showHistory]);

  // Reliably auto-fit "MOUNA GURUNATHAR" on ONE single horizontal line across all container widths
  useLayoutEffect(() => {
    const panel = titlePanelRef.current;
    const heading = headingRef.current;
    if (!panel || !heading) return;

    const fitHeadingToSingleLine = () => {
      const availableWidth = Math.max(120, panel.clientWidth - 36);
      const maxPx = 40;
      const minPx = 12;
      const letterSpacing =
        availableWidth < 320 ? '0.03em' : availableWidth < 450 ? '0.055em' : '0.075em';

      heading.style.letterSpacing = letterSpacing;
      heading.style.fontSize = `${maxPx}px`;

      const measuredAtMax = heading.scrollWidth;
      let nextPx = maxPx;
      if (measuredAtMax > availableWidth && measuredAtMax > 0) {
        nextPx = Math.max(minPx, Math.floor((maxPx * (availableWidth / measuredAtMax)) * 10) / 10);
      }
      heading.style.fontSize = `${nextPx}px`;

      while (heading.scrollWidth > availableWidth && nextPx > minPx) {
        nextPx = Math.max(minPx, Number((nextPx - 0.5).toFixed(1)));
        heading.style.fontSize = `${nextPx}px`;
      }
    };

    fitHeadingToSingleLine();

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            fitHeadingToSingleLine();
          })
        : null;
    observer?.observe(panel);

    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fitHeadingToSingleLine();
      });
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  const handleOpenHistory = () => {
    if (!showHistory) {
      setShowHistory(true);
      requestAnimationFrame(() => {
        if (historyScrollRef.current) {
          historyScrollRef.current.scrollTop = 0;
          historyScrollRef.current.focus({ preventScroll: true });
        }
      });
    }
  };

  const handleBackToTemple = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowHistory(false);
    if (historyScrollRef.current) {
      historyScrollRef.current.scrollTop = 0;
    }
    const el = videoRef.current;
    if (el) {
      el.muted = true;
      el.play().catch(() => {
        // Resume playback cleanly on return
      });
    }
  };

  const handleVideoKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenHistory();
    }
  };

  return (
    <section className="deity-details-section" style={{ margin: '24px 0' }}>
      <div
        className="temple-card overflow-hidden"
        style={{
          border: '1.5px solid var(--color-border-gold)',
          backgroundColor: 'var(--color-section-bg)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '5px',
            background: 'linear-gradient(90deg, #6D3518 0%, #FFD54F 50%, #E5A323 75%, #6D3518 100%)'
          }}
        />

        <div className="deity-hero-grid">
          {/* Left Side: Same Rounded Container transforms between Animated Temple Visual and Bilingual Scrollable History Panel */}
          <div className="deity-hero-stage">
            {/* Layer 1: Continuously Looping Animated Temple Video */}
            <div
              role="button"
              tabIndex={showHistory ? -1 : 0}
              aria-label={activeCopy.openAriaLabel}
              aria-expanded={showHistory}
              aria-hidden={showHistory}
              onClick={handleOpenHistory}
              onKeyDown={handleVideoKeyDown}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className={`deity-hero-video-layer${showHistory ? ' is-hidden' : ''}`}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                draggable={false}
                poster="/assets/mouna-gurunathar-temple-poster.jpg"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                aria-label="Animated Mouna Gurunathar Tamil traditional temple with divine golden Prabha Mandala lighting ring"
                className="deity-hero-video"
              >
                <source src="/assets/mouna-gurunathar-temple.mp4" type="video/mp4" />
              </video>
              <div className="deity-hero-media-depth" aria-hidden="true" />
            </div>

            {/* Layer 2: Bilingual Temple History Reading Panel inside the EXACT same left-side container */}
            <div
              lang={language === 'ta' ? 'ta' : 'en'}
              className={`deity-hero-history-layer${showHistory ? ' is-visible' : ''}`}
              aria-hidden={!showHistory}
            >
              <div className="deity-history-header">
                <button
                  type="button"
                  onClick={handleBackToTemple}
                  tabIndex={showHistory ? 0 : -1}
                  className="deity-back-btn"
                >
                  {activeCopy.backButton}
                </button>
                <h3 className="deity-history-title">{activeCopy.heading}</h3>
              </div>

              <div
                ref={historyScrollRef}
                role="region"
                aria-label={activeCopy.regionAriaLabel}
                tabIndex={showHistory ? 0 : -1}
                className="deity-history-scroll"
              >
                {activeCopy.paragraphs.map((paragraph, index) => (
                  <p key={index} className="deity-history-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Minimal Single-Line Centered Heading Only — Clickable & Smoothly Scales Down when History is Open */}
          <div ref={titlePanelRef} className="deity-hero-title-panel">
            <button
              type="button"
              onClick={handleOpenHistory}
              aria-expanded={showHistory}
              aria-label={activeCopy.openAriaLabel}
              className={`deity-hero-title-trigger${showHistory ? ' is-compact' : ''}`}
            >
              <h2 ref={headingRef} className="deity-hero-heading">
                MOUNA GURUNATHAR
              </h2>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
