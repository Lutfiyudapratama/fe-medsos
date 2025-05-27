export default{
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brown: {
          500: "#dd9955",
          400: "#eecc77",
        },
      },
    },
  },
  plugins: [],
}