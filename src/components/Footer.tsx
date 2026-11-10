import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { PageView, TempleLocationConfig } from '../types';
import { Language, translations } from '../translations';

interface FooterProps {
  locationConfig: TempleLocationConfig;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [currentYear] = useState(() => new Date().getFullYear());

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-temple-brown)',
        color: '#FFFDF5',
        borderTop: '3px solid var(--color-gold-bright)',
        position: 'relative',
        marginTop: 'auto',
        boxShadow: '0 -4px 16px rgba(109, 53, 24, 0.32)'
      }}
    >
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, #FFD54F 0%, #FFE9A8 50%, #FFD54F 100%)'
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 18px 20px 18px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}
        >
          {/* Column 1: Temple Identity & About Us */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #522710 0%, #6D3518 100%)',
                  border: '2px solid var(--color-gold-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFD54F',
                  fontWeight: 800,
                  fontSize: '20px',
                  flexShrink: 0
                }}
              >
                ॐ
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                    fontWeight: 800
                  }}
                >
                  {t.templeName}
                </h3>
                <p style={{ color: '#FFE9A8', fontSize: '0.8rem', marginTop: '1px', fontWeight: 600 }}>
                  {t.templeSubtitle}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#FFF2DF', lineHeight: 1.55, marginBottom: '12px' }}>
              {t.footerMission}
            </p>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              style={{
                color: '#FFD54F',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'underline',
                textAlign: 'left'
              }}
            >
              {t.navAbout} — {t.footerReadHistory}
            </button>
          </div>

          {/* Column 2: Quick Navigation Modules */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                color: '#FFD54F',
                marginBottom: '12px',
                borderBottom: '1.5px solid rgba(255, 213, 79, 0.4)',
                paddingBottom: '6px',
                fontWeight: 800
              }}
            >
              {t.footerServicesTitle}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '7px', fontSize: '0.85rem' }}>
              {[
                { id: 'calendar' as PageView, label: t.navCalendar },
                { id: 'darisanam' as PageView, label: t.navDarisanam },
                { id: 'donation' as PageView, label: t.navDonation },
                { id: 'annadhanam' as PageView, label: t.navAnnadhanam },
                { id: 'festival' as PageView, label: t.navFestival },
                { id: 'live' as PageView, label: t.navLive },
                { id: 'about' as PageView, label: t.navAbout },
                { id: 'contact' as PageView, label: t.navContact }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="footer-nav-btn"
                    style={{ color: '#FFE9A8', textAlign: 'left', fontWeight: 600 }}
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us & Official Email */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                color: '#FFD54F',
                marginBottom: '12px',
                borderBottom: '1.5px solid rgba(255, 213, 79, 0.4)',
                paddingBottom: '6px',
                fontWeight: 800
              }}
            >
              {t.footerContactTitle}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="#FFD54F" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#FFF5E8', lineHeight: 1.45 }}>
                  {locationConfig.templeName}, {locationConfig.addressLine1}, {locationConfig.district}, {locationConfig.state}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#FFD54F" style={{ flexShrink: 0 }} />
                <span style={{ color: '#FFE9A8', fontWeight: 700 }}>
                  {locationConfig.phone} {t.footerOfficialOffice}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#FFD54F" style={{ flexShrink: 0 }} />
                <span style={{ color: '#FFE9A8', fontWeight: 700, wordBreak: 'break-word' }}>
                  {locationConfig.email}
                </span>
              </div>

              <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px dashed rgba(255, 213, 79, 0.35)', fontSize: '0.78rem', color: '#FFE9A8' }}>
                {t.footerHours}: {locationConfig.darshanMorning} &amp; {locationConfig.darshanEvening}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1.5px', backgroundColor: 'rgba(255, 213, 79, 0.35)', margin: '18px 0' }} />

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: '#FFE9A8'
          }}
        >
          <div>
            © {currentYear} {t.footerCopyright}
            <span style={{ display: 'block', fontSize: '0.74rem', color: '#FFD54F', marginTop: '2px', fontWeight: 600 }}>
              Mouna Gurunathar | {t.templeSubtitle}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              style={{ color: '#FFE9A8', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'underline' }}
            >
              {t.footerPrivacy}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('terms')}
              style={{ color: '#FFE9A8', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'underline' }}
            >
              {t.footerTerms}
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Back to top"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 213, 79, 0.25)',
                border: '1.5px solid #FFD54F',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
