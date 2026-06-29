'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Problem() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Chapter 1 — Title
  const titleRef = useRef<HTMLDivElement>(null)
  const tL1      = useRef<HTMLDivElement>(null)
  const tL2      = useRef<HTMLDivElement>(null)
  const mask1Ref = useRef<HTMLDivElement>(null)
  const mask2Ref = useRef<HTMLDivElement>(null)

  // Chapter 2 — Statistics
  const statsRef = useRef<HTMLDivElement>(null)
  const s1Num    = useRef<HTMLDivElement>(null)
  const s2Num    = useRef<HTMLDivElement>(null)
  const s1Desc   = useRef<HTMLDivElement>(null)
  const s2Desc   = useRef<HTMLDivElement>(null)
  const s1Src    = useRef<HTMLDivElement>(null)
  const s2Src    = useRef<HTMLDivElement>(null)

  // Chapter 3 — Punch
  const punchRef = useRef<HTMLDivElement>(null)
  const pL1 = useRef<HTMLDivElement>(null)
  const pL2 = useRef<HTMLDivElement>(null)
  const pL3 = useRef<HTMLDivElement>(null)

  // Chapter 4 — Bridge
  const bridgeRef  = useRef<HTMLDivElement>(null)
  const bridgeT    = useRef<HTMLDivElement>(null)
  const bridgeMask = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const V  = 'inset(0 0% 0 0)'
    const H  = 'inset(0 100% 0 0)'
    const HC = 'inset(0 50% 0 50%)'

    // Scale pinned-scroll distance to the device. Desktop keeps the exact tuned
    // pacing (×1); tablet and mobile get proportionally shorter pins so touch
    // users aren't dragging through thousands of extra pixels. Re-evaluated on
    // every ScrollTrigger refresh (including resize/orientation change).
    const pinFactor = () =>
      window.innerWidth < 640 ? 0.45 : window.innerWidth < 1024 ? 0.78 : 1

    const ctx = gsap.context(() => {

      // ── Initial states ───────────────────────────────────────────
      gsap.set([mask1Ref.current, mask2Ref.current, bridgeMask.current], { xPercent: 0 })
      gsap.set(s1Num.current,  { clipPath: HC })
      gsap.set(s2Num.current,  { clipPath: HC })
      gsap.set([s1Desc.current, s1Src.current, s2Desc.current, s2Src.current], { opacity: 0 })
      gsap.set([pL1.current, pL2.current, pL3.current], { clipPath: H })

      if (reduced) {
        gsap.set([mask1Ref.current, mask2Ref.current, bridgeMask.current], { xPercent: 110 })
        gsap.set([pL1.current, pL2.current, pL3.current], { clipPath: V })
        gsap.set(s1Num.current, { clipPath: V })
        gsap.set([s1Desc.current], { opacity: 1 })
        return
      }

      // ── Chapter 1 — Title ────────────────────────────────────────
      //
      // Text in final position. Gradient mask slides right to uncover.
      // Nothing enters. Everything is discovered.
      //
      //  0.5 – 2.0   L1 uncovered                           (1.5 u)
      //  2.0 – 3.0   Hold — visitor reads L1                (1.0 u)
      //  3.0 – 4.5   L2 uncovered — same language           (1.5 u)
      //  4.5 – 7.0   Reading hold — both lines visible      (2.5 u)
      //  7.0 – 8.5   Gentle exit                            (1.5 u)
      //  8.5 –10.0   Closing silence                        (1.5 u)
      // ─────────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger:      titleRef.current,
          pin:          true,
          anticipatePin: 1,
          refreshPriority: 6,
          start: 'top top',
          end:   () => '+=' + 1800 * pinFactor(),
          scrub: 1.2,
        },
      })
        .fromTo(mask1Ref.current, { xPercent: 0 }, { xPercent: 110, ease: 'power2.out', duration: 1.1 }, 0.3)
        .to({}, { duration: 0.5 }, 1.4)
        .fromTo(mask2Ref.current, { xPercent: 0 }, { xPercent: 110, ease: 'power2.out', duration: 1.1 }, 1.9)
        .to({}, { duration: 1.2 }, 3.0)
        .fromTo([tL1.current, tL2.current], { opacity: 1 }, { opacity: 0.10, ease: 'power1.in', duration: 1.0 }, 4.2)
        .to({}, { duration: 0.6 }, 5.4)

      // ── Chapter 2 — Statistics ───────────────────────────────────
      //
      //  0–1.5:    arrival silence
      //  1.5–3.5:  95% blooms
      //  3.5–5.2:  description + source appear
      //  5.2–11.0: HOLD — visitor reads, absorbs the weight of 95%
      //  11.0–12.0: morph 95% → 0%
      //  12.0–13.0: 0% + second stat appears
      //  13.0–18.5: HOLD — visitor reads, absorbs the weight of 0%
      //  18.5–19.9: fade to silence
      // ─────────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          pin:          true,
          anticipatePin: 1,
          refreshPriority: 5,
          start: 'top top',
          end:   () => '+=' + 2850 * pinFactor(),
          scrub: 1.2,
        },
      })
        .fromTo(s1Num.current,  { clipPath: HC }, { clipPath: V, ease: 'power2.out', duration: 1.4 }, 1.0)
        .fromTo(s1Desc.current, { opacity: 0 },   { opacity: 1, ease: 'none', duration: 0.8 }, 2.2)
        .fromTo(s1Src.current,  { opacity: 0 },   { opacity: 1, ease: 'none', duration: 0.6 }, 3.0)
        // ── HOLD: visitor reads 95% ──────────────────────────────
        .fromTo(s1Num.current,  { clipPath: V },   { clipPath: HC, ease: 'power3.in',  duration: 0.8 }, 6.0)
        .fromTo(s2Num.current,  { clipPath: HC },  { clipPath: V,  ease: 'power3.out', duration: 0.8 }, 6.4)
        .fromTo(s1Desc.current, { opacity: 1 },    { opacity: 0,  ease: 'none', duration: 0.6 }, 6.0)
        .fromTo(s2Desc.current, { opacity: 0 },    { opacity: 1,  ease: 'none', duration: 0.6 }, 6.8)
        .fromTo(s1Src.current,  { opacity: 1 },    { opacity: 0,  ease: 'none', duration: 0.4 }, 6.0)
        .fromTo(s2Src.current,  { opacity: 0 },    { opacity: 1,  ease: 'none', duration: 0.4 }, 6.8)
        // ── HOLD: visitor reads 0% ───────────────────────────────
        .to([s2Num.current, s2Desc.current, s2Src.current],
          { opacity: 0, ease: 'none', duration: 0.8, stagger: 0.15 }, 9.5)

      // ── Chapter 3 — Punch ────────────────────────────────────────
      //
      //  0–6:    three lines reveal, one by one
      //  6–16:   HOLD — emotional peak, visitor absorbs fully
      // ─────────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger: punchRef.current,
          pin:          true,
          anticipatePin: 1,
          refreshPriority: 4,
          start: 'top top',
          end:   () => '+=' + 2640 * pinFactor(),
          scrub: 1.2,
        },
      })
        .fromTo(pL1.current, { clipPath: H }, { clipPath: V, duration: 1.4 }, 0.0)
        .fromTo(pL2.current, { clipPath: H }, { clipPath: V, duration: 1.4 }, 1.4)
        .fromTo(pL3.current, { clipPath: H }, { clipPath: V, duration: 1.4 }, 2.8)
        // ── HOLD: the cost of forgetting lands here ───────────────
        .to({}, { duration: 4.0 }, 4.7)

      // ── Chapter 4 — Bridge ───────────────────────────────────────
      //
      // The turning point of the story.
      // A quiet sentence. Maximum weight.
      //
      //  0.0 – 1.0    Arrival silence
      //  1.0 – 2.5    Mask slides — sentence uncovered
      //  2.5 – 9.5    HOLD — visitor feels the pivot from problem to solution
      //  9.5 – 11.5   Sentence dissolves — absorbed into the void
      //  11.5 – 19.5  Darkness — intentional breath before reconstruction
      // ─────────────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: {
          trigger:      bridgeRef.current,
          pin:          true,
          anticipatePin: 1,
          refreshPriority: 3,
          start: 'top top',
          end:   () => '+=' + 3000 * pinFactor(),
          scrub: 1.2,
        },
      })
        .to({}, { duration: 0.5 }, 0.0)
        .fromTo(bridgeMask.current, { xPercent: 0 }, { xPercent: 110, ease: 'power2.out', duration: 1.1 }, 0.5)
        // ── HOLD: the turning point ───────────────────────────────
        .to({}, { duration: 3.0 }, 1.6)
        .fromTo(bridgeT.current,
          { opacity: 1, filter: 'blur(0px)' },
          { opacity: 0, filter: 'blur(4px)', ease: 'power2.in', duration: 1.4 },
          4.6)
        // ── Darkness: breath before the solution begins ───────────
        .to({}, { duration: 3.0 }, 6.0)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const serif: React.CSSProperties = {
    fontFamily: "var(--font-young-serif), 'Young Serif', Georgia, serif",
  }
  const mono: React.CSSProperties = {
    fontFamily: 'var(--font-inter), sans-serif',
  }
  const H  = 'inset(0 100% 0 0)'
  const HC = 'inset(0 50% 0 50%)'

  const maskOverlay: React.CSSProperties = {
    position: 'absolute', top: 0, bottom: 0,
    left: '-32px', right: 0,
    background: 'linear-gradient(to right, transparent 0px, #0B1020 32px)',
    pointerEvents: 'none',
  }

  return (
    <div ref={containerRef} style={{ background: '#0B1020', color: '#CBC1B5' }}>

      {/* ── Chapter 1: Problem Statement ────────────────────── */}
      <div
        ref={titleRef}
        className="flex min-h-screen items-center"
        style={{ padding: '0 7vw', background: '#0B1020' }}
      >
        <div>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div
              ref={tL1}
              style={{ ...serif, fontSize: 'clamp(2.4rem, 5.8vw, 6rem)', lineHeight: 1.02, letterSpacing: '-0.025em', color: '#CBC1B5' }}
            >
              The problem isn&rsquo;t AI capability.
            </div>
            <div ref={mask1Ref} aria-hidden="true" style={maskOverlay} />
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', marginTop: '0.1em' }}>
            <div
              ref={tL2}
              style={{ ...serif, fontSize: 'clamp(2.4rem, 5.8vw, 6rem)', lineHeight: 1.02, letterSpacing: '-0.025em', color: 'rgba(203,193,181,0.62)' }}
            >
              It&rsquo;s AI without project memory.
            </div>
            <div ref={mask2Ref} aria-hidden="true" style={maskOverlay} />
          </div>
        </div>
      </div>

      {/* ── Chapter 2: Statistics ───────────────────────────── */}
      <div
        ref={statsRef}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{ background: '#0B1020' }}
        aria-live="polite"
      >
        <div style={{ position: 'relative', width: '100%', height: 'clamp(6rem, 16vw, 15rem)', marginBottom: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={s1Num} aria-label="95 percent" style={{ ...serif, position: 'absolute', clipPath: HC, fontSize: 'clamp(5.5rem, 15vw, 14rem)', lineHeight: 0.88, letterSpacing: '-0.045em', color: '#CBC1B5' }}>
            95%
          </div>
          <div ref={s2Num} aria-label="0 percent" style={{ ...serif, position: 'absolute', clipPath: HC, fontSize: 'clamp(5.5rem, 15vw, 14rem)', lineHeight: 0.88, letterSpacing: '-0.045em', color: '#CBC1B5' }}>
            0%
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: 440, minHeight: '5.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={s1Desc} style={{ position: 'absolute', opacity: 0, fontSize: 'clamp(0.875rem, 1.4vw, 1rem)', lineHeight: 1.7, color: 'rgba(203,193,181,0.62)', letterSpacing: '0.01em', textAlign: 'center' }}>
            of enterprise GenAI pilots produce<br />no measurable business impact.
          </div>
          <div ref={s2Desc} style={{ position: 'absolute', opacity: 0, fontSize: 'clamp(0.875rem, 1.4vw, 1rem)', lineHeight: 1.7, color: 'rgba(203,193,181,0.62)', letterSpacing: '0.01em', textAlign: 'center' }}>
            of engineering leaders are very confident<br />AI-generated code behaves correctly<br />in production.
          </div>
        </div>

        <div style={{ position: 'relative', height: '1.5rem', marginTop: '1.5rem' }}>
          <div ref={s1Src} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', opacity: 0, ...mono, fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(203,193,181,0.32)', whiteSpace: 'nowrap' }}>
            MIT NANDA
          </div>
          <div ref={s2Src} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', opacity: 0, ...mono, fontSize: 9, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(203,193,181,0.32)', whiteSpace: 'nowrap' }}>
            Stack Overflow
          </div>
        </div>
      </div>

      {/* ── Chapter 3: Punch ────────────────────────────────── */}
      <div
        ref={punchRef}
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{ background: '#0B1020' }}
      >
        <div ref={pL1} style={{ ...serif, clipPath: H, fontSize: 'clamp(2.2rem, 5vw, 5.25rem)', lineHeight: 1.04, letterSpacing: '-0.025em', color: '#CBC1B5' }}>Teams keep paying</div>
        <div ref={pL2} style={{ ...serif, clipPath: H, fontSize: 'clamp(2.2rem, 5vw, 5.25rem)', lineHeight: 1.04, letterSpacing: '-0.025em', color: '#CBC1B5' }}>for lessons</div>
        <div ref={pL3} style={{ ...serif, clipPath: H, fontSize: 'clamp(2.2rem, 5vw, 5.25rem)', lineHeight: 1.04, letterSpacing: '-0.025em', color: 'rgba(203,193,181,0.62)' }}>they already learned.</div>
      </div>

      {/* ── Chapter 4: Bridge ───────────────────────────────── */}
      <div
        ref={bridgeRef}
        className="flex min-h-screen items-center justify-center px-6 text-center"
        style={{ background: '#0B1020' }}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            ref={bridgeT}
            style={{ ...mono, fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)', letterSpacing: '0.03em', color: 'rgba(203,193,181,0.40)', filter: 'blur(0px)' }}
          >
            UNOTUSK changes that.
          </div>
          <div ref={bridgeMask} aria-hidden="true" style={maskOverlay} />
        </div>
      </div>

    </div>
  )
}
