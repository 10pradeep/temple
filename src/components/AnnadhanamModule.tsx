import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import {
  AnnadhanamBooking,
  AnnadhanamConfig,
  CommonReceiptData,
  PageView,
  PaymentStatus
} from '../types';
import { formatLocalDateISO } from '../data/mockData';
import { Language, translations } from '../translations';
import { ReceiptView } from './ReceiptModal';

interface AnnadhanamModuleProps {
  annadhanamConfig: AnnadhanamConfig;
  bookings: AnnadhanamBooking[];
  onAddBooking: (booking: AnnadhanamBooking) => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const AnnadhanamModule: React.FC<AnnadhanamModuleProps> = ({
  annadhanamConfig,
  bookings,
  onAddBooking,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [today] = useState<Date>(() => new Date());

  const sponsorshipAmount = Math.max(1, annadhanamConfig.sponsorshipAmount || 100);
  const maxPerSlot = Math.max(1, annadhanamConfig.maxBookingsPerSlot || 1);

  // Build rolling 1-month (30-day) calendar using local timezone dates
  const rollingMonthDates = useMemo(() => {
    const unavailableSet = new Set(annadhanamConfig.unavailableDates);
    const disabledSlotSet = new Set(annadhanamConfig.disabledSlots);

    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = formatLocalDateISO(d);
      const dayName = d.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { month: 'short' });

      const lunchDisabled = disabledSlotSet.has(`${dateStr}|Lunch`);
      const eveningDisabled = disabledSlotSet.has(`${dateStr}|Evening Prasadam`);

      const lunchBookings = bookings.filter(
        (b) => b.date === dateStr && b.mealType === 'Lunch' && b.paymentStatus !== 'failed'
      ).length;
      const eveningBookings = bookings.filter(
        (b) => b.date === dateStr && b.mealType === 'Evening Prasadam' && b.paymentStatus !== 'failed'
      ).length;

      const lunchBooked = lunchBookings >= maxPerSlot;
      const eveningBooked = eveningBookings >= maxPerSlot;

      const isAdminUnavailable = unavailableSet.has(dateStr) || (lunchDisabled && eveningDisabled);
      const isLunchOpen = !isAdminUnavailable && !lunchDisabled && !lunchBooked;
      const isEveningOpen = !isAdminUnavailable && !eveningDisabled && !eveningBooked;
      const isFullyBooked = !isAdminUnavailable && !isLunchOpen && !isEveningOpen;

      let status: 'available' | 'booked' | 'unavailable' = 'available';
      if (isAdminUnavailable) status = 'unavailable';
      else if (isFullyBooked) status = 'booked';

      return {
        dateStr,
        dayName,
        dayNum,
        monthName,
        status,
        isLunchOpen,
        isEveningOpen,
        lunchBooked,
        eveningBooked,
        lunchDisabled,
        eveningDisabled
      };
    });
  }, [today, language, annadhanamConfig, bookings, maxPerSlot]);

  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const firstOpen = rollingMonthDates.find((d) => d.status === 'available');
    return firstOpen?.dateStr || rollingMonthDates[0]?.dateStr || '';
  });

  const selectedDayInfo =
    rollingMonthDates.find((d) => d.dateStr === selectedDateStr) || rollingMonthDates[0];

  const [mealType, setMealType] = useState<'Lunch' | 'Evening Prasadam'>(() => {
    if (selectedDayInfo && !selectedDayInfo.isLunchOpen && selectedDayInfo.isEveningOpen) {
      return 'Evening Prasadam';
    }
    return 'Lunch';
  });

  const [devoteeName, setDevoteeName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [dedicationMessage, setDedicationMessage] = useState('');

  const [step, setStep] = useState<'select' | 'review' | 'payment-demo' | 'status'>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordedBooking, setRecordedBooking] = useState<AnnadhanamBooking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalAmount = sponsorshipAmount * quantity;

  const isSelectedSlotAvailable = selectedDayInfo
    ? mealType === 'Lunch'
      ? selectedDayInfo.isLunchOpen
      : selectedDayInfo.isEveningOpen
    : false;

  const handleSelectDate = (day: (typeof rollingMonthDates)[number]) => {
    if (day.status === 'unavailable') return;
    if (day.status === 'booked') {
      setErrors((prev) => ({
        ...prev,
        date:
          language === 'ta'
            ? `${day.dateStr} தேதி முழுமையாகப் பதிவாகிவிட்டது (சிவப்பு). தயவுசெய்து பச்சை நிறத்தில் உள்ள கிடைக்கும் தேதியைத் தேர்வு செய்க.`
            : `${day.dateStr} is fully booked (Red). Please select an Available (Green) date.`
      }));
      return;
    }
    setSelectedDateStr(day.dateStr);
    if (day.isLunchOpen && !day.isEveningOpen) {
      setMealType('Lunch');
    } else if (!day.isLunchOpen && day.isEveningOpen) {
      setMealType('Evening Prasadam');
    }
    setErrors((prev) => ({ ...prev, date: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!selectedDayInfo || selectedDayInfo.status === 'unavailable') {
      errs.date =
        language === 'ta'
          ? 'தேர்ந்தெடுத்த தேதி தற்போது முன்பதிவுக்கு இல்லை.'
          : 'Selected date is currently unavailable for sponsorship.';
    } else if (!isSelectedSlotAvailable) {
      errs.date =
        language === 'ta'
          ? 'இந்த நேர இடைவெளி முழுமையாகப் பதிவாகிவிட்டது அல்லது நிறுத்தப்பட்டுள்ளது.'
          : 'This meal slot is already fully booked or unavailable. Please choose another slot/date.';
    }
    if (!devoteeName.trim()) {
      errs.devoteeName = language === 'ta' ? 'பக்தர் பெயர் அவசியம்.' : 'Devotee name is required.';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile =
        language === 'ta'
          ? 'சரியான 10 இலக்க அலைபேசி எண் அவசியம்.'
          : 'Please enter a valid 10-digit mobile number.';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email =
        language === 'ta'
          ? 'சரியான மின்னஞ்சல் முகவரி அவசியம்.'
          : 'Please enter a valid email address.';
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
          ? `ANN-${now.getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`
          : `ANN-PENDING-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`;
      const payRef = `DEMO-ANN-${Math.floor(100000 + Math.random() * 899999)}`;

      const booking: AnnadhanamBooking = {
        id: `ann-${Date.now()}`,
        receiptNumber: recNo,
        paymentReference: payRef,
        devoteeName: devoteeName.trim(),
        mobile: mobile.replace(/\D/g, ''),
        email: email.trim(),
        date: selectedDateStr,
        mealType,
        quantity,
        amount: totalAmount,
        dedicationMessage: dedicationMessage.trim(),
        paymentStatus: outcome,
        createdAt: now.toISOString(),
        isDemo: true
      };

      onAddBooking(booking);
      setRecordedBooking(booking);
      setIsProcessing(false);
      setStep('status');
    }, 700);
  };

  const receiptData: CommonReceiptData | null =
    recordedBooking && recordedBooking.paymentStatus === 'verified'
      ? {
          receiptNumber: recordedBooking.receiptNumber,
          paymentReference: recordedBooking.paymentReference,
          devoteeName: recordedBooking.devoteeName,
          mobile: recordedBooking.mobile,
          email: recordedBooking.email,
          purpose: `Annadhanam Sponsorship — ${recordedBooking.mealType} (${recordedBooking.quantity} unit${recordedBooking.quantity > 1 ? 's' : ''})`,
          amount: recordedBooking.amount,
          date: recordedBooking.date,
          issuedAt: recordedBooking.createdAt,
          paymentStatus: recordedBooking.paymentStatus,
          category: 'annadhanam',
          extraNote: recordedBooking.dedicationMessage || undefined,
          isDemo: true
        }
      : null;

  return (
    <div className="annadhanam-module" style={{ maxWidth: '960px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '18px',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid var(--color-temple-brown)',
            maxHeight: '200px'
          }}
        >
          <img
            src="/images/opt/annadhanam.jpg"
            alt="Mouna Gurunathar Temple Annadhanam Prasadam"
            loading="lazy"
            style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
          />
        </div>

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
            {t.annBadge}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.85rem)',
              color: 'var(--color-temple-brown)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '6px'
            }}
          >
            {t.annTitle}
          </h2>

          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
            {t.annSubtitle}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              padding: '5px 12px',
              borderRadius: '10px',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: 'var(--color-temple-brown)'
            }}
          >
            <UtensilsCrossed size={15} />
            <span>
              {language === 'ta'
                ? `ஒரு பதிவுக்குத் தொடக்கக் கட்டணம்: ₹${sponsorshipAmount}`
                : `Sponsorship Amount: ₹${sponsorshipAmount} per booking`}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Step Flow Bar */}
      <div className="temple-steps-bar" aria-label="Annadhanam Booking Steps">
        {[
          { key: 'select', label: language === 'ta' ? '1. தேதி & விவரம்' : '1. Date & Details', active: step === 'select', done: step !== 'select' },
          { key: 'review', label: language === 'ta' ? '2. சுருக்கம்' : '2. Review Summary', active: step === 'review', done: step === 'payment-demo' || step === 'status' },
          { key: 'payment', label: language === 'ta' ? '3. கட்டண இடைமுகம்' : '3. Demo Payment', active: step === 'payment-demo', done: step === 'status' },
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

      {step === 'select' && (
        <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* STEP 1: Rolling 1-Month Sponsorship Calendar */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarIcon size={18} color="var(--color-temple-brown)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)' }}>
                  {t.annStep1Title}
                </h3>
              </div>

              {/* Exact 4 Required Status Indicators */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#1B7A3C', borderRadius: '3px' }} />
                  {t.annAvailable}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#B91C1C', borderRadius: '3px' }} />
                  {t.annBooked}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#FFD54F',
                      border: '1.5px solid #6D3518',
                      borderRadius: '3px'
                    }}
                  />
                  {t.annSelected}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#9CA3AF',
                      borderRadius: '3px'
                    }}
                  />
                  {t.annUnavailable}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 74px), 1fr))',
                gap: '8px'
              }}
            >
              {rollingMonthDates.map((d) => {
                const isSelected = selectedDateStr === d.dateStr && d.status === 'available';

                let bg = '#EAF7EE';
                let border = '1.5px solid #1B7A3C';
                let textColor = '#14532D';
                let badgeLabel = language === 'ta' ? 'கிடைக்கும்' : 'OPEN';

                if (d.status === 'unavailable') {
                  bg = '#E5E7EB';
                  border = '1.5px solid #9CA3AF';
                  textColor = '#4B5563';
                  badgeLabel = language === 'ta' ? 'இல்லை' : 'N/A';
                } else if (d.status === 'booked') {
                  bg = '#FEE2E2';
                  border = '1.5px solid #B91C1C';
                  textColor = '#7F1D1D';
                  badgeLabel = language === 'ta' ? 'நிரம்பியது' : 'FULL';
                } else if (isSelected) {
                  bg = '#FFD54F';
                  border = '2px solid #6D3518';
                  textColor = '#3E2114';
                  badgeLabel = language === 'ta' ? 'தேர்வு' : 'SELECTED';
                }

                return (
                  <button
                    type="button"
                    key={d.dateStr}
                    disabled={d.status === 'unavailable'}
                    onClick={() => handleSelectDate(d)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: bg,
                      border,
                      color: textColor,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      boxShadow: isSelected ? '0 3px 10px rgba(109, 53, 24, 0.25)' : 'none',
                      opacity: d.status === 'unavailable' ? 0.78 : 1
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {d.dayName}
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, margin: '1px 0' }}>
                      {d.dayNum}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700 }}>{d.monthName}</span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        marginTop: '3px',
                        padding: '1px 5px',
                        borderRadius: '6px',
                        backgroundColor:
                          isSelected ? '#6D3518' : d.status === 'booked' ? '#B91C1C' : 'rgba(255,255,255,0.75)',
                        color: isSelected ? '#FFD54F' : d.status === 'booked' ? '#FFFFFF' : textColor
                      }}
                    >
                      {badgeLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {errors.date && (
              <p style={{ color: '#B91C1C', fontSize: '0.78rem', fontWeight: 700, marginTop: '10px' }}>
                {errors.date}
              </p>
            )}
          </div>

          {/* STEP 2: Meal Slot & Sponsorship Units */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3
              style={{
                fontSize: '0.98rem',
                fontWeight: 800,
                color: 'var(--color-temple-brown)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Clock size={18} />
              <span>{t.annStep2Title}</span>
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '12px',
                marginBottom: '14px'
              }}
            >
              {(['Lunch', 'Evening Prasadam'] as const).map((slotKey) => {
                const isSelected = mealType === slotKey;
                const isOpen =
                  slotKey === 'Lunch' ? selectedDayInfo?.isLunchOpen : selectedDayInfo?.isEveningOpen;
                const isBooked =
                  slotKey === 'Lunch' ? selectedDayInfo?.lunchBooked : selectedDayInfo?.eveningBooked;

                return (
                  <button
                    type="button"
                    key={slotKey}
                    disabled={!isOpen}
                    onClick={() => setMealType(slotKey)}
                    style={{
                      textAlign: 'left',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: !isOpen
                        ? isBooked
                          ? '#FEE2E2'
                          : '#E5E7EB'
                        : isSelected
                          ? '#FFD54F'
                          : '#FFFDF5',
                      border: !isOpen
                        ? '1.5px solid #9CA3AF'
                        : isSelected
                          ? '2px solid #6D3518'
                          : '1.5px solid var(--color-border-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-main)' }}>
                        {slotKey === 'Lunch' ? t.annLunchTitle : t.annEveningTitle}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {slotKey === 'Lunch' ? t.annLunchDesc : t.annEveningDesc}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '10px',
                        backgroundColor: !isOpen
                          ? isBooked
                            ? '#B91C1C'
                            : '#4B5563'
                          : isSelected
                            ? '#6D3518'
                            : '#EAF7EE',
                        color: !isOpen || isSelected ? '#FFFFFF' : '#1B7A3C'
                      }}
                    >
                      {!isOpen ? (isBooked ? 'FULL' : 'UNAVAILABLE') : isSelected ? 'SELECTED' : 'OPEN'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ maxWidth: '300px' }}>
              <label className="form-label">{t.annMealsCountLabel}</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-select"
              >
                {[1, 2, 5, 10, 25, 50].map((q) => (
                  <option key={q} value={q}>
                    {q} {q === 1 ? 'Unit / Meal' : 'Units / Meals'} (₹{(q * sponsorshipAmount).toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 3: Devotee Information */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
              {t.annStep3Title}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '14px' }}>
              <div>
                <label className="form-label">{t.annNameLabel}</label>
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'முழுப் பெயர்' : 'Full name'}
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="form-input"
                />
                {errors.devoteeName && (
                  <p style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.devoteeName}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">{t.annMobileLabel}</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="form-input"
                />
                {errors.mobile && (
                  <p style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">{t.annEmailLabel}</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                {errors.email && (
                  <p style={{ color: '#B91C1C', fontSize: '0.75rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <label className="form-label">{t.annDedicationLabel}</label>
              <input
                type="text"
                placeholder={
                  language === 'ta'
                    ? 'விருப்ப அர்ப்பணிப்புச் செய்தி (பொதுவில் காட்டப்படாது)'
                    : 'Optional dedication message (kept private)'
                }
                value={dedicationMessage}
                onChange={(e) => setDedicationMessage(e.target.value)}
                className="form-input"
              />
            </div>

            <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
              {language === 'ta'
                ? 'தனியுரிமை: பக்தர்களின் தனிப்பட்ட விவரங்கள் பொதுப் பக்கத்தில் காட்டப்படாது.'
                : 'Privacy notice: Private donor names, mobile numbers, emails, and dedication notes are never displayed publicly.'}
            </p>
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
              <span style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)', display: 'block', fontWeight: 700 }}>
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட தேதி:' : 'Selected Date:'}{' '}
                <strong>{selectedDateStr}</strong> ({mealType})
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-temple-brown)' }}>
                {t.annTotalAmount} ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <button type="submit" className="btn-temple-primary" style={{ borderRadius: '24px' }}>
              <span>{t.annReviewBtn}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      {/* REVIEW STEP */}
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
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-temple-brown)', marginBottom: '12px' }}>
            {language === 'ta' ? 'அன்னதானப் பதிவுச் சுருக்கம்' : 'Review Annadhanam Sponsorship Summary'}
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
              <span className="form-label">{language === 'ta' ? 'பக்தர் பெயர்' : 'Devotee Name'}</span>
              <strong>{devoteeName}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'அலைபேசி' : 'Mobile'}</span>
              <strong>{mobile}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</span>
              <strong>{email}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'தேதி & நேரம்' : 'Selected Date & Slot'}</span>
              <strong>
                {selectedDateStr} ({mealType})
              </strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'கட்டணத் தொகை' : 'Sponsorship Amount'}</span>
              <strong style={{ color: '#1B7A3C', fontSize: '1.15rem' }}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setStep('select')} className="btn-temple-secondary">
              <ArrowLeft size={16} />
              <span>{language === 'ta' ? 'திருத்துக' : 'Edit'}</span>
            </button>
            <button type="button" onClick={() => setStep('payment-demo')} className="btn-temple-primary">
              <span>{language === 'ta' ? 'மாதிரி கட்டணப் பகுதிக்குச் செல்' : 'Proceed to Demo Payment'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* PAYMENT DEMONSTRATION INTERFACE */}
      {step === 'payment-demo' && (
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
              <strong>DEMONSTRATION PAYMENT INTERFACE:</strong> {t.annSimulateNotice}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.22rem', color: 'var(--color-temple-brown)' }}>
              {t.annSimulateTitle}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Amount: <strong>₹{totalAmount.toLocaleString('en-IN')}</strong> • {selectedDateStr} ({mealType})
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
              <span>{isProcessing ? 'Recording...' : t.annSimulateBtn}</span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleDemoPaymentOutcome('pending')}
              className="btn-temple-secondary"
            >
              <span>{language === 'ta' ? 'நிலுவை நிலையைச் சோதிக்க (ரசீது இல்லை)' : 'Simulate Pending Payment (No Receipt)'}</span>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => handleDemoPaymentOutcome('failed')}
              className="btn-temple-secondary"
              style={{ borderColor: '#B91C1C', color: '#B91C1C' }}
            >
              <span>{language === 'ta' ? 'தோல்வி நிலையைச் சோதிக்க (ரசீது இல்லை)' : 'Simulate Failed Payment (No Receipt)'}</span>
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

      {/* PAYMENT STATUS & UNIFIED RECEIPT (ONLY ON VERIFIED) */}
      {step === 'status' && recordedBooking && (
        <div>
          {recordedBooking.paymentStatus === 'verified' && receiptData ? (
            <ReceiptView
              receipt={receiptData}
              language={language}
              actionButtonLabel={t.annBookAnotherBtn}
              onSecondaryAction={() => {
                setStep('select');
                setRecordedBooking(null);
                const nextOpen = rollingMonthDates.find(
                  (d) => d.dateStr !== selectedDateStr && d.status === 'available'
                );
                if (nextOpen) setSelectedDateStr(nextOpen.dateStr);
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
              {recordedBooking.paymentStatus === 'failed' ? (
                <XCircle size={36} color="#B91C1C" style={{ margin: '0 auto 8px auto' }} />
              ) : (
                <CheckCircle2 size={36} color="#B45309" style={{ margin: '0 auto 8px auto' }} />
              )}
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-temple-brown)', marginBottom: '6px' }}>
                {language === 'ta'
                  ? `கட்டண நிலை: ${recordedBooking.paymentStatus.toUpperCase()} (மாதிரி)`
                  : `Payment Status: ${recordedBooking.paymentStatus.toUpperCase()} (Demo)`}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {language === 'ta'
                  ? `குறிப்பு: ${recordedBooking.paymentReference}. கட்டணம் சரிபார்க்கப்பட்ட பிறகே அதிகாரப்பூர்வ ரசீது வழங்கப்படும்.`
                  : (
                      <>
                        Reference: <strong>{recordedBooking.paymentReference}</strong>. Official receipt is withheld until payment verification succeeds.
                      </>
                    )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setStep('payment-demo')} className="btn-temple-primary">
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
