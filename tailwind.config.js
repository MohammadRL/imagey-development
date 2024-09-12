/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      playWrite: ["Playwrite DK Loopet", "cursive"],
      embedCode: ["Anton", "sans-serif"],
    },
    extend: {
      colors: {
        "main-bg-color": "#252433",
        "secondary-bg-color": "#262534",
        "third-bg-color": "#1C1C29",
      },
      backgroundImage: {
        "landing-bg": "url('/landing1.jpg')",
        "layer-bg": "url('/layer.jpg')",
      },
    },
  },
  plugins: [],
};
