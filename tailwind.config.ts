import type { Config } from "tailwindcss";

// Design tokens — three-layer system (primitive -> semantic -> component),
// values sourced from CSS custom properties defined in app/globals.css so the
// palette has exactly one source of truth. Dark-only brand system by design
// (no light-mode toggle — see SITEWYRE brief: "Use a dark visual system").
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-elevated": "var(--color-bg-elevated)",
        "bg-elevated-2": "var(--color-bg-elevated-2)",
        fg: "var(--color-fg)",
        "fg-muted": "var(--color-fg-muted)",
        "fg-subtle": "var(--color-fg-subtle)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        accent: "var(--color-accent)",
        "accent-fg": "var(--color-accent-fg)",
        "accent-muted": "var(--color-accent-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(3rem, 3.5vw + 2rem, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-2": ["clamp(2.25rem, 2.5vw + 1.5rem, 5.5rem)", { lineHeight: "0.96", letterSpacing: "-0.025em" }],
        "h1": ["clamp(1.75rem, 1.2vw + 1.4rem, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.375rem, 0.8vw + 1.1rem, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "body-lg": ["clamp(1.0625rem, 0.3vw + 1rem, 1.375rem)", { lineHeight: "1.5" }],
        "label": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.14em" }],
        "micro": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        content: "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
