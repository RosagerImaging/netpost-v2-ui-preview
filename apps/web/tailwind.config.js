/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': '#E5E5E5',
        'secondary-text': '#8E8E93',
        'primary-interactive': '#00BFFF',
        'accent': '#FFD700',
        'bg': '#111111',
        'sidebar-bg': '#1C1C1E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};