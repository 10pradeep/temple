import React from 'react';
import { ShieldCheck, Sparkles, Clock, ArrowRight, Landmark, Camera } from 'lucide-react';
import { DeityInfo, PageView } from '../types';
import { Language, translations } from '../translations';

interface AboutModuleProps {
  deityInfo: DeityInfo;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const AboutModule: React.FC<AboutModuleProps> = ({
  deityInfo,
  onNavigate,
  language
}) => {
  const t = translations[language];

  return (
    <div className="about-module" style={{ maxWidth: '1020px', margin: '0 auto', padding: '16px 12px' }}>
      {/* 1. Mouna Gurunathar Introduction */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          marginBottom: '22px',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            backgroundColor: 'var(--color-temple-brown)',
            color: '#FFE9A8',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.6px',
            display: 'inline-block',
            marginBottom: '8px'
          }}
        >
          {t.aboutBadge}
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.45rem, 3.8vw, 2.2rem)',
            color: 'var(--color-temple-brown)',
            fontWeight: 800,
            marginBottom: '4px'
          }}
        >
          {language === 'ta' ? t.deityTitle : deityInfo.name}
        </h2>

        <p style={{ fontSize: '1.02rem', color: 'var(--color-temple-brown)', fontWeight: 700, marginBottom: '12px' }}>
          {language === 'ta' ? t.deitySubtitle : deityInfo.subtitle}
        </p>

        <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', maxWidth: '720px', margin: '0 auto 14px auto', lineHeight: 1.6 }}>
          {language === 'ta' ? t.deityIntro : deityInfo.shortIntro}
        </p>

        <div
          style={{
            backgroundColor: 'var(--color-temple-brown)',
            border: '2px solid #FFD54F',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '0.95rem',
            color: '#FFD54F',
            fontWeight: 800
          }}
        >
          {language === 'ta' ? t.moolaMantra : deityInfo.mantra}
        </div>
      </div>

      {/* 2. Original Deity Photograph & Temple History */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
          marginBottom: '22px'
        }}
      >
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid var(--color-temple-brown)',
            boxShadow: 'var(--shadow-md)',
            maxHeight: '420px',
            minWidth: 0
          }}
        >
          <img
            src="/images/opt/deity.jpg"
            alt="Mouna Gurunathar"
            className="temple-img-hover"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fb) {
                target.dataset.fb = '1';
                target.src = '/images/deity.jpg';
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
          />
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.22rem',
              color: 'var(--color-temple-brown)',
              fontWeight: 800,
              marginBottom: '12px',
              borderBottom: '1.5px solid var(--color-border-gold)',
              paddingBottom: '6px'
            }}
          >
            {t.aboutHistoryTitle}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
            {deityInfo.history.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Religious Significance */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '22px',
          marginBottom: '22px'
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            color: 'var(--color-temple-brown)',
            fontWeight: 800,
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShieldCheck size={20} />
          <span>{t.aboutSignificanceTitle}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px' }}>
          {deityInfo.spiritualSignificance.map((item, idx) => {
            const [title, ...rest] = item.split(':');
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFDF5',
                  border: '1px solid var(--color-border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px'
                }}
              >
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                  {title}
                </h4>
                <p style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {rest.join(':')}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Important Traditions & 5. Annual Celebrations */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))',
          gap: '20px',
          marginBottom: '22px'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} />
            <span>{t.aboutTraditionsTitle}</span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {deityInfo.traditions.map((trad, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                <span style={{ color: 'var(--color-temple-brown)', fontWeight: 800 }}>✦</span>
                <span>{trad}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} />
            <span>{t.aboutAnnualTitle}</span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {deityInfo.annualFestivals.map((fest, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                <span style={{ color: 'var(--color-temple-brown)', fontWeight: 800 }}>❖</span>
                <span>{fest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. Temple Heritage */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '22px'
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Landmark size={18} />
          <span>{t.aboutHeritageTitle}</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
          {deityInfo.heritage.map((h, idx) => (
            <p key={idx}>{h}</p>
          ))}
        </div>
      </div>

      {/* 7. Historical Photographs */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '22px',
          marginBottom: '22px'
        }}
      >
        <h3 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Camera size={18} />
          <span>{t.aboutPhotosTitle}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '14px' }}>
          {deityInfo.historicalPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                backgroundColor: '#FFFDF5',
                border: '1.5px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                minWidth: 0
              }}
            >
              <img
                src={photo.image}
                alt={language === 'ta' ? photo.titleTa : photo.title}
                loading="lazy"
                className="temple-img-hover"
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-temple-brown)' }}>
                    {language === 'ta' ? photo.titleTa : photo.title}
                  </h4>
                  {photo.isOriginal && (
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        backgroundColor: '#FFE9A8',
                        color: '#3E2114',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        flexShrink: 0
                      }}
                    >
                      {language === 'ta' ? 'அசல் படம்' : 'ORIGINAL'}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                  {language === 'ta' ? photo.captionTa : photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', padding: '10px 0 20px 0' }}>
        <button
          type="button"
          onClick={() => onNavigate('darisanam')}
          className="btn-temple-primary"
          style={{ padding: '10px 26px', borderRadius: '24px' }}
        >
          <span>{t.navDarisanam}</span>
          <ArrowRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('annadhanam')}
          className="btn-temple-secondary"
          style={{ padding: '10px 26px', borderRadius: '24px' }}
        >
          <span>{t.aboutExploreAnnadhanamBtn}</span>
        </button>
      </div>
    </div>
  );
};
