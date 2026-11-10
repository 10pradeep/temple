import React, { useEffect } from 'react';
import { X, Bell, Check } from 'lucide-react';
import { TempleAnnouncement, PageView } from '../types';
import { Language } from '../translations';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: TempleAnnouncement[];
  onMarkAllAsRead: () => void;
  onNavigate: (page: PageView) => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  announcements,
  onMarkAllAsRead,
  onNavigate,
  language
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mouna Gurunathar Temple Announcements"
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
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-section-bg)',
          border: '2px solid var(--color-temple-brown)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '520px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 213, 79, 0.2)',
                border: '1px solid #FFD54F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFD54F'
              }}
            >
              <Bell size={16} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.08rem', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'ta' ? 'மௌன குருநாதர் திருக்கோயில் அறிவிப்புகள்' : 'Mouna Gurunathar Temple Announcements'}
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#FFE9A8' }}>
                {language === 'ta' ? 'திருவிழா மற்றும் கோயில் செய்திகள்' : 'Festival notices & temple office updates'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close announcements"
            style={{
              color: '#FFE9A8',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Announcements List */}
        <div style={{ padding: '16px 20px', maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcements.map((ann) => (
            <div
              key={ann.id}
              style={{
                backgroundColor: '#FFFDF5',
                border: ann.isNew ? '1.5px solid var(--color-temple-brown)' : '1px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    backgroundColor: ann.priority === 'high' ? 'var(--color-temple-brown)' : '#82401C',
                    color: '#FFD54F',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}
                >
                  {ann.priority === 'high'
                    ? language === 'ta'
                      ? 'முக்கிய அறிவிப்பு'
                      : 'IMPORTANT'
                    : language === 'ta'
                      ? 'அறிவிப்பு'
                      : 'NOTICE'}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: 700 }}>
                  {ann.date}
                </span>
              </div>

              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-temple-brown)', marginBottom: '4px' }}>
                {ann.title}
              </h4>

              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                {ann.message}
              </p>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div
          style={{
            backgroundColor: '#FFFDF5',
            borderTop: '1.5px solid var(--color-border-gold)',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <button
            type="button"
            onClick={onMarkAllAsRead}
            style={{
              fontSize: '0.78rem',
              color: 'var(--color-temple-brown)',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={14} />
            <span>{language === 'ta' ? 'அனைத்தையும் படித்ததாகக் குறி' : 'Mark all as read'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('calendar');
            }}
            className="btn-temple-primary"
            style={{ padding: '7px 14px', fontSize: '0.8rem' }}
          >
            <span>{language === 'ta' ? 'முழு நாள்காட்டி பார்க்க' : 'View Calendar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
