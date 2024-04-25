/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A773D",
        primarylight: "#5CA927",
        secondary: "#6B7280",
        accent: "#4CAF50",
        txtprimary: "#E9EDF0",
        txtgreen: "#007E42",
        txtgray: "#515764",
        // Add more custom colors as needed
      },
      gradientColors: {
        primary: ["#0A773D", "#5CA927"],
        home: ["red", "blue"],
      },
      fontSize: {
        "2xs": "0.625rem", // Custom size: 10px
        "3xs": "0.5rem", // Custom size: 8px
        "sHome": "2rem", // Custom size: 80px
      },
    },
  },
  plugins: [],
};

