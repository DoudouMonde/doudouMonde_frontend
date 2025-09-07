/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      animation: {
        "loading-spin": "loading-spin 2.0333s linear infinite",
      },
    },

    colors: {
      green: {
        100: "#3A9592",
        200: "#3DCCA3",
        300: "#B0D171",
        400: "#90C488",
        500: "#759E6E",
      },
      secondary: {
        50: "#FFF5ED",
        100: "#FFE9D4",
        200: "#FFCFA8",
        300: "#FFAD70",
        400: "#FF7E37",
        500: "#FF5B0F",
        600: "#F05006",
        700: "#C73D07",
        800: "#9E370E",
        900: "#7F290F",
        950: "#451A05",
      },
      neutral: {
        gray: {
          0: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
      system: {
        red: {
          100: "#FF5E4D",
          200: "#FA4F34",
          300: "#F52F18",
          400: "#F01700",
        },
        green: {
          100: "#5CE58E",
          200: "#4ADE80",
          300: "#22C55D",
          400: "#16A349",
        },
      },
    },
  },
  plugins: [],
};
