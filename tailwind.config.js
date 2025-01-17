/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#222222",
        text: "#ffffff",
      },
      fontFamily: {
        sourceCode: "var(--typing-font)",
      },
    },
  },
  plugins: [],
};
