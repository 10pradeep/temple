import React from 'react';
import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { TempleLocationConfig } from '../types';
import { Language, translations } from '../translations';

interface TempleLocationSectionProps {
  locationConfig: TempleLocationConfig;
  language: Language;
}

export const TempleLocationSection: React.FC<TempleLocationSectionProps> = ({
  locationConfig,
  language
}) => {
  const t = translations[language];
  const rawMapsUrl = locationConfig.googleMapsUrl ? locationConfig.googleMapsUrl.trim() : '';
  const hasMapsUrl = /^https?:\/\//i.test(rawMapsUrl);

  return (
    <section className="temple-location-section" style={{ margin: '24px 0 32px 0' }}>
      <div
        className="temple-card"
        style={{
          border: '1.5px solid var(--color-border-gold)',
          backgroundColor: 'var(--color-section-bg)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden'
        }}
      >
        {/* Section Header */}
        <div
          style={{
            backgroundColor: 'var(--color-temple-brown)',
            borderBottom: '2.5px solid var(--color-gold-bright)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 213, 79, 0.25)',
                border: '1.5px solid #FFD54F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFD54F',
                flexShrink: 0
              }}
            >
              <MapPin size={20} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#FFFFFF',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  letterSpacing: '0.4px'
                }}
              >
                {t.locTitle}
              </h3>
              <p style={{ color: '#FFE9A8', fontSize: '0.76rem', fontWeight: 500 }}>
                {t.locSubtitle}
              </p>
            </div>
          </div>

          {hasMapsUrl ? (
            <a
              href={locationConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-temple-gold"
              style={{ padding: '7px 16px', fontSize: '0.8rem', borderRadius: '20px' }}
            >
              <Navigation size={14} />
              <span>{t.locOpenInMaps}</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span
              style={{
                backgroundColor: 'rgba(255, 253, 245, 0.14)',
                border: '1px solid #FFD54F',
                color: '#FFE9A8',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldAlert size={14} color="#FFD54F" />
              <span>{language === 'ta' ? 'வரைபட இணைப்பு நிர்வாகத்தால் சேர்க்கப்படும்' : 'Maps Link Pending Verification'}</span>
            </span>
          )}
        </div>

        {/* Section Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '16px',
            padding: '18px 16px',
            backgroundColor: 'var(--color-section-bg)'
          }}
        >
          {/* Address, Timings & Office Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
            <div
              style={{
                backgroundColor: '#FFFDF5',
                border: '1.5px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={20} color="var(--color-temple-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                    {locationConfig.templeName}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                    {locationConfig.addressLine1}
                    <br />
                    {locationConfig.addressLine2}
                    <br />
                    {locationConfig.city}, {locationConfig.district}
                    <br />
                    {locationConfig.state} — {locationConfig.pincode}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFDF5',
                border: '1.5px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={20} color="var(--color-temple-brown)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '6px' }}>
                    {t.locTimingsTitle}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: '8px', fontSize: '0.8rem' }}>
                    <div style={{ backgroundColor: '#FFE9A8', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border-gold)' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-temple-brown)', display: 'block' }}>{t.locMorning}:</span>
                      <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>{locationConfig.darshanMorning}</span>
                    </div>
                    <div style={{ backgroundColor: '#FFE9A8', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--color-border-gold)' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-temple-brown)', display: 'block' }}>{t.locEvening}:</span>
                      <span style={{ color: 'var(--color-text-main)', fontWeight: 600 }}>{locationConfig.darshanEvening}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.84rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-temple-brown)',
                  fontWeight: 700
                }}
              >
                <Phone size={15} />
                <span>{locationConfig.phone}</span>
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-temple-brown)',
                  fontWeight: 700,
                  wordBreak: 'break-word'
                }}
              >
                <Mail size={15} />
                <span>{locationConfig.email}</span>
              </span>
            </div>
          </div>

          {/* Honest Map & Location Marker Card (Never invents coordinates/streets) */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1.5px solid var(--color-border-gold)',
              minHeight: '230px',
              backgroundColor: '#FFFDF5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                flex: 1,
                position: 'relative',
                background: 'radial-gradient(circle at 50% 45%, #FFFDF5 0%, #FFE9A8 100%)',
                padding: '22px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '10px'
              }}
            >
              {/* Subtle geometric compass grid (decorative only — not fake streets) */}
              <svg
                width="100%"
                height="100%"
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }}
              >
                <pattern id="templeCompassGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#C89624" strokeWidth="0.7" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#templeCompassGrid)" />
              </svg>

              {/* Location Marker */}
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50% 50% 50% 0',
                    backgroundColor: 'var(--color-temple-brown)',
                    transform: 'rotate(-45deg)',
                    border: '2px solid #FFD54F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(109, 53, 24, 0.35)'
                  }}
                >
                  <span style={{ transform: 'rotate(45deg)', color: '#FFD54F', fontWeight: 800, fontSize: '18px' }}>
                    ॐ
                  </span>
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    backgroundColor: 'var(--color-temple-brown)',
                    color: '#FFE9A8',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '5px 12px',
                    borderRadius: '14px',
                    border: '1px solid #FFD54F',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {locationConfig.templeName}
                </div>

                <p
                  style={{
                    marginTop: '8px',
                    fontSize: '0.76rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '300px',
                    lineHeight: 1.45,
                    fontWeight: 600
                  }}
                >
                  {locationConfig.isVerified && hasMapsUrl
                    ? `${locationConfig.district}, ${locationConfig.state}`
                    : locationConfig.verificationNote}
                </p>
              </div>
            </div>

            {/* Bottom Map Action Bar */}
            <div
              style={{
                backgroundColor: '#FFFDF5',
                borderTop: '1.5px solid var(--color-border-gold)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.76rem'
              }}
            >
              <span
                style={{
                  color: locationConfig.isVerified ? '#1B7A3C' : '#92400E',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 800
                }}
              >
                {locationConfig.isVerified ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>{t.locVerified}</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert size={14} />
                    <span>{t.locPendingVerification}</span>
                  </>
                )}
              </span>

              {hasMapsUrl ? (
                <a
                  href={locationConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-temple-brown)', fontWeight: 800, textDecoration: 'underline' }}
                >
                  {t.locGetDirections}
                </a>
              ) : (
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                  {language === 'ta' ? 'வழித்தடம் (நிர்வாகப் பலகையில் சேர்க்கவும்)' : 'Directions (Configure Maps URL in Admin)'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
