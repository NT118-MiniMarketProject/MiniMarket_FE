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
        primarylight: "#6BB019", // màu xanh ngả vàng ví dụ như bên phải cùng của header
        lightgreen: "#EFFFF2",
        secondary: "#6B7280", // quên r :vvv
        accent: "#4CAF50",
        txtprimary: "#006133", // màu chữ xanh lá đậm
        txtsecond: "#222B45", // màu chữ đen ngả xanh đen xíu
        txtdarkgreen: "#006133",
        txtgreen: "#007E42",
        txtgray: "#515764", // màu chữ xám dùng cho header
        txtblue: "#0095FD",
        txtyellow: "#FFF066",
        white: "#EFFFFB", //chỉ là màu trắng
        black: "#5C595B", //chỉ là màu đen
      },
      gradientColors: {
        primary: ["#0A773D", "#5CA927"],
        home: ["red", "blue"],
      },
      fontSize: {
        "2xs": "0.625rem", // Custom size: 10px
        "3xs": "0.5rem", // Custom size: 8px
        sHome: "2rem", // Custom size: 80px
        // fontsize custom mình kí hiệu bằng chữ m ở đây
        "10m": 10,
        "11m": 11,
        "12m": 12, // này là chủ yếu nhất nhe, size header, tiêu đề sp ks
        "13m": 13,
        "14m": 14,
        "15m": 15,
      },
      borderWidth: {
        '1.2': '1.2px',
      },
    },
  },
  plugins: [],
};

