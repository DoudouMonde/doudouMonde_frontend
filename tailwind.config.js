/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        inter: ["Inter", "sans-serif"],
        hak: ["Hakgyoansim Dunggeunmiso OTF", "sans-serif"],
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
      yellow: {
        100: "#FFF5A6",
        200: "#FFF288",
        300: "#F8E482",
        400: "#FFF1A6",
        500: "#759E6E",
      },
      red: {
        100: "#FF6060",
      },
      pink: {
        100: "#F4A99C",
      },
      orange: {
        100: "#FFBB4D",
      },
      blue: {
        100: "#AADCE7",
      },
      brown: {
        100: "#7D5232",
      },
      beige: {
        100: "#F2D3A3",
        200: "#FBE9CC",
      },
      gray: {
        100: "#ECECEB",
        200: "#FFFFFF",
      },
      primary: {
        100: "#404040",
      },

      secondary: {
        100: "#8C8C8C",
      },
      tertiary: {
        100: "#D9D9D9",
      },
      black: {
        100: "#000000",
      },
    },
  },
  plugins: [],
};
