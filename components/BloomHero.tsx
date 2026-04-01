'use client';

import Image from 'next/image';
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Globe,
  Send,
  Camera,
  Menu,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
   BLOOM HERO  —  Liquid Glass Morphism over video background
   ───────────────────────────────────────────────────────────────────── */

export default function BloomHero() {
  return (
    <div className="relative w-full min-h-screen flex overflow-hidden">

      {/* ── VIDEO BACKGROUND ──────────────────────────────────────────── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          LEFT PANEL — 52 %
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="relative flex flex-col"
        style={{
          zIndex: 10,
          width: '52%',
          minHeight: '100vh',
          padding: '1.5rem',
          fontFamily: 'var(--font-poppins), system-ui, sans-serif',
        }}
      >
        {/* Glass overlay panel */}
        <div
          className="liquid-glass-strong absolute inset-4 lg:inset-6"
          style={{ borderRadius: '1.5rem', zIndex: 0 }}
        />

        {/* ── NAV ──────────────────────────────────────────────────── */}
        <nav
          className="relative flex items-center justify-between"
          style={{ zIndex: 1, padding: '0.5rem 1.5rem' }}
        >
          {/* Logo + wordmark */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Bloom logo"
              width={32}
              height={32}
              className="rounded-full"
              style={{ objectFit: 'cover' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 600,
                fontSize: '1.25rem',
                letterSpacing: '-0.04em',
                color: '#ffffff',
              }}
            >
              bloom
            </span>
          </div>

          {/* Menu button */}
          <button
            id="bloom-menu-btn"
            className="liquid-glass flex items-center gap-2"
            style={{
              borderRadius: '9999px',
              padding: '0.45rem 1.1rem',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              outline: 'none',
              fontFamily: 'var(--font-poppins), sans-serif',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Menu size={14} />
            Menu
          </button>
        </nav>

        {/* ── HERO CENTER ──────────────────────────────────────────── */}
        <div
          className="relative flex flex-col items-center justify-center text-center"
          style={{ zIndex: 1, flex: 1, padding: '2rem 2.5rem', gap: '1.75rem' }}
        >
          {/* Logo icon */}
          <Image
            src="/logo.png"
            alt="Bloom icon"
            width={80}
            height={80}
            className="rounded-full"
            style={{
              objectFit: 'cover',
              boxShadow: '0 0 40px rgba(255,255,255,0.08)',
            }}
          />

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.05em',
              color: '#ffffff',
              maxWidth: '520px',
            }}
          >
            Innovating the
            <br />
            spirit of{' '}
            <em
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.80)',
              }}
            >
              bloom
            </em>{' '}
            AI
          </h1>

          {/* CTA Button */}
          <button
            id="bloom-explore-cta"
            className="liquid-glass-strong flex items-center gap-3"
            style={{
              borderRadius: '9999px',
              padding: '0.85rem 2rem',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              outline: 'none',
              fontFamily: 'var(--font-poppins), sans-serif',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          >
            Explore Now
            <span
              style={{
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Download size={13} />
            </span>
          </button>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {['Artistic Gallery', 'AI Generation', '3D Structures'].map(label => (
              <span
                key={label}
                className="liquid-glass"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.80)',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── BOTTOM QUOTE ─────────────────────────────────────────── */}
        <div
          className="relative flex flex-col items-center gap-3 text-center"
          style={{ zIndex: 1, padding: '1.5rem 2rem 2rem' }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.50)',
              fontFamily: 'var(--font-poppins), sans-serif',
            }}
          >
            Visionary Design
          </span>

          <p
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#ffffff',
              fontFamily: 'var(--font-poppins), sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            &ldquo;We imagined a realm with{' '}
            <em
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.80)',
              }}
            >
              no ending.
            </em>
            &rdquo;
          </p>

          {/* Author line with rules */}
          <div className="flex items-center gap-3" style={{ width: '100%', maxWidth: '280px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.18)' }} />
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.50)',
                fontFamily: 'var(--font-poppins), sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Marcus Aurelio
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.18)' }} />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT PANEL — 48 % (desktop only)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col"
        style={{
          zIndex: 10,
          width: '48%',
          minHeight: '100vh',
          padding: '1.5rem',
          fontFamily: 'var(--font-poppins), system-ui, sans-serif',
        }}
      >

        {/* ── TOP BAR ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between" style={{ padding: '0.5rem 0.5rem' }}>

          {/* Social icons pill */}
          <div className="liquid-glass flex items-center gap-1" style={{ borderRadius: '9999px', padding: '0.45rem 0.75rem' }}>
            {[
              { Icon: Globe, id: 'bloom-twitter', href: '#' },
              { Icon: Send, id: 'bloom-linkedin', href: '#' },
              { Icon: Camera, id: 'bloom-instagram', href: '#' },
            ].map(({ Icon, id, href }) => (
              <a
                key={id}
                id={id}
                href={href}
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  transition: 'color 0.2s, transform 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.80)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                }}
              >
                <Icon size={14} />
              </a>
            ))}
            <span
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.70)',
              }}
            >
              <ArrowRight size={13} />
            </span>
          </div>

          {/* Account button */}
          <button
            id="bloom-account-btn"
            className="liquid-glass flex items-center gap-2"
            style={{
              borderRadius: '9999px',
              padding: '0.5rem 1.2rem',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              outline: 'none',
              fontFamily: 'var(--font-poppins), sans-serif',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Sparkles size={14} />
            Account
          </button>
        </div>

        {/* ── COMMUNITY CARD ───────────────────────────────────────── */}
        <div style={{ padding: '1.5rem 0.5rem' }}>
          <div
            className="liquid-glass"
            style={{
              borderRadius: '1.25rem',
              padding: '1.25rem 1.5rem',
              width: '14rem',
            }}
          >
            <p
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '0.4rem',
                fontFamily: 'var(--font-poppins), sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              Enter our ecosystem
            </p>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.60)',
                lineHeight: 1.5,
                fontFamily: 'var(--font-poppins), sans-serif',
              }}
            >
              Collaborate with botanical artists and AI researchers in the Bloom community.
            </p>
          </div>
        </div>

        {/* ── BOTTOM FEATURE SECTION ───────────────────────────────── */}
        <div style={{ marginTop: 'auto', padding: '0 0.5rem 1rem' }}>
          <div
            className="liquid-glass"
            style={{ borderRadius: '2.5rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {/* Top two cards */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { id: 'bloom-processing-card', icon: Wand2, title: 'Processing', desc: 'Generative plant engine powered by diffusion models.' },
                { id: 'bloom-archive-card', icon: BookOpen, title: 'Growth Archive', desc: 'Curated library of 10K+ botanical specimens.' },
              ].map(({ id, icon: Icon, title, desc }) => (
                <div
                  key={id}
                  id={id}
                  className="liquid-glass"
                  style={{
                    flex: 1,
                    borderRadius: '1.5rem',
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    transition: 'transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.03)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
                >
                  <span
                    style={{
                      width: '2.1rem',
                      height: '2.1rem',
                      borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    <Icon size={14} />
                  </span>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-poppins), sans-serif',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom showcase card */}
            <div
              id="bloom-sculpting-card"
              className="liquid-glass"
              style={{
                borderRadius: '1.5rem',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
            >
              {/* Flower thumbnail */}
              <div
                style={{
                  width: '6rem',
                  height: '4rem',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <Image
                  src="/hero-flowers.png"
                  alt="Advanced plant sculpting"
                  width={96}
                  height={64}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    letterSpacing: '-0.01em',
                    marginBottom: '0.3rem',
                  }}
                >
                  Advanced Plant Sculpting
                </p>
                <p
                  style={{
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-poppins), sans-serif',
                  }}
                >
                  Shape botanical forms with AI-guided sculpting tools and real-time growth simulation.
                </p>
              </div>

              {/* + Button */}
              <button
                id="bloom-sculpting-add"
                className="liquid-glass flex items-center justify-center"
                style={{
                  width: '2.1rem',
                  height: '2.1rem',
                  borderRadius: '9999px',
                  flexShrink: 0,
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: 300,
                  cursor: 'pointer',
                  background: 'transparent',
                  outline: 'none',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
