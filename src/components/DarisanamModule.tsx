import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { DarisanamBooking, DarisanamSlotTemplate, PageView } from '../types';
import { formatLocalDateISO } from '../data/mockData';
import { Language, translations } from '../translations';

interface DarisanamModuleProps {
  slots: DarisanamSlotTemplate[];
  bookings: DarisanamBooking[];
  onAddBooking: (booking: DarisanamBooking) => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const DarisanamModule: React.FC<DarisanamModuleProps> = ({
  slots,
  bookings,
  onAddBooking,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [today] = useState<Date>(() => new Date());

  // Strict rolling 7-day eligible booking window
  const eligibleDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = formatLocalDateISO(d);
      const dayName = d.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { month: 'short' });
      return { dateStr, dayName, dayNum, monthName, fullLabel: d.toDateString() };
    });
  }, [today, language]);

  const eligibleDateSet = useMemo(() => new Set(eligibleDates.map((d) => d.dateStr)), [eligibleDates]);

  const [step, setStep] = useState<'form' | 'review' | 'status'>('form');
  const [selectedDate, setSelectedDate] = useState<string>(eligibleDates[0]?.dateStr || '');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [devoteeName, setDevoteeName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [numberOfDevotees, setNumberOfDevotees] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<DarisanamBooking | null>(null);

  // Compute remaining places per slot for a given date (aggregate counts only — private names never exposed)
  const getSlotAvailability = (dateStr: string, slot: DarisanamSlotTemplate) => {
    const bookedCount = bookings
      .filter((b) => b.date === dateStr && b.slotId === slot.id && b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.numberOfDevotees, 0);
    const available = Math.max(0, slot.capacity - bookedCount);
    return {
      capacity: slot.capacity,
      booked: bookedCount,
      available,
      isFull: available <= 0
    };
  };

  const getDateRemainingPlaces = (dateStr: string) => {
    return slots.reduce((sum, slot) => sum + getSlotAvailability(dateStr, slot).available, 0);
  };

  const selectedSlot = slots.find((s) => s.id === selectedSlotId) || null;
  const selectedSlotStats =
    selectedSlot && selectedDate ? getSlotAvailability(selectedDate, selectedSlot) : null;

  const handleSelectDate = (dateStr: string) => {
    if (!eligibleDateSet.has(dateStr)) return;
    setSelectedDate(dateStr);
    // Reset slot if full on newly selected date
    if (selectedSlotId) {
      const slotObj = slots.find((s) => s.id === selectedSlotId);
      if (slotObj && getSlotAvailability(dateStr, slotObj).isFull) {
        setSelectedSlotId('');
      }
    }
    setErrors((prev) => ({ ...prev, date: '', slot: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!eligibleDateSet.has(selectedDate)) {
      errs.date =
        language === 'ta'
          ? 'அடுத்த 7 நாட்களுக்குள் உள்ள தேதியை மட்டுமே தேர்வு செய்ய முடியும்.'
          : 'Selection is strictly restricted to the rolling 7-day booking window.';
    }
    if (!selectedSlot) {
      errs.slot =
        language === 'ta' ? 'தயவுசெய்து ஒரு தரிசன நேரத்தைத் தேர்வு செய்க.' : 'Please select an available darisanam time slot.';
    } else if (selectedSlotStats && selectedSlotStats.available <= 0) {
      errs.slot =
        language === 'ta' ? 'இந்த நேர இடைவெளி முழுமையாகப் பதிவாகிவிட்டது.' : 'Selected time slot is fully booked.';
    } else if (selectedSlotStats && numberOfDevotees > selectedSlotStats.available) {
      errs.numberOfDevotees =
        language === 'ta'
          ? `மீதமுள்ள இடங்கள் ${selectedSlotStats.available} மட்டுமே.`
          : `Only ${selectedSlotStats.available} place(s) remain in this slot.`;
    }
    if (!devoteeName.trim()) {
      errs.devoteeName = language === 'ta' ? 'பக்தர் பெயர் அவசியம்.' : 'Devotee name is required.';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile =
        language === 'ta' ? 'சரியான 10 இலக்க அலைபேசி எண்ணை உள்ளிடவும்.' : 'Please enter a valid 10-digit mobile number.';
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = language === 'ta' ? 'சரியான மின்னஞ்சலை உள்ளிடவும்.' : 'Please enter a valid email address.';
    }
    if (numberOfDevotees < 1 || numberOfDevotees > 10) {
      errs.numberOfDevotees =
        language === 'ta' ? '1 முதல் 10 பக்தர்கள் வரை தேர்வு செய்யலாம்.' : 'Number of devotees must be between 1 and 10.';
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

  const handleSubmitRequest = () => {
    if (!validate() || !selectedSlot) return;
    setIsSubmitting(true);

    // Frontend prototype simulation: status remains 'pending' until verified by backend / temple admin
    setTimeout(() => {
      const refNum = `DAR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
      const newBooking: DarisanamBooking = {
        id: `dar-${Date.now()}`,
        referenceNumber: refNum,
        devoteeName: devoteeName.trim(),
        mobile: mobile.replace(/\D/g, ''),
        email: email.trim() || undefined,
        numberOfDevotees,
        date: selectedDate,
        slotId: selectedSlot.id,
        slotLabel: `${selectedSlot.label} (${selectedSlot.timeRange})`,
        status: 'pending',
        statusNote:
          'Frontend Prototype Request Recorded — Pending Backend / Temple Office Confirmation.',
        createdAt: new Date().toISOString(),
        isDemo: true
      };
      onAddBooking(newBooking);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
      setStep('status');
    }, 650);
  };

  return (
    <div className="darisanam-module" style={{ maxWidth: '980px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Card */}
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
          {t.darBadge}
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
          {t.darTitle}
        </h2>

        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', maxWidth: '660px', margin: '0 auto' }}>
          {t.darSubtitle}
        </p>

        {/* Window Rule Notice */}
        <div
          style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FFFDF5',
            border: '1px solid var(--color-border-gold)',
            padding: '5px 12px',
            borderRadius: '14px',
            fontSize: '0.76rem',
            fontWeight: 700,
            color: 'var(--color-temple-brown)'
          }}
        >
          <CalendarCheck size={14} />
          <span>
            {language === 'ta'
              ? `முன்பதிவு வரம்பு: ${eligibleDates[0]?.dateStr} முதல் ${eligibleDates[6]?.dateStr} வரை (7 நாட்கள் மட்டும்)`
              : `Eligible Window: ${eligibleDates[0]?.dateStr} to ${eligibleDates[6]?.dateStr} (7 consecutive days only)`}
          </span>
        </div>
      </div>

      {/* 5-Step Flow Bar */}
      <div className="temple-steps-bar" aria-label="Darisanam Booking Steps">
        {[
          { n: 1, label: language === 'ta' ? '1. தேதி' : '1. Select Date', active: step === 'form', done: step !== 'form' },
          { n: 2, label: language === 'ta' ? '2. நேரம்' : '2. Select Time', active: step === 'form', done: step !== 'form' },
          { n: 3, label: language === 'ta' ? '3. பக்தர் தகவல்' : '3. Devotee Info', active: step === 'form', done: step !== 'form' },
          { n: 4, label: language === 'ta' ? '4. சரிபார்ப்பு' : '4. Review Details', active: step === 'review', done: step === 'status' },
          { n: 5, label: language === 'ta' ? '5. நிலை' : '5. Status', active: step === 'status', done: false }
        ].map((st) => (
          <span
            key={st.n}
            className={`temple-step-pill ${st.active ? 'active' : st.done ? 'completed' : ''}`}
          >
            {st.label}
          </span>
        ))}
      </div>

      {step === 'form' && (
        <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* STEP 1: Select Date (Rolling 7-Day Window) */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={18} />
              <span>{t.darStep1}</span>
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 110px), 1fr))',
                gap: '10px'
              }}
            >
              {eligibleDates.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                const remaining = getDateRemainingPlaces(d.dateStr);
                const isDayFull = remaining <= 0;

                return (
                  <button
                    type="button"
                    key={d.dateStr}
                    onClick={() => handleSelectDate(d.dateStr)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected
                        ? 'var(--color-temple-brown)'
                        : isDayFull
                          ? '#FEE2E2'
                          : '#FFFDF5',
                      border: isSelected
                        ? '2px solid #FFD54F'
                        : isDayFull
                          ? '1.5px solid #B91C1C'
                          : '1.5px solid var(--color-border-gold)',
                      color: isSelected ? '#FFFDF5' : 'var(--color-text-main)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.9 }}>
                      {d.dayName}
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900 }}>
                      {d.dayNum}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                      {d.monthName}
                    </span>
                    <span
                      style={{
                        marginTop: '4px',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '8px',
                        backgroundColor: isSelected
                          ? '#FFD54F'
                          : isDayFull
                            ? '#B91C1C'
                            : '#EAF7EE',
                        color: isSelected ? '#3E2114' : isDayFull ? '#FFFFFF' : '#1B7A3C'
                      }}
                    >
                      {isDayFull
                        ? language === 'ta'
                          ? 'நிரம்பியது'
                          : 'Full'
                        : `${remaining} ${language === 'ta' ? 'இடம்' : 'left'}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {errors.date && (
              <p style={{ color: '#B91C1C', fontSize: '0.78rem', fontWeight: 700, marginTop: '8px' }}>
                {errors.date}
              </p>
            )}
          </div>

          {/* STEP 2: Select Time Slot & View Capacity / Available Places */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} />
              <span>{t.darStep2}</span>
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '12px'
              }}
            >
              {slots.map((slot) => {
                const stats = getSlotAvailability(selectedDate, slot);
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    type="button"
                    key={slot.id}
                    disabled={stats.isFull}
                    onClick={() => {
                      setSelectedSlotId(slot.id);
                      setErrors((prev) => ({ ...prev, slot: '' }));
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: stats.isFull
                        ? '#FEE2E2'
                        : isSelected
                          ? 'var(--color-temple-brown)'
                          : '#FFFDF5',
                      border: stats.isFull
                        ? '1.5px solid #B91C1C'
                        : isSelected
                          ? '2px solid #FFD54F'
                          : '1.5px solid var(--color-border-gold)',
                      color: stats.isFull
                        ? '#7F1D1D'
                        : isSelected
                          ? '#FFFDF5'
                          : 'var(--color-text-main)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                        {language === 'ta' ? slot.labelTa : slot.label}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '10px',
                          backgroundColor: stats.isFull
                            ? '#B91C1C'
                            : isSelected
                              ? '#FFD54F'
                              : '#EAF7EE',
                          color: stats.isFull ? '#FFFFFF' : isSelected ? '#3E2114' : '#1B7A3C'
                        }}
                      >
                        {stats.isFull
                          ? language === 'ta'
                            ? 'முழுவதும் நிரம்பியது'
                            : 'FULLY BOOKED'
                          : language === 'ta'
                            ? 'கிடைக்கிறது'
                            : 'AVAILABLE'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.92, marginBottom: '6px' }}>
                      {slot.timeRange}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700 }}>
                      <span>
                        {language === 'ta' ? 'மொத்த கொள்ளளவு:' : 'Capacity:'} {stats.capacity}
                      </span>
                      <span>
                        {language === 'ta' ? 'காலியிடங்கள்:' : 'Available Places:'} {stats.available}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {errors.slot && (
              <p style={{ color: '#B91C1C', fontSize: '0.78rem', fontWeight: 700, marginTop: '8px' }}>
                {errors.slot}
              </p>
            )}
          </div>

          {/* STEP 3: Enter Devotee Information */}
          <div
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} />
              <span>{t.darStep3}</span>
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
                gap: '14px'
              }}
            >
              <div>
                <label className="form-label">
                  {language === 'ta' ? 'பக்தர் பெயர் *' : 'Devotee Name *'}
                </label>
                <input
                  type="text"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder={language === 'ta' ? 'முழுப் பெயர்' : 'Full name'}
                  className="form-input"
                />
                {errors.devoteeName && (
                  <p style={{ color: '#B91C1C', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.devoteeName}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">
                  {language === 'ta' ? 'அலைபேசி எண் *' : 'Mobile Number *'}
                </label>
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
                <label className="form-label">
                  {language === 'ta' ? 'பக்தர்கள் எண்ணிக்கை *' : 'Number of Devotees *'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={Math.min(10, selectedSlotStats?.available || 10)}
                  value={numberOfDevotees}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value, 10);
                    setNumberOfDevotees(Number.isNaN(parsed) ? 1 : Math.max(1, Math.min(10, parsed)));
                  }}
                  className="form-input"
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '3px' }}>
                  {language === 'ta'
                    ? `1 முதல் ${Math.min(10, selectedSlotStats?.available || 10)} பக்தர்கள் வரை`
                    : `Allowed: 1 to ${Math.min(10, selectedSlotStats?.available || 10)} devotees per request`}
                </span>
                {errors.numberOfDevotees && (
                  <p style={{ color: '#B91C1C', fontSize: '0.74rem', marginTop: '4px', fontWeight: 600 }}>
                    {errors.numberOfDevotees}
                  </p>
                )}
              </div>

              <div>
                <label className="form-label">
                  {language === 'ta' ? 'மின்னஞ்சல் (விருப்பம்)' : 'Email (Optional)'}
                </label>
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
            </div>
          </div>

          {/* Submit to Step 4 Review */}
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
            <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
              <strong>{language === 'ta' ? 'தேர்வு:' : 'Selected:'}</strong> {selectedDate}{' '}
              {selectedSlot
                ? `• ${selectedSlot.timeRange}`
                : language === 'ta'
                  ? '(நேர இடைவெளியைத் தேர்ந்தெடுக்கவும்)'
                  : '(Select a time slot)'}
            </div>
            <button type="submit" className="btn-temple-primary" style={{ borderRadius: '24px' }}>
              <span>{language === 'ta' ? 'முன்பதிவு விவரங்களை சரிபார்க்க' : 'Review Booking Details'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Review Booking Details */}
      {step === 'review' && selectedSlot && (
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
            {t.darStep4}
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
              marginBottom: '16px'
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
              <span className="form-label">{language === 'ta' ? 'தரிசன தேதி' : 'Preferred Date'}</span>
              <strong>{selectedDate}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'நேர இடைவெளி' : 'Time Slot'}</span>
              <strong>
                {language === 'ta' ? selectedSlot.labelTa : selectedSlot.label} ({selectedSlot.timeRange})
              </strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'பக்தர்கள் எண்ணிக்கை' : 'Number of Devotees'}</span>
              <strong>{numberOfDevotees}</strong>
            </div>
            {email && (
              <div>
                <span className="form-label">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</span>
                <strong>{email}</strong>
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: '#FEF3C7',
              border: '1px solid #D97706',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#78350F',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>
              {language === 'ta'
                ? 'முன்மாதிரி அறிவிப்பு: இந்த கோரிக்கை "நிலுவையில் (Pending)" நிலையாகப் பதிவு செய்யப்படும். உண்மையான உறுதிப்படுத்தலுக்கு பின்புல சேவை அவசியம்.'
                : 'Prototype Notice: Your request will be recorded with Pending Verification status until confirmed by temple administration / backend integration.'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setStep('form')}
              className="btn-temple-secondary"
            >
              <ArrowLeft size={16} />
              <span>{language === 'ta' ? 'மாற்றம் செய்க' : 'Edit Details'}</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitRequest}
              className="btn-temple-primary"
            >
              <span>
                {isSubmitting
                  ? language === 'ta'
                    ? 'சமர்ப்பிக்கப்படுகிறது...'
                    : 'Submitting Request...'
                  : language === 'ta'
                    ? 'தரிசன கோரிக்கையைச் சமர்ப்பி'
                    : 'Submit Darisanam Request'}
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Request Status (Pending or Confirmed strictly per backend/store response) */}
      {step === 'status' && submittedBooking && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--color-temple-brown)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 20px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                margin: '0 auto 10px auto',
                borderRadius: '50%',
                backgroundColor:
                  submittedBooking.status === 'confirmed' ? '#EAF7EE' : '#FEF3C7',
                border: `2px solid ${
                  submittedBooking.status === 'confirmed' ? '#2E8540' : '#D97706'
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {submittedBooking.status === 'confirmed' ? (
                <CheckCircle2 size={28} color="#1B7A3C" />
              ) : (
                <ShieldAlert size={28} color="#B45309" />
              )}
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-temple-brown)' }}>
              {language === 'ta'
                ? 'மௌன குருநாதர் திருக்கோயில் — தரிசன கோரிக்கை நிலை'
                : 'Mouna Gurunathar Temple — Darisanam Request Status'}
            </h3>

            <div
              style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '5px 14px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: 800,
                backgroundColor:
                  submittedBooking.status === 'confirmed' ? '#EAF7EE' : '#FEF3C7',
                color: submittedBooking.status === 'confirmed' ? '#1B7A3C' : '#92400E',
                border: `1px solid ${
                  submittedBooking.status === 'confirmed' ? '#2E8540' : '#D97706'
                }`
              }}
            >
              {submittedBooking.status === 'confirmed'
                ? language === 'ta'
                  ? 'நிலை: உறுதிப்படுத்தப்பட்டது'
                  : 'STATUS: CONFIRMED'
                : language === 'ta'
                  ? 'நிலை: சரிபார்ப்பு நிலுவையில் (முன்மாதிரி)'
                  : 'STATUS: PENDING VERIFICATION (PROTOTYPE)'}
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '12px',
              marginBottom: '16px'
            }}
          >
            <div>
              <span className="form-label">{language === 'ta' ? 'குறிப்பு எண்' : 'Reference No'}</span>
              <strong style={{ color: 'var(--color-temple-brown)' }}>
                {submittedBooking.referenceNumber}
              </strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'பக்தர் பெயர்' : 'Devotee Name'}</span>
              <strong>{submittedBooking.devoteeName}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'தரிசன தேதி' : 'Preferred Date'}</span>
              <strong>{submittedBooking.date}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'நேர இடைவெளி' : 'Time Slot'}</span>
              <strong>{submittedBooking.slotLabel}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'பக்தர்கள்' : 'Devotees'}</span>
              <strong>{submittedBooking.numberOfDevotees}</strong>
            </div>
            <div>
              <span className="form-label">{language === 'ta' ? 'நிலை விளக்கம்' : 'Response Note'}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{submittedBooking.statusNote}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                setStep('form');
                setSelectedSlotId('');
                setDevoteeName('');
                setMobile('');
                setEmail('');
                setNumberOfDevotees(1);
              }}
              className="btn-temple-primary"
            >
              <Sparkles size={15} />
              <span>{language === 'ta' ? 'மற்றொரு தரிசனம் பதிவு செய்க' : 'Submit Another Request'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="btn-temple-secondary"
            >
              {language === 'ta' ? 'முகப்புக்குத் திரும்புக' : 'Return Home'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

