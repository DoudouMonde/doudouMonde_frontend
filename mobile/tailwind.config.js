/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        inter: ["Inter"],
        noto: ["Noto Sans KR"],
      },
      animation: {
        "loading-spin": "loading-spin 2.0333s linear infinite",
      },
      keyframes: {
        "loading-spin": {
          "0%": { transform: "rotate(0deg)" },
          "34.4%": { transform: "rotate(180deg)" },
          "49.2%": { transform: "rotate(180deg)" },
          "83.6%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        card: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        header: "0px 4px 10px rgba(0, 0, 0, 0.03)",
        bottom: "0px 10px 20px 6px rgba(0, 0, 0, 0.25)",
        "tab-indicator": "0px 0px 4px rgba(61, 204, 163, 0.5)",
        "tab-bar": "0px -10px 20px rgba(0, 0, 0, 0.25)",
      },
    },

    colors: {
      //초록 계열
      primary: {
        // 50: "#F0F9FF",
        // 100: "#E0F2FE",
        // 200: "#BAE6FD",
        // 300: "#7DD3FC",
        400: "#3DCCA3",
        500: "#3A9592",
        // 600: "#0290D9",
        // 700: "#0379BA",
        // 800: "#086A9E",
        // 900: "#0F5B87",
        // 950: "#0B4063",
      },
      //노랑 계열
      secondary: {
        // 50: "#FFF5ED",
        // 100: "#FFE9D4",
        // 200: "#FFCFA8",
        // 300: "#FFAD70",
        400: "#FFF5A6",
        500: "#FFF288",
        // 600: "#F05006",
        // 700: "#C73D07",
        // 800: "#9E370E",
        // 900: "#7F290F",
        // 950: "#451A05",
      },
      pink: {
        500: "#FF8686",
      },
      neutral: {
        gray: {
          0: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#848484",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
      },
    },
  },
  plugins: [],
};
