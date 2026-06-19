---
name: Quant Precision
colors:
  surface: '#f9f9f8'
  surface-dim: '#dadad9'
  surface-bright: '#f9f9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#eeeeed'
  surface-container-high: '#e8e8e7'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#3d4a44'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1f0'
  outline: '#6d7a73'
  outline-variant: '#bccac2'
  surface-tint: '#006c52'
  primary: '#006c52'
  on-primary: '#ffffff'
  primary-container: '#0ea882'
  on-primary-container: '#003426'
  inverse-primary: '#5cdcb3'
  secondary: '#5f5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e4e1e6'
  on-secondary-container: '#656467'
  tertiary: '#5e5e67'
  on-tertiary: '#ffffff'
  tertiary-container: '#94939d'
  on-tertiary-container: '#2c2c34'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7bf9ce'
  primary-fixed-dim: '#5cdcb3'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513d'
  secondary-fixed: '#e4e1e6'
  secondary-fixed-dim: '#c8c5ca'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e3e1ec'
  tertiary-fixed-dim: '#c7c5d0'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#46464f'
  background: '#f9f9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  bg-surface: '#FFFFFF'
  bg-muted: '#F4F4F5'
  border-default: '#E4E4E7'
  border-subtle: '#F0F0EF'
  border-strong: '#D4D4D8'
  text-muted: '#A1A1AA'
  gain: '#059669'
  loss: '#EF4444'
  warning: '#F59E0B'
  info: '#2563EB'
  gain-tint-bg: '#F0FBF7'
  gain-tint-border: '#B9EFE1'
  loss-tint-bg: '#FEF2F2'
  loss-tint-border: '#FECACA'
  warning-tint-bg: '#FFFBEB'
  warning-tint-border: '#FDE68A'
  info-tint-bg: '#EFF6FF'
  info-tint-border: '#BFDBFE'
typography:
  display:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.4px
  headline:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 24px
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  page-x: 24px
  page-y: 28px
  section-gap: 36px
  card-padding: 16px
  gutter-default: 10px
  gutter-tight: 6px
  metric-cell-px: 11px
  metric-cell-py: 9px
---

## Brand & Style

This design system is engineered for equity research and portfolio management, prioritizing high-fidelity data density and technical precision. The brand personality is authoritative yet modern—evoking the reliability of institutional finance with the agility of a modern SaaS platform.

The design style follows a **Corporate / Modern** approach with a strong emphasis on **Minimalism**. It rejects visual noise such as heavy shadows or decorative gradients in favor of a "boxy," structured layout. Depth is achieved through tonal layering and crisp borders, ensuring that complex financial datasets remain the primary focus. The aesthetic is clean, professional, and optimized for long-session analytical work.

## Colors

The palette is anchored by a refined "Off-White" page background to reduce eye strain during deep research. The primary accent color is a professional emerald green, used strategically for interactive elements and brand presence.

A strict semantic system is employed for financial indicators:
- **Gain/Positive:** Emerald greens are used for outperformance and "Beat" signals.
- **Loss/Negative:** Clean reds indicate risk or "Miss" signals.
- **Warning/Info:** Amber and Blues provide secondary hierarchical alerts.

Each semantic state has a corresponding "Tint" (light background + soft border) specifically for badges and alerts to ensure readability without overpowering the data.

## Typography

This system utilizes a dual-font strategy to differentiate between narrative content and quantitative data. 

**Inter** serves as the primary UI face, handling all headings, navigation, and body copy for a clean, accessible experience. 

**JetBrains Mono** is reserved exclusively for numerical data, tickers, and ratios. This ensures that columns of numbers in tables align perfectly, facilitating easier vertical scanning and comparison of financial metrics.

Hierarchical labels (Overlines) must always be set in 10px Uppercase with increased letter-spacing to maintain legibility and professional rigor at small scales.

## Layout & Spacing

The layout uses a **Fixed Grid** model for dashboards and a **Fluid** model for data tables. Content is organized into modular cards that follow a strict 16px internal padding.

A high-density rhythm is achieved using 2px and 4px increments. Metric grids and data-heavy blocks use a tighter 8px-10px gap, while larger section transitions use a 36px margin to provide visual breathing room. Tables should utilize the "Subtle Border" (`#F0F0EF`) for row separation to maintain structure without creating visual clutter.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-contrast Outlines** rather than traditional shadows. 

1.  **Level 0 (Base):** The page background (`#FAFAF9`).
2.  **Level 1 (Surface):** Cards and primary panels (`#FFFFFF`) with a `1px` border of `border-default` (`#E4E4E7`).
3.  **Level 2 (Inlay):** Metric cells or nested sectors use `bg-muted` (`#F4F4F5`) to create a recessed effect.

Shadows should be avoided entirely. When a component requires a "lift" (like a dropdown), use a single, very subtle ambient shadow (0px 4px 12px rgba(0,0,0,0.05)) or a slightly thicker `border-strong` (`#D4D4D8`).

## Shapes

The shape language is "Soft-Square," striking a balance between technical rigidity and modern software friendliness. 

- **Cards:** Use `rounded-lg` (12px) for a clear container definition.
- **Buttons & Inputs:** Use `rounded-md` (8px) to provide a comfortable interactive target.
- **Badges & Tickers:** Use `rounded-sm` (6px) or even smaller (4px) for micro-tags to ensure they don't appear "bubbly" amidst dense text.
- **Interactive States:** Hover states on table rows or list items should use a 4px or 6px radius.

## Components

### Buttons & Inputs
Buttons use a solid primary fill for main actions and a "Ghost" style (muted background, no border) for secondary actions. Inputs must use the `border-default` and switch to `border-strong` or the primary accent color on focus.

### Ticker Badges
A signature component. Use `JetBrains Mono` for the text, 13px size, with a tinted background and border that reflects the security's performance (Gain, Loss, or Neutral).

### Data Tables
Columns should be meticulously aligned. Header labels use `label-caps` (10px uppercase). Data cells containing numbers use `JetBrains Mono`. Use `border-subtle` for horizontal separators and `bg-page` for row hover states.

### Metric Cards
Small, modular containers for individual financial ratios. These should utilize the recessed inlay style (muted background) or a clean white surface with a prominent `data-lg` value.

### Chips & Tags
Sector tags and status indicators use `bg-muted` and `text-secondary` for neutral states, or the semantic tint system for alerts (e.g., "Risk Alert" using the Loss tint).