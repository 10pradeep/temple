import React, { useState, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Maximize,
  Flame,
  Sparkles,
  Heart,
  Clock,
  Send,
  AlertCircle,
  Play,
  Pause,
  CalendarCheck,
  Radio
} from 'lucide-react';
import { LiveStreamConfig, PageView } from '../types';
import { Language, translations } from '../translations';

interface LiveDarisanamModuleProps {
  streamConfig: LiveStreamConfig;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const LiveDarisanamModule: React.FC<LiveDarisanamModuleProps> = ({
  streamConfig,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [flowerCount, setFlowerCount] = useState(0);
  const [deepamLit, setDeepamLit] = useState(true);
  const [prayerText, setPrayerText] = useState('');
  const [devoteePrayers, setDevoteePrayers] = useState<Array<{ id: string; text: string; createdAt: string }>>([]);

  const rawStreamUrl = streamConfig.streamUrl ? streamConfig.streamUrl.trim() : '';
  const isSafeStreamUrl = /^(https?:\/\/|\/)/i.test(rawStreamUrl);

  const hasConnectedLiveStream =
    streamConfig.isLive &&
    streamConfig.sourceType !== 'demo' &&
    Boolean(rawStreamUrl) &&
    isSafeStreamUrl;

  const fallbackImg = streamConfig.fallbackImage || '/images/opt/deity.jpg';

  const handleTogglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (videoRef.current) {
      if (next) videoRef.current.play().catch(() => { });
      else videoRef.current.pause();
    }
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  const handleFullscreen = () => {
    const target = playerContainerRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    } else {
      target.requestFullscreen?.().catch(() => { });
    }
  };

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    setDevoteePrayers((prev) => [
      {
        id: `note-${Date.now()}`,
        text: prayerText.trim(),
        createdAt: new Date().toLocaleTimeString()
      },
      ...prev
    ]);
    setPrayerText('');
  };

