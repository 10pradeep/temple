import React from 'react';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { DeityInfo, PageView } from '../types';
import { Language, translations } from '../translations';

interface DeityDetailsSectionProps {
  deityInfo: DeityInfo;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const DeityDetailsSection: React.FC<DeityDetailsSectionProps> = ({
  deityInfo,
  onNavigate,
  language
}) => {
  const t = translations[language];
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '20px',
            alignItems: 'center',
            padding: '20px 16px',
            backgroundColor: 'var(--color-section-bg)'
          }}
        >
          {/* Original Deity Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '2.5px solid var(--color-temple-brown)',
              boxShadow: '0 4px 18px rgba(109, 53, 24, 0.22)',
              maxHeight: '340px',
              minWidth: 0
            }}
          >
            <img
              src="/images/opt/deity.jpg"
              alt="Mouna Gurunathar - Arul Tharum Muneeswaran"
              loading="lazy"
              className="temple-img-hover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fb) {
                  target.dataset.fb = '1';
                  target.src = '/images/deity.jpg';
                }
              }}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block'
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(109, 53, 24, 0.95) 0%, rgba(109, 53, 24, 0.5) 70%, transparent 100%)',
                padding: '16px 14px 10px 14px',
                textAlign: 'center'
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: '#FFD54F',
                  letterSpacing: '0.8px'
                }}
              >
                {language === 'ta' ? t.moolaMantra : deityInfo.mantra}
              </span>
            </div>
          </div>

          {/* Mouna Gurunathar Information */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  backgroundColor: 'var(--color-temple-brown)',
                  color: '#FFD54F',
                  border: '1px solid #FFD54F',
                  padding: '3px 12px',
                  borderRadius: '12px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  display: 'inline-block'
                }}
              >
                {t.deityBadge}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 3.2vw, 1.85rem)',
                fontWeight: 800,
                color: 'var(--color-temple-brown)',
                lineHeight: 1.2,
                marginBottom: '4px'
              }}
            >
              {language === 'ta' ? t.deityTitle : deityInfo.name}
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                color: 'var(--color-temple-brown)',
                fontWeight: 700,
                marginBottom: '12px'
              }}
            >
              {language === 'ta' ? t.deitySubtitle : deityInfo.subtitle}
            </p>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-text-main)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}
            >
              {language === 'ta' ? t.deityIntro : deityInfo.shortIntro}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: '8px',
                marginBottom: '18px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFDF5',
                  border: '1.5px solid var(--color-border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-temple-brown)', fontWeight: 700, fontSize: '0.82rem' }}>
                  <ShieldCheck size={15} />
                  <span>{t.deityFeat1Title}</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {t.deityFeat1Sub}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFDF5',
                  border: '1.5px solid var(--color-border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-temple-brown)', fontWeight: 700, fontSize: '0.82rem' }}>
                  <Sparkles size={15} />
                  <span>{t.deityFeat2Title}</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {t.deityFeat2Sub}
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="btn-temple-primary"
                style={{ fontSize: '0.92rem', padding: '10px 24px', borderRadius: '24px' }}
              >
                <BookOpen size={16} />
                <span>{t.deityViewDetailsBtn}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
