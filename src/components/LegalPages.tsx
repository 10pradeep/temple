import React from 'react';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { PageView, TempleLocationConfig } from '../types';
import { Language } from '../translations';

interface LegalPageProps {
  locationConfig: TempleLocationConfig;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const PrivacyPolicyView: React.FC<LegalPageProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '18px 12px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <ShieldCheck size={24} color="var(--color-temple-brown)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.7rem)' }}>
            {language === 'ta'
              ? 'தனியுரிமைக் கொள்கை — மௌன குருநாதர் திருக்கோயில்'
              : 'Privacy Policy — Mouna Gurunathar Temple'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', lineHeight: 1.65 }}>
          <p>
            <strong>1. Devotee Information Confidentiality:</strong> Mouna Gurunathar Temple respects devotee privacy. Mobile numbers, email addresses, booking references, and personal dedication messages entered in Book Darisanam, Make Donation, and Annadhanam are never exposed publicly on the website.
          </p>
          <p>
            <strong>2. Prototype Local Storage Notice:</strong> In the current frontend demonstration version, booking requests, calendar additions, and session settings are stored locally in your browser via <code>localStorage</code> and are not transmitted to an external payment gateway or production server.
          </p>
          <p>
            <strong>3. Receipt Access Control:</strong> Official-format demonstration receipts are accessible only during the submitting devotee&apos;s verified workflow or through authenticated access inside the Admin Panel Receipt Management section.
          </p>
          <p>
            <strong>4. Contact for Privacy Inquiries:</strong> Official Email: <strong>{locationConfig.email}</strong> (update verified temple email in Admin Panel before production launch).
          </p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={() => onNavigate('home')} className="btn-temple-primary">
            <ArrowLeft size={16} />
            <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Mouna Gurunathar Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsConditionsView: React.FC<LegalPageProps> = ({
  locationConfig,
  onNavigate,
  language
}) => {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '18px 12px' }}>
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <FileText size={24} color="var(--color-temple-brown)" />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.25rem, 3vw, 1.7rem)' }}>
            {language === 'ta'
              ? 'விதிமுறைகள் மற்றும் நிபந்தனைகள் — மௌன குருநாதர் திருக்கோயில்'
              : 'Terms and Conditions — Mouna Gurunathar Temple'}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', lineHeight: 1.65 }}>
          <p>
            <strong>1. Temple Portal Purpose:</strong> This portal serves devotees of Mouna Gurunathar Temple (Arul Tharum Muneeswaran) with festival schedules, Darisanam slot requests, Annadhanam sponsorship scheduling, and temple updates.
          </p>
          <p>
            <strong>2. Demonstration Mode Disclaimer:</strong> Payment gateways, online receipt issuance, Darisanam confirmation status, and Admin authentication operate in frontend demonstration mode until connected to Mouna Gurunathar Temple&apos;s authorized backend server. No real financial transactions are processed here.
          </p>
          <p>
            <strong>3. Darisanam & Annadhanam Guidelines:</strong> Darisanam requests are restricted to the configured seven-day rolling window. Unverified Panchangam lunar dates are clearly marked as estimates until approved by temple archakars/administrators.
          </p>
          <p>
            <strong>4. Official Contact:</strong> {locationConfig.templeName} — {locationConfig.email}
          </p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="button" onClick={() => onNavigate('home')} className="btn-temple-primary">
            <ArrowLeft size={16} />
            <span>{language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return to Mouna Gurunathar Home'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

