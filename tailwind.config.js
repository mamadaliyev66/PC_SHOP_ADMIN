/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
      "black": {
        ...require("daisyui/src/theming/themes")["black"],
        "primary": "blue",
        // "secondary": "#f6d860",
        // "accent": "#37cdbe",
        // "neutral": "#3d4451",
        // "base-100": "#ffffff",
      },},
      {
        "light": {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "black",
          "secondary": "white",
          "secondary-content": "black",
          // "accent": "#37cdbe",
          // "neutral": "#3d4451",
          // "base-100": "#ffffff",
        },},
    ],
    
  },
}

