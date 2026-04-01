'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionText from '@/components/SectionText';
import { SpiralAnimation } from '@/components/ui/spiral-animation';

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0 });

    // 1. Section snaps to visible immediately (no fade — we let children animate)
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1 });
    }

    // 2. Particle / spiral background fades in BEFORE the text wormhole fires
    //    This gives context: "something is happening in the background"
    if (particlesRef.current) {
      tl.fromTo(
        particlesRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        0
      );
    }

    // 3. Scroll indicator — appears after everything settles (~2.4 s total)
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        2.4
      );
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="hero" style={{ opacity: 1 }}>
      {/* Background gradient */}
      <div className="hero-bg" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Film grain */}
      <div className="film-grain" />

      {/* Spiral particle field — full screen behind text */}
      <div ref={particlesRef} className="brain-canvas" style={{ opacity: 0 }}>
        <SpiralAnimation background="transparent" />
      </div>

      {/* Centered Text Overlay — wormhole zoom-in */}
      <SectionText />

      {/* ─── Top-left logo ─── */}
      <div
        className="absolute top-7 left-8 z-10"
        style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#00F2FF',
          opacity: 0.7,
        }}
      >
        SYNAPSE-OS
      </div>

      {/* ─── Bottom-center scroll indicator ─── */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        style={{ opacity: 0 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            opacity: 0.5,
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        >
          SCROLL TO DISCOVER
        </span>
      </div>
    </section>
  );
}
