'use client';

import { useEffect, useRef, useState, useCallback, ReactNode, CSSProperties } from 'react';
import gsap from 'gsap';
import { FlipCard } from './FlipCard';
import {
  NEURO_STATS, BRAIN_REGIONS, ACTION_POTENTIAL_STEPS, BRAIN_WAVES,
  BCI_TIMELINE, SIGNAL_CHAIN, BCI_MODALITIES, APPLICATIONS,
  INDUSTRY_LEADERS, ETHICS, BCI_FUTURE, TAKEAWAYS,
} from './slideData';

// ─── TOKENS ─────────────────────────────────────────────────────────────────
const F  = 'var(--font-poppins), system-ui, sans-serif';
const FS = 'var(--font-serif), Georgia, serif';

// ─── SHARED GLASS FACE ───────────────────────────────────────────────────────
/** Glass panel that fills its parent absolutely — used for flip-card faces */
function GlassFace({ children, strong = false, tint = false }: { children: ReactNode; strong?: boolean; tint?: boolean }) {
  return (
    <div className={strong ? 'liquid-glass-strong' : 'liquid-glass'}
      style={{
        position: 'absolute', inset: 0,
        borderRadius: '1.25rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '1.4rem',
        background: tint ? 'rgba(255,255,255,0.03)' : undefined,
      }}>
      {children}
    </div>
  );
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
function Label({ text }: { text: string }) {
  return (
    <div data-anim="left" style={{
      fontFamily: F, fontSize: '0.62rem', letterSpacing: '0.28em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem',
    }}>{text}</div>
  );
}

function H({ children, size = 'lg' }: { children: ReactNode; size?: 'xl' | 'lg' | 'sm' }) {
  const fs = size === 'xl' ? 'clamp(3rem,6vw,5rem)' : size === 'lg' ? 'clamp(2.4rem,4.5vw,3.8rem)' : 'clamp(1.8rem,3vw,2.6rem)';
  return (
    <h2 data-anim="up" style={{ fontFamily: F, fontWeight: 500, fontSize: fs,
      letterSpacing: '-0.05em', color: '#fff', lineHeight: 1.06, marginBottom: '1.5rem' }}>
      {children}
    </h2>
  );
}

function Bullet({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div data-anim="left" data-delay={String(delay)}
      className="bullet-row"
      style={{ display: 'flex', alignItems: 'center', gap: '0.85rem',
        padding: '0.55rem 0.4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%',
        background: 'rgba(74,222,128,0.6)', flexShrink: 0 }} />
      <span style={{ fontFamily: F, fontSize: '1.05rem', color: 'rgba(255,255,255,0.80)' }}>
        {children}
      </span>
    </div>
  );
}

// ─── BACK-FACE CARD ──────────────────────────────────────────────────────────
function BackFace({ label, text }: { label: string; text: string }) {
  return (
    <GlassFace tint>
      <div style={{ fontFamily: F, fontSize: '0.58rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: '0.85rem' }}>
        Did you know?
      </div>
      <div style={{ fontFamily: F, fontWeight: 600, fontSize: '0.82rem',
        color: 'rgba(255,255,255,0.45)', marginBottom: '0.65rem' }}>{label}</div>
      <div style={{ fontFamily: F, fontSize: '0.88rem', color: 'rgba(255,255,255,0.80)',
        lineHeight: 1.6 }}>{text}</div>
    </GlassFace>
  );
}

// ─── SYNAPTIC PANEL ──────────────────────────────────────────────────────────
const SYNAPSE_STEPS = [
  { label: 'Pre-synaptic Neuron', isArrow: false, isTop: true },
  { label: '↓', isArrow: true },
  { label: 'Synaptic Vesicles', isArrow: false, isTop: false },
  { label: '↓', isArrow: true },
  { label: 'Neurotransmitters', isArrow: false, isTop: false },
  { label: '↓', isArrow: true },
  { label: 'Post-synaptic Neuron', isArrow: false, isTop: true },
];

function SynapticRow({ label, isArrow, isTop, hovered, onEnter, onLeave }: {
  label: string; isArrow: boolean; isTop?: boolean;
  hovered: boolean; onEnter: () => void; onLeave: () => void;
}) {
  if (isArrow) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', padding: '0.1rem 0',
        transition: 'transform 0.35s ease',
        transform: hovered ? 'scaleY(1.4)' : 'scaleY(1)',
      }}>
        <span style={{
          fontFamily: F, fontSize: '1.4rem',
          color: hovered ? 'rgba(74,222,128,0.75)' : 'rgba(255,255,255,0.22)',
          transition: 'color 0.35s ease, text-shadow 0.35s ease',
          textShadow: hovered ? '0 0 12px rgba(74,222,128,0.6)' : 'none',
          display: 'inline-block',
        }}>{label}</span>
      </div>
    );
  }
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: '0.85rem 1.2rem',
        borderRadius: '0.85rem',
        cursor: 'default',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        background: hovered
          ? 'rgba(74,222,128,0.08)'
          : 'rgba(255,255,255,0.03)',
        boxShadow: hovered
          ? '0 0 0 1px rgba(74,222,128,0.35), 0 0 20px rgba(74,222,128,0.15)'
          : '0 0 0 1px rgba(255,255,255,0.07)',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <span style={{
        fontFamily: F,
        fontSize: isTop ? '1.15rem' : '1rem',
        fontWeight: isTop ? 700 : 400,
        color: hovered
          ? '#fff'
          : isTop ? '#fff' : 'rgba(255,255,255,0.60)',
        letterSpacing: '-0.01em',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
        textShadow: hovered ? '0 0 16px rgba(74,222,128,0.5)' : 'none',
      }}>{label}</span>
    </div>
  );
}

