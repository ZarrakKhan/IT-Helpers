import type { Config } from "tailwindcss";

/**
 * Tailwind configuration — IT Helpers template.
 *
 * TEMPLATE CUSTOMIZATION POINT: colors below read from the CSS custom
 * properties defined in `src/styles/design-tokens.css`. Rebrand by editing
 * that file only; this config should rarely need to change.
 */

/** Wires a CSS var storing an "R G B" channel triple into an opacity-aware Tailwind color. */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: withOpacity("--color-primary"),
          dark: withOpacity("--color-primary-dark"),
          light: withOpacity("--color-primary-light"),
        },
        secondary: {
          DEFAULT: withOpacity("--color-secondary"),
          dark: withOpacity("--color-secondary-dark"),
          light: withOpacity("--color-secondary-light"),
        },
        neutral: {
          900: withOpacity("--color-neutral-900"),
          800: withOpacity("--color-neutral-800"),
          600: withOpacity("--color-neutral-600"),
          300: withOpacity("--color-neutral-300"),
          100: withOpacity("--color-neutral-100"),
          0: withOpacity("--color-neutral-0"),
        },
        success: withOpacity("--color-success"),
        warning: withOpacity("--color-warning"),
        danger: withOpacity("--color-danger"),
        background: withOpacity("--color-background"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        border: withOpacity("--color-border"),
        surface: withOpacity("--color-surface"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        18: "4.5rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        "out-premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-premium": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fade: "fade var(--duration-slow) var(--ease-out-premium) both",
        slideUp: "slideUp var(--duration-slow) var(--ease-out-premium) both",
        scaleIn: "scaleIn var(--duration-base) var(--ease-out-premium) both",
        float: "float 6s var(--ease-in-out-premium) infinite",
        pulseGlow: "pulseGlow 3s var(--ease-in-out-premium) infinite",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
