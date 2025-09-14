/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': 'var(--color-primary-text)',
        'secondary-text': 'var(--color-secondary-text)',
        'primary-interactive': 'var(--color-primary-interactive)',
        'accent': 'var(--color-accent)',
        'bg': 'var(--color-bg)',
        'sidebar-bg': 'var(--color-sidebar-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};