/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        accent: "#f97316",
        card: "#f8fafc",
        muted: "#64748b",
        line: "#e2e8f0",
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.28)",
      },
    },
  },
  plugins: [],
};
