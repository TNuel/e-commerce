/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans'],
      },
      colors: {
        textPrimary: "#344335",
        buttonColor: "#009ADC",
        textSecondary: "#5C715E",
        backgroundOverlay: "#CED5CF",

        secondary: "#2B8C34",
        neutral: "#96A397",
        // success: "#4CC98D",
        error: "#B92043",
      },
    },
    screens: {
      'sm': '540px',
      // => @media (min-width: 640px) { ... }

      'md': '708px',
      // => @media (min-width: 1024px) { ... }

      'lg': '1240px',
      // => @media (min-width: 1280px) { ... }

      'xl': '1960px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}

