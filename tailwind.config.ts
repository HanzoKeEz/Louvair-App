/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './ui/**/*.{ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        dark: {
          50: '#EDEDED',
          100: '#dadada',
          200: '#b5b5b5',
          300: '#8f8f8f',
          400: '#6a6a6a',
          500: '#454545',
          600: '#373737',
          700: '#292929',
          800: '#1c1c1c',
          850: '#171717',
          900: '#0e0e0e'
        },
        raisin: '#352D39'
      },
      container: {
        center: true,
        padding: '1rem',
        '2xl': '1400px'
      },
      screens: {
        '2xl': '1440px'
      },
      backgroundImage: {
        powder: 'radial-gradient(circle, #8f8f8f, #f7f7f7)',
        radial: 'radial-gradient(circle, #173B4F, #1D1F20, #181818)',
        conic: 'conic-gradient(from 180deg at 50% 50%, #181818, #1C475F)'
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(20rem,1fr))'
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        syncopate: ['Syncopate', 'sans-serif'],
        cinzel: ['Cinzel', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        assistant: ['Assistant', 'sans-serif']
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        },
        // Fade up and down
        'fade-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          '80%': {
            opacity: 0.7
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)'
          }
        },
        'fade-down': {
          '0%': {
            opacity: 0,
            transform: 'translateY(-10px)'
          },
          '80%': {
            opacity: 0.6
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)'
          }
        },
        // Fade in and out
        'fade-in': {
          '0%': {
            opacity: 0
          },
          '50%': {
            opacity: 0.6
          },
          '100%': {
            opacity: 1
          }
        },
        'fade-out': {
          '0%': {
            opacity: 0
          },
          '50%': {
            opacity: 0.6
          },
          '100%': {
            opacity: 1
          }
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        // Fade up and down
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',

        // Fade in and out
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
}
