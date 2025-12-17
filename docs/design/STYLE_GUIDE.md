# Coffee's Personal Blog - Complete Design System & Style Guide

> **Theme**: Cozy Pixel Cafe Blog
> **Aesthetic**: Retro GBA-inspired Pixel Art meets Cozy Cafe Vibes
> **Version**: 2.0
> **Last Updated**: 16/12/2024

---

## Table of Contents

1. [Design Philosophy & Vision](#1-design-philosophy--vision)
2. [Pixel Art Fundamentals](#2-pixel-art-fundamentals)
3. [The "Cozy" Atmosphere](#3-the-cozy-atmosphere)
4. [Color System - Complete Guide](#4-color-system---complete-guide)
5. [Typography System](#5-typography-system)
6. [Spacing, Layout & Grid](#6-spacing-layout--grid)
7. [Pixel Borders, Corners & Shadows](#7-pixel-borders-corners--shadows)
8. [Component Library - Detailed](#8-component-library---detailed)
9. [Icons, Sprites & Assets](#9-icons-sprites--assets)
10. [Animations & Micro-interactions](#10-animations--micro-interactions)
11. [Theme System (Day/Night)](#11-theme-system-daynight)
12. [Responsive Design Patterns](#12-responsive-design-patterns)
13. [Accessibility Guidelines](#13-accessibility-guidelines)
14. [Do's and Don'ts](#14-dos-and-donts)
15. [Implementation Checklist](#15-implementation-checklist)
16. [Asset References](#16-asset-references)

---

## 1. Design Philosophy & Vision

### 1.1 The Core Concept

Coffee's Personal Blog is built on the fusion of two distinct yet complementary aesthetics:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ╔═══════════════╗           ╔═══════════════╗               │
│    ║  PIXEL ART    ║     +     ║  COZY CAFE    ║               │
│    ║  RETRO GBA    ║           ║  ATMOSPHERE   ║               │
│    ╚═══════════════╝           ╚═══════════════╝               │
│            │                           │                        │
│            └───────────┬───────────────┘                        │
│                        ▼                                        │
│           ╔═════════════════════════╗                          │
│           ║   COZY PIXEL CAFE BLOG  ║                          │
│           ║   Nostalgic + Inviting  ║                          │
│           ╚═════════════════════════╝                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Why This Combination Works

| Pixel Art Brings | Cozy Cafe Brings |
|------------------|------------------|
| Nostalgia for retro gaming | Warmth and comfort |
| Unique visual identity | Familiar, inviting feeling |
| Technical constraints = creativity | Relaxed, personal atmosphere |
| Handcrafted, artisanal feel | Coffee-themed branding |
| Appeal to developers/gamers | Universal appeal |

### 1.3 Emotional Goals

The design should evoke these feelings in visitors:

1. **Nostalgia** - "This reminds me of playing games as a kid"
2. **Comfort** - "This feels like a cozy corner in a cafe"
3. **Curiosity** - "This is unique, I want to explore"
4. **Trust** - "This person put care into their work"
5. **Personality** - "I can sense who the author is"

### 1.4 Target Audience Profile

```
Primary Audience:
├── Developers & Tech Enthusiasts
│   └── Appreciate pixel art, understand tech content
├── Retro Gaming Fans
│   └── Connect with GBA-era aesthetics
├── Digital Art Appreciators
│   └── Value unique, handcrafted design
└── International Students / Personal Blog Readers
    └── Looking for relatable, personal content

Secondary Audience:
├── Design Inspiration Seekers
├── Creative Professionals
└── Casual Blog Readers
```

### 1.5 Design Pillars

These five pillars guide every design decision:

```
1. CONSISTENCY
   Every element follows the same visual language.
   No mixing of rounded corners with pixel corners.
   No mixing of anti-aliased with pixelated graphics.

2. WARMTH
   Colors are warm, never cold.
   Browns, creams, and golds dominate.
   Even in dark mode, warmth is preserved.

3. CLARITY
   Despite the stylized pixel aesthetic, content is readable.
   Information hierarchy is clear.
   Navigation is intuitive.

4. PERSONALITY
   The design reflects the author's character.
   Coffee theme is integrated meaningfully.
   Small details add charm (mascots, animations).

5. CRAFTSMANSHIP
   Every pixel is intentional.
   Attention to detail in every component.
   Quality over quantity in assets.
```

---

## 2. Pixel Art Fundamentals

### 2.1 What is Pixel Art?

Pixel art is a form of digital art where images are created and edited at the pixel level. In this design system, we use pixel art not just for illustrations, but as a foundational aesthetic for all UI elements.

### 2.2 The Pixel Grid System

All pixel art elements must align to a base grid:

```
Base Unit: 1px (the individual pixel)
Common Grid Sizes:
├── 8x8   - Smallest icons, decorations
├── 16x16 - Standard icons, small sprites
├── 32x32 - Medium icons, character sprites
├── 48x48 - Large icons
├── 64x64 - Hero sprites, large illustrations
└── 128x128+ - Feature illustrations
```

### 2.3 GBA-Era Constraints (Reference)

The Game Boy Advance had specific technical limitations that defined its aesthetic:

| Specification | GBA Limit | Our Interpretation |
|--------------|-----------|-------------------|
| Screen Resolution | 240x160 | Design for crisp pixels at any size |
| Color Palette | 32,768 colors | Limited, carefully chosen palette |
| Sprite Colors | 16 per sprite | Each sprite uses 4-8 colors max |
| Tile Size | 8x8 base | 8px as our base unit |

### 2.4 Pixel Art Rendering Rules

**CRITICAL**: All pixel art must be rendered without anti-aliasing:

```css
/* ALWAYS apply to pixel art elements */
.pixel-art {
  /* Primary property */
  image-rendering: pixelated;

  /* Firefox fallback */
  image-rendering: crisp-edges;

  /* Legacy IE fallback */
  -ms-interpolation-mode: nearest-neighbor;

  /* Webkit optimization */
  -webkit-optimize-contrast: true;
}
```

### 2.5 Scaling Rules

Pixel art MUST be scaled by integer multiples to maintain crispness:

```
CORRECT Scaling:
├── 1x (original)  - 32px sprite stays 32px
├── 2x             - 32px sprite becomes 64px
├── 3x             - 32px sprite becomes 96px
└── 4x             - 32px sprite becomes 128px

INCORRECT Scaling (NEVER DO):
├── 1.5x           - 32px becomes 48px (blurry)
├── 2.5x           - 32px becomes 80px (blurry)
└── Arbitrary      - Any non-integer multiplier
```

### 2.6 Creating Pixel Art - Guidelines

When creating new pixel art for this project:

```
1. COLOR LIMIT
   - Use maximum 8-12 colors per sprite
   - Include 2-3 shades per main color (light, mid, dark)
   - One outline color (usually darkest shade)

2. OUTLINE STYLE
   - Use consistent 1px outlines
   - Outline color: Darkest shade of the element
   - Avoid pure black (#000000) - use dark brown instead

3. SHADING
   - Light source: Top-left (consistent across all assets)
   - Use 2-3 levels of shading
   - Dithering only for large gradient areas

4. ANTI-ALIASING
   - NEVER use automatic anti-aliasing
   - Manual AA only for specific curves (advanced technique)
   - Most elements should have sharp edges
```

### 2.7 Pixel Art Visual Examples

```
COFFEE CUP SPRITE (16x16 example):

  ████████████████
  ██░░░░░░░░░░░░██
  ██░░░░░░░░░░░░██  ░ = highlight (lightest)
  ██░░▒▒▒▒▒▒░░░░██  ▒ = mid-tone
  ██░░▒▒▒▒▒▒░░░░██  ▓ = shadow (darkest)
  ██░░▒▒▒▒▒▒░░░░██  █ = outline
  ██░░▒▒▒▒▒▒░░░░██
  ██▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓██
  ████████████████

COLOR PLACEMENT:
- Highlight (top-left areas facing light)
- Mid-tone (main body)
- Shadow (bottom-right areas away from light)
- Outline (consistent around entire sprite)
```

---

## 3. The "Cozy" Atmosphere

### 3.1 Defining "Cozy" in Design

"Cozy" is not just a feeling - it's a set of deliberate design choices:

```
COZY CHARACTERISTICS:
│
├── WARMTH
│   ├── Warm color temperatures (yellows, oranges, browns)
│   ├── No cold colors (pure blues, grays) as primary
│   └── Lighting feels like afternoon sun or cafe lamps
│
├── SOFTNESS
│   ├── Despite pixel edges, overall feel is gentle
│   ├── Transitions are smooth
│   └── No harsh contrasts (except for readability)
│
├── FAMILIARITY
│   ├── Coffee shop elements (cups, beans, steam)
│   ├── Comfortable objects (armchairs, plants, books)
│   └── Nostalgic gaming references
│
├── INTIMACY
│   ├── Design feels personal, not corporate
│   ├── Hand-crafted aesthetic
│   └── Small, thoughtful details
│
└── CALM
    ├── Not overwhelming with elements
    ├── Generous whitespace
    └── Slow, gentle animations
```

### 3.2 Cozy Color Psychology

Each color in our palette serves an emotional purpose:

```
CREAM/OFF-WHITE (#FDFBF3)
├── Evokes: Aged paper, vanilla, milk foam
├── Feeling: Clean but warm, not sterile
└── Usage: Primary background

WARM BEIGE (#F8F0E3)
├── Evokes: Sand, natural linen, coffee with cream
├── Feeling: Comfortable, familiar
└── Usage: Card backgrounds, secondary surfaces

COFFEE BROWN (#865A3B)
├── Evokes: Rich espresso, chocolate, wood
├── Feeling: Grounded, mature, reliable
└── Usage: Accents, borders, text emphasis

DARK ESPRESSO (#1A1814)
├── Evokes: Night coffee shop, dark roast
├── Feeling: Sophisticated, cozy evenings
└── Usage: Dark mode background, primary text

GOLDEN YELLOW (#FFD700)
├── Evokes: Warm lamplight, honey, morning sun
├── Feeling: Cheerful, inviting, magical
└── Usage: Highlights, hover states, stars

SAGE GREEN (#6B8E23)
├── Evokes: Cafe plants, nature, freshness
├── Feeling: Alive, healthy, balanced
└── Usage: Success states, plant decorations
```

### 3.3 Cozy Imagery Guidelines

When selecting or creating images for the blog:

```
PREFERRED IMAGERY:
✓ Coffee cups (various states: full, empty, steaming)
✓ Cafe interiors with warm lighting
✓ Plants (potted plants, succulents, ferns)
✓ Books and notebooks
✓ Cozy characters (mascots doing relaxed activities)
✓ Warm lighting scenarios
✓ Wooden textures
✓ Soft textiles (blankets, cushions)

AVOID:
✗ Cold, sterile environments
✗ Harsh lighting
✗ Corporate/office aesthetics
✗ Aggressive or action-heavy imagery
✗ Neon or flashy colors
✗ Metal/industrial textures
```

### 3.4 Cozy Micro-moments

Small details that enhance the cozy feeling:

```
1. STEAM ANIMATIONS
   - Coffee cups emit gentle, rising steam
   - 2-second loop, subtle movement
   - Opacity varies (0.3 to 0.8)

2. AMBIENT PARTICLES
   - Occasional sparkles/stars in background
   - Very subtle, not distracting
   - Warm golden color

3. HOVER WARMTH
   - Elements "glow" with warm golden hue on hover
   - Like being illuminated by a nearby lamp
   - Transition: 0.2s ease

4. LOADING STATES
   - Coffee cup filling animation
   - Not a cold spinner, but a thematic loading
   - Communicates "brewing content"

5. MASCOT EXPRESSIONS
   - Characters show relaxed, happy poses
   - Activities: reading, sleeping, drinking coffee
   - No stressed or aggressive expressions
```

### 3.5 Cozy Layout Principles

The layout itself contributes to coziness:

```
SPACING
├── Generous padding (feels roomy, not cramped)
├── Breathing room between elements
└── Content doesn't feel "packed in"

DENSITY
├── Medium content density
├── Not too sparse (feels empty)
├── Not too dense (feels overwhelming)
└── "Goldilocks zone" - just right

HIERARCHY
├── Clear focal points
├── Eye can rest
├── No competing elements
└── Gentle visual flow

BORDERS
├── Visible but not harsh
├── Act like picture frames
├── Create "contained" cozy spaces
└── Like sitting in a defined booth
```

---

## 4. Color System - Complete Guide

### 4.1 Light Mode (Day Theme) - Complete Palette

```css
:root {
  /* ═══════════════════════════════════════════
     BACKGROUNDS
     ═══════════════════════════════════════════ */

  /* Main page background - like aged paper */
  --bg-primary: #FDFBF3;

  /* Card/component backgrounds - warm beige */
  --bg-secondary: #F8F0E3;

  /* Tertiary surfaces - for layering */
  --bg-tertiary: #EAE0C9;

  /* Elevated surfaces (modals, dropdowns) */
  --bg-elevated: #FFFFFF;

  /* Subtle background for code blocks */
  --bg-code: #F5EFE5;


  /* ═══════════════════════════════════════════
     TEXT COLORS
     ═══════════════════════════════════════════ */

  /* Primary text - very dark brown, not pure black */
  --text-primary: #1A1814;

  /* Headings and emphasis - dark brown */
  --text-secondary: #4A2C1F;

  /* Secondary text, labels - medium brown */
  --text-tertiary: #865A3B;

  /* Muted text (timestamps, meta) - lighter brown */
  --text-muted: #7A4F3E;

  /* Placeholder text */
  --text-placeholder: #B8A090;

  /* Text on dark backgrounds (inverse) */
  --text-inverse: #FDFBF3;


  /* ═══════════════════════════════════════════
     ACCENT COLORS
     ═══════════════════════════════════════════ */

  /* Primary accent - coffee brown */
  --accent-primary: #865A3B;

  /* Secondary accent - lighter for active states */
  --accent-secondary: #D4C2B0;

  /* Hover accent - darker variation */
  --accent-hover: #6B4226;

  /* Active/pressed state */
  --accent-active: #5C3B22;


  /* ═══════════════════════════════════════════
     BORDER COLORS
     ═══════════════════════════════════════════ */

  /* Primary border - visible but not harsh */
  --border-primary: #8B5E46;

  /* Secondary border - for inner highlights */
  --border-secondary: #C49B7A;

  /* Dark border - for shadows/depth */
  --border-dark: #5C3A2F;

  /* Subtle border - barely visible */
  --border-subtle: #E5D8C8;


  /* ═══════════════════════════════════════════
     SEMANTIC COLORS
     ═══════════════════════════════════════════ */

  /* Success - sage green */
  --success: #6B8E23;
  --success-bg: #E8F0DC;
  --success-border: #9AB86A;

  /* Warning - golden */
  --warning: #FFD700;
  --warning-bg: #FFF8DC;
  --warning-border: #E6C300;

  /* Error - muted red */
  --error: #C45C4A;
  --error-bg: #FDE8E5;
  --error-border: #D98A7C;

  /* Info - muted blue */
  --info: #5C7A9E;
  --info-bg: #E5EEF5;
  --info-border: #8AADC8;


  /* ═══════════════════════════════════════════
     SPECIAL COLORS
     ═══════════════════════════════════════════ */

  /* Glow color for hover effects */
  --glow-color: #FFD700;
  --glow-rgba: rgba(255, 215, 0, 0.3);

  /* Link colors */
  --link-color: #6B5040;
  --link-hover: #4A2C1F;
  --link-visited: #8B6E5A;

  /* Selection highlight */
  --selection-bg: #D4C2B0;
  --selection-text: #1A1814;
}
```

### 4.2 Dark Mode (Night Theme) - Complete Palette

```css
:root.dark-theme,
[data-theme="dark"] {
  /* ═══════════════════════════════════════════
     BACKGROUNDS - Dark mode inverts but stays warm
     ═══════════════════════════════════════════ */

  /* Main background - espresso dark */
  --bg-primary: #1A1814;

  /* Card backgrounds - dark brown */
  --bg-secondary: #2C1E1A;

  /* Tertiary - slightly elevated */
  --bg-tertiary: #3D2B26;

  /* Most elevated */
  --bg-elevated: #4E3E38;

  /* Code blocks */
  --bg-code: #241C18;


  /* ═══════════════════════════════════════════
     TEXT COLORS - Light on dark
     ═══════════════════════════════════════════ */

  /* Primary text - cream on dark */
  --text-primary: #FDFBF3;

  /* Headings - light beige */
  --text-secondary: #EFE8DF;

  /* Secondary text - warm gold */
  --text-tertiary: #D4A574;

  /* Muted text */
  --text-muted: #A07A5C;

  /* Placeholder */
  --text-placeholder: #6B5C50;

  /* Inverse (for dark elements in dark mode) */
  --text-inverse: #1A1814;


  /* ═══════════════════════════════════════════
     ACCENT COLORS - Warmer in dark mode
     ═══════════════════════════════════════════ */

  /* Primary accent - golden */
  --accent-primary: #D4A574;

  /* Secondary accent */
  --accent-secondary: #CA8535;

  /* Hover */
  --accent-hover: #E8B584;

  /* Active */
  --accent-active: #F0C494;


  /* ═══════════════════════════════════════════
     BORDER COLORS
     ═══════════════════════════════════════════ */

  /* Primary border */
  --border-primary: #614116;

  /* Secondary border */
  --border-secondary: #8B5E46;

  /* Dark border */
  --border-dark: #3A2D2C;

  /* Subtle */
  --border-subtle: #4A3830;


  /* ═══════════════════════════════════════════
     SEMANTIC COLORS - Adjusted for dark
     ═══════════════════════════════════════════ */

  --success: #8CD99C;
  --success-bg: #1E2E20;
  --success-border: #4A7A50;

  --warning: #FFD700;
  --warning-bg: #2E2810;
  --warning-border: #8B7A00;

  --error: #E07A6A;
  --error-bg: #2E1C1A;
  --error-border: #8B4A40;

  --info: #A0C4E0;
  --info-bg: #1A2430;
  --info-border: #4A7090;


  /* ═══════════════════════════════════════════
     SPECIAL COLORS
     ═══════════════════════════════════════════ */

  --glow-color: #FFD700;
  --glow-rgba: rgba(255, 215, 0, 0.4);

  --link-color: #D4A574;
  --link-hover: #E8B584;
  --link-visited: #A07A5C;

  --selection-bg: #614116;
  --selection-text: #FDFBF3;
}
```

### 4.3 Pixel Art Color Palette

Colors specifically for pixel art sprites and illustrations:

```css
:root {
  /* ═══════════════════════════════════════════
     GREENS (Plants, Nature, Bulbasaur)
     ═══════════════════════════════════════════ */
  --pixel-green-100: #D4ECD8; /* Lightest highlight */
  --pixel-green-200: #9CD9A8; /* Light */
  --pixel-green-300: #8CD99C; /* Light-mid */
  --pixel-green-400: #6BBE7B; /* Main */
  --pixel-green-500: #4A8C5A; /* Mid-dark */
  --pixel-green-600: #3A7048; /* Dark */
  --pixel-green-700: #305020; /* Darkest/outline */

  /* ═══════════════════════════════════════════
     BROWNS (Coffee, Wood, UI)
     ═══════════════════════════════════════════ */
  --pixel-brown-100: #F8E7C8; /* Lightest/cream */
  --pixel-brown-200: #E0C9A6; /* Light beige */
  --pixel-brown-300: #D4B38C; /* Light brown */
  --pixel-brown-400: #A37B5B; /* Main brown */
  --pixel-brown-500: #8B5E46; /* Mid brown */
  --pixel-brown-600: #6B4226; /* Dark brown */
  --pixel-brown-700: #4A2C1F; /* Very dark */
  --pixel-brown-800: #3A2D2C; /* Darkest/outline */

  /* ═══════════════════════════════════════════
     BLUES (Water, Sky, Squirtle)
     ═══════════════════════════════════════════ */
  --pixel-blue-100: #E0F0F8; /* Lightest */
  --pixel-blue-200: #A0D0E0; /* Light */
  --pixel-blue-300: #80C0D8; /* Light-mid */
  --pixel-blue-400: #5080A0; /* Main */
  --pixel-blue-500: #406880; /* Mid-dark */
  --pixel-blue-600: #305060; /* Dark */
  --pixel-blue-700: #203040; /* Darkest/outline */

  /* ═══════════════════════════════════════════
     SPECIAL ACCENT COLORS
     ═══════════════════════════════════════════ */
  --pixel-coral: #E080A0;     /* Decorative coral */
  --pixel-coral-dark: #B05070;

  --pixel-purple: #8A4F9A;    /* Gengar, accents */
  --pixel-purple-dark: #6A3080;

  --pixel-yellow: #F2D05B;    /* Stars, highlights */
  --pixel-yellow-light: #FFF8A0;

  --pixel-red: #E04A4A;       /* Hearts, alerts */
  --pixel-red-dark: #B03030;

  --pixel-orange: #E08C4A;    /* Warm accents */
  --pixel-orange-dark: #B06030;
}
```

### 4.4 Color Usage Matrix

| Element | Light Mode Variable | Dark Mode Variable | Notes |
|---------|--------------------|--------------------|-------|
| **Page Background** | `--bg-primary` (#FDFBF3) | `--bg-primary` (#1A1814) | Largest surface |
| **Cards** | `--bg-secondary` (#F8F0E3) | `--bg-secondary` (#2C1E1A) | Slight elevation |
| **Modals** | `--bg-elevated` (#FFFFFF) | `--bg-elevated` (#4E3E38) | Highest elevation |
| **Body Text** | `--text-primary` (#1A1814) | `--text-primary` (#FDFBF3) | Must be readable |
| **Headings** | `--text-secondary` (#4A2C1F) | `--text-secondary` (#EFE8DF) | Slightly less contrast |
| **Muted Text** | `--text-muted` (#7A4F3E) | `--text-muted` (#A07A5C) | De-emphasized |
| **Links** | `--link-color` | `--link-color` | Underline on hover |
| **Primary Buttons** | `--accent-primary` bg | `--accent-primary` bg | High emphasis |
| **Ghost Buttons** | transparent + `--accent-primary` border | transparent + `--accent-primary` border | Low emphasis |
| **Card Borders** | `--border-primary` (#8B5E46) | `--border-primary` (#614116) | 2px solid |
| **Hover Glow** | `--glow-color` (#FFD700) | `--glow-color` (#FFD700) | Same in both modes |
| **Success** | `--success` (#6B8E23) | `--success` (#8CD99C) | Positive feedback |
| **Error** | `--error` (#C45C4A) | `--error` (#E07A6A) | Negative feedback |

### 4.5 Contrast Ratios (WCAG Compliance)

All color combinations must meet accessibility standards:

```
LIGHT MODE CONTRAST RATIOS:
┌─────────────────────────────────────────────────────────────┐
│ Combination                         │ Ratio │ WCAG Level   │
├─────────────────────────────────────┼───────┼──────────────┤
│ --text-primary on --bg-primary      │ 15.2:1│ AAA Pass     │
│ --text-secondary on --bg-primary    │ 9.8:1 │ AAA Pass     │
│ --text-tertiary on --bg-primary     │ 5.4:1 │ AA Pass      │
│ --text-muted on --bg-primary        │ 4.8:1 │ AA Pass      │
│ --text-primary on --bg-secondary    │ 14.1:1│ AAA Pass     │
│ --accent-primary on --bg-primary    │ 5.2:1 │ AA Pass      │
│ --text-inverse on --accent-primary  │ 5.2:1 │ AA Pass      │
└─────────────────────────────────────────────────────────────┘

DARK MODE CONTRAST RATIOS:
┌─────────────────────────────────────────────────────────────┐
│ Combination                         │ Ratio │ WCAG Level   │
├─────────────────────────────────────┼───────┼──────────────┤
│ --text-primary on --bg-primary      │ 14.8:1│ AAA Pass     │
│ --text-secondary on --bg-primary    │ 12.1:1│ AAA Pass     │
│ --text-tertiary on --bg-primary     │ 6.2:1 │ AA Pass      │
│ --text-muted on --bg-primary        │ 4.6:1 │ AA Pass      │
│ --accent-primary on --bg-primary    │ 6.2:1 │ AA Pass      │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Typography System

### 5.1 Font Stack

```css
:root {
  /* ═══════════════════════════════════════════
     DISPLAY FONT - Pixel/Retro Headings
     ═══════════════════════════════════════════ */
  --font-display: 'Silkscreen', 'Press Start 2P', 'VT323', monospace;

  /*
   * Silkscreen: Primary pixel font
   * - Weight: 400 (regular), 700 (bold)
   * - Use for: H1, H2, logo, section titles
   * - Character: Blocky, game-like, nostalgic
   */


  /* ═══════════════════════════════════════════
     BODY FONT - Readable Sans-serif
     ═══════════════════════════════════════════ */
  --font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont,
               'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  /*
   * IBM Plex Sans: Clean, modern, highly readable
   * - Weights: 300, 400, 500, 600, 700
   * - Use for: Body text, H3-H6, UI elements
   * - Character: Professional yet friendly
   */


  /* ═══════════════════════════════════════════
     CODE FONT - Monospace for Code
     ═══════════════════════════════════════════ */
  --font-code: 'IBM Plex Mono', 'Fira Code', 'JetBrains Mono',
               'Consolas', 'Monaco', monospace;

  /*
   * IBM Plex Mono: Matching the body font family
   * - Weights: 400, 500, 600
   * - Use for: Code blocks, inline code, technical content
   * - Character: Clear, distinguishable characters
   */
}
```

### 5.2 Type Scale

```css
:root {
  /* Base size */
  --text-base: 1rem;      /* 16px */

  /* Scale: 1.25 ratio (Major Third) */
  --text-xs: 0.75rem;     /* 12px - captions, tags */
  --text-sm: 0.875rem;    /* 14px - small text, meta */
  --text-md: 1rem;        /* 16px - body text */
  --text-lg: 1.125rem;    /* 18px - lead paragraphs */
  --text-xl: 1.25rem;     /* 20px - H4 */
  --text-2xl: 1.5rem;     /* 24px - H3 */
  --text-3xl: 1.875rem;   /* 30px - H2 */
  --text-4xl: 2.25rem;    /* 36px - H1 */
  --text-5xl: 3rem;       /* 48px - Hero titles */
}
```

### 5.3 Typography Specifications

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Element │ Font Family    │ Size    │ Weight │ Line-H │ Letter-S │ Color │
├─────────┼────────────────┼─────────┼────────┼────────┼──────────┼───────┤
│ H1      │ Silkscreen     │ 36px    │ 400    │ 1.2    │ 0        │ --text-secondary │
│ H2      │ Silkscreen     │ 30px    │ 400    │ 1.25   │ 0        │ --text-secondary │
│ H3      │ IBM Plex Sans  │ 24px    │ 600    │ 1.3    │ -0.01em  │ --text-secondary │
│ H4      │ IBM Plex Sans  │ 20px    │ 600    │ 1.35   │ 0        │ --text-primary   │
│ H5      │ IBM Plex Sans  │ 18px    │ 600    │ 1.4    │ 0        │ --text-primary   │
│ H6      │ IBM Plex Sans  │ 16px    │ 600    │ 1.4    │ 0.02em   │ --text-tertiary  │
│ Body    │ IBM Plex Sans  │ 16px    │ 400    │ 1.6    │ 0        │ --text-primary   │
│ Lead    │ IBM Plex Sans  │ 18px    │ 400    │ 1.7    │ 0        │ --text-secondary │
│ Small   │ IBM Plex Sans  │ 14px    │ 400    │ 1.5    │ 0        │ --text-muted     │
│ Caption │ IBM Plex Sans  │ 12px    │ 400    │ 1.4    │ 0.02em   │ --text-muted     │
│ Code    │ IBM Plex Mono  │ 14px    │ 400    │ 1.5    │ 0        │ --text-primary   │
│ Button  │ IBM Plex Sans  │ 14px    │ 500    │ 1      │ 0.02em   │ varies           │
│ Nav     │ IBM Plex Sans  │ 14px    │ 500    │ 1      │ 0        │ --text-tertiary  │
│ Logo    │ Silkscreen     │ 18px    │ 400    │ 1      │ 0        │ --text-secondary │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.4 Typography CSS Implementation

```css
/* ═══════════════════════════════════════════
   HEADINGS
   ═══════════════════════════════════════════ */

/* Pixel font headings (H1, H2) */
h1, .h1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400; /* Silkscreen only has 400 */
  line-height: 1.2;
  letter-spacing: 0;
  color: var(--text-secondary);

  /* Disable font smoothing for crisp pixels */
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  font-smooth: never;

  /* Optional: Pixel text shadow */
  text-shadow: 2px 2px 0 var(--border-dark);
}

h2, .h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 400;
  line-height: 1.25;
  color: var(--text-secondary);
  -webkit-font-smoothing: none;
}

/* Sans-serif headings (H3-H6) */
h3, .h3 {
  font-family: var(--font-body);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-secondary);
}

h4, .h4 {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

h5, .h5 {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

h6, .h6 {
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}


/* ═══════════════════════════════════════════
   BODY TEXT
   ═══════════════════════════════════════════ */

body {
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-primary);

  /* Enable font smoothing for body text */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  margin-bottom: 1em;
}

.lead {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--text-secondary);
}

small, .small {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--text-muted);
}

.caption {
  font-size: var(--text-xs);
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: var(--text-muted);
}


/* ═══════════════════════════════════════════
   CODE
   ═══════════════════════════════════════════ */

code, kbd, samp {
  font-family: var(--font-code);
  font-size: 0.9em;
  background-color: var(--bg-code);
  padding: 0.125em 0.375em;
  border-radius: 2px;
  border: 1px solid var(--border-subtle);
}

pre {
  font-family: var(--font-code);
  font-size: var(--text-sm);
  line-height: 1.6;
  background-color: var(--bg-code);
  padding: var(--space-4);
  border: 2px solid var(--border-primary);
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
  border: none;
}


/* ═══════════════════════════════════════════
   LINKS
   ═══════════════════════════════════════════ */

a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--link-hover);
  text-decoration: underline;
  text-underline-offset: 3px;
}

a:visited {
  color: var(--link-visited);
}

/* Links within content */
.content a {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
}

.content a:hover {
  text-decoration-thickness: 2px;
}
```

### 5.5 Pixel Text Shadow Effects

```css
/* Standard pixel shadow (use sparingly) */
.pixel-text-shadow {
  text-shadow: 2px 2px 0 var(--border-dark);
}

/* Deep pixel shadow for emphasis */
.pixel-text-shadow-deep {
  text-shadow:
    1px 1px 0 var(--border-secondary),
    2px 2px 0 var(--border-primary),
    3px 3px 0 var(--border-dark);
}

/* Glow effect for special text */
.pixel-text-glow {
  text-shadow:
    0 0 4px var(--glow-color),
    0 0 8px var(--glow-color);
}

/* Inset/engraved effect */
.pixel-text-inset {
  text-shadow:
    -1px -1px 0 var(--border-dark),
    1px 1px 0 var(--bg-primary);
}
```

---

## 6. Spacing, Layout & Grid

### 6.1 Spacing Scale

Based on an 8px grid for pixel-perfect alignment:

```css
:root {
  /* Base unit: 4px (half of 8px for fine control) */
  --space-0: 0;
  --space-px: 1px;
  --space-0-5: 2px;   /* 0.125rem - micro adjustments */
  --space-1: 4px;     /* 0.25rem  - tight spacing */
  --space-2: 8px;     /* 0.5rem   - compact spacing */
  --space-3: 12px;    /* 0.75rem  - between related items */
  --space-4: 16px;    /* 1rem     - standard spacing */
  --space-5: 20px;    /* 1.25rem  - medium spacing */
  --space-6: 24px;    /* 1.5rem   - section spacing */
  --space-7: 28px;    /* 1.75rem  - between sections */
  --space-8: 32px;    /* 2rem     - large spacing */
  --space-10: 40px;   /* 2.5rem   - extra large */
  --space-12: 48px;   /* 3rem     - section gaps */
  --space-16: 64px;   /* 4rem     - major sections */
  --space-20: 80px;   /* 5rem     - page sections */
  --space-24: 96px;   /* 6rem     - hero spacing */
  --space-32: 128px;  /* 8rem     - maximum spacing */
}
```

### 6.2 Visual Spacing Guide

```
SPACING USAGE:
│
├── --space-1 (4px)
│   └── Between icon and text
│   └── Padding inside small tags
│   └── Letter-like spacing
│
├── --space-2 (8px)
│   └── Padding inside buttons
│   └── Gap between inline elements
│   └── Margin between list items
│
├── --space-3 (12px)
│   └── Padding inside input fields
│   └── Gap in icon+text combinations
│
├── --space-4 (16px)
│   └── Standard component padding
│   └── Gap between cards in a grid
│   └── Paragraph margin-bottom
│
├── --space-6 (24px)
│   └── Card internal padding
│   └── Section heading margin-top
│
├── --space-8 (32px)
│   └── Gap between major sections
│   └── Large card padding
│
├── --space-12 (48px)
│   └── Between page sections
│   └── Footer margin-top
│
└── --space-16+ (64px+)
    └── Hero section padding
    └── Major page divisions
```

### 6.3 Layout Containers

```css
/* ═══════════════════════════════════════════
   CONTAINER WIDTHS
   ═══════════════════════════════════════════ */
:root {
  --container-xs: 480px;   /* Small forms, modals */
  --container-sm: 640px;   /* Narrow content */
  --container-md: 768px;   /* Blog post content */
  --container-lg: 1024px;  /* Standard page width */
  --container-xl: 1200px;  /* Wide layouts */
  --container-2xl: 1400px; /* Maximum width */
}

/* Base container */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

/* Narrow container for blog posts */
.container--narrow {
  max-width: var(--container-md);
}

/* Wide container for galleries */
.container--wide {
  max-width: var(--container-2xl);
}
```

### 6.4 Two-Column Blog Layout

```css
/* Main blog layout with sidebar */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .blog-layout {
    grid-template-columns: 1fr 300px;
  }
}

/* Content area */
.blog-layout__main {
  min-width: 0; /* Prevent overflow */
}

/* Sidebar */
.blog-layout__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Sticky sidebar widget */
.sidebar-sticky {
  position: sticky;
  top: var(--space-4);
}
```

### 6.5 Post Card Grid

```css
/* Grid for post cards */
.post-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-4);
}

/* Tablet: 2 columns */
@media (min-width: 640px) {
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

/* Card aspect ratio consistency */
.post-grid__item {
  display: flex;
  flex-direction: column;
}

.post-grid__item-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

### 6.6 Pixel Grid Alignment

All elements should align to the 8px grid:

```css
/* Utility to ensure pixel-grid alignment */
.pixel-align {
  /* Round to nearest 8px */
  padding: calc(round(var(--space-4), 8px));
}

/* For images, ensure dimensions are multiples of 8 */
.pixel-image-container {
  width: 128px;  /* 8 * 16 */
  height: 96px;  /* 8 * 12 */
}
```

---

## 7. Pixel Borders, Corners & Shadows

### 7.1 Why Not Border-Radius?

Standard `border-radius` creates smooth, anti-aliased curves that break the pixel art aesthetic. Instead, we use `clip-path` to create stepped, pixelated corners.

```
COMPARISON:

border-radius (WRONG):          clip-path (CORRECT):
┌──────────────────┐            ┌────────────────────┐
│    ╭──────────╮  │            │  ██████████████████│
│    │          │  │            │██                ██│
│    │          │  │            │██                ██│
│    │          │  │            │██                ██│
│    ╰──────────╯  │            │  ██████████████████│
└──────────────────┘            └────────────────────┘
  Smooth curves                   Stepped pixels
  (Anti-aliased)                  (Crisp edges)
```

### 7.2 Pixel Corner Clip-Paths

```css
:root {
  /* 4px pixel corners (small elements) */
  --clip-pixel-sm: polygon(
    0 4px,                    /* Start: left side, 4px from top */
    4px 0,                    /* Go to: 4px from left, at top */
    calc(100% - 4px) 0,       /* Top edge to right corner */
    100% 4px,                 /* Right corner down 4px */
    100% calc(100% - 4px),    /* Down right side */
    calc(100% - 4px) 100%,    /* Bottom right corner */
    4px 100%,                 /* Bottom edge */
    0 calc(100% - 4px)        /* Back to start */
  );

  /* 8px pixel corners (standard elements) */
  --clip-pixel-md: polygon(
    0 8px,
    8px 0,
    calc(100% - 8px) 0,
    100% 8px,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    8px 100%,
    0 calc(100% - 8px)
  );

  /* 12px pixel corners (large elements) */
  --clip-pixel-lg: polygon(
    0 12px,
    12px 0,
    calc(100% - 12px) 0,
    100% 12px,
    100% calc(100% - 12px),
    calc(100% - 12px) 100%,
    12px 100%,
    0 calc(100% - 12px)
  );

  /* 16px pixel corners (hero elements) */
  --clip-pixel-xl: polygon(
    0 16px,
    16px 0,
    calc(100% - 16px) 0,
    100% 16px,
    100% calc(100% - 16px),
    calc(100% - 16px) 100%,
    16px 100%,
    0 calc(100% - 16px)
  );
}

/* Apply to elements */
.pixel-corners-sm { clip-path: var(--clip-pixel-sm); }
.pixel-corners-md { clip-path: var(--clip-pixel-md); }
.pixel-corners-lg { clip-path: var(--clip-pixel-lg); }
.pixel-corners-xl { clip-path: var(--clip-pixel-xl); }
```

### 7.3 Pixel Border Styles

```css
/* Standard pixel border */
.pixel-border {
  border: 2px solid var(--border-primary);
}

/* Pixel border with 3D inset effect */
.pixel-border-3d {
  border: 2px solid var(--border-primary);
  box-shadow:
    /* Inner highlight (top-left) */
    inset 2px 2px 0 var(--bg-elevated),
    /* Inner shadow (bottom-right) */
    inset -2px -2px 0 var(--border-dark);
}

/* Raised/embossed effect */
.pixel-border-raised {
  border: 2px solid var(--border-primary);
  box-shadow:
    /* Outer highlight (top-left) */
    -2px -2px 0 var(--bg-elevated),
    /* Outer shadow (bottom-right) */
    2px 2px 0 var(--border-dark);
}

/* Double border (like game windows) */
.pixel-border-double {
  border: 4px solid var(--border-primary);
  box-shadow:
    inset 0 0 0 2px var(--bg-secondary),
    inset 0 0 0 4px var(--border-secondary);
}
```

### 7.4 Pixel Shadow System

```css
:root {
  /* Hard pixel shadows (no blur) */
  --shadow-pixel-sm: 2px 2px 0 var(--border-primary);
  --shadow-pixel-md: 4px 4px 0 var(--border-primary);
  --shadow-pixel-lg: 6px 6px 0 var(--border-primary);
  --shadow-pixel-xl: 8px 8px 0 var(--border-primary);

  /* Layered pixel shadows for depth */
  --shadow-pixel-layered:
    2px 2px 0 var(--border-secondary),
    4px 4px 0 var(--border-primary);

  /* Inset shadow for pressed states */
  --shadow-pixel-inset:
    inset 2px 2px 0 var(--border-dark),
    inset -2px -2px 0 var(--border-secondary);
}

/* Application examples */
.card {
  box-shadow: var(--shadow-pixel-md);
}

.card:hover {
  box-shadow: var(--shadow-pixel-lg);
  transform: translate(-2px, -2px);
}

.button:active {
  box-shadow: var(--shadow-pixel-inset);
  transform: translate(2px, 2px);
}
```

### 7.5 Hover Glow Effect

The signature hover effect - a warm golden glow:

```css
/* Glow variables */
:root {
  --glow-color: #FFD700;
  --glow-soft: rgba(255, 215, 0, 0.3);
  --glow-medium: rgba(255, 215, 0, 0.5);
  --glow-strong: rgba(255, 215, 0, 0.7);
}

/* Standard glow hover */
.hover-glow {
  transition: box-shadow 0.2s ease;
}

.hover-glow:hover {
  box-shadow:
    0 0 0 2px var(--glow-color),      /* Solid outline */
    0 0 8px var(--glow-soft),          /* Inner glow */
    0 0 16px var(--glow-soft);         /* Outer glow */
}

/* Pulse glow animation */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 2px var(--glow-color),
      0 0 8px var(--glow-soft);
  }
  50% {
    box-shadow:
      0 0 0 3px var(--glow-color),
      0 0 16px var(--glow-medium),
      0 0 24px var(--glow-soft);
  }
}

.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* Focus glow (accessibility) */
:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--glow-color),
    0 0 0 4px var(--bg-primary);
}
```

---

## 8. Component Library - Detailed

### 8.1 Buttons

#### Primary Button

```css
.btn-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  min-height: 40px;

  /* Typography */
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;

  /* Colors */
  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border: 2px solid var(--border-dark);

  /* Shape */
  clip-path: var(--clip-pixel-sm);

  /* Effects */
  box-shadow: var(--shadow-pixel-sm);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-pixel-md);
}

.btn-primary:active {
  transform: translate(0, 0);
  box-shadow: none;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

#### Ghost Button

```css
.btn-ghost {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  min-height: 40px;

  /* Typography */
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;

  /* Colors */
  color: var(--accent-primary);
  background-color: transparent;
  border: 2px dashed var(--accent-primary);

  /* Shape */
  clip-path: var(--clip-pixel-sm);

  /* Effects */
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-ghost:hover {
  background-color: var(--accent-secondary);
  border-style: solid;
  color: var(--text-primary);
}

.btn-ghost:active {
  background-color: var(--bg-tertiary);
}
```

#### Icon Button

```css
.btn-icon {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;

  /* Colors */
  color: var(--text-tertiary);
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);

  /* Shape */
  clip-path: var(--clip-pixel-sm);

  /* Effects */
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-icon:hover {
  color: var(--accent-primary);
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-pixel-sm);
}

/* Icon inside button */
.btn-icon svg,
.btn-icon img {
  width: 20px;
  height: 20px;
  image-rendering: pixelated;
}
```

### 8.2 Cards

#### Post Card

```css
.post-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Colors */
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);

  /* Shape */
  clip-path: var(--clip-pixel-md);

  /* Effects */
  box-shadow: var(--shadow-pixel-sm);
  transition: all 0.2s ease;
}

.post-card:hover {
  transform: translate(-4px, -4px);
  box-shadow:
    var(--shadow-pixel-md),
    0 0 0 2px var(--glow-color);
}

/* Card Image */
.post-card__image {
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
  transition: transform 0.3s ease;
}

.post-card:hover .post-card__image img {
  transform: scale(1.05);
}

/* Card Content */
.post-card__content {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex-grow: 1;
}

/* Category Badge */
.post-card__category {
  display: inline-flex;
  align-self: flex-start;
  padding: var(--space-1) var(--space-2);

  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border: 1px solid var(--border-dark);
}

/* Card Title */
.post-card__title {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);

  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__title a {
  color: inherit;
  text-decoration: none;
}

.post-card__title a:hover {
  color: var(--accent-primary);
}

/* Card Excerpt */
.post-card__excerpt {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-muted);

  /* Limit to 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Meta */
.post-card__meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: auto;
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-subtle);
}
```

### 8.3 Navigation

```css
/* Header Navigation */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);

  background-color: var(--bg-secondary);
  border-bottom: 2px solid var(--border-primary);

  position: sticky;
  top: 0;
  z-index: 100;
}

/* Logo */
.nav__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav__logo-icon {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}

.nav__logo-text {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-secondary);
  text-decoration: none;
}

/* Navigation Links */
.nav__links {
  display: flex;
  gap: var(--space-2);
}

.nav__link {
  padding: var(--space-2) var(--space-3);

  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-tertiary);
  text-decoration: none;

  background-color: var(--bg-primary);
  border: 2px solid var(--border-primary);

  transition: all 0.15s ease;
}

.nav__link:hover {
  color: var(--text-primary);
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.nav__link--active {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background-color: var(--bg-secondary);
}

/* Navigation Controls (Search, Theme Toggle) */
.nav__controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

### 8.4 Tags & Pills

```css
/* Standard Tag */
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);

  font-size: 12px;
  font-weight: 500;
  color: var(--text-tertiary);

  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);

  text-decoration: none;
  transition: all 0.15s ease;
}

.tag:hover {
  color: var(--text-primary);
  background-color: var(--accent-secondary);
  border-color: var(--accent-primary);
}

/* Active/Selected Tag */
.tag--active {
  color: var(--text-inverse);
  background-color: var(--accent-primary);
  border-color: var(--border-dark);
}

/* Tag Group */
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* Popular Tag (with count) */
.tag--with-count {
  gap: var(--space-1);
}

.tag__count {
  font-size: 10px;
  opacity: 0.7;
}
```

### 8.5 Form Inputs

```css
/* Text Input */
.input {
  width: 100%;
  padding: var(--space-2) var(--space-3);

  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-primary);

  background-color: var(--bg-primary);
  border: 2px solid var(--border-primary);

  outline: none;
  transition: all 0.15s ease;
}

.input::placeholder {
  color: var(--text-placeholder);
}

.input:focus {
  border-color: var(--accent-primary);
  box-shadow:
    0 0 0 2px var(--glow-color),
    0 0 8px var(--glow-soft);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--bg-tertiary);
}

/* Search Input with Icon */
.search-input {
  position: relative;
}

.search-input__icon {
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input .input {
  padding-left: calc(var(--space-3) + 20px + var(--space-2));
}

/* Textarea */
.textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-3);

  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);

  background-color: var(--bg-primary);
  border: 2px solid var(--border-primary);

  resize: vertical;
  outline: none;
  transition: all 0.15s ease;
}

.textarea:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--glow-color);
}
```

### 8.6 Sidebar Widgets

```css
/* Widget Container */
.widget {
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-md);
}

/* Widget Header */
.widget__header {
  padding: var(--space-3) var(--space-4);
  border-bottom: 2px solid var(--border-primary);
  background-color: var(--bg-tertiary);
}

.widget__title {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

/* Widget Content */
.widget__content {
  padding: var(--space-4);
}

/* Table of Contents Widget */
.toc-widget__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-widget__item {
  margin-bottom: var(--space-2);
}

.toc-widget__link {
  display: block;
  padding: var(--space-1) 0;
  font-size: 14px;
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.toc-widget__link:hover {
  color: var(--accent-primary);
}

.toc-widget__link--active {
  color: var(--text-primary);
  font-weight: 500;
}

/* Nested TOC items */
.toc-widget__item--nested {
  padding-left: var(--space-4);
}

.toc-widget__item--nested .toc-widget__link {
  font-size: 13px;
}

/* About Widget */
.about-widget__avatar {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-3);
  image-rendering: pixelated;
  border: 2px solid var(--border-primary);
}

.about-widget__name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.about-widget__bio {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
}
```

---

## 9. Icons, Sprites & Assets

### 9.1 Icon Size Standards

```
ICON SIZES:
│
├── 8x8 - Micro decorations (sparkles, bullets)
│   └── Usage: Inline decorations, list markers
│
├── 16x16 - Standard inline icons
│   └── Usage: Navigation, buttons, tags, meta info
│   └── Examples: Home, Search, Calendar, Tag, User
│
├── 20x20 - Button icons
│   └── Usage: Inside buttons, form elements
│
├── 24x24 - Feature icons
│   └── Usage: Standalone icons, social links
│   └── Examples: GitHub, LinkedIn, RSS
│
├── 32x32 - Medium sprites
│   └── Usage: Category icons, mascots, decorations
│   └── Examples: Coffee cup, Character idle poses
│
├── 48x48 - Large icons
│   └── Usage: Feature highlights, empty states
│
├── 64x64 - Hero sprites
│   └── Usage: Main mascot, hero illustrations
│   └── Examples: Full character sprites
│
└── 128x128+ - Illustrations
    └── Usage: Hero images, featured graphics
```

### 9.2 Icon Catalog

```
NAVIGATION ICONS (16x16):
├── home         - House shape
├── about        - Person silhouette
├── blog         - Document/scroll
├── code         - Terminal brackets </>
├── contact      - Envelope
├── portfolio    - Briefcase/folder
├── search       - Magnifying glass
├── menu         - Hamburger (3 lines)
├── close        - X mark
└── arrow-*      - Directional arrows

SOCIAL ICONS (16x16 / 24x24):
├── github       - Octocat logo
├── linkedin     - "in" logo
├── twitter      - Bird logo
├── rss          - Radio waves
└── email        - Envelope with @

ACTION ICONS (16x16):
├── copy         - Overlapping squares
├── share        - Arrow from box
├── bookmark     - Flag/ribbon
├── heart        - Heart shape
├── heart-filled - Filled heart
├── comment      - Speech bubble
├── external     - Arrow pointing out
└── download     - Arrow pointing down

META ICONS (16x16):
├── calendar     - Calendar grid
├── clock        - Clock face
├── tag          - Price tag shape
├── folder       - Folder shape
├── user         - Person silhouette
└── eye          - Eye shape (views)

THEME ICONS (16x16 / 24x24):
├── sun          - Sun with rays
├── moon         - Crescent moon
└── coffee       - Coffee cup with steam

STATUS ICONS (16x16):
├── check        - Checkmark
├── error        - X in circle
├── warning      - Triangle with !
├── info         - Circle with i
└── loading      - Spinning coffee cup
```

### 9.3 Character Sprites

```
DEVELOPER CHARACTER (32x32):
│
├── Idle
│   └── Standing, relaxed pose
│   └── Subtle breathing animation (3-4 frames)
│
├── Typing
│   └── At computer, hands on keyboard
│   └── Keys clicking animation (4 frames)
│
├── Thinking
│   └── Hand on chin, thought bubble
│   └── Bubble animation (3 frames)
│
├── Walking
│   └── Side view walking cycle
│   └── 4-frame loop
│
├── Coffee
│   └── Holding/drinking coffee
│   └── Steam rising (3 frames)
│
└── Success
    └── Celebrating pose
    └── Stars/sparkles around (4 frames)


POKEMON MASCOTS (32x32):
│
├── Bulbasaur
│   ├── Idle (front view)
│   ├── Eye blink (4 frames)
│   ├── Sleeping (3 frames, zzz)
│   └── Watering plants (4 frames)
│
├── Eevee
│   ├── Idle (front view)
│   ├── Eye blink (5 frames)
│   ├── Sleeping (3 frames)
│   ├── Running (4 frames)
│   └── Jumping (3 frames)
│
└── Squirtle
    ├── Idle (front view)
    ├── Swimming (4 frames)
    └── Bubble blowing (4 frames)
```

### 9.4 Decorative Assets

```
COFFEE ELEMENTS:
├── coffee-cup-full      32x32  - Filled coffee cup
├── coffee-cup-empty     32x32  - Empty cup
├── coffee-cup-steam     32x48  - Cup with animated steam
├── coffee-mug           32x32  - Different style mug
├── coffee-beans         16x16  - Single/group of beans
├── coffee-bag           32x48  - Coffee bag package
├── latte-art            24x24  - Cup with latte art
└── takeaway-cup         24x32  - To-go cup

PLANTS:
├── potted-plant-sm      16x24  - Small desk plant
├── potted-plant-lg      32x48  - Larger plant
├── succulent            16x16  - Small succulent
├── fern                 32x32  - Hanging fern
├── monstera             32x48  - Monstera leaf plant
├── snake-plant          32x64  - Tall snake plant
└── vine-segment         32x32  - For borders (tileable)

ATMOSPHERE:
├── star-small           8x8    - Tiny sparkle
├── star-medium          16x16  - Medium star
├── sparkle              8x8    - 4-point sparkle
├── coffee-stain         64x64  - Background texture
├── steam-particle       8x16   - Single steam wisps
└── book-stack           32x32  - Stack of books

SEPARATORS:
├── leafy-separator      192x16 - Horizontal plant divider
├── coffee-divider       128x16 - Coffee-themed divider
└── pixel-line           Variable - Simple pixel line
```

### 9.5 Sprite Implementation

```css
/* Base sprite class */
.sprite {
  display: inline-block;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Icon sprites (16x16) */
.icon {
  width: 16px;
  height: 16px;
  background-image: url('/assets/sprites/icons-16.png');
}

.icon--home { background-position: 0 0; }
.icon--search { background-position: -16px 0; }
.icon--calendar { background-position: -32px 0; }
/* ... etc */

/* Character sprites (32x32) */
.character {
  width: 32px;
  height: 32px;
  background-image: url('/assets/sprites/characters.png');
}

/* Animated sprite */
.character--bulbasaur-blink {
  background-image: url('/assets/sprites/bulbasaur-blink.png');
  background-size: 128px 32px; /* 4 frames horizontally */
  animation: blink 2s steps(4) infinite;
}

@keyframes blink {
  0%, 100% { background-position: 0 0; }
  50% { background-position: -128px 0; }
}

/* Steam animation */
.steam {
  width: 16px;
  height: 32px;
  background-image: url('/assets/sprites/steam.png');
  animation: steam-rise 2s ease-in-out infinite;
}

@keyframes steam-rise {
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: translateY(-8px) scale(1.1);
  }
}
```

---

## 10. Animations & Micro-interactions

### 10.1 Animation Principles

```
ANIMATION GUIDELINES:
│
├── PURPOSE
│   └── Every animation should have a purpose
│   └── Provide feedback, guide attention, or add delight
│   └── Never animate just for the sake of it
│
├── TIMING
│   └── Fast interactions: 100-200ms (hover, focus)
│   └── Standard transitions: 200-300ms (page changes)
│   └── Slow/ambient: 1000-3000ms (decorative loops)
│
├── EASING
│   └── Use ease-out for entering elements
│   └── Use ease-in for exiting elements
│   └── Use ease-in-out for morphing/looping
│   └── Avoid linear (feels mechanical)
│
├── SUBTLETY
│   └── Animations should be subtle, not distracting
│   └── Cozy = calm, not flashy
│   └── User should notice the result, not the animation
│
└── PIXEL CONSIDERATIONS
    └── Avoid sub-pixel movements (causes blur)
    └── Move in whole pixel increments when possible
    └── Use steps() for sprite animations
```

### 10.2 Transition Tokens

```css
:root {
  /* Durations */
  --duration-instant: 50ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-ambient: 2000ms;

  /* Easings */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Common transitions */
  --transition-colors: color var(--duration-normal) var(--ease-out),
                       background-color var(--duration-normal) var(--ease-out),
                       border-color var(--duration-normal) var(--ease-out);

  --transition-transform: transform var(--duration-normal) var(--ease-out);

  --transition-shadow: box-shadow var(--duration-normal) var(--ease-out);

  --transition-all: all var(--duration-normal) var(--ease-out);
}
```

### 10.3 Interactive Animations

```css
/* ═══════════════════════════════════════════
   HOVER LIFT (Cards, Buttons)
   ═══════════════════════════════════════════ */
.hover-lift {
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);
}

.hover-lift:hover {
  transform: translate(-4px, -4px);
  box-shadow:
    4px 4px 0 var(--border-primary),
    0 0 0 2px var(--glow-color);
}

.hover-lift:active {
  transform: translate(0, 0);
  box-shadow: none;
}


/* ═══════════════════════════════════════════
   BUTTON PRESS
   ═══════════════════════════════════════════ */
.btn-press {
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.btn-press:active {
  transform: translate(2px, 2px);
  box-shadow: inset 2px 2px 0 var(--border-dark);
}


/* ═══════════════════════════════════════════
   FOCUS GLOW
   ═══════════════════════════════════════════ */
.focus-glow:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--glow-color),
    0 0 0 4px var(--bg-primary),
    0 0 12px var(--glow-soft);
}


/* ═══════════════════════════════════════════
   LINK UNDERLINE
   ═══════════════════════════════════════════ */
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-primary);
  transition: width var(--duration-normal) var(--ease-out);
}

.link-underline:hover::after {
  width: 100%;
}
```

### 10.4 Ambient Animations

```css
/* ═══════════════════════════════════════════
   FLOATING ELEMENTS
   ═══════════════════════════════════════════ */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.float {
  animation: float 3s var(--ease-in-out) infinite;
}


/* ═══════════════════════════════════════════
   GENTLE PULSE (Highlights, notifications)
   ═══════════════════════════════════════════ */
@keyframes gentle-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.gentle-pulse {
  animation: gentle-pulse 2s var(--ease-in-out) infinite;
}


/* ═══════════════════════════════════════════
   SPARKLE (Stars, decorations)
   ═══════════════════════════════════════════ */
@keyframes sparkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  animation: sparkle 2s var(--ease-in-out) infinite;
}

.sparkle:nth-child(2) { animation-delay: 0.3s; }
.sparkle:nth-child(3) { animation-delay: 0.6s; }
.sparkle:nth-child(4) { animation-delay: 0.9s; }


/* ═══════════════════════════════════════════
   STEAM RISING
   ═══════════════════════════════════════════ */
@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.8);
  }
  20% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1.2);
  }
}

.steam {
  animation: steam-rise 2.5s var(--ease-out) infinite;
}

.steam:nth-child(2) { animation-delay: 0.8s; }
.steam:nth-child(3) { animation-delay: 1.6s; }
```

### 10.5 Loading States

```css
/* ═══════════════════════════════════════════
   COFFEE CUP LOADING
   ═══════════════════════════════════════════ */
.loading-coffee {
  width: 32px;
  height: 32px;
  background-image: url('/assets/sprites/loading-coffee.png');
  background-size: 160px 32px; /* 5 frames */
  animation: coffee-pour 1.5s steps(5) infinite;
}

@keyframes coffee-pour {
  from { background-position: 0 0; }
  to { background-position: -160px 0; }
}


/* ═══════════════════════════════════════════
   SKELETON LOADING
   ═══════════════════════════════════════════ */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--text {
  height: 16px;
  border-radius: 2px;
  margin-bottom: 8px;
}

.skeleton--title {
  height: 24px;
  width: 60%;
}

.skeleton--image {
  aspect-ratio: 16 / 9;
}
```

### 10.6 Page Transitions

```css
/* ═══════════════════════════════════════════
   FADE IN UP
   ═══════════════════════════════════════════ */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fade-in-up 0.3s var(--ease-out) forwards;
}


/* ═══════════════════════════════════════════
   STAGGERED ENTRANCE (for lists)
   ═══════════════════════════════════════════ */
.stagger-enter > * {
  opacity: 0;
  animation: fade-in-up 0.3s var(--ease-out) forwards;
}

.stagger-enter > *:nth-child(1) { animation-delay: 0ms; }
.stagger-enter > *:nth-child(2) { animation-delay: 50ms; }
.stagger-enter > *:nth-child(3) { animation-delay: 100ms; }
.stagger-enter > *:nth-child(4) { animation-delay: 150ms; }
.stagger-enter > *:nth-child(5) { animation-delay: 200ms; }
.stagger-enter > *:nth-child(n+6) { animation-delay: 250ms; }
```

---

## 11. Theme System (Day/Night)

### 11.1 Theme Toggle Behavior

```
THEME SWITCHING:
│
├── DEFAULT
│   └── Check localStorage for saved preference
│   └── If none, check prefers-color-scheme
│   └── Default to light if no preference
│
├── TOGGLE
│   └── Smooth transition between themes
│   └── Save preference to localStorage
│   └── Icon changes from sun to moon
│
├── TRANSITION
│   └── Background colors: 300ms ease
│   └── Text colors: 200ms ease
│   └── Borders: 150ms ease
│   └── Shadows: 200ms ease
│
└── ASSETS
    └── Some assets may have theme variants
    └── Glow color stays #FFD700 in both
    └── Pixel art colors mostly stay consistent
```

### 11.2 Theme Toggle Implementation

```jsx
// React Hook for theme
function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
```

### 11.3 Theme Toggle Animation

```css
/* Theme toggle button */
.theme-toggle {
  position: relative;
  width: 64px;
  height: 32px;
  padding: 4px;

  background-color: var(--bg-tertiary);
  border: 2px solid var(--border-primary);

  cursor: pointer;
  overflow: hidden;
}

/* Toggle track icons */
.theme-toggle__icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 4px;
}

.theme-toggle__sun,
.theme-toggle__moon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  transition: opacity 0.2s ease;
}

/* Toggle knob */
.theme-toggle__knob {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;

  background-color: var(--accent-primary);
  border: 2px solid var(--border-dark);

  transition: transform 0.3s var(--ease-bounce);
}

/* Dark mode state */
[data-theme="dark"] .theme-toggle__knob {
  transform: translateX(28px);
}

[data-theme="dark"] .theme-toggle__sun {
  opacity: 0.3;
}

[data-theme="light"] .theme-toggle__moon {
  opacity: 0.3;
}
```

### 11.4 Smooth Theme Transition

```css
/* Global transition for theme change */
html {
  transition:
    background-color var(--duration-slow) var(--ease-out),
    color var(--duration-slow) var(--ease-out);
}

/* Opt-in for components that should transition */
.theme-transition {
  transition:
    background-color var(--duration-slow) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    color var(--duration-normal) var(--ease-out);
}

/* Disable transitions during theme load (prevent flash) */
html.no-transitions * {
  transition: none !important;
}
```

---

## 12. Responsive Design Patterns

### 12.1 Breakpoints

```css
:root {
  --breakpoint-xs: 480px;   /* Small phones */
  --breakpoint-sm: 640px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large desktops */
}

/* Mobile-first approach */
/* Base styles = mobile */

/* Small phones and up */
@media (min-width: 480px) { }

/* Large phones and up */
@media (min-width: 640px) { }

/* Tablets and up */
@media (min-width: 768px) { }

/* Small laptops and up */
@media (min-width: 1024px) { }

/* Desktops and up */
@media (min-width: 1280px) { }
```

### 12.2 Layout Patterns

```css
/* ═══════════════════════════════════════════
   HEADER - Mobile to Desktop
   ═══════════════════════════════════════════ */

/* Mobile: Stack vertically */
.header {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-3);
}

/* Tablet+: Horizontal layout */
@media (min-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3) var(--space-6);
  }
}


/* ═══════════════════════════════════════════
   NAVIGATION - Mobile Menu
   ═══════════════════════════════════════════ */

/* Mobile: Hidden, toggle with hamburger */
.nav__links {
  display: none;
  flex-direction: column;
  gap: var(--space-2);
}

.nav__links--open {
  display: flex;
}

.nav__hamburger {
  display: block;
}

/* Tablet+: Always visible, horizontal */
@media (min-width: 768px) {
  .nav__links {
    display: flex;
    flex-direction: row;
  }

  .nav__hamburger {
    display: none;
  }
}


/* ═══════════════════════════════════════════
   POST GRID - Responsive columns
   ═══════════════════════════════════════════ */

.post-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .post-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}


/* ═══════════════════════════════════════════
   SIDEBAR - Collapse on mobile
   ═══════════════════════════════════════════ */

.blog-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.blog-layout__sidebar {
  order: 2; /* Sidebar below content on mobile */
}

@media (min-width: 1024px) {
  .blog-layout {
    flex-direction: row;
  }

  .blog-layout__main {
    flex: 1;
    min-width: 0;
  }

  .blog-layout__sidebar {
    width: 300px;
    flex-shrink: 0;
    order: 0;
  }
}
```

### 12.3 Typography Scaling

```css
/* Fluid typography for headings */
h1 {
  font-size: clamp(1.75rem, 5vw, 2.25rem);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 1.875rem);
}

/* Adjust line-heights for mobile */
@media (max-width: 640px) {
  body {
    font-size: 15px;
    line-height: 1.7;
  }

  h1, h2 {
    line-height: 1.3;
  }
}
```

### 12.4 Touch-Friendly Targets

```css
/* Minimum touch target size: 44x44px */
@media (pointer: coarse) {
  .btn,
  .nav__link,
  .tag {
    min-height: 44px;
    min-width: 44px;
  }

  /* Increase spacing between touch targets */
  .nav__links {
    gap: var(--space-3);
  }

  .tag-group {
    gap: var(--space-3);
  }
}
```

---

## 13. Accessibility Guidelines

### 13.1 Color & Contrast

```
CONTRAST REQUIREMENTS:
│
├── Normal text (< 18px)
│   └── Minimum 4.5:1 ratio (WCAG AA)
│   └── Preferred 7:1 ratio (WCAG AAA)
│
├── Large text (≥ 18px or ≥ 14px bold)
│   └── Minimum 3:1 ratio (WCAG AA)
│   └── Preferred 4.5:1 ratio (WCAG AAA)
│
├── Non-text elements (icons, borders)
│   └── Minimum 3:1 ratio
│
└── Focus indicators
    └── Must be visible on all backgrounds
    └── 3:1 ratio against adjacent colors
```

### 13.2 Focus Management

```css
/* Custom focus indicator */
:focus-visible {
  outline: 2px solid var(--glow-color);
  outline-offset: 2px;
}

/* Remove default outline when custom is applied */
:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast focus for dark backgrounds */
.dark-surface:focus-visible {
  outline-color: var(--text-primary);
  box-shadow: 0 0 0 4px var(--bg-primary);
}

/* Skip link for keyboard users */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-primary);
  border: 2px solid var(--border-primary);
  z-index: 9999;
}

.skip-link:focus {
  top: var(--space-4);
}
```

### 13.3 Screen Reader Support

```css
/* Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Show on focus (for skip links) */
.sr-only-focusable:focus,
.sr-only-focusable:active {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### 13.4 Reduced Motion

```css
/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable floating/ambient animations */
  .float,
  .sparkle,
  .steam,
  .gentle-pulse {
    animation: none !important;
  }
}
```

### 13.5 ARIA Guidelines

```html
<!-- Navigation landmarks -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Sidebar navigation">...</nav>

<!-- Interactive elements need labels -->
<button aria-label="Toggle dark mode">
  <span class="icon icon--sun" aria-hidden="true"></span>
</button>

<!-- Decorative images -->
<img src="decoration.png" alt="" aria-hidden="true">

<!-- Meaningful images -->
<img src="screenshot.png" alt="Screenshot of the homepage showing...">

<!-- Loading states -->
<div aria-busy="true" aria-label="Loading content...">
  <div class="loading-coffee"></div>
</div>

<!-- Current page in navigation -->
<a href="/blog" aria-current="page">Blog</a>

<!-- Expandable sections -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<div id="menu" hidden>...</div>
```

---

## 14. Do's and Don'ts

### 14.1 Pixel Art Do's and Don'ts

```
DO:
✓ Scale by integer multiples (2x, 3x, 4x)
✓ Use image-rendering: pixelated
✓ Align to 8px grid
✓ Use limited color palette
✓ Create consistent light source (top-left)
✓ Use 1px outlines
✓ Keep sprites at standard sizes (16, 32, 64)

DON'T:
✗ Scale by fractional amounts (1.5x, 2.7x)
✗ Let browser anti-alias pixel art
✗ Mix pixel art with smooth graphics
✗ Use too many colors per sprite (max 12)
✗ Use pure black (#000) for outlines
✗ Create sprites at odd sizes (17x23)
✗ Add gradients or blur effects
```

### 14.2 Color Do's and Don'ts

```
DO:
✓ Use warm, earthy tones
✓ Maintain consistent warmth in dark mode
✓ Use golden yellow for highlights/glows
✓ Check contrast ratios
✓ Use color meaningfully (green=success, red=error)
✓ Keep palette limited and intentional

DON'T:
✗ Use cold blues or grays as primary colors
✗ Use pure white (#FFF) or pure black (#000)
✗ Create jarring color combinations
✗ Use color as the only indicator (accessibility)
✗ Oversaturate colors
✗ Use neon or flashy accent colors
```

### 14.3 Typography Do's and Don'ts

```
DO:
✓ Use Silkscreen for H1, H2, logo
✓ Use IBM Plex Sans for body text
✓ Maintain readability despite pixel aesthetic
✓ Use appropriate line-heights (1.5-1.7 for body)
✓ Disable font-smoothing for pixel fonts
✓ Use text shadows sparingly on pixel text

DON'T:
✗ Use pixel font for long paragraphs
✗ Mix multiple pixel fonts
✗ Use very small pixel font sizes (< 12px)
✗ Forget to include fallback fonts
✗ Over-use text shadows
✗ Use ALL CAPS for long text
```

### 14.4 Layout Do's and Don'ts

```
DO:
✓ Use generous whitespace
✓ Align to 8px grid
✓ Create clear visual hierarchy
✓ Use consistent spacing tokens
✓ Design mobile-first
✓ Use clip-path for pixel corners

DON'T:
✗ Cram too much content
✗ Use standard border-radius
✗ Create cluttered layouts
✗ Use inconsistent spacing
✗ Forget responsive breakpoints
✗ Ignore touch target sizes
```

### 14.5 Animation Do's and Don'ts

```
DO:
✓ Keep animations subtle and purposeful
✓ Use 100-300ms for UI interactions
✓ Use steps() for sprite animations
✓ Respect prefers-reduced-motion
✓ Use warm glow for hover states
✓ Create calming ambient animations

DON'T:
✗ Create flashy or fast animations
✗ Use bounce/elastic for everything
✗ Animate without purpose
✗ Forget reduced motion preferences
✗ Create distracting background animations
✗ Use jarring transitions
```

---

## 15. Implementation Checklist

### 15.1 Setup Checklist

```
□ Import fonts (Silkscreen, IBM Plex Sans, IBM Plex Mono)
□ Set up CSS variables from this guide
□ Configure theme toggle functionality
□ Set up responsive breakpoints
□ Create base component classes
□ Prepare sprite sheets
□ Configure image optimization for pixel art
```

### 15.2 Component Checklist

```
For each component, verify:

VISUAL:
□ Uses correct color tokens
□ Uses pixel corners (clip-path, not border-radius)
□ Uses pixel shadows where appropriate
□ Has proper hover glow effect
□ Animations are smooth and subtle

TYPOGRAPHY:
□ Correct font family
□ Correct font size from scale
□ Proper line-height
□ Appropriate text color

SPACING:
□ Uses spacing tokens
□ Aligns to 8px grid
□ Consistent padding/margin

RESPONSIVE:
□ Works on mobile (320px+)
□ Works on tablet (768px+)
□ Works on desktop (1024px+)
□ Touch targets are 44px+ on mobile

ACCESSIBILITY:
□ Has focus state
□ Color contrast passes WCAG AA
□ Has ARIA labels where needed
□ Works with keyboard navigation
□ Works with reduced motion
```

### 15.3 Theme Checklist

```
Light Mode:
□ Background colors are cream/beige
□ Text is dark brown (not black)
□ Accents are warm brown
□ Semantic colors are muted
□ Glow is golden

Dark Mode:
□ Background is espresso dark
□ Text is cream (not white)
□ Accents are warm gold
□ Maintains warmth, not cold
□ Glow is still golden
□ Readable contrast maintained
```

### 15.4 Final QA Checklist

```
□ All pixel art renders crisply
□ No blurry or anti-aliased edges on pixel elements
□ Theme toggle works smoothly
□ All hover/focus states work
□ Loading states use coffee cup animation
□ Reduced motion is respected
□ Keyboard navigation works throughout
□ Screen reader announces content properly
□ All images have alt text
□ Performance is acceptable
□ No layout shifts on load
```

---

## 16. Asset References

### 16.1 Source Images

```
/images/
├── blogstyles1.jpeg   - Bulbasaur & Greenery Asset Sheet
├── blogstyles2.jpeg   - Coffee & Empty Cups Assets
├── blogstyles3.jpeg   - Eevee Asset Sheet
├── blogstyles4.jpeg   - Developer Character & Decorations
├── blogstyles5.jpeg   - Blog Homepage Mockup
├── blogstyles6.png    - Design System Components
├── blogstyles7.png    - Design Flowchart Overview
├── blogstyles8.png    - Design Handoff Specifications
├── blogstyles9.png    - Moodboard & References
├── blogstyles10.png   - Prototyping & Interactions
├── blogstyles11.png   - Complete Design Flowchart
├── blogstyles12.jpeg  - Multi-monitor Workspace Setup
├── blogstyles13.jpeg  - Light/Dark Mode UI Mockups
├── blogstyles14.jpeg  - Blog UI with Sidebar
├── blogstyles15.jpeg  - Pixel Art Blog Assets Sheet
├── blogstyles16.jpeg  - Squirtle Aquarium Asset Sheet
├── blogstyles17.jpeg  - UX & Wireframing
└── blogstyles18.jpg   - Additional References
```

### 16.2 Font Resources

| Font | Source | Weights | Usage |
|------|--------|---------|-------|
| Silkscreen | [Google Fonts](https://fonts.google.com/specimen/Silkscreen) | 400, 700 | H1, H2, Logo |
| IBM Plex Sans | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans) | 300-700 | Body, H3-H6, UI |
| IBM Plex Mono | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono) | 400, 500 | Code |

### 16.3 Tools & Resources

```
PIXEL ART CREATION:
├── Aseprite (paid, best for animation)
├── Piskel (free, web-based)
├── Pixilart (free, web-based)
└── GraphicsGale (free, Windows)

SPRITE SHEET TOOLS:
├── TexturePacker
├── Shoebox
└── Aseprite (built-in)

COLOR PALETTE TOOLS:
├── Lospec (pixel art palettes)
├── Coolors
└── Adobe Color

TESTING TOOLS:
├── WebAIM Contrast Checker
├── Lighthouse (accessibility audit)
└── axe DevTools
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                        COFFEE'S BLOG - QUICK REFERENCE                     ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  COLORS                                                                   ║
║  ┌─────────────────────────────────────────────────────────────────────┐ ║
║  │ Light Mode              │ Dark Mode                                 │ ║
║  │ Background: #FDFBF3     │ Background: #1A1814                      │ ║
║  │ Card BG:    #F8F0E3     │ Card BG:    #2C1E1A                      │ ║
║  │ Text:       #1A1814     │ Text:       #FDFBF3                      │ ║
║  │ Accent:     #865A3B     │ Accent:     #D4A574                      │ ║
║  │ Border:     #8B5E46     │ Border:     #614116                      │ ║
║  │ Glow:       #FFD700     │ Glow:       #FFD700 (same)               │ ║
║  └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
║  FONTS                                                                    ║
║  • Headings (H1, H2): Silkscreen (pixel font)                            ║
║  • Body & UI:         IBM Plex Sans                                       ║
║  • Code:              IBM Plex Mono                                       ║
║                                                                           ║
║  SPACING (8px grid)                                                       ║
║  • --space-2: 8px   (tight)                                              ║
║  • --space-4: 16px  (standard)                                           ║
║  • --space-6: 24px  (section)                                            ║
║  • --space-8: 32px  (large)                                              ║
║                                                                           ║
║  KEY RULES                                                                ║
║  ✓ Use clip-path for pixel corners, NOT border-radius                   ║
║  ✓ Use image-rendering: pixelated for all pixel art                     ║
║  ✓ Scale pixel art by integer multiples only (2x, 3x, 4x)               ║
║  ✓ Use warm golden glow (#FFD700) for hover effects                     ║
║  ✓ Maintain warmth even in dark mode                                    ║
║  ✓ Always provide focus states for accessibility                        ║
║  ✓ Respect prefers-reduced-motion                                       ║
║                                                                           ║
║  CLIP-PATH TEMPLATES                                                      ║
║  4px corners:  polygon(0 4px, 4px 0, calc(100% - 4px) 0, ...)           ║
║  8px corners:  polygon(0 8px, 8px 0, calc(100% - 8px) 0, ...)           ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

*This document was created based on comprehensive analysis of 18 design reference images for Coffee's Personal Blog project. It serves as the single source of truth for all design decisions.*

*Version 2.0 - Complete Edition*
