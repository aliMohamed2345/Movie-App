import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        text_color: 'var(--text-color)',
        secondary_text_color: 'var(--text-secondary-color)',
        background_hover: "var(--bg-hover)",
        movie_color: "var(--movie_color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
