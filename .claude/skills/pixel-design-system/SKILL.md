---
name: pixel-design-system
description: Pixel art design system and CSS tokens for Coffee Blog. Use when working with colors, typography, spacing, theming, or applying the "Cozy Pixel Cafe" visual style.
---

# Pixel Design System - Cozy Pixel Cafe Blog

## Design Philosophy

This blog combines **Pixel Art (GBA-inspired)** + **Cozy Cafe Atmosphere**.

### 5 Design Pillars

1. **CONSISTENCY** - Same visual language everywhere (no mixing rounded + pixel corners)
2. **WARMTH** - Browns, creams, golds dominate (even in dark mode)
3. **CLARITY** - Content readable despite pixel aesthetic
4. **PERSONALITY** - Coffee theme, mascots, small details
5. **CRAFTSMANSHIP** - Every pixel intentional

### Emotional Goals

- Nostalgia (retro gaming)
- Comfort (cozy cafe corner)
- Trust (crafted with care)

---

## Color System

### Light Mode (Default)

```css
/* Backgrounds */
--bg-primary: #FDFBF3;      /* Main page - cream/off-white */
--bg-secondary: #F8F0E3;    /* Cards - warm beige */
--bg-tertiary: #EAE0C9;     /* Borders/margins - darker beige */
--bg-elevated: #FFFFFF;     /* Modals, dropdowns */

/* Text */
--text-primary: #1A1814;    /* Body text - very dark brown */
--text-secondary: #4A2C1F;  /* Headings - dark brown */
--text-tertiary: #865A3B;   /* Labels - medium brown */
--text-muted: #7A4F3E;      /* Meta info - muted brown */
--text-inverse: #FDFBF3;    /* On dark backgrounds */

/* Accents */
--accent-primary: #865A3B;  /* Primary brown */
--accent-hover: #6B4226;    /* Darker on hover */

/* Borders */
--border-primary: #8B5E46;  /* Main border */
--border-dark: #5C3A2F;     /* Shadow/depth */

/* Semantic */
--success: #6B8E23;         /* Sage green */
--warning: #FFD700;         /* Golden - highlights, glow */
--error: #E04A4A;           /* Red alerts */
--info: #4A9AE0;            /* Blue info */
```

### Dark Mode

```css
.dark-theme {
  --bg-primary: #1A1814;      /* Espresso dark */
  --bg-secondary: #2C1E1A;    /* Dark brown cards */
  --bg-tertiary: #3D2B26;     /* Elevated surfaces */

  --text-primary: #FDFBF3;    /* Cream text */
  --text-secondary: #EFE8DF;  /* Light beige */
  --text-tertiary: #D4A574;   /* Warm gold */

  --accent-primary: #D4A574;  /* Gold accent */
  --accent-hover: #E8B584;    /* Lighter gold hover */
}
```

### Theme Toggle

```css
/* Toggle dark mode via class or data attribute */
:root.dark-theme,
[data-theme="dark"],
.dark-theme {
  /* Dark mode variables */
}
```

---

## Typography

### Font Families

```css
/* Pixel/Display font - headings, titles */
--font-display: 'Silkscreen', 'Press Start 2P', 'Courier New', monospace;

/* Body font - readable text */
--font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Code font - code blocks */
--font-code: 'IBM Plex Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
```

### Font Sizes

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Usage Guidelines

| Element | Font Family | Size | Weight |
|---------|-------------|------|--------|
| Page Title | `--font-display` | `--text-2xl` | 400 |
| Section Heading | `--font-body` | `--text-xl` | 600 |
| Body Text | `--font-body` | `--text-base` | 400 |
| Code | `--font-code` | `--text-sm` | 400 |
| Labels/Tags | `--font-body` | `--text-xs` | 500 |

---

## Spacing System (8px Grid)

```css
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px - base unit */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px - standard */
--space-6: 1.5rem;      /* 24px - sections */
--space-8: 2rem;        /* 32px - large */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
```

### Quick Reference

| Use Case | Token |
|----------|-------|
| Compact gaps | `--space-2` (8px) |
| Standard padding | `--space-4` (16px) |
| Section spacing | `--space-6` (24px) |
| Large gaps | `--space-8` (32px) |

---

## Pixel Art CSS Rules

### CRITICAL: Rendering

```css
/* ALWAYS apply to pixel art elements */
.pixel-art,
.sprite,
.icon {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: none;
}
```

### Scaling Rules

**ONLY scale by integers (1x, 2x, 3x, 4x)**

```css
/* CORRECT */
width: 32px;  /* 1x */
width: 64px;  /* 2x */
width: 96px;  /* 3x */

/* WRONG - causes blur */
width: 48px;  /* 1.5x */
width: 80px;  /* 2.5x */
```

### Sprite Sizes

```css
--sprite-size-sm: 16px;   /* Mini icons */
--sprite-size-md: 32px;   /* Standard characters */
--sprite-size-lg: 48px;   /* Large icons */
--sprite-size-xl: 64px;   /* Hero sprites */
```

---

## Pixel Corners (Clip-Path)

```css
/* 4px pixel corners */
--clip-pixel-sm: polygon(
  0 4px, 4px 0,
  calc(100% - 4px) 0, 100% 4px,
  100% calc(100% - 4px), calc(100% - 4px) 100%,
  4px 100%, 0 calc(100% - 4px)
);

/* 8px pixel corners */
--clip-pixel-md: polygon(
  0 8px, 8px 0,
  calc(100% - 8px) 0, 100% 8px,
  100% calc(100% - 8px), calc(100% - 8px) 100%,
  8px 100%, 0 calc(100% - 8px)
);
```

### Usage

```css
.card {
  clip-path: var(--clip-pixel-md);
}

.button {
  clip-path: var(--clip-pixel-sm);
}
```

---

## Pixel Shadows

```css
/* Hard-edge pixel shadows */
--shadow-pixel-sm: 2px 2px 0 var(--border-primary);
--shadow-pixel-md: 4px 4px 0 var(--border-primary);
--shadow-pixel-lg: 6px 6px 0 var(--border-primary);

/* Golden glow (hover states) */
--shadow-glow: 0 0 0 2px var(--warning), 0 0 16px rgba(255, 215, 0, 0.3);
```

---

## Layout Tokens

```css
/* Container widths */
--container-lg: 1024px;
--container-xl: 1200px;

/* Sidebar */
--sidebar-width: 280px;

/* Content area */
--content-width: 720px;

/* Navigation height */
--nav-height: 64px;
--nav-height-mobile: 56px;
```

---

## Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Media Query Pattern

```css
/* Mobile-first approach */
.element {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  .element {
    /* Tablet+ styles */
  }
}

@media (min-width: 1024px) {
  .element {
    /* Desktop styles */
  }
}
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-tooltip: 70;
--z-toast: 80;
```

---

## Do's and Don'ts

### DO

- Use CSS variables for all colors, spacing, fonts
- Apply `image-rendering: pixelated` to all pixel art
- Scale sprites by integer multiples only
- Use warm colors (browns, creams, golds)
- Apply golden glow on hover states
- Use pixel clip-paths for cards and buttons

### DON'T

- Mix rounded corners with pixel corners
- Use pure black (#000000) - use dark brown instead
- Use cold colors (pure blue, gray) as primary
- Apply standard border-radius to pixel elements
- Scale pixel art by non-integer values
- Use smooth/soft shadows on pixel elements

---

## Reference Files

- **Full Style Guide**: `docs/design/STYLE_GUIDE.md`
- **Implementation Gaps**: `docs/design/IMPLEMENTATION_GAPS.md`
- **CSS Variables**: `frontend/src/styles/variables.css`
