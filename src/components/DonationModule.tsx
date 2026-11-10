import React, { useState } from 'react';
import {
  HeartHandshake,
  AlertCircle,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { CommonReceiptData, DonationRecord, PageView, PaymentStatus } from '../types';
import { formatLocalDateISO } from '../data/mockData';
import { Language, translations } from '../translations';
import { ReceiptView } from './ReceiptModal';

interface DonationModuleProps {
  onAddDonation: (donation: DonationRecord) => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}

const SUGGESTED_AMOUNTS = [100, 251, 501, 1001];

const PURPOSES: Array<{ en: string; ta: string }> = [
  { en: 'General Temple Seva & Upkeep', ta: 'பொது திருக்கோயில் சேவை & பராமரிப்பு' },
  { en: 'Daily Pooja & Lamp Lighting (Deepam)', ta: 'தினசரி பூசை & தீப வழிபாடு' },
  { en: 'Mouna Gurunathar Festival Fund', ta: 'மௌன குருநாதர் திருவிழா நிதி' },
  { en: 'Temple Gopuram & Heritage Maintenance', ta: 'கோயில் கோபுரம் & திருப்பணி பராமரிப்பு' }
];

export const DonationModule: React.FC<DonationModuleProps> = ({
  onAddDonation,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [step, setStep] = useState<'form' | 'review' | 'payment' | 'status'>('form');

  const [donorName, setDonorName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>(PURPOSES[0].en);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordedDonation, setRecordedDonation] = useState<DonationRecord | null>(null);

  const parsedCustom = Number(customAmount);
  const resolvedAmount =
    selectedPreset === 'custom'
      ? Number.isFinite(parsedCustom) && parsedCustom >= 1
        ? Math.floor(parsedCustom)
        : 0
      : selectedPreset;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!donorName.trim()) {
      errs.donorName = language === 'ta' ? 'பக்தர் பெயர் அவசியம்.' : 'Donor name is required.';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile =
        language === 'ta' ? 'சரியான 10 இலக்க அலைபேசி எண் அவசியம்.' : 'Valid 10-digit mobile number is required.';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email =
        language === 'ta' ? 'சரியான மின்னஞ்சல் முகவரி அவசியம்.' : 'Valid email address is required.';
    }
    if (selectedPreset === 'custom' && (!customAmount.trim() || !Number.isFinite(parsedCustom) || parsedCustom < 1)) {
      errs.amount =
        language === 'ta' ? 'குறைந்தபட்சம் ₹1 அல்லது அதற்கு மேல் உள்ளிடவும்.' : 'Please enter a valid custom amount of at least ₹1.';
    } else if (resolvedAmount < 1) {
      errs.amount =
        language === 'ta' ? 'குறைந்தபட்சம் ₹1 அல்லது அதற்கு மேல் உள்ளிடவும்.' : 'Please select or enter an amount of at least ₹1.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('review');
    }
  };

  const handleDemoPaymentOutcome = (outcome: PaymentStatus) => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      const recNo =
        outcome === 'verified'
          ? `DON-${now.getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`
          : `PENDING-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;
      const payRef = `DEMO-PAY-${Math.floor(100000 + Math.random() * 899999)}`;

      const record: DonationRecord = {
        id: `don-${Date.now()}`,
        receiptNumber: recNo,
        paymentReference: payRef,
        donorName: donorName.trim(),
        mobile: mobile.replace(/\D/g, ''),
        email: email.trim(),
        amount: resolvedAmount,
        purpose,
        paymentStatus: outcome,
        createdAt: now.toISOString(),
        isDemo: true
      };

      onAddDonation(record);
      setRecordedDonation(record);
      setIsProcessing(false);
      setStep('status');
    }, 700);
  };

  const receiptData: CommonReceiptData | null =
    recordedDonation && recordedDonation.paymentStatus === 'verified'
      ? {
          receiptNumber: recordedDonation.receiptNumber,
          paymentReference: recordedDonation.paymentReference,
          devoteeName: recordedDonation.donorName,
          mobile: recordedDonation.mobile,
          email: recordedDonation.email,
          purpose: `Donation — ${recordedDonation.purpose}`,
          amount: recordedDonation.amount,
          date: formatLocalDateISO(new Date(recordedDonation.createdAt)),
          issuedAt: recordedDonation.createdAt,
          paymentStatus: recordedDonation.paymentStatus,
          category: 'donation',
          isDemo: true
        }
      : null;

  return (
    <div className="donation-module" style={{ maxWidth: '920px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px 18px',
          marginBottom: '18px',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            backgroundColor: 'var(--color-temple-brown)',
            color: '#FFE9A8',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.6px',
            display: 'inline-block',
            marginBottom: '8px'
          }}
        >
          {t.donBadge}
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.28rem, 3.4vw, 1.95rem)',
            color: 'var(--color-temple-brown)',
            fontWeight: 800,
            marginBottom: '6px'
          }}
        >
          {t.donTitle}
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
          {t.donSubtitle}
        </p>
      </div>

      {/* 4-Step Flow Bar */}
      <div className="temple-steps-bar" aria-label="Donation Steps">
        {[
          { key: 'form', label: language === 'ta' ? '1. தகவல் & தொகை' : '1. Info & Amount', active: step === 'form', done: step !== 'form' },
          { key: 'review', label: language === 'ta' ? '2. சுருக்கம்' : '2. Review Summary', active: step === 'review', done: step === 'payment' || step === 'status' },
          { key: 'payment', label: language === 'ta' ? '3. கட்டண இடைமுகம்' : '3. Demo Payment', active: step === 'payment', done: step === 'status' },
          { key: 'status', label: language === 'ta' ? '4. நிலை & ரசீது' : '4. Status & Receipt', active: step === 'status', done: false }
        ].map((st) => (
          <span
            key={st.key}
            className={`temple-step-pill ${st.active ? 'active' : st.done ? 'completed' : ''}`}
          >
            {st.label}
          </span>
        ))}
      </div>

      {/* STEP 1 & 2: Enter Donor Info & Select Amount */}
      {step === 'form' && (
        <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Step 1: Donor Details */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {language === 'ta' ? '1. நன்கொடையாளர் விவரங்கள்' : '1. Enter Donor Information'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '14px' }}>
              <div>
                <label className="form-label">{language === 'ta' ? 'பெயர் *' : 'Donor Name *'}</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder={language === 'ta' ? 'முழுப் பெயர்' : 'Full name'}
                  className="form-input"
                />
                {errors.donorName && (
                  <p style={{ color: '#B91C1C', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.donorName}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">{language === 'ta' ? 'அலைபேசி எண் *' : 'Mobile Number *'}</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  className="form-input"
                />
                {errors.mobile && (
                  <p style={{ color: '#B91C1C', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">{language === 'ta' ? 'மின்னஞ்சல் *' : 'Email Address *'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="form-input"
                />
                {errors.email && (
                  <p style={{ color: '#B91C1C', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">{language === 'ta' ? 'நன்கொடை நோக்கம்' : 'Donation Purpose'}</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="form-select"
                >
                  {PURPOSES.map((p) => (
                    <option key={p.en} value={p.en}>
                      {language === 'ta' ? p.ta : p.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Select Suggested Amount or Custom Amount */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {language === 'ta' ? '2. நன்கொடைத் தொகையைத் தேர்வு செய்க' : '2. Select Donation Amount'}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              {SUGGESTED_AMOUNTS.map((amt) => {
                const isSelected = selectedPreset === amt;
                return (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => {
                      setSelectedPreset(amt);
                      setErrors((prev) => ({ ...prev, amount: '' }));
                    }}
                    style={{
                      padding: '12px 20px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      backgroundColor: isSelected ? 'var(--color-temple-brown)' : '#FFFDF5',
                      color: isSelected ? '#FFD54F' : 'var(--color-text-main)',
                      border: isSelected ? '2px solid #FFD54F' : '1.5px solid var(--color-border-gold)',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSelectedPreset('custom')}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  backgroundColor: selectedPreset === 'custom' ? 'var(--color-temple-brown)' : '#FFFDF5',
                  color: selectedPreset === 'custom' ? '#FFD54F' : 'var(--color-text-main)',
                  border:
                    selectedPreset === 'custom'
                      ? '2px solid #FFD54F'
                      : '1.5px solid var(--color-border-gold)'
                }}
              >
                {language === 'ta' ? 'விருப்பத் தொகை' : 'Custom Amount'}
              </button>
            </div>

            {selectedPreset === 'custom' && (
              <div style={{ maxWidth: '280px' }}>
                <label className="form-label">
                  {language === 'ta' ? 'விருப்பத் தொகை (₹)' : 'Enter Custom Amount (₹)'}
                </label>
                <input
                  type="number"
                  min={1}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="e.g. 2001"
                  className="form-input"
                />
              </div>
            )}

            {errors.amount && (
              <p style={{ color: '#B91C1C', fontSize: '0.76rem', marginTop: '6px', fontWeight: 700 }}>
                {errors.amount}
              </p>
            )}
          </div>

          {/* Summary Bar */}
          <div
            style={{
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', fontWeight: 700 }}>
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட நன்கொடை:' : 'Selected Donation Amount:'}
              </span>
              <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-temple-brown)' }}>
                ₹{resolvedAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <button type="submit" className="btn-temple-primary" style={{ borderRadius: '24px' }}>
              <HeartHandshake size={17} />
              <span>{language === 'ta' ? 'நன்கொடை சுருக்கத்தை சரிபார்க்க' : 'Review Donation Summary'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Review Donation Summary */}
      {step === 'review' && (
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '2px solid var(--color-temple-brown)',
            borderRadius: 'var(--radius-xl)',
            padding: '22px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-temple-brown)', marginBottom: '14px' }}>
            {language === 'ta' ? '3. நன்கொடை சுருக்கம்' : '3. Review Donation Summary'}
          </h3>

          <div
            style={{
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '12px',
              marginBottom: '18px'
            }}
          >
            <div>
              <span className="form-label">{language === 'ta' ? 'பக்தர் பெயர்' : 'Donor Name'}</span>
              <strong>{donorName}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'அலைபேசி எண்' : 'Mobile Number'}</span>
              <strong>{mobile}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</span>
              <strong>{email}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'நன்கொடை நோக்கம்' : 'Purpose'}</span>
              <strong>{language === 'ta' ? PURPOSES.find((p) => p.en === purpose)?.ta || purpose : purpose}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'நன்கொடைத் தொகை' : 'Donation Amount'}</span>
              <strong style={{ fontSize: '1.2rem', color: '#1B7A3C' }}>
                ₹{resolvedAmount.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setStep('form')} className="btn-temple-secondary">
              <ArrowLeft size={16} />
              <span>{language === 'ta' ? 'மாற்றம் செய்' : 'Edit Details'}</span>
            </button>
            <button type="button" onClick={() => setStep('payment')} className="btn-temple-primary">
              <span>{language === 'ta' ? 'கட்டணப் பகுதிக்குச் செல்' : 'Proceed to Payment Interface'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Demonstration Payment Interface */}
      {step === 'payment' && (
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '2px solid var(--color-temple-brown)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div
            style={{
              backgroundColor: '#FEF3C7',
              border: '1.5px solid #D97706',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px'
            }}
          >
            <AlertCircle size={20} color="#B45309" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.8rem', color: '#78350F' }}>
              <strong>{language === 'ta' ? 'மாதிரி கட்டண இடைமுகம்:' : 'DEMONSTRATION PAYMENT INTERFACE:'}</strong>{' '}
              {language === 'ta'
                ? 'உண்மையான பணம் வசூலிக்கப்படாது. கார்டு/UPI விவரங்களை உள்ளிட வேண்டாம். சரிபார்க்கப்பட்ட மற்றும் நிலுவை/தோல்வி நிலைகளைச் சோதிக்க கீழ்க்காணும் பொத்தான்களைப் பயன்படுத்தவும்.'
                : 'No real money is collected and no card/UPI gateway is active. Do not enter real banking details. Use the demo buttons below to test verified vs pending/failed flows.'}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-temple-brown)' }}>
              {language === 'ta'
                ? `மௌன குருநாதர் திருக்கோயில் — மாதிரி நன்கொடை (₹${resolvedAmount.toLocaleString('en-IN')})`
                : `Mouna Gurunathar Temple — Demo Contribution (₹${resolvedAmount.toLocaleString('en-IN')})`}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              {language === 'ta'
                ? 'கட்டணம் சரிபார்க்கப்பட்டால் மட்டுமே ரசீது உருவாக்கப்படும்.'
                : 'Receipts are generated strictly when payment verification succeeds.'}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleDemoPaymentOutcome('verified')}
              className="btn-temple-primary"
            >
              <Lock size={15} />
              <span>
                {isProcessing
                  ? language === 'ta'
                    ? 'செயலாக்கப்படுகிறது...'
                    : 'Processing...'
                  : language === 'ta'
                    ? 'மாதிரி கட்டணம் முடி (சரிபார்க்கப்பட்டது)'
                    : 'Complete Demo Payment (Verified)'}
              </span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleDemoPaymentOutcome('pending')}
              className="btn-temple-secondary"
            >
              <span>
                {language === 'ta' ? 'நிலுவை நிலை சோதனை (ரசீது இல்லை)' : 'Simulate Pending Payment (No Receipt)'}
              </span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleDemoPaymentOutcome('failed')}
              className="btn-temple-secondary"
              style={{ borderColor: '#B91C1C', color: '#B91C1C' }}
            >
              <span>
                {language === 'ta' ? 'தோல்வி நிலை சோதனை (ரசீது இல்லை)' : 'Simulate Failed Payment (No Receipt)'}
              </span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setStep('review')}
              className="btn-temple-gold"
            >
              <span>{language === 'ta' ? 'பின்செல்' : 'Back'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 & 6: Payment Status & Unified Receipt (ONLY when verified!) */}
      {step === 'status' && recordedDonation && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recordedDonation.paymentStatus === 'verified' && receiptData ? (
            <ReceiptView
              receipt={receiptData}
              language={language}
              actionButtonLabel={language === 'ta' ? 'மற்றொரு நன்கொடை வழங்க' : 'Make Another Donation'}
              onSecondaryAction={() => {
                setStep('form');
                setRecordedDonation(null);
              }}
            />
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #D97706',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {recordedDonation.paymentStatus === 'failed' ? (
                <XCircle size={36} color="#B91C1C" style={{ margin: '0 auto 8px auto' }} />
              ) : (
                <CheckCircle2 size={36} color="#B45309" style={{ margin: '0 auto 8px auto' }} />
              )}
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-temple-brown)', marginBottom: '6px' }}>
                {language === 'ta'
                  ? `கட்டண நிலை: ${recordedDonation.paymentStatus.toUpperCase()} (மாதிரி)`
                  : `Payment Status: ${recordedDonation.paymentStatus.toUpperCase()} (Demo)`}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {language === 'ta'
                  ? `குறிப்பு: ${recordedDonation.paymentReference}. கட்டணம் சரிபார்க்கப்படாததால் அதிகாரப்பூர்வ ரசீது வழங்கப்படவில்லை.`
                  : (
                      <>
                        Reference: <strong>{recordedDonation.paymentReference}</strong>. Official receipt is withheld because payment is not verified.
                      </>
                    )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setStep('payment')} className="btn-temple-primary">
                  {language === 'ta' ? 'மாதிரி கட்டணத்தை மீண்டும் முயற்சி செய்க' : 'Retry Demo Payment'}
                </button>
                <button type="button" onClick={() => onNavigate('home')} className="btn-temple-secondary">
                  {language === 'ta' ? 'முகப்புக்குத் திரும்பு' : 'Return Home'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

