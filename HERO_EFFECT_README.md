# Synapse-OS Hero Effect (Particles + Heading)

This document describes the current “hero” visual effect on the home page:

- A full-screen particle spiral rendered on a `<canvas>` behind the text
- A GSAP fade-in for the entire hero section
- A GSAP staggered word reveal for the hero heading
- A GSAP fade-in for the scroll indicator

## Where the effect lives

- Hero layout: `components/HeroSection.tsx`
- Heading animation: `components/SectionText.tsx`
- Particle canvas component: `components/ui/spiral-animation.tsx`
- (Optional) Spiral-only demo route: `app/spiral/page.tsx` -> `components/ui/demo.tsx`

## Visual layering (z-index / positioning)

`HeroSection` renders:

1. Background layers (in this order in the DOM)
   - `.hero-bg` gradient (`z-index: 0` via CSS)
   - `.vignette` (`z-index: 4` via CSS)
   - `.film-grain` (`z-index: 5` via CSS)
2. Particle canvas wrapper
   - `className="brain-canvas"` (CSS sets `position:absolute; inset:0; z-index:1; pointer-events:none;`)
   - Wrapper opacity starts at `0` and fades in via GSAP
3. Heading & subtext overlay
   - `SectionText` container has `className="... z-[3] ..."` (so it sits above the particles)
4. Top-left logo and bottom scroll indicator
   - Both use `z-10` so they remain visible above the particle field

## Animation timeline details (GSAP)

### Hero fade-in (`components/HeroSection.tsx`)

The hero creates a GSAP timeline with:

- `delay: 0.2`

It animates three targets:

1. `sectionRef` (the `<section class="hero">`)
   - Start: `{ opacity: 0 }`
   - End: `{ opacity: 1, duration: 0.7, ease: 'power2.out' }`

2. `particlesRef` (canvas wrapper)
   - Start: `{ opacity: 0, scale: 0.98 }`
   - End: `{ opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }`

3. `scrollRef` (bottom “SCROLL TO DISCOVER” label container)
   - Start: `{ opacity: 0 }`
   - End: `{ opacity: 1, duration: 0.7 }`
   - Timeline offset: `'>0.3'` (starts 0.3 after the previous step)

### Heading word-stagger + subtext (`components/SectionText.tsx`)

`SectionText` sets up a GSAP timeline with:

- `defaults: { ease: 'power3.out' }`
- `delay: 0.8`

It selects:

- Heading word spans: `.hero-word`
- Subtext: `.hero-sub`

Animation steps:

1. Heading words (`.hero-word`)
   - Start state per word:
     - `opacity: 0`
     - `y: 50`
     - `filter: blur(10px) brightness(0.85) drop-shadow(0 0 0px rgba(0,242,255,0))`
   - End state per word:
     - `opacity: 1`
     - `y: 0`
     - `filter: blur(0px) brightness(1) drop-shadow(0 0 26px rgba(0,242,255,0.22))`
     - `duration: 1.1`
     - `stagger: 0.09`

2. Subtext (`.hero-sub`)
   - Start:
     - `opacity: 0`
     - `y: 14`
   - End:
     - `opacity: 0.7`
     - `y: 0`
     - `duration: 0.9`
   - Timeline offset: `'>-0.5'`

## Particle spiral canvas (`components/ui/spiral-animation.tsx`)

`SpiralAnimation` renders a full-screen canvas and runs a continuous animation loop using a GSAP timeline.

### Component props

- `background?: string`
  - In the hero we use `background="transparent"` so the canvas does NOT paint over the existing hero gradients.
- `className?: string`

### Canvas sizing + DPR handling

- A `size` is computed as `Math.max(window.innerWidth, window.innerHeight)`
- Canvas pixel dimensions:
  - `canvas.width = size * dpr`
  - `canvas.height = size * dpr`
- CSS size:
  - `canvas.style.width = ${window.innerWidth}px`
  - `canvas.style.height = ${window.innerHeight}px`
- Rendering transform:
  - Uses `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` to avoid cumulative scaling.

### Animation loop behavior

`AnimationController` creates:

- `timeline = gsap.timeline({ repeat: -1 })`
- Timeline tween:
  - Animates internal `time` from `0 -> 1`
  - `duration: 15`
  - `repeat: -1`
  - `ease: 'none'`
  - `onUpdate: render()`

So the entire particle look cycles every `15s` indefinitely.

### Key constants (controls the overall look)

- `changeEventTime = 0.32`
- `cameraZ = -400`
- `cameraTravelDistance = 3400`
- `startDotYOffset = 28`
- `viewZoom = 100`
- `numberOfStars = 5000`
- `trailLength = 80`

### Deterministic randomness (seeded stars)

To keep the motion visually stable, it temporarily overrides `Math.random` with a deterministic LCG generator during star creation:

- Saves original `Math.random`
- Uses a seeded generator to create stars
- Restores original `Math.random` immediately after

### Render pipeline (what draws each frame)

Each `render()` does:

1. Background:
   - If `background === 'transparent'` => `ctx.clearRect(...)`
   - Else => `ctx.fillRect(...)` with the provided color

2. Center the coordinate system:
   - `ctx.translate(size / 2, size / 2)`

3. Camera rotation:
   - Uses `t2` mapped from `changeEventTime -> 1` and rotates:
     - `ctx.rotate(-Math.PI * ease(t2, 2.7))`

4. Draw the spiral trail (`drawTrail(t1)`)
   - Iterates `i = 0..trailLength-1` (80 segments)
   - Computes:
     - `f` via mapping `i` into `1.1..0.1`
     - `sw` (visual width) via:
       - `(1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f`
   - Each segment:
     - computes a spiral point using `spiralPath(pathTime)`
     - applies a small rotation effect
     - draws a filled arc at the rotated position

5. Draw the “stars” (`Star.render`)
   - Iterates all `numberOfStars` (5000)
   - Each star:
     - chooses its phase based on `q = p - spiralLocation`
     - uses blended easing:
       - linear (`displacementProgress`)
       - elastic (`easeOutElastic`)
       - power (`displacementProgress^2`)
     - moves through 3 motion stages:
       - stage A (`<0.3`): linear pull
       - stage B (`0.3..0.7`): curved offset with perpendicular component
       - stage C (`>0.7`): stronger spiral expansion
     - projects 3D to 2D (`showProjectedDot`) based on camera Z
     - draws a small filled arc at projected coordinates

## How to tweak the effect

### Change heading “feel”

Edit in `components/SectionText.tsx`:

- Word reveal timing (`duration`, `stagger`)
- Blur / glow intensity (`filter` strings)
- Vertical offsets (`y: 50` and `y: 14`)

### Change particle density / intensity

Edit in `components/ui/spiral-animation.tsx`:

- `numberOfStars` (5000) to reduce cost/density
- `trailLength` (80) to change trail richness
- Camera / projection constants:
  - `cameraZ`, `cameraTravelDistance`, `viewZoom`

### Change the cycle speed

Edit the GSAP timeline tween:

- `duration: 15` inside `setupTimeline()`

## Routes

- `GET /` -> `app/page.tsx` -> `components/HeroSection.tsx` (the full hero effect)
- `GET /spiral` -> `app/spiral/page.tsx` (the spiral demo overlay)

