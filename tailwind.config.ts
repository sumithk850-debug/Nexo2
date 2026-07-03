import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050810",
        panel: "#0A1128",
        "panel-raised": "#101A3A",
        edge: "#1C2951",
        cyan: {
          DEFAULT: "#00E5FF",
          dim: "#00A8BF",
          glow: "#5FFBF1",
        },
        indigo: {
          DEFAULT: "#3D5AFE",
          dim: "#2A3E9E",
        },
        ink: {
          DEFAULT: "#E8ECFB",
          muted: "#7A8AB8",
          faint: "#4A5580",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "signal-gradient":
          "linear-gradient(90deg, transparent 0%, #00E5FF 50%, transparent 100%)",
        "grid-fade":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(61,90,254,0.25), transparent)",
      },
      keyframes: {
        pulse_signal: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.4)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        drift: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        signal: "pulse_signal 1.2s ease-in-out infinite",
        drift: "drift 8s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
