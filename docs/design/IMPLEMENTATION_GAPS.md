# Design System Implementation Gaps & Additions

> **Purpose**: Document all missing elements needed to complete the Cozy Pixel Cafe Blog design system
> **Status**: Planning Phase
> **Last Updated**: 16/12/2024
> **Reference Images**: `/images/blogstyles1-18`

---

## Table of Contents

1. [Pixel Art Asset Management](#1-pixel-art-asset-management)
2. [Background Decorations](#2-background-decorations)
3. [Button States](#3-button-states)
4. [Theme Toggle Animation](#4-theme-toggle-animation)
5. [Card Hover Effects](#5-card-hover-effects)
6. [Icon System](#6-icon-system-16x16-pixel-icons)
7. [Sidebar Widget Styles](#7-sidebar-widget-styles)
8. [Loading States](#8-loading-states)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Focus States (Accessibility)](#10-focus-states-accessibility)
11. [Implementation Priority](#11-implementation-priority)

---

## 1. Pixel Art Asset Management

### 1.1 Problem Statement

The project has beautiful sprite sheets (visible in reference images) but lacks:
- CSS classes to use sprites in components
- Sprite animation keyframes for each character
- Guidelines for exporting/importing sprites into the project
- File naming conventions for assets

### 1.2 Reference Images

| Image | Content |
|-------|---------|
| `blogstyles1.jpeg` | Bulbasaur & Greenery sprites (32x32, 16x16) |
| `blogstyles2.jpeg` | Coffee cups & Character sprites |
| `blogstyles3.jpeg` | Eevee sprites with animations |
| `blogstyles4.jpeg` | Developer character (32x32) + UI Icons (16x16) |
| `blogstyles17.jpeg` | Squirtle & Aquarium elements |

### 1.3 Sprite Size Standards

```
Standard Sprite Sizes (based on GBA conventions):
├── 16x16  - Mini icons, small decorations, portrait icons
├── 32x32  - Standard character sprites, medium icons
├── 48x48  - Large icons (rare use)
├── 64x64  - Hero sprites, large illustrations
└── 128x128+ - Feature illustrations, backgrounds
```

### 1.4 Variables to Add (variables.css)

```css
/* ===========================================
   SPRITE SYSTEM TOKENS
   =========================================== */
:root {
  /* ---- Sprite Sizes ---- */
  --sprite-size-xs: 8px;    /* Tiny decorations */
  --sprite-size-sm: 16px;   /* Mini icons, portrait icons */
  --sprite-size-md: 32px;   /* Standard characters */
  --sprite-size-lg: 48px;   /* Large icons */
  --sprite-size-xl: 64px;   /* Hero sprites */
  --sprite-size-2xl: 128px; /* Feature illustrations */

  /* ---- Animation Frame Counts ---- */
  --sprite-frames-blink: 4;      /* Eye blink sequence */
  --sprite-frames-idle: 2;       /* Idle breathing */
  --sprite-frames-walk: 4;       /* Walking cycle */
  --sprite-frames-action: 6;     /* Typing, watering, etc. */

  /* ---- Animation Speeds ---- */
  --sprite-speed-slow: 1.5s;     /* Idle, breathing */
  --sprite-speed-normal: 0.8s;   /* Walking, blinking */
  --sprite-speed-fast: 0.4s;     /* Actions, reactions */
}
```

### 1.5 Sprite Animation Keyframes

```css
/* ===========================================
   SPRITE ANIMATION KEYFRAMES
   =========================================== */

/* 2-Frame Animation (Idle/Breathing) */
@keyframes sprite2Frame {
  0%, 100% { background-position-x: 0; }
  50% { background-position-x: calc(-1 * var(--sprite-size-md)); }
}

/* 4-Frame Animation (Blink/Walk) */
@keyframes sprite4Frame {
  0%, 100% { background-position-x: 0; }
  25% { background-position-x: calc(-1 * var(--sprite-size-md)); }
  50% { background-position-x: calc(-2 * var(--sprite-size-md)); }
  75% { background-position-x: calc(-3 * var(--sprite-size-md)); }
}

/* 6-Frame Animation (Actions) */
@keyframes sprite6Frame {
  0%, 100% { background-position-x: 0; }
  16.67% { background-position-x: calc(-1 * var(--sprite-size-md)); }
  33.33% { background-position-x: calc(-2 * var(--sprite-size-md)); }
  50% { background-position-x: calc(-3 * var(--sprite-size-md)); }
  66.67% { background-position-x: calc(-4 * var(--sprite-size-md)); }
  83.33% { background-position-x: calc(-5 * var(--sprite-size-md)); }
}

/* Character-Specific: Developer Typing */
@keyframes developerTyping {
  0%, 100% { background-position: 0 -32px; }      /* Typing frame 1 */
  50% { background-position: -32px -32px; }       /* Typing frame 2 */
}

/* Character-Specific: Bulbasaur Eye Blink */
@keyframes bulbasaurBlink {
  0%, 90%, 100% { background-position: 0 0; }     /* Eyes open */
  95% { background-position: -32px 0; }           /* Eyes closed */
}

/* Character-Specific: Coffee Steam */
@keyframes coffeeSteam {
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0) scaleX(1);
  }
  25% {
    opacity: 0.7;
    transform: translateY(-4px) scaleX(1.1);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-8px) scaleX(0.9);
  }
  75% {
    opacity: 0.3;
    transform: translateY(-12px) scaleX(1.05);
  }
}
```

### 1.6 CSS Utility Classes for Sprites

```css
/* ===========================================
   SPRITE UTILITY CLASSES
   =========================================== */

/* Base sprite class */
.sprite {
  display: inline-block;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: none;
}

/* Size variants */
.sprite--sm { width: var(--sprite-size-sm); height: var(--sprite-size-sm); }
.sprite--md { width: var(--sprite-size-md); height: var(--sprite-size-md); }
.sprite--lg { width: var(--sprite-size-lg); height: var(--sprite-size-lg); }
.sprite--xl { width: var(--sprite-size-xl); height: var(--sprite-size-xl); }

/* Animation states */
.sprite--animated {
  animation-timing-function: steps(1);
  animation-iteration-count: infinite;
}

.sprite--idle {
  animation: sprite2Frame var(--sprite-speed-slow) steps(2) infinite;
}

.sprite--blink {
  animation: sprite4Frame var(--sprite-speed-normal) steps(4) infinite;
}

.sprite--action {
  animation: sprite6Frame var(--sprite-speed-fast) steps(6) infinite;
}

/* Pause animation on hover (optional interaction) */
.sprite--pause-on-hover:hover {
  animation-play-state: paused;
}
```

### 1.7 File Naming Convention

```
Asset Naming Convention:
sprite-[character]-[action]-[size].png

Examples:
├── sprite-developer-idle-32.png
├── sprite-developer-typing-32.png
├── sprite-bulbasaur-blink-32.png
├── sprite-coffee-steam-16.png
├── icon-home-16.png
├── icon-theme-sun-16.png
├── icon-theme-moon-16.png
├── deco-coffee-bean-16.png
├── deco-star-sparkle-8.png
└── bg-paper-texture.png
```

### 1.8 Directory Structure for Assets

```
frontend/
├── public/
│   └── assets/
│       ├── sprites/
│       │   ├── characters/
│       │   │   ├── developer/
│       │   │   │   ├── sprite-developer-idle-32.png
│       │   │   │   ├── sprite-developer-typing-32.png
│       │   │   │   └── sprite-developer-sheet.png (full sheet)
│       │   │   ├── bulbasaur/
│       │   │   ├── eevee/
│       │   │   └── squirtle/
│       │   ├── coffee/
│       │   │   ├── sprite-coffee-cup-full-32.png
│       │   │   ├── sprite-coffee-cup-empty-32.png
│       │   │   └── sprite-coffee-steam-16.png
│       │   └── plants/
│       │       ├── sprite-plant-monstera-32.png
│       │       └── sprite-plant-succulent-16.png
│       ├── icons/
│       │   ├── nav/
│       │   │   ├── icon-home-16.png
│       │   │   ├── icon-blog-16.png
│       │   │   └── icon-contact-16.png
│       │   ├── social/
│       │   │   ├── icon-github-16.png
│       │   │   └── icon-linkedin-16.png
│       │   └── ui/
│       │       ├── icon-sun-16.png
│       │       ├── icon-moon-16.png
│       │       └── icon-search-16.png
│       ├── decorations/
│       │   ├── deco-coffee-bean-16.png
│       │   ├── deco-star-8.png
│       │   └── deco-leaf-separator.png
│       └── backgrounds/
│           ├── bg-paper-texture.png
│           └── bg-coffee-stain.png
```

---

## 2. Background Decorations

### 2.1 Problem Statement

Reference images show rich background decorations:
- Floating coffee beans
- Stars/sparkles animation
- Coffee stains in page corners
- Paper/parchment texture overlay

Currently missing: CSS for decorative overlay layers

### 2.2 Reference Images

| Image | Decoration Type |
|-------|-----------------|
| `blogstyles9.png` | Coffee stains in corners, paper texture |
| `blogstyles14.jpeg` | Floating stars, ambient particles |
| `blogstyles15.jpeg` | Plant decorations, coffee beans |

### 2.3 Variables to Add

```css
/* ===========================================
   DECORATION TOKENS
   =========================================== */
:root {
  /* ---- Background Textures ---- */
  --texture-paper: url('/assets/backgrounds/bg-paper-texture.png');
  --texture-paper-opacity: 0.03;

  /* ---- Decoration Colors ---- */
  --deco-bean-color: var(--pixel-brown-dark);
  --deco-star-color: var(--warning);
  --deco-stain-color: rgba(139, 94, 70, 0.08);

  /* ---- Particle Settings ---- */
  --particle-count: 15;
  --particle-size-min: 8px;
  --particle-size-max: 16px;
  --particle-speed: 20s;

  /* ---- Stain Positions ---- */
  --stain-top-right: url('/assets/decorations/bg-coffee-stain.png');
  --stain-bottom-left: url('/assets/decorations/bg-coffee-stain-2.png');
}
```

### 2.4 Paper Texture Overlay

```css
/* Paper texture background overlay */
.page-background {
  position: relative;
}

.page-background::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--texture-paper);
  background-repeat: repeat;
  opacity: var(--texture-paper-opacity);
  pointer-events: none;
  z-index: var(--z-base);
}
```

### 2.5 Coffee Stain Decorations

```css
/* Coffee stain in top-right corner */
.page-decoration::after {
  content: '';
  position: fixed;
  top: -20px;
  right: -20px;
  width: 200px;
  height: 200px;
  background-image: var(--stain-top-right);
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.06;
  pointer-events: none;
  z-index: var(--z-base);
  transform: rotate(15deg);
}

/* Coffee stain in bottom-left corner */
.page-decoration--bottom::before {
  content: '';
  position: fixed;
  bottom: -30px;
  left: -30px;
  width: 180px;
  height: 180px;
  background-image: var(--stain-bottom-left);
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.05;
  pointer-events: none;
  z-index: var(--z-base);
  transform: rotate(-20deg);
}
```

### 2.6 Floating Coffee Beans Animation

```css
/* Floating particles container */
.floating-decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: var(--z-base);
}

/* Individual floating bean */
.floating-bean {
  position: absolute;
  width: 16px;
  height: 16px;
  background-image: url('/assets/decorations/deco-coffee-bean-16.png');
  background-size: contain;
  image-rendering: pixelated;
  opacity: 0.15;
  animation: floatBean var(--particle-speed) linear infinite;
}

@keyframes floatBean {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.15;
  }
  90% {
    opacity: 0.15;
  }
  100% {
    transform: translateY(-20px) rotate(360deg);
    opacity: 0;
  }
}

/* Different beans have different speeds and positions */
.floating-bean:nth-child(1) { left: 5%; animation-delay: 0s; animation-duration: 25s; }
.floating-bean:nth-child(2) { left: 15%; animation-delay: 3s; animation-duration: 22s; }
.floating-bean:nth-child(3) { left: 25%; animation-delay: 6s; animation-duration: 28s; }
.floating-bean:nth-child(4) { left: 35%; animation-delay: 2s; animation-duration: 24s; }
.floating-bean:nth-child(5) { left: 45%; animation-delay: 8s; animation-duration: 26s; }
.floating-bean:nth-child(6) { left: 55%; animation-delay: 4s; animation-duration: 23s; }
.floating-bean:nth-child(7) { left: 65%; animation-delay: 7s; animation-duration: 27s; }
.floating-bean:nth-child(8) { left: 75%; animation-delay: 1s; animation-duration: 21s; }
.floating-bean:nth-child(9) { left: 85%; animation-delay: 5s; animation-duration: 29s; }
.floating-bean:nth-child(10) { left: 95%; animation-delay: 9s; animation-duration: 25s; }
```

### 2.7 Sparkle/Star Animation

```css
/* Sparkle effect */
.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-image: url('/assets/decorations/deco-star-8.png');
  background-size: contain;
  image-rendering: pixelated;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

/* Sparkle positions - scattered randomly */
.sparkle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 30%; left: 80%; animation-delay: 0.5s; }
.sparkle:nth-child(3) { top: 50%; left: 10%; animation-delay: 1s; }
.sparkle:nth-child(4) { top: 70%; left: 60%; animation-delay: 1.5s; }
.sparkle:nth-child(5) { top: 20%; left: 90%; animation-delay: 0.3s; }
```

### 2.8 React Component Structure

```jsx
// FloatingDecorations.jsx
const FloatingDecorations = ({ type = 'beans', count = 10 }) => {
  return (
    <div className="floating-decorations" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`floating-${type === 'beans' ? 'bean' : 'sparkle'}`}
        />
      ))}
    </div>
  );
};
```

---

## 3. Button States

### 3.1 Problem Statement

Reference image `blogstyles16.jpeg` clearly shows 3 button states:
```
Normal → Hover (lift + glow) → Pressed (pushed down)
```

Current `variables.css` lacks specific button state tokens.

### 3.2 Visual Reference

```
BUTTON STATE DIAGRAM:

┌─────────────────┐
│   Read More     │  ← NORMAL STATE
│   ▓▓▓▓▓▓▓▓▓▓   │     - Shadow: 4px 4px
└─────────────────┘     - Position: baseline

    ↓ hover

  ┌─────────────────┐
  │   Read More     │  ← HOVER STATE
  │   ▓▓▓▓▓▓▓▓▓▓   │     - Shadow: 6px 6px
  └─────────────────┘     - Position: lifted -2px
  ✨ Golden glow border

    ↓ click/active

┌─────────────────┐
│   Read More     │  ← PRESSED STATE
│                 │     - Shadow: 1px 1px
└─▓▓▓▓▓▓▓▓▓▓▓▓▓▓─┘     - Position: pushed +2px
```

### 3.3 Variables to Add

```css
/* ===========================================
   BUTTON STATE TOKENS
   =========================================== */
:root {
  /* ---- Transform States ---- */
  --btn-translate-normal: translate(0, 0);
  --btn-translate-hover: translate(-2px, -2px);
  --btn-translate-active: translate(2px, 2px);

  /* ---- Shadow States ---- */
  --btn-shadow-normal: 4px 4px 0 var(--border-primary);
  --btn-shadow-hover: 6px 6px 0 var(--border-primary);
  --btn-shadow-active: 1px 1px 0 var(--border-primary);
  --btn-shadow-none: none;

  /* ---- Glow Effect (Hover) ---- */
  --btn-glow-color: var(--warning);
  --btn-glow-size: 8px;
  --btn-glow-opacity: 0.4;
  --btn-glow:
    0 0 0 2px var(--btn-glow-color),
    0 0 var(--btn-glow-size) rgba(255, 215, 0, var(--btn-glow-opacity));

  /* ---- Transition ---- */
  --btn-transition:
    transform var(--duration-150) var(--ease-out),
    box-shadow var(--duration-150) var(--ease-out),
    background-color var(--duration-150) var(--ease-out);

  /* ---- Disabled State ---- */
  --btn-disabled-opacity: 0.5;
  --btn-disabled-cursor: not-allowed;
}
```

### 3.4 Button Component CSS

```css
/* ===========================================
   BUTTON COMPONENTS
   =========================================== */

/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  padding: var(--btn-padding-y) var(--btn-padding-x);
  min-height: 40px;

  font-family: var(--font-body);
  font-size: var(--btn-font-size);
  font-weight: var(--font-medium);
  text-decoration: none;
  white-space: nowrap;

  border: var(--btn-border-width) solid var(--border-dark);
  clip-path: var(--clip-pixel-sm);

  cursor: pointer;
  transition: var(--btn-transition);

  /* Default state */
  transform: var(--btn-translate-normal);
  box-shadow: var(--btn-shadow-normal);
}

/* Primary Button */
.btn-primary {
  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border-color: var(--border-dark);
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: var(--btn-translate-hover);
  box-shadow: var(--btn-shadow-hover), var(--btn-glow);
}

.btn-primary:active {
  background-color: var(--accent-active, var(--accent-hover));
  transform: var(--btn-translate-active);
  box-shadow: var(--btn-shadow-active);
}

.btn-primary:disabled {
  opacity: var(--btn-disabled-opacity);
  cursor: var(--btn-disabled-cursor);
  transform: none;
  box-shadow: var(--btn-shadow-normal);
}

/* Ghost/Secondary Button */
.btn-ghost {
  color: var(--accent-primary);
  background-color: transparent;
  border-color: var(--accent-primary);
  border-style: dashed;
  box-shadow: none;
}

.btn-ghost:hover {
  color: var(--text-primary);
  background-color: var(--accent-secondary);
  border-style: solid;
  transform: var(--btn-translate-hover);
  box-shadow: var(--btn-glow);
}

.btn-ghost:active {
  background-color: var(--bg-tertiary);
  transform: var(--btn-translate-active);
  box-shadow: none;
}

/* Icon Button (Square) */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;

  color: var(--text-tertiary);
  background-color: var(--bg-secondary);
  border-color: var(--border-primary);

  box-shadow: var(--shadow-pixel-sm);
}

.btn-icon:hover {
  color: var(--accent-primary);
  background-color: var(--bg-primary);
  transform: var(--btn-translate-hover);
  box-shadow: var(--shadow-pixel-md), var(--btn-glow);
}

.btn-icon:active {
  transform: var(--btn-translate-active);
  box-shadow: none;
}
```

### 3.5 Button Size Variants

```css
/* Size Variants */
.btn--sm {
  padding: var(--space-1) var(--space-3);
  min-height: 32px;
  font-size: var(--text-xs);
}

.btn--lg {
  padding: var(--space-3) var(--space-6);
  min-height: 48px;
  font-size: var(--text-base);
}

/* Full Width */
.btn--full {
  width: 100%;
}
```

---

## 4. Theme Toggle Animation

### 4.1 Problem Statement

Reference image `blogstyles10.png` shows a special theme toggle animation:
```
Day Mode (Sun + Coffee) → Transition → Night Mode (Moon + Coffee)
```

The coffee cup also changes appearance between modes.

### 4.2 Visual Reference

```
THEME TOGGLE ANIMATION SEQUENCE:

┌─────────┐      ┌─────────┐      ┌─────────┐
│   ☀️    │  →   │  ☀️🌙   │  →   │    🌙   │
│  ☕     │      │   ☕    │      │   ☕    │
│ (light) │      │(mixing) │      │ (dark)  │
└─────────┘      └─────────┘      └─────────┘
   Day            Transition         Night

Coffee cup:
- Day: Light brown, cream visible
- Night: Dark brown, steam visible with glow
```

### 4.3 Variables to Add

```css
/* ===========================================
   THEME TOGGLE TOKENS
   =========================================== */
:root {
  /* ---- Toggle Button Size ---- */
  --toggle-size: 48px;
  --toggle-icon-size: 24px;

  /* ---- Toggle Colors ---- */
  --toggle-bg-day: var(--warning);
  --toggle-bg-night: #1A1814;
  --toggle-icon-day: #FFA500;
  --toggle-icon-night: #F0E68C;

  /* ---- Transition Duration ---- */
  --toggle-duration: 0.5s;
}

/* Dark theme overrides */
.dark-theme {
  --toggle-bg: var(--toggle-bg-night);
  --toggle-icon-color: var(--toggle-icon-night);
}
```

### 4.4 Theme Toggle Animation CSS

```css
/* ===========================================
   THEME TOGGLE COMPONENT
   =========================================== */

.theme-toggle {
  position: relative;
  width: var(--toggle-size);
  height: var(--toggle-size);

  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-sm);

  cursor: pointer;
  overflow: hidden;

  transition: background-color var(--toggle-duration) var(--ease-out);
}

/* Sun Icon */
.theme-toggle__sun {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--toggle-icon-size);
  height: var(--toggle-icon-size);

  background-image: url('/assets/icons/ui/icon-sun-16.png');
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated;

  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  opacity: 1;

  transition:
    transform var(--toggle-duration) var(--ease-out),
    opacity var(--toggle-duration) var(--ease-out);
}

/* Moon Icon */
.theme-toggle__moon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--toggle-icon-size);
  height: var(--toggle-icon-size);

  background-image: url('/assets/icons/ui/icon-moon-16.png');
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated;

  transform: translate(-50%, -50%) rotate(-90deg) scale(0);
  opacity: 0;

  transition:
    transform var(--toggle-duration) var(--ease-out),
    opacity var(--toggle-duration) var(--ease-out);
}

/* Dark Mode States */
.dark-theme .theme-toggle__sun {
  transform: translate(-50%, -50%) rotate(90deg) scale(0);
  opacity: 0;
}

.dark-theme .theme-toggle__moon {
  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  opacity: 1;
}

/* Hover glow */
.theme-toggle:hover {
  box-shadow: var(--btn-glow);
}

/* Click animation */
.theme-toggle:active {
  transform: scale(0.95);
}
```

### 4.5 Theme Toggle Keyframes

```css
/* Sun rays rotation (optional enhancement) */
@keyframes sunRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Moon wobble (optional enhancement) */
@keyframes moonWobble {
  0%, 100% { transform: translate(-50%, -50%) rotate(-5deg); }
  50% { transform: translate(-50%, -50%) rotate(5deg); }
}

/* Stars appear around moon (optional) */
@keyframes starsAppear {
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.7; transform: scale(1); }
}
```

### 4.6 React Component Example

```jsx
// ThemeToggle.jsx
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__sun" aria-hidden="true" />
      <span className="theme-toggle__moon" aria-hidden="true" />
    </button>
  );
};
```

---

## 5. Card Hover Effects

### 5.1 Problem Statement

Reference images `blogstyles14.jpeg` and `blogstyles15.jpeg` show:
- Golden glow border on hover
- Slight lift effect
- Cards with pixel art thumbnails

### 5.2 Visual Reference

```
CARD HOVER EFFECT:

┌───────────────────┐        ╔═══════════════════╗
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │        ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
│ ▓▓ Thumbnail ▓▓▓ │   →    ║ ▓▓ Thumbnail ▓▓▓ ║
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  hover ║ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
├───────────────────┤        ╠═══════════════════╣
│ Post Title        │        ║ Post Title        ║
│ Description...    │        ║ Description...    ║
│ ○ Coffee · 5 min  │        ║ ○ Coffee · 5 min  ║
└───────────────────┘        ╚═══════════════════╝
      ▓▓▓▓▓▓ shadow                ▓▓▓▓▓▓▓▓ larger shadow
                               ✨ Golden glow border
                               ↑ Lifted 4px
```

### 5.3 Variables to Add

```css
/* ===========================================
   CARD EFFECT TOKENS
   =========================================== */
:root {
  /* ---- Card Hover Transform ---- */
  --card-translate-hover: translate(-4px, -4px);
  --card-scale-hover: 1; /* or 1.02 for subtle zoom */

  /* ---- Card Shadows ---- */
  --card-shadow-normal: var(--shadow-pixel-sm);
  --card-shadow-hover: var(--shadow-pixel-md);

  /* ---- Card Glow ---- */
  --card-glow-color: var(--warning);
  --card-glow:
    0 0 0 3px var(--card-glow-color),
    0 0 20px rgba(255, 215, 0, 0.3);

  /* ---- Card Image Zoom ---- */
  --card-img-scale-hover: 1.05;

  /* ---- Transition ---- */
  --card-transition:
    transform var(--duration-200) var(--ease-out),
    box-shadow var(--duration-200) var(--ease-out);
}
```

### 5.4 Card Component CSS

```css
/* ===========================================
   POST CARD COMPONENT
   =========================================== */

.post-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-md);

  box-shadow: var(--card-shadow-normal);
  transition: var(--card-transition);
}

/* Hover state */
.post-card:hover {
  transform: var(--card-translate-hover);
  box-shadow: var(--card-shadow-hover), var(--card-glow);
}

/* Card Image Container */
.post-card__image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-bottom: 2px solid var(--border-primary);
}

.post-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated; /* For pixel art thumbnails */
  transition: transform var(--duration-300) var(--ease-out);
}

.post-card:hover .post-card__image img {
  transform: scale(var(--card-img-scale-hover));
}

/* Category Badge (overlaid on image) */
.post-card__category {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);

  display: inline-flex;
  align-items: center;
  gap: var(--space-1);

  padding: var(--space-1) var(--space-2);

  font-size: 10px;
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border: 1px solid var(--border-dark);

  clip-path: var(--clip-pixel-sm);
}

/* Card Content */
.post-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  flex-grow: 1;
}

/* Card Title */
.post-card__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);

  /* Clamp to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  transition: color var(--duration-150) var(--ease-out);
}

.post-card:hover .post-card__title {
  color: var(--accent-primary);
}

/* Card Excerpt */
.post-card__excerpt {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--text-muted);

  /* Clamp to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Meta (author, date, read time) */
.post-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);

  font-size: var(--text-xs);
  color: var(--text-muted);
}

.post-card__meta-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
}
```

### 5.5 Featured Card Variant

```css
/* Featured/Large Card */
.post-card--featured {
  grid-column: span 2; /* Takes 2 columns */
}

.post-card--featured .post-card__image {
  aspect-ratio: 21 / 9;
}

.post-card--featured .post-card__title {
  font-size: var(--text-xl);
}

/* Horizontal Card */
.post-card--horizontal {
  flex-direction: row;
}

.post-card--horizontal .post-card__image {
  width: 200px;
  flex-shrink: 0;
  aspect-ratio: 1;
  border-bottom: none;
  border-right: 2px solid var(--border-primary);
}
```

---

## 6. Icon System (16x16 Pixel Icons)

### 6.1 Problem Statement

Reference image `blogstyles4.jpeg` shows a complete icon set:
- Navigation: Home, About, Code, Blog, Contact
- Theme: Sun, Moon
- Social: GitHub, LinkedIn
- UI: Heart, Coffee, Plant, Book, Search

Currently missing:
- Actual icon files (SVG or PNG)
- Icon component CSS
- Hover states for icons

### 6.2 Icon Inventory

```
REQUIRED ICONS (16x16 pixels):

Navigation Icons:
├── icon-home-16.png
├── icon-about-16.png
├── icon-code-16.png
├── icon-blog-16.png
├── icon-contact-16.png
└── icon-search-16.png

Theme Icons:
├── icon-sun-16.png
└── icon-moon-16.png

Social Icons:
├── icon-github-16.png
├── icon-linkedin-16.png
└── icon-twitter-16.png (optional)

UI/Decorative Icons:
├── icon-heart-16.png
├── icon-heart-filled-16.png
├── icon-coffee-16.png
├── icon-plant-16.png
├── icon-book-16.png
├── icon-clock-16.png
├── icon-calendar-16.png
├── icon-tag-16.png
├── icon-folder-16.png
├── icon-chevron-right-16.png
├── icon-chevron-down-16.png
├── icon-external-link-16.png
└── icon-menu-16.png
```

### 6.3 Variables to Add

```css
/* ===========================================
   ICON SYSTEM TOKENS
   =========================================== */
:root {
  /* ---- Icon Sizes ---- */
  --icon-size-xs: 12px;
  --icon-size-sm: 16px;
  --icon-size-md: 20px;
  --icon-size-lg: 24px;
  --icon-size-xl: 32px;

  /* ---- Icon Colors ---- */
  --icon-color-default: var(--text-tertiary);
  --icon-color-hover: var(--accent-primary);
  --icon-color-active: var(--text-primary);
  --icon-color-muted: var(--text-muted);

  /* ---- Icon Transition ---- */
  --icon-transition:
    color var(--duration-150) var(--ease-out),
    transform var(--duration-150) var(--ease-out),
    filter var(--duration-150) var(--ease-out);
}
```

### 6.4 Icon Component CSS

```css
/* ===========================================
   ICON COMPONENTS
   =========================================== */

/* Base Icon */
.icon {
  display: inline-block;
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  image-rendering: pixelated;
  image-rendering: crisp-edges;

  transition: var(--icon-transition);
}

/* Size Variants */
.icon--xs { width: var(--icon-size-xs); height: var(--icon-size-xs); }
.icon--sm { width: var(--icon-size-sm); height: var(--icon-size-sm); }
.icon--md { width: var(--icon-size-md); height: var(--icon-size-md); }
.icon--lg { width: var(--icon-size-lg); height: var(--icon-size-lg); }
.icon--xl { width: var(--icon-size-xl); height: var(--icon-size-xl); }

/* Color Filter for Recoloring PNG Icons */
/* Note: This only works well with single-color icons */
.icon--primary {
  filter: brightness(0) saturate(100%)
          invert(35%) sepia(20%) saturate(800%)
          hue-rotate(345deg) brightness(95%) contrast(90%);
}

/* Hover effect */
.icon:hover {
  transform: scale(1.1);
}

/* Specific Icons */
.icon-home { background-image: url('/assets/icons/nav/icon-home-16.png'); }
.icon-about { background-image: url('/assets/icons/nav/icon-about-16.png'); }
.icon-blog { background-image: url('/assets/icons/nav/icon-blog-16.png'); }
.icon-code { background-image: url('/assets/icons/nav/icon-code-16.png'); }
.icon-contact { background-image: url('/assets/icons/nav/icon-contact-16.png'); }
.icon-search { background-image: url('/assets/icons/ui/icon-search-16.png'); }
.icon-sun { background-image: url('/assets/icons/ui/icon-sun-16.png'); }
.icon-moon { background-image: url('/assets/icons/ui/icon-moon-16.png'); }
.icon-github { background-image: url('/assets/icons/social/icon-github-16.png'); }
.icon-linkedin { background-image: url('/assets/icons/social/icon-linkedin-16.png'); }
.icon-heart { background-image: url('/assets/icons/ui/icon-heart-16.png'); }
.icon-coffee { background-image: url('/assets/icons/ui/icon-coffee-16.png'); }
.icon-plant { background-image: url('/assets/icons/ui/icon-plant-16.png'); }
.icon-book { background-image: url('/assets/icons/ui/icon-book-16.png'); }
.icon-clock { background-image: url('/assets/icons/ui/icon-clock-16.png'); }
.icon-tag { background-image: url('/assets/icons/ui/icon-tag-16.png'); }
```

### 6.5 Icon + Text Combination

```css
/* Icon with text label */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.icon-text .icon {
  flex-shrink: 0;
}

/* Icon button (clickable icon) */
.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: var(--space-2);

  background: transparent;
  border: none;
  cursor: pointer;

  transition: var(--icon-transition);
}

.icon-btn:hover {
  transform: scale(1.1);
}

.icon-btn:hover .icon {
  filter: brightness(1.2);
}
```

### 6.6 React Icon Component

```jsx
// Icon.jsx
const Icon = ({
  name,
  size = 'sm',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`icon icon--${size} icon-${name} ${className}`}
      role="img"
      aria-hidden="true"
      {...props}
    />
  );
};

// Usage
<Icon name="home" size="md" />
<Icon name="github" />
```

---

## 7. Sidebar Widget Styles

### 7.1 Problem Statement

Reference images `blogstyles5.jpeg` and `blogstyles15.jpeg` show sidebar widgets:
- Table of Contents
- Popular Tags
- About section with mascot

Missing: Widget header with pixel font, styled content.

### 7.2 Visual Reference

```
SIDEBAR WIDGETS:

┌─── Table of Contents ───┐
│ • A Rainy Day in Perth  │
│ • Personal Life as an   │
│   International...      │
│ • Tech: Building My     │
│   First Data Pipeline   │
└─────────────────────────┘

┌─── Popular Tags ────────┐
│ ┌─────┐ ┌──────┐ ┌────┐│
│ │ dsp │ │python│ │code││
│ └─────┘ └──────┘ └────┘│
│ ┌───────┐ ┌────┐ ┌────┐│
│ │pokémon│ │data│ │ ... ││
│ └───────┘ └────┘ └────┘│
└─────────────────────────┘

┌─── About ───────────────┐
│    ┌─────────────┐      │
│    │  [Mascot]   │      │
│    │   Avatar    │      │
│    └─────────────┘      │
│                         │
│  Hi! I'm Coffee...      │
│  Data engineer and...   │
└─────────────────────────┘
```

### 7.3 Variables to Add

```css
/* ===========================================
   WIDGET TOKENS
   =========================================== */
:root {
  /* ---- Widget Dimensions ---- */
  --widget-width: 280px;
  --widget-width-lg: 320px;

  /* ---- Widget Spacing ---- */
  --widget-header-padding: var(--space-3) var(--space-4);
  --widget-content-padding: var(--space-4);
  --widget-gap: var(--space-4);

  /* ---- Widget Colors ---- */
  --widget-header-bg: var(--bg-tertiary);
  --widget-content-bg: var(--bg-secondary);

  /* ---- TOC Specific ---- */
  --toc-indent: var(--space-4);
  --toc-bullet-size: 6px;
  --toc-bullet-color: var(--accent-primary);
  --toc-active-color: var(--accent-primary);
}
```

### 7.4 Widget Component CSS

```css
/* ===========================================
   SIDEBAR WIDGETS
   =========================================== */

/* Base Widget */
.widget {
  background-color: var(--widget-content-bg);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-md);
  overflow: hidden;
}

/* Widget Header */
.widget__header {
  padding: var(--widget-header-padding);
  background-color: var(--widget-header-bg);
  border-bottom: 2px solid var(--border-primary);
}

.widget__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  color: var(--text-secondary);
  text-shadow: 1px 1px 0 var(--border-dark);
}

/* Widget Content */
.widget__content {
  padding: var(--widget-content-padding);
}

/* ─────────────────────────────────────
   TABLE OF CONTENTS WIDGET
   ───────────────────────────────────── */

.toc-widget__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-widget__item {
  margin-bottom: var(--space-2);
}

.toc-widget__link {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);

  padding: var(--space-1) 0;

  font-size: var(--text-sm);
  line-height: var(--leading-snug);
  color: var(--text-tertiary);
  text-decoration: none;

  transition: color var(--duration-150) var(--ease-out);
}

/* Pixel bullet */
.toc-widget__link::before {
  content: '';
  flex-shrink: 0;
  width: var(--toc-bullet-size);
  height: var(--toc-bullet-size);
  margin-top: 6px;

  background-color: var(--toc-bullet-color);
  opacity: 0.5;

  transition: opacity var(--duration-150) var(--ease-out);
}

.toc-widget__link:hover {
  color: var(--accent-primary);
}

.toc-widget__link:hover::before {
  opacity: 1;
}

/* Active state (current section) */
.toc-widget__link--active {
  color: var(--text-primary);
  font-weight: var(--font-medium);
}

.toc-widget__link--active::before {
  opacity: 1;
  background-color: var(--warning);
}

/* Nested items (H3, H4) */
.toc-widget__item--h3 {
  padding-left: var(--toc-indent);
}

.toc-widget__item--h4 {
  padding-left: calc(var(--toc-indent) * 2);
}

.toc-widget__item--h3 .toc-widget__link::before,
.toc-widget__item--h4 .toc-widget__link::before {
  width: 4px;
  height: 4px;
}

/* ─────────────────────────────────────
   POPULAR TAGS WIDGET
   ───────────────────────────────────── */

.tags-widget__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--tag-padding-y) var(--tag-padding-x);

  font-size: var(--tag-font-size);
  font-weight: var(--font-medium);
  color: var(--text-tertiary);
  text-decoration: none;

  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);

  transition:
    color var(--duration-150) var(--ease-out),
    background-color var(--duration-150) var(--ease-out),
    border-color var(--duration-150) var(--ease-out);
}

.tag:hover {
  color: var(--text-primary);
  background-color: var(--accent-secondary);
  border-color: var(--accent-primary);
}

.tag--active {
  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border-color: var(--border-dark);
}

/* Tag with count */
.tag__count {
  margin-left: var(--space-1);
  font-size: 10px;
  opacity: 0.7;
}

/* ─────────────────────────────────────
   ABOUT WIDGET
   ───────────────────────────────────── */

.about-widget {
  text-align: center;
}

.about-widget__avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-3);

  border: 2px solid var(--border-primary);
  border-radius: 50%;
  overflow: hidden;

  box-shadow: var(--shadow-pixel-sm);
}

.about-widget__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.about-widget__name {
  margin: 0 0 var(--space-1);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.about-widget__bio {
  margin: 0 0 var(--space-3);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--text-muted);
}

.about-widget__social {
  display: flex;
  justify-content: center;
  gap: var(--space-2);
}
```

---

## 8. Loading States

### 8.1 Problem Statement

Reference image `blogstyles10.png` shows:
- Coffee cup filling animation for page loading
- Loading indicator with thematic design

### 8.2 Visual Reference

```
COFFEE LOADING ANIMATION:

Frame 1     Frame 2     Frame 3     Frame 4
┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐
│     │     │     │     │     │     │  ☕  │
│     │     │░░░░░│     │▓▓▓▓▓│     │█████│
│░░░░░│     │▓▓▓▓▓│     │█████│     │█████│
└─────┘     └─────┘     └─────┘     └─────┘
  25%         50%         75%        100%
```

### 8.3 Variables to Add

```css
/* ===========================================
   LOADING STATE TOKENS
   =========================================== */
:root {
  /* ---- Loading Colors ---- */
  --loading-bg: var(--bg-secondary);
  --loading-fill: var(--accent-primary);
  --loading-text: var(--text-muted);

  /* ---- Loading Sizes ---- */
  --loading-cup-size: 64px;
  --loading-spinner-size: 32px;

  /* ---- Loading Durations ---- */
  --loading-fill-duration: 2s;
  --loading-pulse-duration: 1.5s;
}
```

### 8.4 Loading Component CSS

```css
/* ===========================================
   LOADING COMPONENTS
   =========================================== */

/* ─────────────────────────────────────
   COFFEE CUP LOADING
   ───────────────────────────────────── */

.loading-coffee {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-8);
}

.loading-coffee__cup {
  position: relative;
  width: var(--loading-cup-size);
  height: var(--loading-cup-size);
}

/* Cup outline (pixel art) */
.loading-coffee__cup-outline {
  position: absolute;
  inset: 0;
  background-image: url('/assets/sprites/coffee/sprite-coffee-cup-empty-64.png');
  background-size: contain;
  image-rendering: pixelated;
  z-index: 2;
}

/* Coffee fill (animated) */
.loading-coffee__fill {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 0;

  background: linear-gradient(
    to top,
    var(--pixel-brown-dark) 0%,
    var(--pixel-brown-main) 50%,
    var(--pixel-brown-light) 100%
  );

  animation: coffeeFill var(--loading-fill-duration) ease-in-out infinite;
  z-index: 1;
}

@keyframes coffeeFill {
  0% {
    height: 0;
  }
  80% {
    height: calc(100% - 20px);
  }
  100% {
    height: calc(100% - 20px);
    opacity: 0;
  }
}

/* Steam animation */
.loading-coffee__steam {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 4px;
}

.loading-coffee__steam-line {
  width: 4px;
  height: 16px;
  background-color: var(--text-muted);
  opacity: 0;
  border-radius: 2px;

  animation: steamRise var(--loading-pulse-duration) ease-in-out infinite;
}

.loading-coffee__steam-line:nth-child(1) { animation-delay: 0s; }
.loading-coffee__steam-line:nth-child(2) { animation-delay: 0.3s; }
.loading-coffee__steam-line:nth-child(3) { animation-delay: 0.6s; }

/* Loading text */
.loading-coffee__text {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--loading-text);
  animation: pulse var(--loading-pulse-duration) ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ─────────────────────────────────────
   SIMPLE PIXEL SPINNER
   ───────────────────────────────────── */

.loading-spinner {
  width: var(--loading-spinner-size);
  height: var(--loading-spinner-size);

  border: 4px solid var(--border-subtle);
  border-top-color: var(--accent-primary);

  animation: spin 1s steps(8) infinite;
}

/* ─────────────────────────────────────
   SKELETON LOADING (For cards)
   ───────────────────────────────────── */

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--text {
  height: 1em;
  margin-bottom: 0.5em;
  border-radius: 2px;
}

.skeleton--image {
  aspect-ratio: 16 / 9;
}

.skeleton--avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* ─────────────────────────────────────
   PAGE LOADING OVERLAY
   ───────────────────────────────────── */

.page-loading {
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--bg-primary);
  z-index: var(--z-modal);

  transition: opacity var(--duration-300) var(--ease-out);
}

.page-loading--hidden {
  opacity: 0;
  pointer-events: none;
}
```

### 8.5 React Loading Component

```jsx
// LoadingCoffee.jsx
const LoadingCoffee = ({ text = 'Brewing...' }) => {
  return (
    <div className="loading-coffee">
      <div className="loading-coffee__cup">
        <div className="loading-coffee__cup-outline" />
        <div className="loading-coffee__fill" />
        <div className="loading-coffee__steam">
          <div className="loading-coffee__steam-line" />
          <div className="loading-coffee__steam-line" />
          <div className="loading-coffee__steam-line" />
        </div>
      </div>
      <span className="loading-coffee__text">{text}</span>
    </div>
  );
};
```

---

## 9. Responsive Breakpoints

### 9.1 Problem Statement

Design flowchart shows distinct mobile views:
- Bottom navigation bar
- Hamburger menu
- Simplified cards
- Single column layout

Missing: Mobile-specific component variants and breakpoint behaviors.

### 9.2 Breakpoint Reference

```css
/* Already defined in variables.css */
:root {
  --breakpoint-sm: 640px;   /* Mobile landscape */
  --breakpoint-md: 768px;   /* Tablet */
  --breakpoint-lg: 1024px;  /* Desktop */
  --breakpoint-xl: 1280px;  /* Large desktop */
  --breakpoint-2xl: 1536px; /* Extra large */
}
```

### 9.3 Layout Changes by Breakpoint

```
BREAKPOINT BEHAVIORS:

< 640px (Mobile):
├── Single column layout
├── Bottom navigation bar
├── Hamburger menu for main nav
├── Full-width cards
├── Sidebar hidden (accessible via menu)
├── Simplified post cards (no excerpt)
└── Touch-optimized buttons (min 44px)

640px - 768px (Tablet Portrait):
├── 2-column post grid
├── Top navigation (condensed)
├── Sidebar in off-canvas drawer
└── Standard card layout

768px - 1024px (Tablet Landscape):
├── 2-column post grid
├── Full navigation
├── Sidebar visible (narrower)
└── Standard interactions

> 1024px (Desktop):
├── 3-column post grid
├── Full navigation with hover states
├── Full sidebar
└── All hover/glow effects enabled
```

### 9.4 Mobile Navigation CSS

```css
/* ===========================================
   MOBILE NAVIGATION
   =========================================== */

/* Mobile Bottom Nav (< 640px) */
@media (max-width: 639px) {
  .mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 64px;
    padding: var(--space-2) var(--space-4);
    padding-bottom: env(safe-area-inset-bottom, var(--space-2));

    background-color: var(--bg-secondary);
    border-top: 2px solid var(--border-primary);

    z-index: var(--z-fixed);
  }

  .mobile-nav__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);

    padding: var(--space-1);

    color: var(--text-tertiary);
    text-decoration: none;

    transition: color var(--duration-150) var(--ease-out);
  }

  .mobile-nav__item--active {
    color: var(--accent-primary);
  }

  .mobile-nav__icon {
    width: 24px;
    height: 24px;
  }

  .mobile-nav__label {
    font-size: 10px;
    font-weight: var(--font-medium);
  }

  /* Add bottom padding to main content */
  .main-content {
    padding-bottom: 80px;
  }

  /* Hide desktop nav */
  .desktop-nav {
    display: none;
  }
}

/* Show desktop nav on larger screens */
@media (min-width: 640px) {
  .mobile-nav {
    display: none;
  }
}
```

### 9.5 Responsive Post Grid

```css
/* ===========================================
   RESPONSIVE POST GRID
   =========================================== */

.post-grid {
  display: grid;
  gap: var(--space-4);
}

/* Mobile: 1 column */
@media (max-width: 639px) {
  .post-grid {
    grid-template-columns: 1fr;
  }

  /* Simplified card on mobile */
  .post-card__excerpt {
    display: none;
  }

  .post-card__content {
    padding: var(--space-3);
  }
}

/* Tablet: 2 columns */
@media (min-width: 640px) and (max-width: 1023px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .post-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
```

### 9.6 Responsive Sidebar

```css
/* ===========================================
   RESPONSIVE SIDEBAR
   =========================================== */

/* Mobile: Sidebar in drawer */
@media (max-width: 1023px) {
  .sidebar {
    position: fixed;
    top: 0;
    right: -100%;

    width: 300px;
    height: 100vh;

    background-color: var(--bg-primary);
    border-left: 2px solid var(--border-primary);

    overflow-y: auto;
    z-index: var(--z-modal);

    transition: right var(--duration-300) var(--ease-out);
  }

  .sidebar--open {
    right: 0;
  }

  /* Overlay */
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    z-index: calc(var(--z-modal) - 1);
    transition: opacity var(--duration-300) var(--ease-out);
  }

  .sidebar-overlay--visible {
    opacity: 1;
    visibility: visible;
  }
}

/* Desktop: Sidebar visible */
@media (min-width: 1024px) {
  .blog-layout {
    display: grid;
    grid-template-columns: 1fr var(--sidebar-width);
    gap: var(--space-8);
  }

  .sidebar {
    position: sticky;
    top: calc(var(--nav-height) + var(--space-4));
    height: fit-content;
  }
}
```

### 9.7 Touch-Friendly Adjustments

```css
/* ===========================================
   TOUCH-FRIENDLY STYLES
   =========================================== */

@media (max-width: 1023px) {
  /* Larger touch targets */
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .nav__link {
    padding: var(--space-3) var(--space-4);
  }

  .tag {
    padding: var(--space-2) var(--space-3);
  }

  /* Disable hover effects on touch */
  .post-card:hover {
    transform: none;
    box-shadow: var(--card-shadow-normal);
  }

  /* Active state for touch feedback */
  .post-card:active {
    transform: scale(0.98);
    opacity: 0.9;
  }

  .btn:active {
    transform: var(--btn-translate-active);
  }
}
```

---

## 10. Focus States (Accessibility)

### 10.1 Problem Statement

Currently missing: Focus ring styles with pixel aesthetic for keyboard navigation accessibility.

### 10.2 WCAG Requirements

```
Focus indicators must:
├── Be visible (sufficient contrast)
├── Not rely solely on color
├── Have a minimum 2px outline
└── Be consistent across all interactive elements
```

### 10.3 Variables to Add

```css
/* ===========================================
   FOCUS STATE TOKENS
   =========================================== */
:root {
  /* ---- Focus Colors ---- */
  --focus-color: var(--warning);
  --focus-color-dark: #E6C200;
  --focus-bg: rgba(255, 215, 0, 0.1);

  /* ---- Focus Ring ---- */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-style: solid;

  /* ---- Focus Shadow (Glow) ---- */
  --focus-glow:
    0 0 0 var(--focus-ring-width) var(--focus-color),
    0 0 0 calc(var(--focus-ring-width) + var(--focus-ring-offset)) var(--bg-primary),
    0 0 8px rgba(255, 215, 0, 0.4);
}
```

### 10.4 Focus State CSS

```css
/* ===========================================
   FOCUS STATES (ACCESSIBILITY)
   =========================================== */

/* Remove default focus outline */
*:focus {
  outline: none;
}

/* Custom focus-visible state */
*:focus-visible {
  outline: var(--focus-ring-width) var(--focus-ring-style) var(--focus-color);
  outline-offset: var(--focus-ring-offset);
}

/* Enhanced focus for buttons */
.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-glow);
}

/* Focus for cards */
.post-card:focus-visible {
  outline: none;
  box-shadow:
    var(--card-shadow-normal),
    var(--focus-glow);
}

/* Focus for links */
a:focus-visible {
  outline: none;
  background-color: var(--focus-bg);
  box-shadow:
    0 0 0 2px var(--focus-color);
  border-radius: 2px;
}

/* Focus for inputs */
.input:focus-visible,
.textarea:focus-visible {
  outline: none;
  border-color: var(--focus-color);
  box-shadow: var(--focus-glow);
}

/* Focus for icon buttons */
.btn-icon:focus-visible,
.theme-toggle:focus-visible {
  outline: none;
  box-shadow: var(--focus-glow);
}

/* Focus for tags */
.tag:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--focus-color),
    0 0 4px rgba(255, 215, 0, 0.3);
}

/* Focus for navigation links */
.nav__link:focus-visible {
  outline: none;
  box-shadow: var(--focus-glow);
  transform: translateY(-2px);
}

/* Skip link (accessibility) */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);

  padding: var(--space-2) var(--space-4);

  background-color: var(--accent-primary);
  color: var(--text-inverse);

  z-index: var(--z-max);
  transition: top var(--duration-200) var(--ease-out);
}

.skip-link:focus {
  top: var(--space-2);
}
```

### 10.5 React Skip Link Component

```jsx
// SkipLink.jsx
const SkipLink = () => {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
};

// In App.jsx
<SkipLink />
<Header />
<main id="main-content" tabIndex="-1">
  {/* Page content */}
</main>
```

---

## 11. Implementation Priority

### Priority Matrix

| Priority | Item | Reason | Effort |
|----------|------|--------|--------|
| **P0** | Focus States | Accessibility requirement | Low |
| **P0** | Button States | Core interaction | Low |
| **P1** | Card Hover Effects | Core UX feedback | Low |
| **P1** | Loading States | User feedback | Medium |
| **P1** | Icon System | Used everywhere | Medium |
| **P2** | Theme Toggle Animation | Polish | Medium |
| **P2** | Sidebar Widgets | Feature complete | Medium |
| **P2** | Responsive Breakpoints | Mobile support | Medium |
| **P3** | Background Decorations | Visual polish | High |
| **P3** | Sprite Animations | Advanced feature | High |

### Implementation Order

```
PHASE 1: Core Functionality (Week 1)
├── [ ] Add focus state variables to variables.css
├── [ ] Add button state variables to variables.css
├── [ ] Add card hover variables to variables.css
├── [ ] Create focus.css with accessibility styles
└── [ ] Create buttons.css with all states

PHASE 2: Components (Week 2)
├── [ ] Create cards.css with hover effects
├── [ ] Create loading.css with coffee animation
├── [ ] Export and organize 16x16 icon set
├── [ ] Create icons.css with icon classes
└── [ ] Create widgets.css for sidebar

PHASE 3: Polish (Week 3)
├── [ ] Create theme-toggle.css with animation
├── [ ] Create responsive.css for mobile
├── [ ] Add mobile navigation component
└── [ ] Test all breakpoints

PHASE 4: Advanced (Week 4+)
├── [ ] Create decorations.css for background
├── [ ] Create sprites.css for animations
├── [ ] Add floating particles component
└── [ ] Performance optimization
```

### Files to Create/Modify

```
frontend/src/styles/
├── variables.css        # ADD: new tokens
├── base.css            # ADD: focus states
├── components/
│   ├── buttons.css     # CREATE
│   ├── cards.css       # CREATE
│   ├── icons.css       # CREATE
│   ├── widgets.css     # CREATE
│   ├── loading.css     # CREATE
│   ├── theme-toggle.css # CREATE
│   └── navigation.css  # CREATE/MODIFY
├── utilities/
│   ├── focus.css       # CREATE
│   ├── sprites.css     # CREATE
│   └── decorations.css # CREATE
└── responsive.css      # CREATE
```

---

## Appendix: Quick Reference

### Color Quick Reference

```css
/* Most used colors */
--bg-primary: #FDFBF3      /* Page background */
--bg-secondary: #F8F0E3    /* Cards */
--text-primary: #1A1814    /* Body text */
--accent-primary: #865A3B  /* Actions, links */
--warning: #FFD700         /* Glow, highlights */
--border-primary: #8B5E46  /* Borders */
```

### Spacing Quick Reference

```css
/* Most used spacing */
--space-2: 0.5rem   /* 8px - compact */
--space-4: 1rem     /* 16px - standard */
--space-6: 1.5rem   /* 24px - section */
--space-8: 2rem     /* 32px - large */
```

### Animation Quick Reference

```css
/* Most used transitions */
--duration-150: 150ms  /* Micro-interactions */
--duration-200: 200ms  /* Standard */
--duration-300: 300ms  /* Emphasis */
--ease-out: cubic-bezier(0, 0, 0.2, 1)
```

---

*Document created: 16/12/2024*
*For: Coffee's Personal Blog - Cozy Pixel Cafe*
