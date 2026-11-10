import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle,
  ArrowRight,
  KeyRound,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';
import { PageView } from '../types';
import { Language, translations } from '../translations';
import {
  clearDemoPasscode,
  generateRuntimeDemoPasscode,
  hasConfiguredDemoPasscode,
  saveDemoPasscode,
  verifyDemoPasscode
} from '../utils/demoAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onNavigate,
  language
}) => {
  const t = translations[language];

  const [loginId, setLoginId] = useState('');
  const [airNumber, setAirNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [hasPasscodeSetup, setHasPasscodeSetup] = useState<boolean>(() => hasConfiguredDemoPasscode());
  const [sessionGeneratedCode, setSessionGeneratedCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerateSessionPasscode = async () => {
    const runtimeCode = generateRuntimeDemoPasscode();
    await saveDemoPasscode(runtimeCode);
    setHasPasscodeSetup(true);
    setSessionGeneratedCode(runtimeCode);
    if (!loginId.trim()) setLoginId('trustee-admin');
    if (!airNumber.trim()) setAirNumber('AIR-PENDING-VERIFICATION');
    setPassword(runtimeCode);
    setErrorMsg('');
    setInfoMsg(
      language === 'ta'
        ? 'தற்போதைய உலாவி அமர்வுக்கு தற்காலிக மாதிரி கடவுச்சொல் உருவாக்கப்பட்டது.'
        : 'Temporary browser-local demo passcode generated and hashed for prototype testing.'
    );
  };

  const handleResetDemoPasscode = () => {
    clearDemoPasscode();
    setHasPasscodeSetup(false);
    setSessionGeneratedCode('');
    setPassword('');
    setErrorMsg('');
    setInfoMsg(
      language === 'ta'
        ? 'மாதிரி கடவுச்சொல் அழிக்கப்பட்டது. புதியதை அமைக்கவும்.'
        : 'Local demo passcode cleared. Set or generate a new prototype passcode below.'
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    const cleanLoginId = loginId.trim();
    const cleanAir = airNumber.trim();
    const cleanPassword = password;

    // Strict validation: AIR number alone is never accepted as sufficient authentication
    if (cleanAir && (!cleanLoginId || !cleanPassword.trim())) {
      setErrorMsg(
        language === 'ta'
          ? 'AIR எண் மட்டும் போதாது. நிர்வாகி ஐடி மற்றும் கடவுச்சொல் இரண்டும் அவசியம்.'
          : 'An AIR number alone is not sufficient for authentication. Enter both Administrator Login ID and Password.'
      );
      return;
    }

    if (!cleanLoginId || cleanLoginId.length < 3) {
      setErrorMsg(
        language === 'ta'
          ? 'சரியான நிர்வாகி உள்நுழைவு ஐடியை உள்ளிடவும் (குறைந்தது 3 எழுத்துகள்).'
          : 'Please enter a valid Administrator Login ID (minimum 3 characters).'
      );
      return;
    }

    if (!cleanAir) {
      setErrorMsg(
        language === 'ta'
          ? 'AIR அடையாள எண் அவசியம் (சரிபார்ப்புக்கு உட்பட்டது).'
          : 'AIR Number Identifier is required (subject to clarification & backend verification).'
      );
      return;
    }

    if (!cleanPassword.trim() || cleanPassword.length < 6) {
      setErrorMsg(
        language === 'ta'
          ? 'குறைந்தது 6 எழுத்துகள் கொண்ட கடவுச்சொல்லை உள்ளிடவும்.'
          : 'Please enter a password of at least 6 characters.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (!hasPasscodeSetup) {
        // Initialize local browser prototype passcode with the user-chosen passcode
        await saveDemoPasscode(cleanPassword);
        setHasPasscodeSetup(true);
        onLoginSuccess();
        return;
      }

      const valid = await verifyDemoPasscode(cleanPassword);
      if (valid) {
        onLoginSuccess();
      } else {
        setErrorMsg(
          language === 'ta'
            ? 'தவறான கடவுச்சொல். உங்கள் மாதிரி கடவுச்சொல்லைச் சரிபார்க்கவும் அல்லது மீட்டமைக்கவும்.'
            : 'Invalid password for this local browser prototype session. Re-check or reset your demo passcode below.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-view" style={{ maxWidth: '520px', margin: '32px auto', padding: '16px 12px' }}>
      <div
        className="temple-card"
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          padding: '26px 22px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-temple-brown)',
              border: '2px solid #FFD54F',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD54F',
              marginBottom: '10px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.65rem)',
              fontWeight: 800,
              color: 'var(--color-temple-brown)',
              lineHeight: 1.2
            }}
          >
            {t.adminPortalTitle}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            {t.adminPortalSub}
          </p>
        </div>

        {/* Honest Security Architecture Notice */}
        <div
          style={{
            backgroundColor: '#FEF3C7',
            border: '1.5px solid #D97706',
            color: '#78350F',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.76rem',
            lineHeight: 1.45,
            marginBottom: '16px'
          }}
        >
          <strong>{language === 'ta' ? 'முன்மாதிரி பாதுகாப்பு அறிவிப்பு:' : 'PROTOTYPE AUTH NOTICE:'}</strong>{' '}
          {language === 'ta'
            ? 'இங்கு நிரந்தர கடவுச்சொற்கள் எதுவும் சேமிக்கப்படவில்லை. முழு நிர்வாக அங்கீகாரமும் AIR சரிபார்ப்பும் பாதுகாப்பான பின்புல சேவையில் இணைக்கப்பட வேண்டும்.'
            : 'No production credentials are hardcoded here. Full administrator verification and AIR number authentication require a secure backend identity service.'}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            role="alert"
            style={{
              backgroundColor: '#FEE2E2',
              border: '1.5px solid #B91C1C',
              color: '#7F1D1D',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Info Alert */}
        {infoMsg && (
          <div
            style={{
              backgroundColor: '#EAF7EE',
              border: '1.5px solid #1B7A3C',
              color: '#14532D',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '14px'
            }}
          >
            {infoMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Administrator Login ID */}
          <div>
            <label htmlFor="admin-login-id" className="form-label">
              {t.adminLoginIdLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-temple-brown)' }}>
                <User size={16} />
              </span>
              <input
                id="admin-login-id"
                type="text"
                placeholder="e.g. trustee-admin"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '36px' }}
                autoComplete="username"
              />
            </div>
          </div>

          {/* AIR Number Identifier (Subject to clarification & verification) */}
          <div>
            <label htmlFor="admin-air-number" className="form-label">
              {t.adminAirLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-temple-brown)' }}>
                <BadgeCheck size={16} />
              </span>
              <input
                id="admin-air-number"
                type="text"
                placeholder="Enter AIR identifier (subject to verification)"
                value={airNumber}
                onChange={(e) => setAirNumber(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '36px' }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '4px', display: 'block', fontWeight: 600 }}>
              {t.adminAirNote}
            </span>
          </div>

          {/* Password with Show/Hide toggle */}
          <div>
            <label htmlFor="admin-password" className="form-label">
              {t.adminPasswordLabel}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-temple-brown)' }}>
                <Lock size={16} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder={
                  hasPasscodeSetup
                    ? 'Enter your configured demo passcode'
                    : 'Choose a demo passcode (min 6 chars) or generate below'
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '36px', paddingRight: '40px' }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  color: 'var(--color-temple-brown)',
                  padding: '2px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-temple-primary"
            style={{ padding: '12px', fontSize: '0.94rem', width: '100%', marginTop: '4px' }}
          >
            <KeyRound size={16} />
            <span>
              {isSubmitting
                ? language === 'ta'
                  ? 'சரிபார்க்கப்படுகிறது...'
                  : 'Verifying...'
                : hasPasscodeSetup
                  ? t.adminSignInBtn
                  : language === 'ta'
                    ? 'மாதிரி கடவுச்சொல் அமைத்து உள்நுழைக'
                    : 'Set Prototype Passcode & Sign In'}
            </span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Prototype Demo Passcode Helper (No hardcoded credentials) */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1.5px dashed var(--color-border-gold)',
            textAlign: 'center'
          }}
        >
          <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
            {t.adminDemoBox}
          </p>

          {sessionGeneratedCode && (
            <div
              style={{
                backgroundColor: '#FFFDF5',
                border: '1.5px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 10px',
                fontSize: '0.78rem',
                marginBottom: '10px',
                color: 'var(--color-text-main)'
              }}
            >
              {language === 'ta' ? 'தற்காலிக மாதிரி கடவுச்சொல்:' : 'Session Demo Passcode:'}{' '}
              <strong>{sessionGeneratedCode}</strong>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleGenerateSessionPasscode}
              className="btn-temple-secondary"
              style={{ fontSize: '0.76rem', padding: '7px 12px', borderRadius: '16px' }}
            >
              <RefreshCw size={13} />
              <span>
                {language === 'ta' ? 'தற்காலிக மாதிரி கடவுச்சொல் உருவாக்கு' : 'Generate Session Demo Passcode'}
              </span>
            </button>

            {hasPasscodeSetup && (
              <button
                type="button"
                onClick={handleResetDemoPasscode}
                className="btn-temple-gold"
                style={{ fontSize: '0.76rem', padding: '7px 12px', borderRadius: '16px' }}
              >
                <span>{language === 'ta' ? 'கடவுச்சொல் மீட்டமை' : 'Reset Demo Passcode'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Return Home */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            style={{ fontSize: '0.82rem', color: 'var(--color-temple-brown)', fontWeight: 700, textDecoration: 'underline' }}
          >
            {t.adminReturnHome}
          </button>
        </div>
      </div>
    </div>
  );
};
