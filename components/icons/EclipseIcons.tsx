import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/** Robot head with eclipse rings as eyes and antenna with glow tip */
export const IconBot: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Antenna */}
    <line x1="12" y1="2" x2="12" y2="5" />
    <circle cx="12" cy="1.5" r="1" fill="#6BA3FF" stroke="none" />
    {/* Head */}
    <rect x="4" y="5" width="16" height="13" rx="3" />
    {/* Left eclipse eye */}
    <circle cx="9" cy="11.5" r="2.5" />
    <path d="M 7.5 11.5 A 2.5 2.5 0 0 1 10.5 9" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Right eclipse eye */}
    <circle cx="15" cy="11.5" r="2.5" />
    <path d="M 13.5 11.5 A 2.5 2.5 0 0 1 16.5 9" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Ears */}
    <line x1="2" y1="10" x2="4" y2="10" />
    <line x1="20" y1="10" x2="22" y2="10" />
    {/* Jaw line */}
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

/** Person silhouette with eclipse crescent halo behind the head */
export const IconUser: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Eclipse crescent halo */}
    <path d="M 8 8 A 5 5 0 1 1 16 8" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    <path d="M 9.5 7 A 3.5 3.5 0 1 1 14.5 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Head */}
    <circle cx="12" cy="8" r="3.5" />
    {/* Body */}
    <path d="M 5 21 C 5 16 8 14 12 14 C 16 14 19 16 19 21" />
  </svg>
);

/** Three stacked discs with eclipse rings on edges and accent glow on top */
export const IconDatabase: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Top disc with accent */}
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M 5 5 A 2 2 0 0 0 7 7" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Middle connector */}
    <path d="M 4 5.5 V 12" />
    <path d="M 20 5.5 V 12" />
    {/* Middle disc */}
    <path d="M 4 12 C 4 13.65 7.58 15 12 15 C 16.42 15 20 13.65 20 12" />
    <path d="M 19 12 A 2 2 0 0 0 21 14" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Bottom connector */}
    <path d="M 4 12 V 18.5" />
    <path d="M 20 12 V 18.5" />
    {/* Bottom disc */}
    <ellipse cx="12" cy="18.5" rx="8" ry="3" />
  </svg>
);

/** Calendar page with eclipse ring on a date position */
export const IconCalendar: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Calendar body */}
    <rect x="3" y="4" width="18" height="18" rx="2" />
    {/* Binding rings */}
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
    {/* Header line */}
    <line x1="3" y1="10" x2="21" y2="10" />
    {/* Date dots */}
    <circle cx="8" cy="14" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="0.5" fill="currentColor" stroke="none" />
    {/* Eclipse ring on date position */}
    <circle cx="16" cy="14" r="2" />
    <path d="M 14.5 13 A 2 2 0 0 1 17.5 13" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Bottom row dots */}
    <circle cx="8" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="18" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

/** Clock with eclipse ring as the face */
export const IconClock: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Outer circle */}
    <circle cx="12" cy="12" r="9" />
    {/* Eclipse crescent accent on outer ring */}
    <path d="M 5 7 A 9 9 0 0 1 19 7" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Hour hand */}
    <line x1="12" y1="12" x2="12" y2="8" />
    {/* Minute hand */}
    <line x1="12" y1="12" x2="15.5" y2="14" />
    {/* Center dot */}
    <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

/** Paper plane with comet trail, sharp geometric angles */
export const IconSend: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Paper plane - sharp angles */}
    <path d="M 22 2 L 11 13" />
    <polygon points="22,2 15,22 11,13 2,9" />
    {/* Comet trail */}
    <line x1="6" y1="18" x2="3" y2="21" stroke="#6BA3FF" strokeWidth="1.5" />
    <line x1="4" y1="15" x2="2" y2="17" stroke="#6BA3FF" strokeWidth="1" opacity="0.6" />
    <line x1="9" y1="20" x2="7" y2="22" stroke="#6BA3FF" strokeWidth="1" opacity="0.6" />
  </svg>
);

/** Heartbeat/pulse line with eclipse ring as one of the peaks */
export const IconActivity: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Pulse line */}
    <polyline points="2,12 6,12 8,8 10,16 12,6 14,18 16,12 22,12" />
    {/* Eclipse ring at the highest peak */}
    <circle cx="12" cy="6" r="2.5" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    <path d="M 10.2 5 A 2.5 2.5 0 0 1 13.8 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

/** Ornate key with eclipse ring as the bow (top circle) */
export const IconKey: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Eclipse ring bow */}
    <circle cx="8" cy="8" r="5" />
    <path d="M 4 5 A 5 5 0 0 1 12 5" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
    {/* Shaft */}
    <line x1="12.5" y1="11.5" x2="21" y2="20" />
    {/* Teeth */}
    <line x1="17" y1="17" x2="19" y2="15" />
    <line x1="19" y1="19" x2="21" y2="17" />
  </svg>
);

/** Three-pointed starburst with eclipse crescent */
export const IconSparkles: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Main starburst */}
    <path d="M 12 2 L 13.5 9 L 20 7 L 14.5 12 L 22 14 L 14.5 14.5 L 16 22 L 12 15.5 L 8 22 L 9.5 14.5 L 2 14 L 9.5 12 L 4 7 L 10.5 9 Z" />
    {/* Eclipse crescent accent */}
    <path d="M 9 10 A 4 4 0 0 1 15 10" stroke="#6BA3FF" strokeWidth="1.5" fill="none" />
  </svg>
);
