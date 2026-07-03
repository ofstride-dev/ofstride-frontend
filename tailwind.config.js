/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F3F2FE",
          100: "#EEEDFE",
          200: "#CECBF6",
          300: "#AFA9EC",
          400: "#8F87E3",
          500: "#6864ED",
          600: "#534AB7",
          700: "#3C3489",
        },
        ink: {
          400: "#5F5E5A",
          500: "#3D3D3A",
          600: "#26251F",
          900: "#151718",
        },
        accent: {
          400: "#5DCAA5",
          500: "#33CC79",
          600: "#1D9E75",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Sora", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xl: "20px",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(15, 23, 42, 0.08)",
        strong: "0 24px 60px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
