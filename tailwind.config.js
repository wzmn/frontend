/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-red-800",
    "ring-red-300",
    "bg-red-600",
    "ring-red-900"
  ],
  theme: {
    extend: {
      colors: {
        // white shades
        white: "var(--color-white)",
        white80: "var(--color-white-80)",

        //yellow shades
        candlelight: "var(--color-candlelight)",

        //blue shades
        aqua_blue: "var(--color-aqua_blue)",
        aqua_blue_light: "var(--color-aqua_blue_light)",
        aqua_blue_lighter: "var(--color-aqua_blue_lighter)",
        dark_sky_blue: "var(--color-dark_sky_blue)",
        blue_dress: "var(--color-blue_dress)",

        //black shades
        black: "var(--color-black)",
        half_black: "var(--color-half_black)",

        //gray shades
        cloudy_grey: "var(--color-cloudy_grey)",
        dusty_grey: "var(--color-dusty_grey)",
        dusty_grey_dark: "var(--color-dusty_grey_dark)",
        dove_grey: "var(--color-dove_grey)",
        cloudy_grey_light: "var(--color-cloudy_grey_light)",
        cloudy_grey_lighter: "var(--color-cloudy_grey_lighter)",

        //brown shades
        ginger_brown: "var(--color-ginger_brown)",

        //green shades

        hummingbird_green: "var(--color-hummingbird_green)",
        salad_green: "var(--color-salad_green)",
        medium_aquamarine: "var(--color-medium_aquamarine)",

        //red shades
        red_dark: "var(--color-red-dark)",
        red: "var(--color-red)",
      },
    },
  },
  plugins: [],
};
