import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Navigation, ExternalLink, ShieldAlert } from 'lucide-react';
import { PageView, TempleLocationConfig } from '../types';
import { Language, translations } from '../translations';

interface ContactModuleProps {
  locationConfig: TempleLocationConfig;
  onNavigate?: (page: PageView) => void;
  language: Language;
}

export const ContactModule: React.FC<ContactModuleProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const rawMapsUrl = locationConfig.googleMapsUrl ? locationConfig.googleMapsUrl.trim() : '';
  const hasMapsUrl = /^https?:\/\//i.test(rawMapsUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="contact-module" style={{ maxWidth: '960px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '22px 18px',
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
          {t.contactOfficeBadge}
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3.5vw, 2.05rem)',
            color: 'var(--color-temple-brown)',
            fontWeight: 800,
            marginBottom: '4px'
          }}
        >
          {t.contactTitle}
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
          {t.contactSubtitle}
        </p>

        {!locationConfig.isVerified && (
          <div
            style={{
              marginTop: '12px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #D97706',
              color: '#78350F',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{locationConfig.verificationNote}</span>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 265px), 1fr))',
          gap: '22px'
        }}
      >
        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-temple-brown)',
                  color: '#FFD54F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                  {t.contactAddressTitle}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                  {locationConfig.templeName}
                  <br />
                  {locationConfig.addressLine1}
                  <br />
                  {locationConfig.addressLine2}
                  <br />
                  {locationConfig.city}, {locationConfig.district}
                  <br />
                  {locationConfig.state} — {locationConfig.pincode}
                </p>
                {hasMapsUrl && (
                  <a
                    href={locationConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: 'var(--color-temple-brown)',
                      fontWeight: 800,
                      marginTop: '8px'
                    }}
                  >
                    <Navigation size={13} />
                    <span>{t.locOpenInMaps}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-temple-brown)',
                  color: '#FFD54F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                  {t.contactPhoneTitle}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-main)' }}>
                  {language === 'ta' ? 'தலைமை அலுவலகம்:' : 'Main Office:'} <strong>{locationConfig.phone}</strong>
                  <br />
                  {language === 'ta' ? 'உதவி எண்:' : 'Helpline:'} <strong>{locationConfig.secondaryPhone}</strong>
                </p>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px' }}>
                  {t.contactHoursNote}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-temple-brown)',
                  color: '#FFD54F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                  {t.contactEmailTitle}
                </h4>
                <span style={{ fontSize: '0.86rem', color: 'var(--color-temple-brown)', fontWeight: 700, wordBreak: 'break-word' }}>
                  {locationConfig.email}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px' }}>
                  {language === 'ta'
                    ? 'நிர்வாக பலகை → அமைவிடம் பகுதியில் அதிகாரப்பூர்வ மின்னஞ்சலை மாற்றலாம்.'
                    : 'Update verified temple email anytime from Admin Panel → Location.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-xl)',
            padding: '22px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--color-temple-brown)', fontWeight: 800, marginBottom: '6px' }}>
            {t.contactInquiryTitle}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            {t.contactInquirySub}
          </p>

          {submitted ? (
            <div
              style={{
                backgroundColor: '#EAF7EE',
                border: '1.5px solid #1B7A3C',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                textAlign: 'center'
              }}
            >
              <CheckCircle2 size={36} color="#1B7A3C" style={{ margin: '0 auto 8px auto' }} />
              <h4 style={{ color: '#1B7A3C', fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>
                {t.contactSuccessTitle}
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#14532D' }}>{t.contactSuccessDesc}</p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setMessage('');
                }}
                className="btn-temple-secondary"
                style={{ marginTop: '14px', fontSize: '0.8rem' }}
              >
                {language === 'ta' ? 'மற்றொரு செய்தி அனுப்பு' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="form-label">{t.contactNameLabel} *</label>
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'உங்கள் முழுப் பெயர்' : 'Your full name'}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">{t.contactPhoneLabel} *</label>
                <input
                  type="tel"
                  placeholder={language === 'ta' ? '10 இலக்க அலைபேசி எண்' : '10-digit mobile number'}
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">{t.contactMsgLabel} *</label>
                <textarea
                  rows={4}
                  placeholder={
                    language === 'ta'
                      ? 'தரிசனம், பூசை அல்லது கோயில் குறித்த உங்கள் கேள்வியை எழுதவும்...'
                      : 'Write your question regarding darisanam, poojas, or temple information...'
                  }
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <button type="submit" className="btn-temple-primary" style={{ padding: '10px 22px', borderRadius: '24px' }}>
                  <Send size={15} />
                  <span>{t.contactSubmitBtn}</span>
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy')}
                    style={{ fontSize: '0.78rem', color: 'var(--color-temple-brown)', textDecoration: 'underline', fontWeight: 700 }}
                  >
                    {t.footerPrivacy}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
