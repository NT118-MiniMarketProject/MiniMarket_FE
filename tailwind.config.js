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
      //thêm gì mới vô chú thích, comment các thứ vô đây để ae xem cho tiện nhe
      colors: {
        primary: "#0A773D", // màu xanh đậm bách hoá xanh
        primarylight: "#5CA927", // màu xanh ngả vàng ví dụ như bên phải cùng của header
        secondary: "#6B7280", // quên r :vvv
        accent: "#4CAF50",
        txtprimary: "#E9EDF0", // màu chữ đen ngả xanh đen xíu
        txtgreen: "#007E42",
        txtgray: "#515764", // màu chữ xám dùng cho header
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

