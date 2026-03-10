/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
          'surface-strong': 'rgb(var(--surface-strong-rgb) / <alpha-value>)',
          text: 'rgb(var(--text-rgb) / <alpha-value>)',
          muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
          brand: 'rgb(var(--brand-rgb) / <alpha-value>)',
          line: 'rgb(var(--line-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        ui: ['var(--font-ui)'],
        reading: ['var(--font-reading)'],
      },
    },
  },
};
