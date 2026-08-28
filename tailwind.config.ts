import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // The comps are drawn on a 1920 artboard, so `3xl` is the only breakpoint at which the
      // design's own px values are 1:1. Everything below it is a scaled-down step.
      screens: {
        '3xl': '1920px',
      },
      colors: {
        bg: '#F7F5F0',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#212121',
          text: '#000000',
          70: 'rgba(33,33,33,0.7)',
          55: 'rgba(33,33,33,0.55)',
          15: 'rgba(33,33,33,0.15)',
          8: 'rgba(33,33,33,0.08)',
        },
        'cream-ink': '#F7F3EF',
        accent: '#F7A74F',
        btn: '#373333',
      },
      fontFamily: {
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
        sans: ['var(--font-space-grotesk)', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '1920px',
      },
      animation: {
        'drift-a': 'drift-a 7s ease-in-out infinite alternate',
        'drift-b': 'drift-b 8.5s ease-in-out infinite alternate',
        'drift-c': 'drift-c 6s ease-in-out infinite alternate',
        float: 'float 3.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'drift-a': {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(10px,-14px) rotate(6deg)' },
        },
        'drift-b': {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(-12px,10px) rotate(-8deg)' },
        },
        'drift-c': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(6px,8px) scale(1.06)' },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
