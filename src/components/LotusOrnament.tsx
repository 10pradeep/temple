import React from 'react';

interface LotusOrnamentProps {
  label?: string;
}

export const LotusOrnament: React.FC<LotusOrnamentProps> = ({ label }) => {
  return (
    <div className="sacred-divider" aria-hidden={!label}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: '999px',
          backgroundColor: 'var(--color-section-bg)',
          border: '1.5px solid var(--color-border-gold)',
          color: 'var(--color-temple-brown)',
          fontSize: '0.78rem',
          fontWeight: 700,
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <svg width="20" height="16" viewBox="0 0 32 24" fill="none" aria-hidden="true">
          <path
            d="M16 2C13 7 12 12 16 18C20 12 19 7 16 2Z"
            fill="#6D3518"
          />
          <path
            d="M16 18C11 16 8 11 9 6C12 9 14 13 16 18Z"
            fill="#C89624"
          />
          <path
            d="M16 18C21 16 24 11 23 6C20 9 18 13 16 18Z"
            fill="#C89624"
          />
          <path
            d="M16 19C9 19 4 15 3 10C7 12 11 15 16 19Z"
            fill="#6D3518"
            opacity="0.85"
          />
          <path
            d="M16 19C23 19 28 15 29 10C25 12 21 15 16 19Z"
            fill="#6D3518"
            opacity="0.85"
          />
          <rect x="6" y="20" width="20" height="2" rx="1" fill="#C89624" />
        </svg>
        {label && <span>{label}</span>}
      </span>
    </div>
  );
};

