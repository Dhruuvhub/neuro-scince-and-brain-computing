'use client';
import { useState, ReactNode, CSSProperties } from 'react';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  style?: CSSProperties;
}

export function FlipCard({ front, back, style }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="glow-hover shimmer-hover"
      style={{ perspective: '900px', width: '100%', height: '100%', position: 'relative', ...style }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'none',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}>
          {front}
        </div>
        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}>
          {back}
        </div>
      </div>
    </div>
  );
}