function SynapticPanel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [panelHovered, setPanelHovered] = useState(false);

  return (
    <div
      data-anim="scale"
      onMouseEnter={() => setPanelHovered(true)}
      onMouseLeave={() => setPanelHovered(false)}
      style={{
        padding: '2rem 2.2rem',
        textAlign: 'center',
        borderRadius: '1.5rem',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        border: `1px solid ${panelHovered ? 'rgba(74,222,128,0.30)' : 'rgba(255,255,255,0.09)'}`,
        boxShadow: panelHovered
          ? '0 0 0 1px rgba(74,222,128,0.15), 0 8px 40px rgba(74,222,128,0.08), inset 0 1px 0 rgba(255,255,255,0.06)'
          : '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Header */}
      <div style={{
        fontFamily: F, fontSize: '0.65rem', letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: panelHovered ? 'rgba(74,222,128,0.65)' : 'rgba(255,255,255,0.32)',
        marginBottom: '1.6rem',
        transition: 'color 0.4s ease',
      }}>
        Synaptic Transmission
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        {SYNAPSE_STEPS.map((s, i) => (
          <SynapticRow
            key={i}
            {...s}
            hovered={!s.isArrow && hoveredIdx === i}
            onEnter={() => !s.isArrow && setHoveredIdx(i)}
            onLeave={() => setHoveredIdx(null)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── LAYOUT PRESETS ──────────────────────────────────────────────────────────
const BASE: CSSProperties = { height: '100vh', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden' };
const CENTER: CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem' };
const SPLIT: CSSProperties = { display: 'flex', alignItems: 'center', height: '100%', padding: '3rem 4.5rem', gap: '3.5rem' };
const COL: CSSProperties   = { display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '2.5rem 4.5rem', gap: '1.5rem' };

const GRID_3: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' };
const GRID_2: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.2rem' };

const CARD_H = '180px'; // fixed height for all flip card cells

// ─── MAIN ────────────────────────────────────────────────────────────────────
const TOTAL = 12;

export default function StoryboardPresentation() {
  const wrap  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    wrap.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const h = () => setActive(Math.round(el.scrollTop / window.innerHeight));
    el.addEventListener('scroll', h, { passive: true });
    return () => el.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(Math.min(active + 1, TOTAL - 1));
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(Math.max(active - 1, 0));
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [active, goTo]);

  useEffect(() => {
    const c = wrap.current; if (!c) return;
    const reset = (s: Element) => s.querySelectorAll('[data-anim]').forEach(el => {
      const t = el.getAttribute('data-anim');
      gsap.set(el, { opacity: 0, x: t==='left'?-44:t==='right'?44:0, y: t==='up'?30:t==='down'?-30:0, scale: t==='scale'?0.86:1 });
    });
    const sections = c.querySelectorAll('section[data-slide]');
    sections.forEach(reset);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.querySelectorAll('[data-anim]').forEach((el, i) => {
            gsap.to(el, { opacity:1, x:0, y:0, scale:1, duration:0.55,
              delay: parseFloat(el.getAttribute('data-delay')||'0') + i*0.055, ease:'power3.out' });
          });
        } else { reset(en.target); }
      });
    }, { root: c, threshold: 0.3 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* VIDEO BG */}
      <video style={{ position:'fixed', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        autoPlay loop muted playsInline />
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.62)', zIndex:1 }} />

      {/* PROGRESS */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'2px', background:'rgba(255,255,255,0.07)', zIndex:40 }}>
        <div style={{ height:'100%', background:'rgba(255,255,255,0.55)', width:`${((active+1)/TOTAL)*100}%`, transition:'width 0.4s ease' }} />
      </div>
      <div style={{ position:'fixed', top:'1.2rem', right:'4.5rem', zIndex:40,
        fontFamily:F, fontSize:'0.62rem', letterSpacing:'0.16em', color:'rgba(255,255,255,0.32)' }}>
        {String(active+1).padStart(2,'0')} / {String(TOTAL).padStart(2,'0')}
      </div>

      {/* DOT NAV */}
      <nav style={{ position:'fixed', right:'1.4rem', top:'50%', transform:'translateY(-50%)',
        zIndex:40, display:'flex', flexDirection:'column', gap:'7px' }}>
        {Array.from({length:TOTAL},(_,i)=>(
          <button key={i} onClick={()=>goTo(i)}
            style={{ width:'6px', height:active===i?'22px':'6px', borderRadius:'9999px',
              background:active===i?'rgba(255,255,255,0.85)':'rgba(255,255,255,0.25)',
              border:'none', cursor:'pointer', outline:'none', padding:0, transition:'all 0.3s ease' }} />
        ))}
      </nav>

      {/* ── SCROLL CONTAINER ─────────────────────────────────────────────── */}
      <div ref={wrap} style={{ position:'relative', zIndex:10, height:'100vh', overflowY:'scroll', scrollSnapType:'y mandatory' }}>

        {/* ══════ 01 COVER ══════════════════════════════════════════════════ */}
        <section data-slide="0" style={BASE}>
          <div style={{ ...CENTER, textAlign:'center' }}>
            <span data-anim="scale" data-delay="0" className="liquid-glass"
              style={{ display:'inline-block', borderRadius:'9999px', padding:'0.4rem 1.2rem',
                fontSize:'0.68rem', letterSpacing:'0.22em', textTransform:'uppercase',
                color:'rgba(255,255,255,0.65)', fontFamily:F, marginBottom:'2.2rem' }}>
              Synapse OS · Class Presentation · 2026
            </span>
            <h1 data-anim="up" data-delay="0.08" style={{ fontFamily:F, fontWeight:500,
              fontSize:'clamp(3rem,7vw,6rem)', letterSpacing:'-0.055em', color:'#fff',
              lineHeight:1.03, marginBottom:'1.2rem', maxWidth:'820px', textAlign:'center' }}>
              Neuroscience &amp;<br />
              <em style={{ fontFamily:FS, fontStyle:'italic', color:'rgba(255,255,255,0.68)' }}>Brain‑Computer</em>{' '}
              Interfaces
            </h1>
            <p data-anim="up" data-delay="0.18" style={{ fontFamily:F, fontSize:'1.15rem',
              color:'rgba(255,255,255,0.45)', marginBottom:'3rem' }}>
              From neurons to neural engineering
            </p>
            <button data-anim="up" data-delay="0.30" onClick={()=>goTo(1)} className="liquid-glass float"
              style={{ borderRadius: '9999px', padding: '0.7rem 2rem', color: 'rgba(255,255,255,0.75)',
                fontSize: '0.85rem', fontFamily: F, fontWeight: 500, cursor: 'pointer',
                background: 'transparent', outline: 'none', transition: 'transform 0.2s, box-shadow 0.3s' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='scale(1.08)'; e.currentTarget.style.boxShadow='0 0 22px rgba(74,222,128,0.35), 0 0 50px rgba(74,222,128,0.15)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none'; }}>
              Begin ↓
            </button>
          </div>
        </section>

        {/* ══════ 02 NEUROSCIENCE ═══════════════════════════════════════════ */}
        <section data-slide="1" style={BASE}>
          <div style={SPLIT}>
            <div style={{ flex:1 }}>
              <Label text="01 — Introduction" />
              <H>What is<br />Neuroscience?</H>
              <Bullet delay={0.00}>Study of the nervous system</Bullet>
              <Bullet delay={0.06}>Neurons → behaviour → cognition</Bullet>
              <Bullet delay={0.12}>Tools: fMRI · EEG · Optogenetics</Bullet>
              <Bullet delay={0.18}>Bridges biology, physics & CS</Bullet>
            </div>
            <div style={{ flex:1, ...GRID_2 }}>
              {NEURO_STATS.map(({n,label,back},i)=>(
                <div key={i} data-anim="scale" data-delay={String(0.05+i*0.08)}
                  className="stat-card"
                  style={{ height:CARD_H, position:'relative', borderRadius:'1.25rem' }}>
                  <FlipCard
                    front={
                      <div className="liquid-glass" style={{
                        position:'absolute', inset:0, borderRadius:'1.25rem',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        justifyContent:'center', textAlign:'center', padding:'1.5rem' }}>
                        <div style={{ fontFamily:F, fontSize:'clamp(1.8rem,3vw,2.6rem)',
                          fontWeight:700, color:'#fff', letterSpacing:'-0.05em' }}>{n}</div>
                        <div style={{ fontFamily:F, fontSize:'0.72rem', fontWeight:500,
                          color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em',
                          textTransform:'uppercase', marginTop:'0.35rem' }}>{label}</div>
                      </div>
                    }
                    back={<BackFace label={label} text={back} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 03 BRAIN ANATOMY ══════════════════════════════════════════ */}
        <section data-slide="2" style={BASE}>
          <div style={COL}>
            <div><Label text="02 — Anatomy" /><H>The Human Brain</H></div>
            <div style={{ ...GRID_3, flex:1 }}>
              {BRAIN_REGIONS.map(({emoji,region,role,back},i)=>(
                <div key={i} data-anim="up" data-delay={String(i*0.07)}
                  style={{ height:CARD_H, position:'relative' }}>
                  <FlipCard
                    front={
                      <div className="liquid-glass" style={{
                        position:'absolute', inset:0, borderRadius:'1.25rem',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        justifyContent:'center', textAlign:'center', padding:'1.4rem', gap:'0.5rem' }}>
                        <div style={{ fontSize:'1.8rem' }}>{emoji}</div>
                        <div style={{ fontFamily:F, fontWeight:700, fontSize:'1rem',
                          color:'#fff', letterSpacing:'-0.02em' }}>{region}</div>
                        <div style={{ fontFamily:F, fontSize:'0.75rem',
                          color:'rgba(255,255,255,0.45)' }}>{role}</div>
                      </div>
                    }
                    back={<BackFace label={region} text={back} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 04 NEURAL SIGNALING ═══════════════════════════════════════ */}
        <section data-slide="3" style={BASE}>
          <div style={SPLIT}>
            {/* LEFT — larger text */}
            <div style={{ flex:1 }}>
              <Label text="03 — Biology" />
              <H>Neural<br />Signaling</H>
              {ACTION_POTENTIAL_STEPS.map(({step,label,desc},i)=>(
                <div key={i} data-anim="left" data-delay={String(i*0.1)}
                  style={{ display:'flex', gap:'1.4rem', alignItems:'center', marginBottom:'1.35rem' }}>
                  <span className="liquid-glass" style={{ borderRadius:'9999px', width:'2.9rem',
                    height:'2.9rem', flexShrink:0, display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'0.75rem', fontWeight:700, color:'#fff', fontFamily:F }}>
                    {step}
                  </span>
                  <div>
                    <div style={{ fontFamily:F, fontWeight:700, fontSize:'1.25rem', color:'#fff', letterSpacing:'-0.02em' }}>{label}</div>
                    <div style={{ fontFamily:F, fontSize:'0.95rem', color:'rgba(255,255,255,0.50)', marginTop:'0.2rem' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — premium animated Synaptic Transmission panel */}
            <div style={{ flex:0.9 }}>
              <SynapticPanel />
            </div>
          </div>
        </section>

        {/* ══════ 05 BRAIN WAVES ════════════════════════════════════════════ */}
        <section data-slide="4" style={BASE}>
          <div style={COL}>
            <div><Label text="04 — Electrophysiology" /><H>Brain Waves</H></div>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
              {BRAIN_WAVES.map(({name,hz,state,pct},i)=>(
                <div key={i} data-anim="left" data-delay={String(i*0.09)}
                  style={{ display:'flex', alignItems:'center', gap:'1.4rem' }}>
                  <div style={{ width:'88px', textAlign:'right', fontFamily:F, fontSize:'1.1rem',
                    fontWeight:600, color:'#fff', flexShrink:0 }}>{name}</div>
                  <div style={{ width:'80px', fontFamily:F, fontSize:'0.7rem',
                    color:'rgba(255,255,255,0.38)', flexShrink:0 }}>{hz}</div>
                  <div style={{ flex:1, height:'3rem', display:'flex', alignItems:'center' }}>
                    <div className="liquid-glass wave-bar" style={{ width:`${pct}%`, height:'100%',
                      borderRadius:'0.6rem',
                      backgroundImage:`linear-gradient(90deg,rgba(255,255,255,0.03),rgba(74,222,128,${0.04+i*0.022}))` }} />
                  </div>
                  <div style={{ width:'200px', fontFamily:F, fontSize:'0.82rem',
                    color:'rgba(255,255,255,0.5)', flexShrink:0 }}>{state}</div>
                </div>
              ))}
            </div>
            <div className="liquid-glass" style={{ borderRadius:'1.25rem', padding:'1rem 1.5rem' }}>
              <p data-anim="up" style={{ fontFamily:F, fontSize:'0.85rem', textAlign:'center',
                color:'rgba(255,255,255,0.5)', letterSpacing:'-0.01em' }}>
                EEG records oscillations via scalp electrodes — primary non-invasive BCI modality
              </p>
            </div>
          </div>
        </section>

        {/* ══════ 06 INTRO TO BCI ═══════════════════════════════════════════ */}
        <section data-slide="5" style={BASE}>
          <div style={SPLIT}>
            <div style={{ flex:1 }}>
              <Label text="05 — BCI Basics" />
              <H>Brain-Computer<br />Interfaces</H>
              <Bullet delay={0.00}>Direct brain ↔ machine link</Bullet>
              <Bullet delay={0.06}>Bypasses the neuromuscular pathway</Bullet>
              <Bullet delay={0.12}>Real-time neural signal decoding</Bullet>
              <Bullet delay={0.18}>Controls cursors, prosthetics & speech</Bullet>
              <div className="liquid-glass-strong" style={{ borderRadius:'1rem', padding:'1.1rem 1.4rem', marginTop:'1.6rem' }}>
                <div data-anim="up" style={{ fontFamily:FS, fontStyle:'italic', fontSize:'1.1rem',
                  color:'rgba(255,255,255,0.7)', textAlign:'center', lineHeight:1.4 }}>
                  &ldquo;What if you could control the world — through thought alone?&rdquo;
                </div>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div data-anim="up" style={{ fontFamily:F, fontSize:'0.62rem', letterSpacing:'0.22em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.32)', marginBottom:'1.2rem' }}>
                Timeline
              </div>
              {BCI_TIMELINE.map(({year,event},i)=>(
                <div key={i} data-anim="right" data-delay={String(i*0.08)}
                  className="timeline-item"
                  style={{ display:'flex', gap:'1.2rem', paddingBottom:'1.1rem', borderRadius:'0.5rem', paddingLeft:'0.2rem' }}>
                  <div style={{ width:'44px', flexShrink:0, fontFamily:F, fontSize:'0.72rem',
                    fontWeight:700, color:'rgba(255,255,255,0.45)', paddingTop:'0.1rem' }}>{year}</div>
                  <div style={{ position:'relative', paddingLeft:'1.2rem', borderLeft:'1px solid rgba(255,255,255,0.10)' }}>
                    <div className="pulse-dot" style={{ position:'absolute', left:'-4px', top:'5px', width:'7px', height:'7px',
                      borderRadius:'50%', background:'rgba(74,222,128,0.6)' }} />
                    <div style={{ fontFamily:F, fontSize:'0.88rem', color:'rgba(255,255,255,0.68)', lineHeight:1.5 }}>{event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 07 SIGNAL CHAIN ═══════════════════════════════════════════ */}
        <section data-slide="6" style={BASE}>
          <div style={COL}>
            <div><Label text="06 — Architecture" /><H>The Signal Chain</H></div>
            <div style={{ display:'flex', alignItems:'stretch', gap:'0.6rem', height:'11rem' }}>
              {SIGNAL_CHAIN.map(({step,label,sub},i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', flex:1 }}>
                  <div className="liquid-glass signal-step shimmer-hover" style={{ flex:1, height:'100%', borderRadius:'1.25rem',
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    textAlign:'center', padding:'1.2rem', gap:'0.4rem' }}>
                    <div data-anim="up" data-delay={String(i*0.1)}>
                      <div style={{ fontFamily:F, fontSize:'0.58rem', letterSpacing:'0.22em',
                        color:'rgba(255,255,255,0.28)', marginBottom:'0.5rem' }}>{step}</div>
                      <div style={{ fontFamily:F, fontWeight:700, fontSize:'1rem', color:'#fff', letterSpacing:'-0.02em' }}>{label}</div>
                      <div style={{ fontFamily:F, fontSize:'0.7rem', color:'rgba(255,255,255,0.4)', marginTop:'0.3rem', lineHeight:1.5 }}>{sub}</div>
                    </div>
                  </div>
                  {i<4&&(
                    <div data-anim="scale" data-delay={String(i*0.1+0.05)}
                      style={{ color:'rgba(255,255,255,0.25)', fontSize:'1.5rem', flexShrink:0, padding:'0 0.3rem' }}>→</div>
                  )}
                </div>
              ))}
            </div>
            <div className="liquid-glass-strong" style={{ borderRadius:'1.25rem', padding:'1.5rem 2.5rem' }}>
              <div data-anim="up" style={{ display:'flex', justifyContent:'space-around' }}>
                {[{value:'< 50 ms',label:'Latency'},{value:'> 95%',label:'Accuracy'},{value:'1024+',label:'Channels'}].map(({value,label})=>(
                  <div key={label} style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:F, fontSize:'clamp(1.4rem,2.5vw,2rem)', fontWeight:700, color:'#fff', letterSpacing:'-0.04em' }}>{value}</div>
                    <div style={{ fontFamily:F, fontSize:'0.68rem', fontWeight:600, color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════ 08 MODALITIES ═════════════════════════════════════════════ */}
        <section data-slide="7" style={BASE}>
          <div style={COL}>
            <div><Label text="07 — Modalities" /><H>BCI Types</H></div>
            <div style={{ ...GRID_3, flex:1 }}>
              {BCI_MODALITIES.map(({type,badge,examples},i)=>(
                <div className="liquid-glass card-hover shimmer-hover" key={i} data-anim="up" data-delay={String(i*0.12)}
                  style={{ borderRadius:'1.25rem', padding:'1.8rem', display:'flex', flexDirection:'column', gap:'0.85rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ fontFamily:F, fontWeight:700, fontSize:'1.1rem', color:'#fff' }}>{type}</div>
                    <span className="liquid-glass" style={{ borderRadius:'9999px', padding:'0.2rem 0.65rem',
                      fontSize:'0.6rem', letterSpacing:'0.1em', color:'rgba(255,255,255,0.58)',
                      textTransform:'uppercase', fontFamily:F }}>{badge}</span>
                  </div>
                  {examples.map((ex,j)=>(
                    <div key={j} style={{ display:'flex', alignItems:'center', gap:'0.7rem',
                      fontFamily:F, fontSize:'0.88rem', color:'rgba(255,255,255,0.65)',
                      padding:'0.35rem 0', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color:'rgba(255,255,255,0.25)' }}>›</span>{ex}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 09 APPLICATIONS ═══════════════════════════════════════════ */}
        <section data-slide="8" style={BASE}>
          <div style={COL}>
            <div><Label text="08 — Use Cases" /><H>Applications</H></div>
            <div style={{ ...GRID_3, flex:1 }}>
              {APPLICATIONS.map(({icon,title,desc,back},i)=>(
                <div key={i} data-anim="scale" data-delay={String(i*0.08)}
                  style={{ height:CARD_H, position:'relative' }}>
                  <FlipCard
                    front={
                      <div className="liquid-glass" style={{
                        position:'absolute', inset:0, borderRadius:'1.25rem',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        justifyContent:'center', textAlign:'center', padding:'1.4rem', gap:'0.5rem' }}>
                        <div style={{ fontSize:'1.8rem' }}>{icon}</div>
                        <div style={{ fontFamily:F, fontWeight:700, fontSize:'1rem', color:'#fff', letterSpacing:'-0.02em' }}>{title}</div>
                        <div style={{ fontFamily:F, fontSize:'0.75rem', color:'rgba(255,255,255,0.45)' }}>{desc}</div>
                      </div>
                    }
                    back={<BackFace label={title} text={back} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 10 INDUSTRY ═══════════════════════════════════════════════ */}
        <section data-slide="9" style={BASE}>
          <div style={COL}>
            <div><Label text="09 — Industry" /><H>Who&apos;s Building It?</H></div>
            <div style={{ ...GRID_2, flex:1 }}>
              {INDUSTRY_LEADERS.map(({co,tag,stat,desc,back},i)=>(
                <div key={i} data-anim="up" data-delay={String(i*0.1)}
                  style={{ position:'relative', minHeight:CARD_H }}>
                  <FlipCard
                    front={
                      <div className="liquid-glass" style={{
                        position:'absolute', inset:0, borderRadius:'1.25rem',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        justifyContent:'center', textAlign:'center', padding:'1.6rem', gap:'0.4rem' }}>
                        <div style={{ fontFamily:F, fontWeight:700, fontSize:'1.2rem', color:'#fff', letterSpacing:'-0.03em' }}>{co}</div>
                        <div style={{ fontFamily:F, fontSize:'0.62rem', color:'rgba(255,255,255,0.32)' }}>{tag}</div>
                        <span className="liquid-glass" style={{ borderRadius:'9999px', padding:'0.28rem 0.8rem', marginTop:'0.4rem',
                          fontSize:'0.7rem', color:'rgba(255,255,255,0.65)', fontFamily:F, fontWeight:600 }}>{stat}</span>
                        <div style={{ fontFamily:F, fontSize:'0.8rem', color:'rgba(255,255,255,0.5)', marginTop:'0.3rem' }}>{desc}</div>
                      </div>
                    }
                    back={<BackFace label={co} text={back} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 11 ETHICS ════════════════════════════════════════════════ */}
        <section data-slide="10" style={BASE}>
          <div style={COL}>
            <div><Label text="10 — Ethics" /><H>Ethical Frontiers</H></div>
            <div style={{ ...GRID_2, flex:1 }}>
              {ETHICS.map(({icon,title,desc,back},i)=>(
                <div key={i} data-anim="scale" data-delay={String(i*0.1)}
                  style={{ position:'relative', minHeight:CARD_H }}>
                  <FlipCard
                    front={
                      <div className="liquid-glass" style={{
                        position:'absolute', inset:0, borderRadius:'1.25rem',
                        display:'flex', flexDirection:'column', alignItems:'center',
                        justifyContent:'center', textAlign:'center', padding:'1.8rem', gap:'0.6rem' }}>
                        <div style={{ fontSize:'1.8rem' }}>{icon}</div>
                        <div style={{ fontFamily:F, fontWeight:700, fontSize:'1.1rem', color:'#fff', letterSpacing:'-0.03em' }}>{title}</div>
                        <div style={{ fontFamily:F, fontSize:'0.85rem', color:'rgba(255,255,255,0.45)' }}>{desc}</div>
                      </div>
                    }
                    back={<BackFace label={title} text={back} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ 12 FUTURE & CONCLUSION ════════════════════════════════════ */}
        <section data-slide="11" style={BASE}>
          <div style={{ ...SPLIT, alignItems:'stretch' }}>
            <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'1rem' }}>
              <Label text="11 — The Road Ahead" />
              <H size="sm">Future of BCI</H>
              {BCI_FUTURE.map(({year,event,icon},i)=>(
                <div className="liquid-glass card-hover shimmer-hover" key={i} style={{ borderRadius:'1.25rem', padding:'1rem 1.4rem' }}>
                  <div data-anim="left" data-delay={String(i*0.1)}
                    style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
                    <div style={{ fontSize:'1.4rem', flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily:F, fontWeight:700, fontSize:'0.72rem',
                        color:'rgba(255,255,255,0.4)', letterSpacing:'0.06em', marginBottom:'0.2rem' }}>{year}</div>
                      <div style={{ fontFamily:F, fontSize:'0.9rem', color:'rgba(255,255,255,0.75)' }}>{event}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'1rem' }}>
              <div data-anim="right" style={{ fontFamily:F, fontSize:'0.62rem', letterSpacing:'0.22em',
                textTransform:'uppercase', color:'rgba(255,255,255,0.32)' }}>Key Takeaways</div>
              {TAKEAWAYS.map((t,i)=>(
                <div className="liquid-glass card-hover shimmer-hover" key={i} style={{ borderRadius:'1.25rem', padding:'1.1rem 1.4rem' }}>
                  <div data-anim="right" data-delay={String(i*0.1)}
                    style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
                    <span style={{ fontFamily:F, fontWeight:700, color:'rgba(255,255,255,0.28)', fontSize:'0.75rem', flexShrink:0 }}>
                      {String(i+1).padStart(2,'0')}
                    </span>
                    <div style={{ fontFamily:F, fontSize:'0.9rem', color:'rgba(255,255,255,0.72)', lineHeight:1.55 }}>{t}</div>
                  </div>
                </div>
              ))}
              <div className="liquid-glass-strong" style={{ borderRadius:'1.5rem', padding:'2rem', textAlign:'center', marginTop:'0.6rem' }}>
                <div data-anim="scale">
                  <div style={{ fontFamily:F, fontSize:'clamp(1.1rem,2vw,1.5rem)', fontWeight:500,
                    color:'#fff', letterSpacing:'-0.03em', marginBottom:'0.6rem' }}>
                    &ldquo;The mind is the last frontier.&rdquo;
                  </div>
                  <div style={{ fontFamily:F, fontSize:'0.65rem', letterSpacing:'0.2em',
                    textTransform:'uppercase', color:'rgba(255,255,255,0.32)' }}>
                    Questions &amp; Discussion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
