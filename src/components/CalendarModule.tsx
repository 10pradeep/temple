import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Info,
  ArrowRight,
  X,
  UtensilsCrossed,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CalendarEvent, EventCategory, PageView } from '../types';
import { Language, translations } from '../translations';

interface CalendarModuleProps {
  events: CalendarEvent[];
  onNavigate: (page: PageView) => void;
  language: Language;
}

const MONTH_NAMES = [
  { eng: 'January', tamil: 'Margazhi / Thai' },
  { eng: 'February', tamil: 'Thai / Masi' },
  { eng: 'March', tamil: 'Masi / Panguni' },
  { eng: 'April', tamil: 'Panguni / Chithirai' },
  { eng: 'May', tamil: 'Chithirai / Vaikasi' },
  { eng: 'June', tamil: 'Vaikasi / Aani' },
  { eng: 'July', tamil: 'Aani / Aadi' },
  { eng: 'August', tamil: 'Aadi / Aavani' },
  { eng: 'September', tamil: 'Aavani / Purattasi' },
  { eng: 'October', tamil: 'Purattasi / Aippasi' },
  { eng: 'November', tamil: 'Aippasi / Karthigai' },
  { eng: 'December', tamil: 'Karthigai / Margazhi' }
];

const YEARS = Array.from({ length: 10 }, (_, i) => 2026 + i); // 2026 to 2035

