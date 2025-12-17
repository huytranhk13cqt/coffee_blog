---
name: css-components
description: CSS component patterns, animations, and states for Coffee Blog. Use when building buttons, cards, loading states, icons, widgets, or implementing hover/focus effects.
---

# CSS Components - Cozy Pixel Cafe Blog

## Button States

### State Diagram

```
NORMAL          →  HOVER           →  PRESSED
Shadow: 4px 4px    Shadow: 6px 6px    Shadow: 1px 1px
Position: 0,0      Position: -2px,-2px Position: +2px,+2px
                   + Golden glow
```

### CSS Variables

```css
/* Transform States */
--btn-translate-normal: translate(0, 0);
--btn-translate-hover: translate(-2px, -2px);
--btn-translate-active: translate(2px, 2px);

/* Shadow States */
--btn-shadow-normal: 4px 4px 0 var(--border-primary);
--btn-shadow-hover: 6px 6px 0 var(--border-primary);
--btn-shadow-active: 1px 1px 0 var(--border-primary);

/* Glow Effect */
--btn-glow: 0 0 0 2px var(--warning), 0 0 8px rgba(255, 215, 0, 0.4);
```

### Button Component

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  padding: var(--space-2) var(--space-4);
  min-height: 40px;

  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);

  border: 2px solid var(--border-dark);
  clip-path: var(--clip-pixel-sm);
  cursor: pointer;

  transform: var(--btn-translate-normal);
  box-shadow: var(--btn-shadow-normal);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

/* Primary Button */
.btn-primary {
  color: var(--text-inverse);
  background-color: var(--accent-primary);
}

.btn-primary:hover {
  background-color: var(--accent-hover);
  transform: var(--btn-translate-hover);
  box-shadow: var(--btn-shadow-hover), var(--btn-glow);
}

.btn-primary:active {
  transform: var(--btn-translate-active);
  box-shadow: var(--btn-shadow-active);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Ghost Button */
.btn-ghost {
  color: var(--accent-primary);
  background-color: transparent;
  border-style: dashed;
  box-shadow: none;
}

.btn-ghost:hover {
  background-color: var(--accent-secondary);
  border-style: solid;
  box-shadow: var(--btn-glow);
}

/* Icon Button */
.btn-icon {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: var(--bg-secondary);
  box-shadow: var(--shadow-pixel-sm);
}
```

---

## Card Hover Effects

### Card Variables

```css
--card-translate-hover: translate(-4px, -4px);
--card-shadow-normal: var(--shadow-pixel-sm);
--card-shadow-hover: var(--shadow-pixel-md);
--card-glow: 0 0 0 3px var(--warning), 0 0 20px rgba(255, 215, 0, 0.3);
--card-img-scale-hover: 1.05;
```

### Post Card Component

```css
.post-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-md);

  box-shadow: var(--card-shadow-normal);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.post-card:hover {
  transform: var(--card-translate-hover);
  box-shadow: var(--card-shadow-hover), var(--card-glow);
}

/* Image zoom on hover */
.post-card__image img {
  transition: transform 300ms ease-out;
}

.post-card:hover .post-card__image img {
  transform: scale(var(--card-img-scale-hover));
}

/* Title color change */
.post-card:hover .post-card__title {
  color: var(--accent-primary);
}
```

---

## Loading States

### Coffee Cup Loading Animation

```css
.loading-coffee {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.loading-coffee__cup {
  position: relative;
  width: 64px;
  height: 64px;
}

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

  animation: coffeeFill 2s ease-in-out infinite;
}

@keyframes coffeeFill {
  0% { height: 0; }
  80% { height: calc(100% - 20px); }
  100% { height: calc(100% - 20px); opacity: 0; }
}

/* Steam animation */
.loading-coffee__steam-line {
  animation: steamRise 1.5s ease-in-out infinite;
}

@keyframes steamRise {
  0%, 100% { opacity: 0.3; transform: translateY(0) scale(1); }
  50% { opacity: 0.8; transform: translateY(-8px) scale(1.1); }
}

/* Loading text pulse */
.loading-coffee__text {
  font-family: var(--font-display);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

### Skeleton Loading

```css
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
```

### Simple Pixel Spinner

```css
.loading-spinner {
  width: 32px;
  height: 32px;
  border: 4px solid var(--border-subtle);
  border-top-color: var(--accent-primary);
  animation: spin 1s steps(8) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Icon System

### Base Icon Class

```css
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  image-rendering: pixelated;
  image-rendering: crisp-edges;

  transition: transform 150ms ease-out;
}

/* Sizes */
.icon--xs { width: 12px; height: 12px; }
.icon--sm { width: 16px; height: 16px; }
.icon--md { width: 20px; height: 20px; }
.icon--lg { width: 24px; height: 24px; }
.icon--xl { width: 32px; height: 32px; }

/* Hover effect */
.icon:hover {
  transform: scale(1.1);
}

/* Icon + Text */
.icon-text {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
```

### Icon Paths

```css
.icon-home { background-image: url('/assets/icons/nav/icon-home-16.png'); }
.icon-blog { background-image: url('/assets/icons/nav/icon-blog-16.png'); }
.icon-sun { background-image: url('/assets/icons/ui/icon-sun-16.png'); }
.icon-moon { background-image: url('/assets/icons/ui/icon-moon-16.png'); }
.icon-github { background-image: url('/assets/icons/social/icon-github-16.png'); }
.icon-coffee { background-image: url('/assets/icons/ui/icon-coffee-16.png'); }
```

---

## Theme Toggle Animation

```css
.theme-toggle {
  position: relative;
  width: 48px;
  height: 48px;

  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-sm);

  cursor: pointer;
  overflow: hidden;
}

