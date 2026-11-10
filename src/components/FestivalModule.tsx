import React, { useState } from 'react';
import { Clock, Info, ArrowRight, X, CheckCircle2, Calendar } from 'lucide-react';
import { FestivalCategory, FestivalItem, PageView } from '../types';
import { Language, translations } from '../translations';

interface FestivalModuleProps {
  festivals: FestivalItem[];
  onNavigate: (page: PageView) => void;
  language: Language;
}

const TAMIL_MONTHS = [
  'All',
  'Chithirai',
  'Vaikasi',
  'Aani',
  'Aadi',
  'Aavani',
  'Purattasi',
  'Aippasi',
  'Karthigai',
  'Margazhi',
  'Thai',
  'Maasi',
  'Panguni'
];

export const FestivalModule: React.FC<FestivalModuleProps> = ({
  festivals,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<'All' | FestivalCategory>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem | null>(null);

  const categories: Array<{ key: 'All' | FestivalCategory; label: string }> = [
    { key: 'All', label: t.festAll },
    { key: 'Upcoming Festivals', label: t.festUpcoming },
    { key: 'Major Temple Festivals', label: t.festMajor },
    { key: 'Special Pooja', label: t.festSpecial },
    { key: 'Tamil Calendar Events', label: t.festTamilCalendar },
    { key: 'Completed Festivals', label: t.festCompleted }
  ];

  const normalizeMonth = (val: string) => val.toLowerCase().replace(/aa/g, 'a');

  const filteredFestivals = festivals.filter((f) => {
    const matchCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchMonth =
      selectedMonth === 'All' || normalizeMonth(f.tamilMonth).includes(normalizeMonth(selectedMonth));
    return matchCategory && matchMonth;
  });

  return (
    <div className="festival-module" style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '22px 18px',
          marginBottom: '20px',
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
          {t.festBadge}
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3.5vw, 2.1rem)',
            color: 'var(--color-temple-brown)',
            fontWeight: 800,
            marginBottom: '6px'
          }}
        >
          {t.festTitle}
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
          {t.festSubtitle}
        </p>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '18px'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                type="button"
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: isSelected ? 'var(--color-temple-brown)' : '#FFFDF5',
                  border: isSelected ? '1.5px solid #FFD54F' : '1px solid var(--color-border-gold)',
                  color: isSelected ? '#FFD54F' : 'var(--color-text-main)',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.8rem'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Month-Based Filtering */}
        <div
          style={{
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px dashed var(--color-border-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--color-temple-brown)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={15} />
            {language === 'ta' ? 'மாத வாரியாக தேர்ந்தெடுக்க:' : 'Filter by Tamil Month:'}
          </span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select"
            style={{ width: 'auto', minWidth: '190px', padding: '7px 12px', fontSize: '0.84rem' }}
          >
            {TAMIL_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m === 'All' ? t.festAllMonths : `${m} Month`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Festival Cards Grid */}
      {filteredFestivals.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--color-section-bg)',
            border: '1.5px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            textAlign: 'center',
            color: 'var(--color-text-secondary)'
          }}
        >
          {language === 'ta'
            ? 'தேர்ந்தெடுத்த பிரிவு அல்லது மாதத்தில் திருவிழா பதிவுகள் இல்லை.'
            : 'No festivals match this category and month filter.'}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 275px), 1fr))',
            gap: '18px'
          }}
        >
          {filteredFestivals.map((fest) => (
            <div
              key={fest.id}
              className="temple-card overflow-hidden"
              style={{
                backgroundColor: 'var(--color-section-bg)',
                border: fest.isProminent ? '2px solid var(--color-temple-brown)' : '1.5px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                minWidth: 0
              }}
            >
              <div>
                {/* Image */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={fest.image}
                    alt={fest.name}
                    loading="lazy"
                    className="temple-img-hover"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        backgroundColor: 'rgba(109, 53, 24, 0.92)',
                        color: '#FFE9A8',
                        border: '1px solid #FFD54F',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '0.68rem',
                        fontWeight: 700
                      }}
                    >
                      {fest.tamilMonth}
                    </span>

                    <span
                      style={{
                        backgroundColor: fest.isVerified ? '#EAF7EE' : '#FEF3C7',
                        color: fest.isVerified ? '#1B7A3C' : '#92400E',
                        border: `1px solid ${fest.isVerified ? '#38A169' : '#D97706'}`,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '0.66rem',
                        fontWeight: 800
                      }}
                    >
                      {fest.isVerified
                        ? language === 'ta'
                          ? 'சரிபார்க்கப்பட்டது'
                          : 'VERIFIED'
                        : language === 'ta'
                          ? 'உறுதிப்படுத்தல் நிலுவையில்'
                          : 'PENDING CONFIRMATION'}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(255, 253, 245, 0.96)',
                      color: 'var(--color-temple-brown)',
                      border: '1px solid var(--color-border-gold)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}
                  >
                    {fest.dateStr}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '16px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.08rem',
                      fontWeight: 800,
                      color: 'var(--color-temple-brown)',
                      marginBottom: '6px',
                      lineHeight: 1.3
                    }}
                  >
                    {fest.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '12px'
                    }}
                  >
                    {fest.description}
                  </p>

                  <div
                    style={{
                      backgroundColor: '#FFFDF5',
                      border: '1px solid var(--color-border-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 10px',
                      fontSize: '0.75rem',
                      marginBottom: '8px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--color-temple-brown)',
                        fontWeight: 800,
                        marginBottom: '2px'
                      }}
                    >
                      <Clock size={13} />
                      <span>{t.festSchedule}:</span>
                    </div>
                    <span style={{ color: 'var(--color-text-main)' }}>{fest.poojaTimings}</span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.4
                    }}
                  >
                    <strong>{language === 'ta' ? 'குறிப்பு:' : 'Instructions:'}</strong> {fest.specialInstructions}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 16px 16px 16px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedFestival(fest)}
                  className="btn-temple-primary"
                  style={{ width: '100%', padding: '9px 16px', fontSize: '0.84rem', borderRadius: '20px' }}
                >
                  <span>{t.festViewDetailsBtn}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedFestival && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(62, 33, 20, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
          onClick={() => setSelectedFestival(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '2px solid var(--color-temple-brown)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '620px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-temple-brown)',
                color: '#FFE9A8',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid #FFD54F'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: '#FFD54F', fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedFestival.tamilMonth} Month • {selectedFestival.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.22rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                  {selectedFestival.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFestival(null)}
                aria-label="Close modal"
                style={{
                  color: '#FFE9A8',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
              <div style={{ width: '100%', height: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '14px' }}>
                <img
                  src={selectedFestival.image}
                  alt={selectedFestival.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '12px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: selectedFestival.isVerified ? '#EAF7EE' : '#FEF3C7',
                  color: selectedFestival.isVerified ? '#1B7A3C' : '#92400E',
                  fontSize: '0.74rem',
                  fontWeight: 800
                }}
              >
                <CheckCircle2 size={14} />
                <span>
                  {selectedFestival.isVerified
                    ? language === 'ta'
                      ? 'சரிபார்க்கப்பட்ட திருக்கோயில் பதிவு'
                      : 'Verified Solar / Temple Record'
                    : language === 'ta'
                      ? 'தேதி மற்றும் நேரம் அதிகாரப்பூர்வ சரிபார்ப்புக்கு உட்பட்டது'
                      : 'Date & Timings Pending Official Verification'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px', marginBottom: '14px' }}>
                <div style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-temple-brown)', fontWeight: 800, display: 'block' }}>
                    {language === 'ta' ? 'தேதி & தமிழ் மாதம்:' : 'DATE & TAMIL MONTH:'}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {selectedFestival.dateStr}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                    {selectedFestival.tamilMonth} {language === 'ta' ? 'மாதம்' : 'Month'}
                  </span>
                </div>

                <div style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-temple-brown)', fontWeight: 800, display: 'block' }}>
                    {language === 'ta' ? 'பிரிவு:' : 'CATEGORY:'}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {categories.find((c) => c.key === selectedFestival.category)?.label || selectedFestival.category}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-temple-brown)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {language === 'ta' ? 'விளக்கம்' : 'Description'}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                  {selectedFestival.description}
                </p>
              </div>

              <div style={{ marginBottom: '14px', backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-temple-brown)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {t.festSchedule}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                  {selectedFestival.poojaTimings}
                </p>
              </div>

              <div style={{ marginBottom: '18px', backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderLeft: '4px solid var(--color-temple-brown)', padding: '10px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-temple-brown)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={14} /> {language === 'ta' ? 'சிறப்புக் குறிப்புகள்:' : 'Special Instructions:'}
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '3px' }}>
                  {selectedFestival.specialInstructions}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setSelectedFestival(null)} className="btn-temple-secondary">
                  {t.calCloseBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFestival(null);
                    onNavigate('darisanam');
                  }}
                  className="btn-temple-primary"
                >
                  <span>{t.navDarisanam}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
