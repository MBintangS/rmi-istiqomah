import type { Config } from "tailwindcss";

const withAlpha = (cssVar: string) => `rgb(var(${cssVar}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: withAlpha("--color-primary"),
          dark: withAlpha("--color-primary-dark"),
          light: withAlpha("--color-primary-light"),
        },
        secondary: {
          DEFAULT: withAlpha("--color-secondary"),
          alt: withAlpha("--color-secondary-alt"),
        },
        background: withAlpha("--color-background"),
        surface: withAlpha("--color-surface"),
        foreground: withAlpha("--color-foreground"),
        heading: withAlpha("--color-heading"),
        ink: withAlpha("--color-ink"),
        "on-ink": withAlpha("--color-on-ink"),
        error: withAlpha("--color-error"),
        accent: {
          green: withAlpha("--color-accent-green"),
          "green-2": withAlpha("--color-accent-green-2"),
          "green-3": withAlpha("--color-accent-green-3"),
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
        soft: "var(--shadow-soft)",
      },
    },
  },
  plugins: [],
};

export default config;