.theme-toggle__sun,
.theme-toggle__moon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;

  background-size: contain;
  image-rendering: pixelated;

  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

/* Sun visible in light mode */
.theme-toggle__sun {
  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  opacity: 1;
}

.theme-toggle__moon {
  transform: translate(-50%, -50%) rotate(-90deg) scale(0);
  opacity: 0;
}

/* Dark mode: swap icons */
.dark-theme .theme-toggle__sun {
  transform: translate(-50%, -50%) rotate(90deg) scale(0);
  opacity: 0;
}

.dark-theme .theme-toggle__moon {
  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  opacity: 1;
}

.theme-toggle:hover {
  box-shadow: var(--btn-glow);
}
```

---

## Sidebar Widgets

### Base Widget

```css
.widget {
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  clip-path: var(--clip-pixel-md);
  overflow: hidden;
}

.widget__header {
  padding: var(--space-3) var(--space-4);
  background-color: var(--bg-tertiary);
  border-bottom: 2px solid var(--border-primary);
}

.widget__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-shadow: 1px 1px 0 var(--border-dark);
}

.widget__content {
  padding: var(--space-4);
}
```

### Table of Contents Widget

```css
.toc-widget__link {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-1) 0;

  font-size: var(--text-sm);
  color: var(--text-tertiary);
  text-decoration: none;
}

/* Pixel bullet */
.toc-widget__link::before {
  content: '';
  width: 6px;
  height: 6px;
  margin-top: 6px;
  background-color: var(--accent-primary);
  opacity: 0.5;
}

.toc-widget__link:hover {
  color: var(--accent-primary);
}

.toc-widget__link:hover::before {
  opacity: 1;
}

.toc-widget__link--active::before {
  background-color: var(--warning);
  opacity: 1;
}
```

### Tags Widget

```css
.tag {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);

  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--text-tertiary);

  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);

  transition: all 150ms ease-out;
}

.tag:hover {
  color: var(--text-primary);
  background-color: var(--accent-secondary);
  border-color: var(--accent-primary);
}

.tag--active {
  color: var(--text-inverse);
  background-color: var(--accent-primary);
}
```

---

## Focus States (Accessibility)

### Focus Variables

```css
--focus-color: var(--warning);
--focus-ring-width: 2px;
--focus-ring-offset: 2px;
--focus-glow:
  0 0 0 var(--focus-ring-width) var(--focus-color),
  0 0 0 calc(var(--focus-ring-width) + var(--focus-ring-offset)) var(--bg-primary),
  0 0 8px rgba(255, 215, 0, 0.4);
```

### Focus Styles

```css
/* Remove default outline */
*:focus {
  outline: none;
}

/* Custom focus-visible */
*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-color);
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
  box-shadow: var(--card-shadow-normal), var(--focus-glow);
}

/* Focus for inputs */
.input:focus-visible {
  outline: none;
  border-color: var(--focus-color);
  box-shadow: var(--focus-glow);
}
```

### Skip Link (Accessibility)

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);

  padding: var(--space-2) var(--space-4);
  background-color: var(--accent-primary);
  color: var(--text-inverse);

  z-index: 9999;
}

.skip-link:focus {
  top: var(--space-2);
}
```

---

## Responsive Patterns

### Mobile Bottom Navigation

```css
@media (max-width: 639px) {
  .mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-around;
    height: 64px;
    padding-bottom: env(safe-area-inset-bottom, 8px);

    background-color: var(--bg-secondary);
    border-top: 2px solid var(--border-primary);
    z-index: var(--z-fixed);
  }

  .desktop-nav {
    display: none;
  }

  .main-content {
    padding-bottom: 80px;
  }
}

@media (min-width: 640px) {
  .mobile-nav {
    display: none;
  }
}
```

### Responsive Grid

```css
.post-grid {
  display: grid;
  gap: var(--space-4);
}

/* Mobile: 1 column */
@media (max-width: 639px) {
  .post-grid {
    grid-template-columns: 1fr;
  }

  /* Hide excerpt on mobile */
  .post-card__excerpt {
    display: none;
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

### Touch-Friendly Adjustments

```css
@media (max-width: 1023px) {
  /* Larger touch targets */
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  /* Disable hover effects on touch */
  .post-card:hover {
    transform: none;
    box-shadow: var(--card-shadow-normal);
  }

  /* Active state for touch feedback */
  .post-card:active {
    transform: scale(0.98);
  }
}
```

---

## Common Animations

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade In Up */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* Animation utilities */
--animate-fade-in: fadeIn 300ms ease-out forwards;
--animate-fade-in-up: fadeInUp 300ms ease-out forwards;
--animate-bounce: bounce 1s ease-in-out infinite;
```

---

## Transition Tokens

```css
--duration-150: 150ms;  /* Micro-interactions */
--duration-200: 200ms;  /* Standard */
--duration-300: 300ms;  /* Emphasis */
--duration-500: 500ms;  /* Theme toggle */

--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Common transitions */
--transition-fast: 150ms ease-out;
--transition-normal: 200ms ease-out;
--transition-colors: color 200ms ease-out, background-color 200ms ease-out;
```

---

## Implementation Priority

| Priority | Component | Status |
|----------|-----------|--------|
| P0 | Focus States | Required for accessibility |
| P0 | Button States | Core interaction |
| P1 | Card Hover Effects | Core UX |
| P1 | Loading States | User feedback |
| P1 | Icon System | Used everywhere |
| P2 | Theme Toggle | Polish |
| P2 | Sidebar Widgets | Feature complete |
| P2 | Responsive | Mobile support |

---

## Reference Files

- **Variables**: `frontend/src/styles/variables.css`
- **Implementation Gaps**: `docs/design/IMPLEMENTATION_GAPS.md`
- **Style Guide**: `docs/design/STYLE_GUIDE.md`
