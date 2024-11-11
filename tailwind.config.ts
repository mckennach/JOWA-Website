import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import animate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import containerQuery from '@tailwindcss/container-queries'
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

const config = {
  darkMode: ['class'],
  content: {
    files: [
      './src/pages/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}',
      './src/app/**/*.{ts,tsx}',
      './src/templates/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
      './src/styles/*.css',
    ],
    extract,
  },
  prefix: '',
  theme: {
    screens,
    fontSize,
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '3rem',
        xl: '3rem',
        '2xl': '3rem',
      },
    },
    extend: {
			screens: {
				'smH': {
					raw: '(min-height: 700px)'
				}
			},
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        maisonNeue: ['Maison Neue', ...fontFamily.sans],
        maisonNeueExt: ['Maison Neue Ext', ...fontFamily.sans],
      },
			letterSpacing: {
				'3%': '.01',
			},
      fontSize: {
        body: ['2rem', '42px'],
        clamp: 'clamp(1rem, 5vw, 3rem)',
        label: '1rem',
        labelsm: '1rem',
				'fs': ['0.625rem', {
					lineHeight: '1rem',
					letterSpacing: '.01em'
				}],
				'fl': ['1.5rem', {
					lineHeight: '1.88rem',
					letterSpacing: '.01em'
				}],
				'xxs': ['0.5rem', {
					lineHeight: '1rem',
					letterSpacing: '.01em'
				}],
				'body-xl': ['1.25rem', {
					lineHeight: '1.75rem',
					letterSpacing: '0em'
				}],
				'body-3xl': ['2rem', {
					lineHeight: '2.5rem',
					letterSpacing: '0em'
				}],
        '3xl': ['2rem', {
					lineHeight: '2.5rem',
					letterSpacing: '.01em'
				}],
				'5xl': ['3rem', {
					lineHeight: '3.98rem',
					letterSpacing: '.01em',
				}]
      },
      lineHeight: {
        label: '1.88',
        labelsm: '1.88',
        body: '2.63',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        cream: 'hsl(var(--cream))',
        walnut: 'hsl(var(--walnut))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        genmaicha: 'hsl(var(--genmaicha))',
        'nav-foreground': 'hsl(var(--nav-foreground))',
        'jowa-red': 'hsl(var(--red))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-out': 'fade-out 5s ease-out',
      },
    },
  },
  plugins: [
		animate,
		typography,
		containerQuery,
		fluid
],
} satisfies Config

export default config
