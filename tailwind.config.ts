import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          50: "#f1f5f5",
          100: "#709e9b",
          200: "#588e8b",
          300: "#417e7a",
          400: "#296e6a",
          500: "#115e59",
          600: "#0f5550",
          700: "#0e4b47",
          800: "#0c423e",
          900: "#0a3835",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
export default config;