export const CalendarModule: React.FC<CalendarModuleProps> = ({
  events,
  onNavigate,
  language
}) => {
  const t = translations[language];
  const [today] = useState<Date>(() => new Date());
  const initialYear =
    today.getFullYear() >= 2026 && today.getFullYear() <= 2035 ? today.getFullYear() : 2026;
  const initialMonth = today.getMonth();

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();

  const monthEvents = useMemo(() => {
    return events.filter((e) => {
      const matchYearMonth = e.year === selectedYear && e.month === selectedMonth;
      if (!matchYearMonth) return false;
      if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
      return true;
    });
  }, [events, selectedYear, selectedMonth, categoryFilter]);

  const selectedDayInfo = useMemo(() => {
    if (!selectedDateKey) return null;
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    if (y !== selectedYear || m - 1 !== selectedMonth) return null;
    const dayEvts = monthEvents.filter((e) => e.day === d);
    return { dateIso: selectedDateKey, dayNum: d, events: dayEvts };
  }, [selectedDateKey, selectedYear, selectedMonth, monthEvents]);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      if (selectedYear > 2026) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      }
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      if (selectedYear < 2035) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
      }
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleTodayClick = () => {
    setSelectedYear(initialYear);
    setSelectedMonth(initialMonth);
    const iso = `${initialYear}-${String(initialMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSelectedDateKey(iso);
  };

  const getCategoryStyles = (category: EventCategory) => {
    switch (category) {
      case 'festival':
        return {
          bg: '#FFE082',
          border: '#C89624',
          text: '#3E2114',
          indicator: '#D4AF37'
        };
      case 'pooja':
        return {
          bg: '#F3DFC8',
          border: '#6D3518',
          text: '#522710',
          indicator: '#6D3518'
        };
      case 'regular':
        return {
          bg: '#EAF7EE',
          border: '#2E8540',
          text: '#1B5E20',
          indicator: '#2E8540'
        };
      case 'important':
        return {
          bg: '#FCE8E6',
          border: '#B91C1C',
          text: '#7F1D1D',
          indicator: '#B91C1C'
        };
      default:
        return {
          bg: '#FFFDF5',
          border: '#C89624',
          text: '#3E2114',
          indicator: '#6D3518'
        };
    }
  };

  const selectedEvent =
    selectedDayEvents && selectedDayEvents.length > 0
      ? selectedDayEvents[Math.min(activeEventIndex, selectedDayEvents.length - 1)]
      : null;

  return (
    <div className="temple-calendar-module" style={{ maxWidth: '1120px', margin: '0 auto', padding: '16px 12px' }}>
      {/* Module Header */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 16px',
          marginBottom: '18px',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              backgroundColor: 'var(--color-temple-brown)',
              color: '#FFE9A8',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.7px'
            }}
          >
            {t.calPanchangamBadge}
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
            color: 'var(--color-temple-brown)',
            marginBottom: '6px',
            fontWeight: 800
          }}
        >
          {t.calTitle}
        </h2>

        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
          {t.calSubtitle}
        </p>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(200, 150, 36, 0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#D4AF37', border: '1px solid #6D3518', display: 'inline-block' }} />
            <span style={{ fontWeight: 700 }}>{t.calLegendGold}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#6D3518', display: 'inline-block' }} />
            <span style={{ fontWeight: 700 }}>{t.calLegendBrown}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#2E8540', display: 'inline-block' }} />
            <span style={{ fontWeight: 700 }}>{t.calLegendGreen}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#B91C1C', display: 'inline-block' }} />
            <span style={{ fontWeight: 700 }}>{t.calLegendRed}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={selectedYear === 2026 && selectedMonth === 0}
            aria-label="Previous Month"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-temple-brown)'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          <div style={{ textAlign: 'center', minWidth: '150px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-temple-brown)', fontFamily: 'var(--font-heading)' }}>
              {MONTH_NAMES[selectedMonth].eng} {selectedYear}
            </h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
              {MONTH_NAMES[selectedMonth].tamil}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            disabled={selectedYear === 2035 && selectedMonth === 11}
            aria-label="Next Month"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#FFFDF5',
              border: '1.5px solid var(--color-border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-temple-brown)'
            }}
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={handleTodayClick}
            className="btn-temple-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '16px' }}
          >
            {t.calTodayBtn}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select
            aria-label="Select Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '0.84rem' }}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            aria-label="Select Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '0.84rem' }}
          >
            {MONTH_NAMES.map((m, idx) => (
              <option key={m.eng} value={idx}>
                {m.eng} ({m.tamil})
              </option>
            ))}
          </select>

          <select
            aria-label="Filter Event Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '0.84rem' }}
          >
            <option value="all">{t.calAllEvents}</option>
            <option value="festival">{t.calMajorFestivals}</option>
            <option value="pooja">{t.calSpecialPooja}</option>
            <option value="regular">{t.calRegularEvents}</option>
            <option value="important">{t.calImportantDates}</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            backgroundColor: 'var(--color-temple-brown)',
            borderBottom: '2px solid var(--color-gold-bright)',
            color: '#FFFDF5',
            fontWeight: 700,
            fontSize: '0.78rem',
            textAlign: 'center',
            padding: '10px 0'
          }}
        >
          <div>{t.calSun}</div>
          <div>{t.calMon}</div>
          <div>{t.calTue}</div>
          <div>{t.calWed}</div>
          <div>{t.calThu}</div>
          <div>{t.calFri}</div>
          <div>{t.calSat}</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: '1px',
            backgroundColor: 'rgba(200, 150, 36, 0.35)'
          }}
        >
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="cal-day-cell"
              style={{
                backgroundColor: '#FFE9A8',
                opacity: 0.55
              }}
            />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateIso = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = monthEvents.filter((e) => e.day === dayNum);
            const isToday =
              today.getFullYear() === selectedYear &&
              today.getMonth() === selectedMonth &&
              today.getDate() === dayNum;
            const isSelectedDay = selectedDateKey === dateIso;

            return (
              <div
                key={`day-${dayNum}`}
                role="button"
                tabIndex={0}
                className="cal-day-cell"
                aria-label={`${MONTH_NAMES[selectedMonth].eng} ${dayNum}, ${selectedYear}`}
                onClick={() => {
                  setSelectedDateKey(dateIso);
                  if (dayEvents.length > 0) {
                    setSelectedDayEvents(dayEvents);
                    setActiveEventIndex(0);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDateKey(dateIso);
                    if (dayEvents.length > 0) {
                      setSelectedDayEvents(dayEvents);
                      setActiveEventIndex(0);
                    }
                  }
                }}
                style={{
                  backgroundColor: isSelectedDay
                    ? '#FFE082'
                    : isToday
                      ? '#FFE9A8'
                      : '#FFFDF5',
                  padding: '5px 3px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  cursor: 'pointer',
                  border: isSelectedDay
                    ? '2px solid var(--color-temple-brown)'
                    : isToday
                      ? '1.5px solid #C89624'
                      : 'none',
                  minWidth: 0
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isToday ? 800 : 700,
                      color: isToday ? '#FFFFFF' : 'var(--color-text-main)',
                      width: isToday ? '22px' : 'auto',
                      height: isToday ? '22px' : 'auto',
                      borderRadius: '50%',
                      backgroundColor: isToday ? 'var(--color-temple-brown)' : 'transparent',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}
                  >
                    {dayNum}
                  </span>

                  {dayEvents.length > 0 && (
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: getCategoryStyles(dayEvents[0].category).indicator,
                        flexShrink: 0
                      }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px', minWidth: 0 }}>
                  {dayEvents.slice(0, 2).map((evt) => {
                    const st = getCategoryStyles(evt.category);
                    return (
                      <div
                        key={evt.id}
                        title={evt.title}
                        style={{
                          backgroundColor: st.bg,
                          borderLeft: `3px solid ${st.border}`,
                          color: st.text,
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          padding: '2px 3px',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {evt.title}
                      </div>
                    );
                  })}

                  {dayEvents.length > 2 && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--color-temple-brown)', fontWeight: 700, paddingLeft: '3px' }}>
                      +{dayEvents.length - 2}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Details Panel */}
      {selectedDayInfo && (
        <div
          style={{
            marginTop: '16px',
            backgroundColor: '#FFFDF5',
            border: '2px solid var(--color-temple-brown)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-temple-brown)', textTransform: 'uppercase' }}>
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட தேதி விவரம்' : 'Selected Date Details'}
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.08rem', color: 'var(--color-temple-brown)', fontWeight: 800 }}>
                {selectedDayInfo.dateIso} • {MONTH_NAMES[selectedMonth].eng} {selectedDayInfo.dayNum}, {selectedYear} ({MONTH_NAMES[selectedMonth].tamil})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDateKey(null)}
              className="btn-temple-secondary"
              style={{ padding: '4px 10px', fontSize: '0.74rem' }}
            >
              {t.calCloseBtn}
            </button>
          </div>

          {selectedDayInfo.events.length === 0 ? (
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {language === 'ta'
                ? 'இந்தத் தேதியில் சிறப்புத் திருவிழா பதிவுகள் எதுவும் இல்லை. திருக்கோயிலின் வழக்கமான தினசரி வழிபாட்டு நேரங்கள் பின்பற்றப்படும்.'
                : 'No special Panchangam festival or pooja entry is recorded for this date. Regular daily Mouna Gurunathar temple darisanam applies.'}
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '10px' }}>
              {selectedDayInfo.events.map((ev) => {
                const st = getCategoryStyles(ev.category);
                return (
                  <button
                    type="button"
                    key={ev.id}
                    onClick={() => {
                      setSelectedDayEvents(selectedDayInfo.events);
                      setActiveEventIndex(selectedDayInfo.events.findIndex((x) => x.id === ev.id));
                    }}
                    style={{
                      textAlign: 'left',
                      backgroundColor: 'var(--color-section-bg)',
                      border: '1.5px solid var(--color-border-gold)',
                      borderLeft: `4px solid ${st.border}`,
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-temple-brown)' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {ev.tamilDate} • {ev.startTime} - {ev.endTime}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Month Events Summary List (great for narrow mobile screens too) */}
      <div
        style={{
          marginTop: '18px',
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px'
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '10px' }}>
          {MONTH_NAMES[selectedMonth].eng} {selectedYear} —{' '}
          {language === 'ta' ? `மாத நிகழ்வுகள் (${monthEvents.length})` : `Events (${monthEvents.length})`}
        </h3>
        {monthEvents.length === 0 ? (
          <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
            {language === 'ta'
              ? 'தேர்ந்தெடுத்த பிரிவுக்கு இந்த மாதத்தில் நிகழ்வுகள் இல்லை.'
              : 'No events match this filter for the selected month.'}
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '10px' }}>
            {monthEvents
              .slice()
              .sort((a, b) => a.day - b.day)
              .map((evt) => {
                const st = getCategoryStyles(evt.category);
                return (
                  <button
                    type="button"
                    key={evt.id}
                    onClick={() => {
                      setSelectedDayEvents([evt]);
                      setActiveEventIndex(0);
                    }}
                    style={{
                      textAlign: 'left',
                      backgroundColor: '#FFFDF5',
                      border: '1px solid var(--color-border-gold)',
                      borderLeft: `4px solid ${st.border}`,
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-temple-brown)' }}>
                        {evt.date} • {evt.tamilDate}
                      </span>
                      <span
                        style={{
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          color: evt.isVerified ? '#1B7A3C' : '#B45309'
                        }}
                      >
                        {evt.isVerified
                          ? language === 'ta'
                            ? '✓ சரிபார்க்கப்பட்டது'
                            : '✓ Verified'
                          : language === 'ta'
                            ? 'மதிப்பீடு'
                            : 'Est.'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                      {evt.title}
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && selectedDayEvents && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(62, 33, 20, 0.5)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '14px'
          }}
          onClick={() => setSelectedDayEvents(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--color-section-bg)',
              border: '2px solid var(--color-temple-brown)',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '580px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--color-temple-brown)',
                color: '#FFE9A8',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid var(--color-gold-bright)'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(255, 213, 79, 0.2)',
                    color: '#FFE9A8',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: '1px solid #FFD54F',
                    textTransform: 'uppercase'
                  }}
                >
                  {selectedEvent.category} • {selectedEvent.tamilDate}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginTop: '4px'
                  }}
                >
                  {selectedEvent.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDayEvents(null)}
                aria-label="Close event details"
                style={{
                  color: '#FFE9A8',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <X size={18} />
              </button>
            </div>

            {selectedDayEvents.length > 1 && (
              <div style={{ padding: '8px 18px', backgroundColor: '#FFFDF5', borderBottom: '1px solid var(--color-border-gold)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedDayEvents.map((ev, idx) => (
                  <button
                    type="button"
                    key={ev.id}
                    onClick={() => setActiveEventIndex(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      backgroundColor: idx === activeEventIndex ? 'var(--color-temple-brown)' : 'var(--color-section-bg)',
                      color: idx === activeEventIndex ? '#FFFDF5' : 'var(--color-text-main)',
                      border: '1px solid var(--color-border-gold)'
                    }}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>
            )}

            <div style={{ padding: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  backgroundColor: selectedEvent.isVerified ? '#EAF7EE' : '#FEF3C7',
                  color: selectedEvent.isVerified ? '#1B7A3C' : '#92400E',
                  border: `1px solid ${selectedEvent.isVerified ? '#2E8540' : '#D97706'}`
                }}
              >
                {selectedEvent.isVerified ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                <span>
                  {selectedEvent.isVerified
                    ? language === 'ta'
                      ? 'சரிபார்க்கப்பட்ட கோயில் நாள்காட்டி பதிவு'
                      : 'Verified Temple Calendar Entry'
                    : language === 'ta'
                      ? 'வானியல் கணக்கீடு — திருக்கோயில் பஞ்சாங்க உறுதிப்படுத்தலுக்கு உட்பட்டது'
                      : 'Tentative Astronomical Estimate — Pending Temple Panchangam Confirmation'}
                </span>
              </div>

              {selectedEvent.image && (
                <div
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    border: '1.5px solid var(--color-border-gold)'
                  }}
                >
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                  gap: '10px',
                  marginBottom: '14px'
                }}
              >
                <div style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-temple-brown)', fontWeight: 700, display: 'block' }}>
                    {t.calDateLabel}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {selectedEvent.date}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                    {selectedEvent.tamilDate}
                  </span>
                </div>

                <div style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-temple-brown)', fontWeight: 700, display: 'block' }}>
                    {t.calTimingsLabel}
                  </span>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>

                {selectedEvent.auspiciousTime && (
                  <div style={{ backgroundColor: '#FFFDF5', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-temple-brown)', fontWeight: 700, display: 'block' }}>
                      {t.calAuspiciousLabel}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {selectedEvent.auspiciousTime}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-temple-brown)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {t.calOverviewLabel}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.specialInstructions && (
                <div
                  style={{
                    backgroundColor: '#FFFDF5',
                    border: '1px solid var(--color-border-gold)',
                    borderLeft: '4px solid var(--color-temple-brown)',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    marginBottom: '16px'
                  }}
                >
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-temple-brown)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Info size={14} /> {t.calGuidelinesLabel}
                  </span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {selectedEvent.specialInstructions}
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedDayEvents(null)}
                  className="btn-temple-secondary"
                  style={{ fontSize: '0.84rem' }}
                >
                  {t.calCloseBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDayEvents(null);
                    onNavigate('annadhanam');
                  }}
                  className="btn-temple-primary"
                  style={{ fontSize: '0.84rem' }}
                >
                  <UtensilsCrossed size={15} />
                  <span>{language === 'ta' ? 'அன்னதான சேவை செய்ய' : 'Sponsor Annadhanam'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
