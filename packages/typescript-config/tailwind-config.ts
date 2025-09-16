import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defining the color palette from the design system
        background: "#111111",
        "sidebar-bg": "#1C1C1E",
        "primary-interactive": "#00BFFF",
        accent: "#FFD700",
        "primary-text": "#E5E5E5",
        "secondary-text": "#8E8E93",
      },
      fontFamily: {
        // Ensuring Inter is available if the layout import fails
        sans: ["Inter", "sans-serif"],
      },
      // You can extend other theme properties here
    },
  },
  plugins: [],
};
export default config;
