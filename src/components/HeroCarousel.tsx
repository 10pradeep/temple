import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Video, Sparkles } from 'lucide-react';
import { HeroMediaItem, LiveStreamConfig, PageView } from '../types';
import { Language, translations } from '../translations';

interface HeroCarouselProps {
  slides: HeroMediaItem[];
  onNavigate: (page: PageView) => void;
  liveStreamConfig: LiveStreamConfig;
  language: Language;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides,
  onNavigate,
  liveStreamConfig,
  language
}) => {
  const t = translations[language];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [failedVideoIds, setFailedVideoIds] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const activeIndex = slides.length > 0 ? currentSlideIndex % slides.length : 0;

  // Honest live status: only active when BOTH isLive is true AND a real streamUrl is configured
  const isActuallyLive = liveStreamConfig.isLive && Boolean(liveStreamConfig.streamUrl.trim());

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  useEffect(() => {
    slides.forEach((slide, idx) => {
      if (slide.mediaType !== 'video') return;
      const el = videoRefs.current[slide.id];
      if (!el) return;
      if (idx === activeIndex && isPlaying) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [activeIndex, isPlaying, slides]);

  if (slides.length === 0) return null;

  const currentSlide = slides[activeIndex];
  const slideTitle = language === 'ta' ? currentSlide.titleTa : currentSlide.titleEn;
  const slideSub = language === 'ta' ? currentSlide.subtitleTa : currentSlide.subtitleEn;
  const slideBadge = language === 'ta' ? currentSlide.badgeTa : currentSlide.badgeEn;
  const slideBtn = language === 'ta' ? currentSlide.actionTextTa : currentSlide.actionTextEn;

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      aria-label="Mouna Gurunathar Devotional Showcase"
      className="hero-devotional-carousel"
      style={{
        width: '100%',
        backgroundColor: '#FFD54F',
        borderBottom: '3px solid var(--color-temple-brown)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="hero-carousel-stage">
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;
          const title = language === 'ta' ? slide.titleTa : slide.titleEn;
          const useVideo = slide.mediaType === 'video' && !failedVideoIds[slide.id];
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.75s ease-in-out, transform 0.95s ease-in-out',
                transform: isActive ? 'scale(1)' : 'scale(1.03)',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              {useVideo ? (
                <video
                  ref={(el) => {
                    videoRefs.current[slide.id] = el;
                  }}
                  src={slide.src}
                  poster={slide.poster || '/images/opt/deity.jpg'}
                  muted
                  loop
                  playsInline
                  autoPlay={isActive && isPlaying}
                  onError={() => setFailedVideoIds((prev) => ({ ...prev, [slide.id]: true }))}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 25%'
                  }}
                />
              ) : (
                <img
                  src={slide.mediaType === 'video' ? slide.poster || '/images/opt/deity.jpg' : slide.src}
                  alt={title}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallbackApplied) {
                      img.dataset.fallbackApplied = '1';
                      img.src = '/images/opt/deity.jpg';
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 25%'
                  }}
                />
              )}

              {/* Warm Temple Brown Devotional Gradient Overlay for Crisp White/Gold Text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(62, 33, 20, 0.12) 0%, rgba(109, 53, 24, 0.34) 45%, rgba(62, 33, 20, 0.9) 100%)'
                }}
              />
            </div>
          );
        })}

        {/* Honest Live Stream Status Pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10
          }}
        >
          <button
            type="button"
            onClick={() => onNavigate('live')}
            style={{
              backgroundColor: isActuallyLive ? 'rgba(27, 122, 60, 0.94)' : 'rgba(109, 53, 24, 0.92)',
              border: `1.5px solid ${isActuallyLive ? '#68D391' : '#FFD54F'}`,
              padding: '4px 12px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isActuallyLive ? '#68D391' : '#FFD54F'
              }}
            />
            <span style={{ color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.4px' }}>
              {isActuallyLive ? t.heroLiveBadgeLive : t.heroLiveBadgeOffline}
            </span>
          </button>
        </div>

        {/* Auto-rotation Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={isPlaying ? 'Pause carousel rotation' : 'Play carousel rotation'}
          title={isPlaying ? 'Pause rotation' : 'Play rotation'}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            backgroundColor: 'rgba(109, 53, 24, 0.92)',
            border: '1.5px solid #FFD54F',
            color: '#FFD54F',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Previous / Next Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          style={{
            position: 'absolute',
            left: '10px',
            top: '38%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(109, 53, 24, 0.9)',
            border: '1.5px solid #FFD54F',
            color: '#FFD54F',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            position: 'absolute',
            right: '10px',
            top: '38%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(109, 53, 24, 0.9)',
            border: '1.5px solid #FFD54F',
            color: '#FFD54F',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronRight size={18} />
        </button>

        {/* Slide Text & Call-to-Action */}
        <div
          style={{
            position: 'absolute',
            bottom: '26px',
            left: 0,
            right: 0,
            zIndex: 5,
            padding: '0 40px',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}
        >
          <div style={{ marginBottom: '6px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 213, 79, 0.22)',
                border: '1px solid #FFD54F',
                color: '#FFE9A8',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase'
              }}
            >
              {slideBadge}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              color: '#FFFFFF',
              fontSize: 'clamp(1.15rem, 3.6vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '6px',
              textShadow: '0 2px 6px rgba(0,0,0,0.8)'
            }}
          >
            {slideTitle}
          </h2>

          <p
            style={{
              color: '#FFE9A8',
              fontSize: 'clamp(0.76rem, 2vw, 0.94rem)',
              maxWidth: '640px',
              margin: '0 auto 12px auto',
              textShadow: '0 1px 3px rgba(0,0,0,0.85)',
              lineHeight: 1.4
            }}
          >
            {slideSub}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate(currentSlide.actionPage)}
              className="btn-temple-gold"
              style={{
                fontSize: '0.82rem',
                padding: '7px 16px',
                borderRadius: '24px'
              }}
            >
              <Sparkles size={15} />
              <span>{slideBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('live')}
              className="btn-temple-primary"
              style={{
                fontSize: '0.82rem',
                padding: '7px 16px',
                borderRadius: '24px'
              }}
            >
              <Video size={15} color="#FFD54F" />
              <span>{t.watchLiveBtn}</span>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px'
          }}
        >
          {slides.map((s, dotIdx) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setCurrentSlideIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              style={{
                width: dotIdx === activeIndex ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: dotIdx === activeIndex ? '#FFD54F' : 'rgba(255, 255, 255, 0.45)',
                border: 'none'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
