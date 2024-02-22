import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
    },
    extend: {
      animation: {
        all: "all 0.3s ease-in-out",
        "show-menu": "show-menu 0.4s ease-in-out",
      },
      keyframes: {
        "show-menu": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
