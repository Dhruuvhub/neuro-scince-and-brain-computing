'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function SectionText() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const line1Ref      = useRef<HTMLSpanElement>(null);
  const line2Ref      = useRef<HTMLSpanElement>(null);
  const subtextRef    = useRef<HTMLParagraphElement>(null);
  const glowRingRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper  = wrapperRef.current;
    const heading  = headingRef.current;
    const line1    = line1Ref.current;
    const line2    = line2Ref.current;
    const subtext  = subtextRef.current;
    const glowRing = glowRingRef.current;
    if (!wrapper || !heading || !line1 || !line2 || !subtext || !glowRing) return;

    // ─── Initial hidden state ───────────────────────────────────────────────
    gsap.set(heading, {
      scale: 0.02,
      opacity: 0,
      filter: 'blur(80px) brightness(3)',
      transformOrigin: '50% 50%',
    });

    gsap.set(subtext, { opacity: 0, y: 18 });

    gsap.set(glowRing, {
      scale: 0.0,
      opacity: 0,
      transformOrigin: '50% 50%',
    });

    // ─── Master timeline ────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.3 });

    // 0. A brief glow flash at the origin point (wormhole "mouth" pulse)
    tl.to(glowRing, {
      scale: 0.15,
      opacity: 0.9,
      duration: 0.25,
      ease: 'power4.out',
    });

    // 1. Text RUSHES from the wormhole center toward the viewer
    //    Everything moves together as one block — scale: 0.02 → 1
    tl.to(heading, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) brightness(1) drop-shadow(0 0 40px rgba(0,242,255,0.35))',
      duration: 1.15,
      ease: 'expo.out',
    }, '<0.05');  // starts almost simultaneously with glow

    // 2. Glow ring expands and fades as text arrives
    tl.to(glowRing, {
      scale: 4,
      opacity: 0,
      duration: 1.0,
      ease: 'power2.out',
    }, '<');

    // 3. A secondary shimmer — drop-shadow settles to subtle
    tl.to(heading, {
      filter: 'blur(0px) brightness(1) drop-shadow(0 0 12px rgba(0,242,255,0.12))',
      duration: 0.8,
      ease: 'power1.inOut',
    }, '>-0.2');

    // 4. Subtext rises in cleanly after heading lands
    tl.to(subtext, {
      opacity: 0.7,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    }, '<0.1');

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-[3] flex flex-col items-center justify-center pointer-events-none"
      style={{
        perspective: '800px',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Wormhole glow ring — radial burst at center */}
      <div
        ref={glowRingRef}
        style={{
          position: 'absolute',
          width: '320px',
          height: '160px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(0,242,255,0.55) 0%, rgba(0,100,200,0.3) 40%, transparent 75%)',
          filter: 'blur(18px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Main heading — treated as ONE block for the zoom */}
      <h1
        ref={headingRef}
        className="text-center mb-6"
        style={{
          marginTop: '4vh',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
          zIndex: 3,
        }}
      >
        {/* Line 1 */}
        <span ref={line1Ref} className="block">
          {['NEURO', 'SCIENCE.'].map((word, i) => (
            <span
              key={`l1-${i}`}
              className="inline-block mx-[0.12em]"
              style={{
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
              }}
            >
              {word}
            </span>
          ))}
        </span>

        {/* Line 2 */}
        <span ref={line2Ref} className="block mt-1">
          {['BRAIN', 'COMPUTING.'].map((word, i) => (
            <span
              key={`l2-${i}`}
              className="inline-block mx-[0.12em]"
              style={{
                fontFamily: 'var(--font-inter-tight), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
              }}
            >
              {word}
            </span>
          ))}
        </span>
      </h1>

      {/* Subtext */}
      <p
        ref={subtextRef}
        className="text-center"
        style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: 'clamp(0.72rem, 0.95vw, 0.85rem)',
          lineHeight: 1.8,
          color: '#8098A8',
          maxWidth: '50ch',
          zIndex: 3,
        }}
      >
        Exploring the architecture of thought and the future of human-machine intelligence.
      </p>
    </div>
  );
}
