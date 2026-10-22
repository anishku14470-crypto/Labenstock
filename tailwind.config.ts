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
        brand: {
          black: "#111111",
          white: "#FFFFFF",
          cream: "#F5F3EF",
          sand: "#EFECE6",
          taupe: {
            DEFAULT: "#8C827A",
            light: "#A8A098",
            subtle: "#E4DFD8",
            dark: "#4A4540",
          },
          border: "#E2DDD6",
          muted: "#76726B",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        luxury: "0 10px 30px -10px rgba(17, 17, 17, 0.08)",
        floating: "0 20px 40px -15px rgba(17, 17, 17, 0.12)",
      },
      letterSpacing: {
        widest: "0.2em",
        luxury: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
