// tailwind.config.js
module.exports = {
    darkMode: "selector", // <-- Change to 'selector' for manual theme switching
    content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // <-- REQUIRED for manual theme switching
};
