import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0F03C1",
              foreground: "#EEF2FF",
            },
            danger: {
              DEFAULT: "#991b1b",
              foreground: "#fef2f2",
            },
            warning: {
              DEFAULT: "#fed7aa",
              foreground: "#7c2d12",
            },
            success: {
              DEFAULT: "#bbf7d0",
              foreground: "#14532d",
            },
            secondary: {
              DEFAULT: "#6D28D9",
              foreground: "#EDE9FE",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
