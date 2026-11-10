import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { PageView } from '../types';

interface ModuleCardProps {
  id: PageView;
  title: string;
  tamilTitle?: string;
  subtitle: string;
  badge?: string;
  icon: LucideIcon;
  onClick: (page: PageView) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  tamilTitle,
  subtitle,
  badge,
  icon: IconComponent,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="module-card-item group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(id);
        }
      }}
      style={{
        cursor: 'pointer',
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '148px',
        userSelect: 'none'
      }}
    >
      {/* Top Auspicious Corner Ornamentation */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '34px',
          height: '34px',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-17px',
            right: '-17px',
            width: '34px',
            height: '34px',
            backgroundColor: 'var(--color-gold-bright)',
            transform: 'rotate(45deg)',
            opacity: 0.45
          }}
        />
      </div>

      {/* Card Header: Icon + Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '6px',
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '11px',
            background: 'linear-gradient(135deg, #FFD54F 0%, #E5A323 100%)',
            border: '1.5px solid #FFE9A8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6D3518',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.25)',
            flexShrink: 0
          }}
        >
          <IconComponent size={20} strokeWidth={2.4} />
        </div>

        {badge && (
          <span
            style={{
              fontSize: '0.66rem',
              fontWeight: 800,
              backgroundColor: '#FFE9A8',
              color: '#3E2114',
              border: '1px solid #FFD54F',
              padding: '2px 8px',
              borderRadius: '10px',
              letterSpacing: '0.3px',
              whiteSpace: 'nowrap',
              maxWidth: '100%'
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(0.92rem, 2.3vw, 1.1rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.35)'
          }}
        >
          <span style={{ wordBreak: 'break-word' }}>{title}</span>
          <ChevronRight size={17} color="#FFD54F" style={{ flexShrink: 0 }} />
        </h3>

        {tamilTitle && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#FFD54F',
              fontWeight: 700,
              marginBottom: '4px',
              letterSpacing: '0.2px'
            }}
          >
            {tamilTitle}
          </p>
        )}

        <p
          style={{
            fontSize: '0.78rem',
            color: '#FFE9A8',
            lineHeight: 1.4,
            marginTop: '2px'
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
