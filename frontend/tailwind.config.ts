import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          alt: "var(--color-secondary-alt)",
        },
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        foreground: "var(--color-foreground)",
        heading: "var(--color-heading)",
        accent: {
          green: "var(--color-accent-green)",
          "green-2": "var(--color-accent-green-2)",
          "green-3": "var(--color-accent-green-3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        rmi: "0.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(20, 32, 10, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