  return (
    <div className="live-darisanam-module" style={{ maxWidth: '1040px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: 'var(--color-temple-brown)',
              color: '#FFE9A8',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.5px',
              display: 'inline-block',
              marginBottom: '6px'
            }}
          >
            {t.liveBadge}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.9rem)',
              color: 'var(--color-temple-brown)',
              fontWeight: 800,
              lineHeight: 1.2
            }}
          >
            {t.liveTitle}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            {t.liveSubtitle}
          </p>
        </div>

        {/* Honest Live Status Indicator (Never fake LIVE when no stream connected) */}
        <div
          style={{
            backgroundColor: hasConnectedLiveStream ? '#EAF7EE' : '#FEF3C7',
            border: `1.5px solid ${hasConnectedLiveStream ? '#1B7A3C' : '#D97706'}`,
            padding: '8px 14px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Radio size={16} color={hasConnectedLiveStream ? '#1B7A3C' : '#B45309'} />
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: hasConnectedLiveStream ? '#1B7A3C' : '#92400E'
              }}
            >
              {hasConnectedLiveStream ? t.liveNow : t.liveOffline}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
              {hasConnectedLiveStream
                ? language === 'ta'
                  ? 'நிர்வாகம் இணைத்த நேரலை ஒளிபரப்பு'
                  : 'Configured Admin Stream Source'
                : t.liveResumesAt}
            </div>
          </div>
        </div>
      </div>

      {/* Main Video / Fallback Sanctum Player Container */}
      <div
        ref={playerContainerRef}
        style={{
          backgroundColor: '#522710',
          border: '2px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(250px, 50vw, 490px)',
            backgroundColor: '#522710',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {hasConnectedLiveStream && streamConfig.sourceType === 'embed' ? (
            <iframe
              src={rawStreamUrl}
              title="Mouna Gurunathar Live Darisanam"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : hasConnectedLiveStream && streamConfig.sourceType === 'video' ? (
            <video
              ref={videoRef}
              src={rawStreamUrl}
              poster={fallbackImg}
              autoPlay
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src={fallbackImg}
              alt="Mouna Gurunathar Sanctum Image"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fb) {
                  target.dataset.fb = '1';
                  target.src = '/images/opt/deity.jpg';
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                opacity: isPlaying ? 1 : 0.72,
                transition: 'opacity 0.3s ease'
              }}
            />
          )}

          {/* Compact Corner Status Pill (Does NOT cover Mouna Gurunathar face/crown) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              backgroundColor: hasConnectedLiveStream ? 'rgba(27, 122, 60, 0.92)' : 'rgba(109, 53, 24, 0.92)',
              border: '1px solid #FFD54F',
              color: '#FFFDF5',
              padding: '4px 10px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.68rem',
              fontWeight: 800,
              boxShadow: 'var(--shadow-sm)',
              pointerEvents: 'none'
            }}
          >
            <Radio size={12} color={hasConnectedLiveStream ? '#A7F3D0' : '#FFD54F'} />
            <span>
              {hasConnectedLiveStream
                ? t.liveNow
                : language === 'ta'
                  ? 'நேரலை இல்லை • மாதிரி காட்சி'
                  : 'OFFLINE • DEMO SANCTUM VIEW'}
            </span>
          </div>

          {/* Soft Sacred Deepam Accent (Demo Mode Only) */}
          {!hasConnectedLiveStream && deepamLit && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                display: 'flex',
                gap: '72px'
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '22px',
                  backgroundColor: '#FFD54F',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: '0 0 18px #FFA726'
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '22px',
                  backgroundColor: '#FFD54F',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: '0 0 18px #FFA726'
                }}
              />
            </div>
          )}

          {/* Player Controls Overlay (Demo & Video controls) */}
          {streamConfig.sourceType !== 'embed' && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(82, 39, 16, 0.94) 0%, rgba(82, 39, 16, 0.45) 75%, transparent 100%)',
                padding: '24px 14px 12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                color: '#FFFDF5'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#FFD54F',
                    color: '#3E2114',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  style={{
                    color: '#FFE9A8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  <span>{isMuted ? t.liveMuted : t.liveAudioOn}</span>
                </button>
              </div>

              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#FFD54F',
                  fontWeight: 700,
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {hasConnectedLiveStream
                  ? language === 'ta'
                    ? 'மௌன குருநாதர் • நேரலை இணைப்பு'
                    : 'Mouna Gurunathar • Connected Stream'
                  : language === 'ta'
                    ? 'மௌன குருநாதர் சந்நிதி • மாதிரி காட்சி'
                    : 'Mouna Gurunathar • Demo Player'}
              </div>

              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Toggle Fullscreen"
                title="Fullscreen"
                style={{ color: '#FFFDF5', padding: '6px', flexShrink: 0 }}
              >
                <Maximize size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Honest Status Banner placed cleanly below video viewport */}
        {!hasConnectedLiveStream && (
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              borderTop: '2px solid #FFD54F',
              color: 'var(--color-text-main)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            <AlertCircle size={18} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>
              <strong style={{ color: 'var(--color-temple-brown)' }}>{t.liveOffline}:</strong>{' '}
              {streamConfig.offlineFallbackMessage}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Micro-Offerings & Schedule */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 265px), 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px'
          }}
        >
          <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} />
            <span>{t.liveVirtualTitle}</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
            {t.liveVirtualSub}
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setFlowerCount((prev) => prev + 1)}
              className="btn-temple-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '20px' }}
            >
              <Heart size={14} />
              <span>
                {t.liveOfferFlowersBtn} {flowerCount > 0 ? `(${flowerCount})` : ''}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDeepamLit((prev) => !prev)}
              className="btn-temple-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '20px' }}
            >
              <Flame size={14} color="#D97706" />
              <span>{deepamLit ? t.liveExtinguishDeepamBtn : t.liveLightDeepamBtn}</span>
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} />
              <span>{t.liveScheduleTitle}</span>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border-gold)', paddingBottom: '4px', gap: '8px' }}>
                <span>{t.liveUshakkala}</span>
                <strong>{language === 'ta' ? 'நிர்வாக உறுதிப்படுத்தல் நிலுவையில்' : 'Pending Admin Confirmation'}</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border-gold)', paddingBottom: '4px', gap: '8px' }}>
                <span>{t.liveUchikala}</span>
                <strong>{language === 'ta' ? 'நிர்வாக உறுதிப்படுத்தல் நிலுவையில்' : 'Pending Admin Confirmation'}</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                <span>{t.liveSayarakshai}</span>
                <strong>{language === 'ta' ? 'நிர்வாக உறுதிப்படுத்தல் நிலுவையில்' : 'Pending Admin Confirmation'}</strong>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('darisanam')}
            className="btn-temple-gold"
            style={{ width: '100%', padding: '8px 14px', fontSize: '0.84rem' }}
          >
            <CalendarCheck size={15} />
            <span>{t.navDarisanam}</span>
          </button>
        </div>
      </div>

      {/* Personal Local Prayer Notes */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px'
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '6px' }}>
          {t.livePrayerWallTitle}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
          {t.livePrayerWallSub}
        </p>

        <form onSubmit={handleSubmitPrayer} style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder={t.livePrayerPlaceholder}
            value={prayerText}
            onChange={(e) => setPrayerText(e.target.value)}
            className="form-input"
            style={{ flex: 1, minWidth: '200px' }}
          />
          <button type="submit" className="btn-temple-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            <Send size={15} />
            <span>{t.liveSendPrayerBtn}</span>
          </button>
        </form>

        {devoteePrayers.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {devoteePrayers.map((note) => (
              <div
                key={note.id}
                style={{
                  backgroundColor: '#FFFDF5',
                  border: '1px solid var(--color-border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <span>{note.text}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                  {note.createdAt}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
