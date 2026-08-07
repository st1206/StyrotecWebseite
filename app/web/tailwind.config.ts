import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Design tokens ported from the old frontend (frontend/tailwind.config.ts):
 * ITC Officina Sans, orange primary on dark-gray foreground, beige secondary
 * background, zero radius, hard offset shadows.
 */
export default {
  content: ['./src/**/*.{html,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1600px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['ITCOfficinaSansStd'],
      },
      fontSize: {
        '3xl': ['1.7rem', { lineHeight: '2.25rem' }],
      },
      boxShadow: {
        primary: '5px 5px 0 hsl(var(--primary))',
        foreground: '5px 5px 0 hsl(var(--foreground))',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        navBreak: '1200px',
        xl: '1440px',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
