/**
 * Design System Configuration
 * Centralized configuration for spacing, typography, breakpoints, and component variants
 */

// Typography scale based on modular scale
export const typography = {
  fontSize: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.125rem",    // 18px
    xl: "1.25rem",     // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "3.75rem",  // 60px
    "7xl": "4.5rem",   // 72px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// Spacing system based on 4px grid
export const spacing = {
  0: "0px",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  32: "8rem",     // 128px
  40: "10rem",    // 160px
  48: "12rem",    // 192px
  56: "14rem",    // 224px
  64: "16rem",    // 256px
} as const;

// Responsive breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Animation configurations
export const animations = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "1000ms",
  },
  easing: {
    ease: "ease",
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

// Component sizing system
export const componentSizes = {
  xs: {
    height: "1.5rem",   // 24px
    padding: "0.25rem 0.5rem",
    fontSize: typography.fontSize.xs,
  },
  sm: {
    height: "2rem",     // 32px
    padding: "0.375rem 0.75rem",
    fontSize: typography.fontSize.sm,
  },
  md: {
    height: "2.5rem",   // 40px
    padding: "0.5rem 1rem",
    fontSize: typography.fontSize.base,
  },
  lg: {
    height: "3rem",     // 48px
    padding: "0.75rem 1.25rem",
    fontSize: typography.fontSize.lg,
  },
  xl: {
    height: "3.5rem",   // 56px
    padding: "1rem 1.5rem",
    fontSize: typography.fontSize.xl,
  },
} as const;

// Z-index scale for consistent layering
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Semantic color tokens (these map to CSS variables)
export const colors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: "hsl(var(--card))",
  cardForeground: "hsl(var(--card-foreground))",
  popover: "hsl(var(--popover))",
  popoverForeground: "hsl(var(--popover-foreground))",
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
} as const;

// Shadow system
export const shadows = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// Border radius system
export const borderRadius = {
  none: "0",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  full: "9999px",
} as const;

// Component variants for consistent styling
export const variants = {
  button: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      sm: componentSizes.sm,
      md: componentSizes.md,
      lg: componentSizes.lg,
    },
  },
  card: {
    variant: {
      default: "bg-card text-card-foreground",
      elevated: "bg-card text-card-foreground shadow-lg",
      outline: "bg-card text-card-foreground border",
    },
  },
  text: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive",
    },
    size: {
      xs: typography.fontSize.xs,
      sm: typography.fontSize.sm,
      base: typography.fontSize.base,
      lg: typography.fontSize.lg,
      xl: typography.fontSize.xl,
      "2xl": typography.fontSize["2xl"],
      "3xl": typography.fontSize["3xl"],
      "4xl": typography.fontSize["4xl"],
      "5xl": typography.fontSize["5xl"],
      "6xl": typography.fontSize["6xl"],
    },
  },
} as const;

// Utility functions for the design system
export const designSystem = {
  typography,
  spacing,
  breakpoints,
  animations,
  componentSizes,
  zIndex,
  colors,
  shadows,
  borderRadius,
  variants,
} as const;

export type DesignSystemConfig = typeof designSystem;
export type ComponentVariant = keyof typeof variants;
export type SpacingToken = keyof typeof spacing;
export type TypographySize = keyof typeof typography.fontSize;
export type ComponentSize = keyof typeof componentSizes;